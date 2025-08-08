"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Arrow = () => {
    const pathname = usePathname();

    return (
        <div className="justify-center items-center flex flex-col text-white z-10">
            <nav className="py-4 w-[50%]">
                <ul className="flex justify-center items-center px-8 text-lg">
                    {/* <li
                        className={`p-2 rounded-md transition-all duration-300 ${
                            pathname === "/upload"
                                ? "border-b-4 border-shadow-md bg-gray-700 shadow-md text-blue-300"
                                : "hover:bg-gray-700 hover:text-blue-300"
                        }`}
                    >
                        <Link className="font-bold font-serif" href="/upload">
                            Upload Sertifikat
                        </Link>
                    </li> */}
                    <li
                        className={`p-2 rounded-md transition-all duration-300 ${
                            pathname === "/"
                                ? "border-b-4 border-shadow-md bg-gray-700 shadow-md text-blue-300"
                                : "hover:bg-gray-700 hover:text-blue-300"
                        }`}
                    >
                        <Link className="font-bold font-serif" href="/">
                            Cek Sertifikat
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Arrow;