"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import Navbar from "../adminNavbar/page"; 
import Footer from "../footer/page";
import { useRouter } from "next/navigation";
import "../../../src/app/globals.css";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

export default function adminVerify() {
  const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadInProgress, setUploadInProgress] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [transactionHash, setTransactionHash] = useState("");
    const [data, setData] = useState("");
  
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
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/checkTransaction/`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
  
          // Tampilkan pesan respons dengan kondisi
          if (response.data.message === "Data sertifikat tidak dapat dikenali.") {
            setResponseMessage("Template sertifikat tidak dikenali.");
          } else if (response.data.isValid.exists) {
            setResponseMessage("Sertifikat valid.");
          } else {
            setResponseMessage("Sertifikat tidak valid.");
          }
  
          if (response.data.isValid.transactionHash) {
            setTransactionHash(response.data.isValid.transactionHash);
          } else {
            setTransactionHash("");
          }
  
          setData(response.data.data);
        } catch (error) {
          console.error("Gagal mengupload file:", error);
          setResponseMessage(
            error.response?.data?.message || "Terjadi kesalahan saat memverifikasi file."
          );
          setTransactionHash("");
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
            <h1 className="font-semibold font-serif md:text-[24px] lg:text-[48px]">Cek Keaslian Sertifikat mu di Sertichain</h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            <FilePond
              className=" border-2 border-dashed border-[#0E253A] p-6 rounded-md"
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
            <div className="px-[20px] w-[320px] md:w-[500px] lg:w-[827px] h-[180px] mt-[10px] md:mt-[20px] lg:mt-[31px] flex flex-col justify-center rounded-md border-2 border-dashed border-[#0E253A] lg:px-[40px]">
              {loading && (
              <div className="flex flex-col items-center mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mb-2"></div>
                <p>Processing...</p>
              </div>
            )}
            {files.length > 0 && !loading &&(
              <>
                {responseMessage && <p className="mt-2 text-center"><strong>{responseMessage}</strong></p>}
              {data && (
                <div className="mt-2 text-sm text-left items-start flex flex-col">
                  <p className="items-start">Nama:{data.nama}</p>
                  <p>Keahlian: {data.keahlian}</p>
                  <p>Nomor Sertifikat: {data.nomorSertifikat}</p>
                </div>
              )}
              {transactionHash && (
                <a 
                  href={`https://holesky.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer" 
                  className="mt-1 text-sm break-all text-center font-bold">
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