import { useEffect, useState } from "react";
import heroVideo from "../assets/Videos/herobg.mp4";
import { Menu, X } from "lucide-react";

function HeaderLanding() {

    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = ["Home", "About", "Services", "Contact"];

    return (
        <>
            {/* HEADER + HERO SECTION */}
            <section className="relative w-full min-h-[40rem] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-500" >
                {/* Background Video */}
                < video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src={heroVideo} />
                </video >

                {/* Header */}
                < header
                    className={`fixed top-0 left-0 w-full h-16 sm:h-20 z-50 transition-all duration-300 px-4 md:px-8 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"
                        }`
                    }
                >
                    <div className="max-w-6xl mx-auto w-full h-full flex items-center justify-between">
                        {/* Logo */}
                        <h3
                            className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${isScrolled ? "text-blue-900" : "text-white"
                                }`}
                        >
                            Paul
                        </h3>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center space-x-6">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className={`list-none cursor-pointer font-semibold transition-colors duration-200 text-base ${isScrolled
                                        ? "text-blue-500 hover:text-blue-900"
                                        : "text-white hover:text-blue-900"
                                        }`}
                                >
                                    {item}
                                </li>
                            ))}
                        </nav>

                        {/* Desktop Auth Buttons */}
                        <div className="hidden md:flex space-x-3">
                            <a
                                href="#"
                                className={`h-9 sm:h-10 px-3 sm:px-5 text-sm sm:text-base rounded-md font-semibold flex items-center justify-center transition-all duration-300
      ${isScrolled
                                        ? "bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white"
                                        : "bg-white text-blue-900 hover:bg-blue-900 hover:text-white"
                                    }`}
                            >
                                Sign Up
                            </a>

                            <a
                                href="#"
                                className={`h-9 sm:h-10 px-3 sm:px-5 text-sm sm:text-base rounded-md font-semibold flex items-center justify-center transition-all duration-300
      ${isScrolled
                                        ? "bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white"
                                        : "bg-white text-blue-900 hover:bg-blue-900 hover:text-white"
                                    }`}
                            >
                                Login
                            </a>
                        </div>


                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setMenuOpen(true)}
                            className={`md:hidden text-3xl focus:outline-none transition-colors duration-300 ${isScrolled ? "text-blue-900" : "text-white"
                                }`}
                        >
                            <Menu />
                        </button>
                    </div>

                    {/* Mobile Slide Menu */}
                    <div
                        className={`fixed top-0 right-0 h-full w-3/4 sm:w-2/3 bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
                            }`}
                    >
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-5 right-5 text-3xl text-blue-900 hover:text-blue-700 transition-all"
                        >
                            <X />
                        </button>

                        <div className="flex flex-col items-center mt-20 space-y-6">
                            {/* Nav Links */}
                            <ul className="flex flex-col items-center space-y-3">
                                {menuItems.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => setMenuOpen(false)}
                                        className="cursor-pointer text-blue-900 font-semibold text-lg hover:text-blue-600 transition-colors duration-200"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Auth Buttons */}
                            <div className="flex flex-col space-y-3 w-[80%] mt-10">
                                <a
                                    href="#"
                                    onClick={() => setMenuOpen(false)}
                                    className="bg-blue-900 text-white py-2 rounded-md font-semibold hover:bg-blue-800 text-center transition-all"
                                >
                                    Sign Up
                                </a>
                                <a
                                    href="#"
                                    onClick={() => setMenuOpen(false)}
                                    className="bg-white border border-blue-900 text-blue-900 py-2 rounded-md font-semibold hover:bg-blue-900 hover:text-white text-center transition-all"
                                >
                                    Login
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Overlay */}
                    {
                        menuOpen && (
                            <div
                                onClick={() => setMenuOpen(false)}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-500"
                            ></div>
                        )
                    }
                </header >

                {/* HERO CONTENT */}
                < div className="relative container mx-auto min-h-[40rem] px-3 sm:px-4 flex flex-col justify-center items-center text-center text-white tracking-[1px]" >
                    <p className="px-3 sm:px-4 py-2 mb-4 text-[10px] sm:text-xs border border-white rounded-full inline-block">
                        QCall.ai solution for your calling task
                    </p>

                    <h1 className="text-xl sm:text-3xl md:text-5xl font-bold leading-tight">
                        QCall.ai – Smarter Calls
                    </h1>
                    <h2 className="mt-2 text-lg sm:text-3xl md:text-5xl font-light leading-tight">
                        Better Conversations
                    </h2>

                    <p className="mt-4 max-w-sm sm:max-w-md md:max-w-2xl mx-auto text-white text-xs sm:text-sm md:text-base px-2">
                        Say Goodbye to Repetitive Calls. Let AI Handle It.
                    </p>

                    <p className="mt-3 max-w-sm sm:max-w-md md:max-w-2xl mx-auto text-white text-[11px] sm:text-xs md:text-sm px-2">
                        Tired of repetitive calls eating up your time? QCall.ai takes over
                        your outreach, customer support, and follow-ups with AI-driven
                        human-like conversations so you can focus on what truly matters.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 items-center">
                        <button className="bg-blue-900 text-white text-sm sm:text-base font-semibold px-5 sm:px-8 py-2 sm:py-3 rounded-md shadow-lg border border-2 border-blue-900 hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer w-[85%] sm:w-auto w-fit">
                            Try It Now For Free
                        </button>

                        <button className="bg-white text-blue-900 text-sm sm:text-base font-semibold px-5 sm:px-8 py-2 sm:py-3 rounded-md shadow-lg border border-2 border-blue-900 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer w-[85%] sm:w-auto">
                            Book a Demo
                        </button>
                    </div>
                </div >
            </section >
        </>
    )
}

export default HeaderLanding
