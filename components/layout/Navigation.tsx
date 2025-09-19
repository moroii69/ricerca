"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Navigation() {
	return (
		<>
			<motion.div
				className="w-full h-12 sm:h-14 md:h-16 lg:h-[84px] absolute left-0 top-0 flex justify-center items-center z-20 px-6 sm:px-8 md:px-12 lg:px-0"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}>
				<div className="w-full h-0 absolute left-0 top-6 sm:top-7 md:top-8 lg:top-[42px] border-t border-[rgba(55,50,47,0.12)] shadow-[0px_1px_0px_white]"></div>

				<motion.div
					className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[700px] lg:w-[700px] h-10 sm:h-11 md:h-12 py-1.5 sm:py-2 px-3 sm:px-4 md:px-4 pr-2 sm:pr-3 bg-[#F7F5F3] backdrop-blur-sm shadow-[0px_0px_0px_2px_white] overflow-hidden rounded-[50px] flex justify-between items-center relative z-30"
					whileHover={{ scale: 1.02 }}
					transition={{ duration: 0.2 }}>
					<div className="flex justify-center items-center">
						<div className="flex justify-start items-center">
							<motion.div
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}>
								<Link
									href="/"
									className="flex flex-col justify-center text-[#2F3037] text-sm sm:text-base md:text-lg lg:text-xl leading-5"
									style={{ fontFamily: "Instrument Serif" }}>
									ricerca
								</Link>
							</motion.div>
						</div>
					</div>
					<div className="h-6 sm:h-7 md:h-8 flex justify-start items-start gap-2 sm:gap-3">
						<Link
							href="/history"
							className="px-2 sm:px-3 md:px-[14px] py-1 sm:py-[6px] bg-white shadow-[0px_1px_2px_rgba(55,50,47,0.12)] overflow-hidden rounded-full flex justify-center items-center hover:shadow-[0px_2px_4px_rgba(55,50,47,0.16)] transition-shadow duration-200">
							<div className="flex flex-col justify-center text-[#37322F] text-xs md:text-[13px] font-medium leading-5 font-sans">
								History
							</div>
						</Link>
					</div>
				</motion.div>
			</motion.div>
		</>
	);
}
