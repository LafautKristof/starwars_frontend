"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MovingTitle = () => {
    const [showContent, setShowContent] = useState(false);
    const [yValue, setYValue] = useState("-10vh");
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 800) {
                setYValue("-20vh"); // bijvoorbeeld hoger op grote schermen
            } else {
                setYValue("-10vh");
            }
        };

        handleResize(); // initial check
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div className="relative min-h-screen overflow-hidden text-white flex flex-col items-center justify-start">
            <motion.img
                src="/title.png"
                alt="title"
                initial={{ y: "100vh", scale: 1.5, opacity: 1 }}
                animate={{ y: `${yValue}`, scale: 0.8, opacity: 1 }}
                transition={{ duration: 5, ease: "easeInOut" }}
                onAnimationComplete={() => setShowContent(true)}
                className="absolute top-10 w-full max-w-[90%] max-h-[60vh] object-contain"
            />

            {showContent && (
                <>
                    <div className="flex flex-wrap justify-center items-center gap-4 z-10 pt-[35vh] px-4">
                        {[
                            "Characters",
                            "Creatures",
                            "Droids",
                            "Locations",
                            "Species",
                            "Vehicles",
                        ].map((label) => (
                            <Link
                                key={label}
                                href={`/content/${label.toLowerCase()}`}
                            >
                                <button
                                    className="bg-yellow-300 text-black text-2xl md:text-4xl lg:text-5xl px-4 py-2 rounded-lg"
                                    style={{
                                        fontFamily: "var(--font-orbitron)",
                                    }}
                                >
                                    {label}
                                </button>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
export default MovingTitle;
