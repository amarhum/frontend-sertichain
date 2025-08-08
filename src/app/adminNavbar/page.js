"use client";

import Link from "next/link";
import { usePathname,useRouter } from "next/navigation"; 
import { useCallback } from "react";

const AdminNavbar = () => {
    
    const pathname = usePathname();
    const router = useRouter();

     const linkClass = (active) =>
        `relative text-[#999999] px-2 py-1 transition font-semibold ${
            active
                ? "after:content-[''] after:block after:mx-auto after:mt-1 after:w-1/2 after:border-b-4 after:border-[#0D273B] after:rounded-full after:transition-all after:duration-300 text-black"
                : "hover:text-[#0D273B]"
        }`;

        const handleLogout = useCallback(() => {
        localStorage.setItem("isLoggedIn", "false");
        router.push("/");
    }, [router]);

    return (
        <>
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <div>
                <img className="w-[60px] md:w-[80px] lg:w-[100px]" src="logo-remove.png" alt="logo" />
            </div>
            <div className="button">
                <div className="flex gap-4">
                    <Link href="/adminVerify" className={linkClass(pathname === "/adminVerify")}>
                        Cek sertifkat
                    </Link>
                    <Link href="/upload" className={linkClass(pathname === "/upload")}>
                        Upload Sertifikat
                    </Link>
                     <button onClick={handleLogout} 
                     className="bg-[#ffa47384] font-semibold font-serif py-[6px] px-[20px] md:py-[9px] md:px-[30px] lg:py-[11px] lg:px-[39px] rounded-[50px] text-white transition-all duration-300 text-[12px] lg:text-[16px] hover:bg-[#ffa473ad] cursor-pointer hover:text-[#0E253A]">
                        Logout
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default AdminNavbar;