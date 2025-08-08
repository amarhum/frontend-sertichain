"use client";
import Footer from "../footer/page";
import { useRouter } from "next/navigation";
import { BrowserProvider } from "ethers";

export default function LoginPage() {
  const router = useRouter();

  const sendLogin = async (address, signature) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true"
    },
    body: JSON.stringify({ address, signature })
  });
  console.log(process.env.NEXT_PUBLIC_API_URL);


  const text = await res.text(); // baca sebagai teks mentah
  console.log("Raw response:", text); // DEBUG log
  
  try {
    return JSON.parse(text); // coba parsing ke JSON
  } catch (e) {
    console.error("Gagal parse response jadi JSON!");
    throw new Error("Invalid JSON dari server. Cek backend.");
  }
};


  const handleConnectWallet = async () => {
    if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
      alert("MetaMask tidak tersedia. Silakan instal terlebih dahulu.");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Ambil nonce dari server
      const nonceRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/login/nonce/${address}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        }
      );

      const { nonce } = await nonceRes.json();

      // Tanda tangani nonce
      const signature = await signer.signMessage(nonce);

      // Kirim ke server untuk verifikasi login
      const loginRes = await sendLogin(address, signature);

      if (loginRes.success) {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/upload");
      } else {
        alert(loginRes.error || "Login gagal");
      }
    } catch (err) {
      if (err.code === "ACTION_REJECTED") {
        alert("Anda membatalkan permintaan koneksi wallet.");
      } else {
        console.error(err);
        alert("Terjadi kesalahan saat login.");
      }
    }
  };

  return (
    <>
      <main className="w-full bg-gradient-to-b from-[#ffa47300] to-[#ffa47361] flex items-center justify-center min-h-screen">
        <div className="container py-4 px-6 block md:flex justify-between items-center">
          <figure className="flex justify-center items-center">
            <img className="w-[200px] md:w-[300px] lg:w-[397px]" src="logo-remove.png" alt="logo" />
          </figure>
          <div className="bg-white rounded-lg shadow-lg flex flex-col lg:w-[491px] lg:h-[500px] md:w-[300px] md:h-[400px] h-[300px] lg:mt-[90px] md:mt-[70px] lg:px-[60px] md:px-[30px] px-[25px] justify-between items-center">
            <div className="text-center">
              <h2 className="lg:text-[48px] text-[24px] font-bold text-center lg:mt-[44px] lg:mb-[45px] md:mt-[30px] md:mb-[30px] mb-[30px] mt-[30px]">Login</h2>
              <p className="text-gray-500 text-sm mb-4">
                Hubungkan alamat dompet Ethereum Anda untuk login dan akses halaman upload
              </p>
            </div>
            <div className="flex justify-center items-center mb-[25px]">
              <button
                onClick={handleConnectWallet}
                className="bg-[#ffa47384] px-[20px] py-[12px] lg:px-[30px] lg:py-[15px] font-bold rounded-[40px] hover:bg-[#ffa473ad] transition text-white cursor-pointer hover:text-[#0E253A] text-[16px] md:text-[18px] lg:text-[20px]"
              >
                Hubungkan Alamat Dompet
              </button>
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