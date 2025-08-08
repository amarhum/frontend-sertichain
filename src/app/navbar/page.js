"use client";

import Link from "next/link";

const Navbar = () => {
    

    return (
        <>
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <div>
                <img className="w-[60px] md:w-[80px] lg:w-[100px]" src="logo-remove.png" alt="logo" />
            </div>
            <div className="button">
                <button>
                    <Link href="/login" className="bg-[#ffa47384] font-semibold font-serif py-[6px] px-[20px] md:py-[9px] md:px-[30px] lg:py-[11px] lg:px-[39px] rounded-[50px] text-white transition-all duration-300 text-[12px] lg:text-[16px] hover:bg-[#ffa473ad] cursor-pointer hover:text-[#0E253A]">
                        login
                    </Link>
                </button>
            </div>
        </div>
        </>
    );
};

export default Navbar;