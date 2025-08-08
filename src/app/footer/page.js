const footer = ()=>{
    return (
        <footer className="w-full bg-gradient-to-b from-[#ffa47370] to-[#ffa47300] flex items-center justify-center">
            <div className="container mx-auto py-4 px-6 text-center">
                <div className="md:flex block justify-between">
                    <div className="flex flex-col items-center md:items-start md:flex-row">
                        <figure className="flex flex-col items-center md:items-start md:content-start justify-center text-center w-[227px] ">
                            <img className="w-[117px] lg:w-[150px]" src="logo-remove.png" alt="logo" />
                            <figcaption className=" mt-[-30px]">
                                <p className="text-[16px] text-center md:text-start font-semibold">Cek Keaslian Sertifikat mu di sertichain</p>
                            </figcaption>
                        </figure>
                    </div>
                    <ul className="flex flex-col content-start items-start justify-center gap-2 mt-[20px] mb-[30px] md:mt-0 md:mb-0">
                        <li>
                            <a href="https://www.instagram.com/amarhum_" target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 text-[#0E253A] transition-all duration-300">
                                <img className="" src="instagram.svg" alt="instagram" />
                                <p>amarhum_</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 text-[#0E253A] transition-all duration-300">
                                <img className="" src="twiter.svg" alt="twitter" />
                                <p>amarhum_</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 text-[#0E253A] transition-all duration-300">
                                <img className="" src="linkedin.svg" alt="linkedin" />
                                <p>amarhum_</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.whatsapp.com/+6283811480202" target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 text-[#0E253A] transition-all duration-300">
                                <img className="" src="whatsapp logo.svg" alt="wa" />
                                <p>+6283811480202</p>
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="text-sm">© 2025 Muamar Hasan Albana. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );

}

export default footer;