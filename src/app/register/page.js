"use client";
import { useState } from "react";
import Footer from "../footer/page";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [instansi, setInstansi] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    if (!email || !password || !instansi) {
      setError("Semua field wajib diisi.");
      return;
    }
    // Kirim data ke backend (ganti URL sesuai endpoint Anda)
    try {
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, instansi }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Registrasi berhasil! Silakan login.");
        setEmail("");
        setPassword("");
        setInstansi("");
      } else {
        setError(data.error || "Registrasi gagal.");
      }
    } catch (err) {
      setError("Terjadi kesalahan server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="w-full bg-gradient-to-b from-[#ffa47300] to-[#ffa47361] flex items-center justify-center">
        <div className="container py-4 px-6 block md:flex justify-between items-center">
          <figure className="flex justify-center items-center">
            <img className="w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px]" src="logo-remove.png" alt="logo" />
          </figure>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg  flex flex-col lg:w-[491px] lg:h-[553px] md:w-[300px] md:h-[400px] h-[350px] lg:mt-[90px] md:mt-[70px] lg:px-[67px] md:px-[30px] px-[25px] gap-[20px]"
          >
            <h2 className="lg:text-[48px] text-[24px] font-bold text-center mt-[20px]">Sign Up</h2>
            <div className="text-center mb-[20px]">
                {loading && <p className="text-gray-500">Processing...</p>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full py-[8px] md:py-[15px] lg:py-[25px] focus:outline-none border border-[#999999] rounded-[40px] text-center"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-[8px] md:py-[15px] lg:py-[25px] focus:outline-none border border-[#999999] rounded-[40px] text-center"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Instansi"
              className="w-full py-[8px] md:py-[15px] lg:py-[25px] focus:outline-none border border-[#999999] rounded-[40px] text-center"
              value={instansi}
              onChange={(e) => setInstansi(e.target.value)}
              required
            />
            <div className="flex justify-center items-center gap-[13px]">
              <button
                type="submit"
                  className="bg-[#ffa47384] lg:px-[45px] md:px-[20px] lg:py-[15px] px-[30px] py-[8px] font-bold text-[24px] rounded-[40px] hover:bg-[#ffa473ad] transition text-white cursor-pointer hover:text-[#0E253A]"
                >
                  SignUp
                </button>
                <a href="/login" className="bg-[#ffa47384] px-[30px] py-[8px] md:px-[20px] lg:px-[57px] lg:py-[15px] font-bold text-[24px] rounded-[40px] hover:bg-[#ffa473ad] transition text-white cursor-pointer hover:text-[#0E253A]">
                  <p>Login</p>
                </a>
            </div>
          </form>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}