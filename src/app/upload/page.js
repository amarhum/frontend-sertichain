"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import { useRouter } from "next/navigation";
import Navbar from "../adminNavbar/page";
import Footer from "../footer/page";
import "../../../src/app/globals.css";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);


export default function UploadPage() {

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  // const [hash] = useState("");
  const [dataUser, setData] = useState("");

  const router = useRouter();


  useEffect(() => {
    // Cek status login di localStorage
    if (typeof window !== "undefined" && localStorage.getItem("isLoggedIn") !== "true") {
      router.push("/login");
    }
  }, [router]);


  useEffect(() => {
    const upload = async () => {
      if (files.length === 0 || uploadInProgress) return;

      setUploadInProgress(true);
      setLoading(true);
      setResponseMessage("");
      setTransactionHash("");

      const formData = new FormData();
      formData.append("fileItems", files[0].file);

      try {
        console.log("Mengirim file ke backend...");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/transaction/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setResponseMessage(response.data.message);
        if (response.data.receipt?.hash) {
        setTransactionHash(response.data.receipt.hash);
        } else if (response.data.transactionHash) {
          setTransactionHash(response.data.transactionHash); 
        }
        setData(response.data.data);
      } catch (error) {
        console.error("Gagal mengupload file:", error);
        setResponseMessage(
          error.response?.data?.message || "Terjadi kesalahan saat mengupload file."
        );
      } finally {
        setLoading(false);
        setUploadInProgress(false);
      }
    };

    upload();
  }, [files]);

  return (
    <>
    <nav>
      <Navbar />
    </nav>
    <main className="w-full bg-gradient-to-b from-[#ffa47300] to-[#ffa47361] flex items-center justify-center">
      <div className="container mx-auto py-4 px-6 flex flex-col items-center">
        <div className="w-[200px] md:w-[400px] lg:w-[900px] text-center mb-[10px] md:mb-[20px] lg:mb-[44px]">
          <h1 className="font-semibold font-serif md:text-[24px] lg:text-[48px]">Upload Sertifikat mu ke Sertichain</h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <FilePond
            className="border-2 border-dashed border-[#0E253A] p-6 rounded-md"
            files={files}
            allowMultiple={false}
            maxFiles={1}
            acceptedFileTypes={["image/*", "application/pdf"]}
            onupdatefiles={(fileItems) => {
              setFiles(fileItems);
              if (fileItems.length === 0) {
                setResponseMessage("");
                setData("");
                setTransactionHash("");
              }
            }}
             onremovefile={() => {
              setResponseMessage("");
              setData("");
              setTransactionHash("");
            }}
            labelIdle="Drag & Drop sertifikat atau klik untuk memilih file"
          />
          <div className="w-[320px] md:w-[500px] lg:w-[827px] h-[126px] mt-[10px] md:mt-[20px] lg:mt-[31px] flex flex-col justify-center items-center rounded-md border-2 border-dashed border-[#0E253A]"> 
            
            {loading && (
              <div className="flex flex-col items-center mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mb-2"></div>
                <p>Processing...</p>
              </div>
            )}
            {files.length > 0 && !loading &&(
              <>
                {responseMessage && <p className="mt-2 text-center"><strong>{responseMessage}</strong></p>}
            {dataUser && (
              <p className="mt-1 text-sm break-all z-10">
                { `Nama: ${dataUser.nama}`} <br/>
                { `keahlian: ${dataUser.keahlian}`} <br/>
                { `Nomor Sertifikat: ${dataUser.nomorSertifikat}`}
              </p>
            )}
            {transactionHash && (
              <a 
                href={`https://holesky.etherscan.io/tx/${transactionHash}`}
                target="_blank"
                className="mt-1 text-sm break-all z-10 font-bold hover:underline">
                Transaction Hash: {transactionHash}
              </a>
             )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
    <footer>
      <Footer />
    </footer>
    </>
  );
}
