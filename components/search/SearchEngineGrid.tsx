"use client";
import { motion } from "framer-motion";
import type { SearchEngine } from "@/lib/searchEngines";

interface SearchEngineGridProps {
	engines: SearchEngine[];
	onSearch: (url: string, name: string) => void;
	showMore: boolean;
	onShowMore: () => void;
}

export function SearchEngineGrid({
	engines,
	onSearch,
	showMore,
	onShowMore,
}: SearchEngineGridProps) {
	return (
		<motion.div
			className="flex flex-col gap-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
				{engines.map((engine, index) => (
					<motion.div
						key={engine.name}
						className="flex flex-col gap-1"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: index * 0.05 }}>
						<motion.button
							onClick={() => onSearch(engine.url, engine.name)}
							className="h-10 sm:h-11 px-4 sm:px-6 py-2 bg-white border border-[rgba(55,50,47,0.12)] hover:border-[rgba(55,50,47,0.24)] rounded-full flex items-center justify-center gap-2 transition-all duration-200 group"
							whileHover={{
								scale: 1.05,
								boxShadow: "0px_2px_8px_rgba(55,50,47,0.12)",
							}}
							whileTap={{ scale: 0.95 }}
							transition={{ duration: 0.2 }}>
							<motion.div
								className={`w-2 h-2 rounded-full ${engine.color}`}
								whileHover={{ scale: 1.2 }}
								transition={{ duration: 0.2 }}></motion.div>
							<span className="text-[#37322F] text-sm font-medium group-hover:text-[#2F3037]">
								{engine.name}
							</span>
						</motion.button>
						<motion.div
							className="text-center text-[rgba(55,50,47,0.50)] text-xs font-mono flex items-center justify-center gap-1"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: 0.3,
								delay: index * 0.05 + 0.1,
							}}>
							<svg
								data-testid="geist-icon"
								height="12"
								strokeLinejoin="round"
								style={{ color: "currentColor" }}
								viewBox="0 0 16 16"
								width="12">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M1 3.75C1 2.23122 2.23122 1 3.75 1C5.26878 1 6.5 2.23122 6.5 3.75V5H9.5V3.75C9.5 2.23122 10.7312 1 12.25 1C13.7688 1 15 2.23122 15 3.75C15 5.26878 13.7688 6.5 12.25 6.5H11V9.5H12.25C13.7688 9.5 15 10.7312 15 12.25C15 13.7688 13.7688 15 12.25 15C10.7312 15 9.5 13.7688 9.5 12.25V11H6.5V12.25C6.5 13.7688 5.26878 15 3.75 15C2.23122 15 1 13.7688 1 12.25C1 10.7312 2.23122 9.5 3.75 9.5H5V6.5H3.75C2.23122 6.5 1 5.26878 1 3.75ZM11 5H12.25C12.9404 5 13.5 4.44036 13.5 3.75C13.5 3.05964 12.9404 2.5 12.25 2.5C11.5596 2.5 11 3.05964 11 3.75V5ZM9.5 6.5H6.5V9.5H9.5V6.5ZM11 12.25V11H12.25C12.9404 11 13.5 11.5596 13.5 12.25C13.5 12.9404 12.9404 13.5 12.25 13.5C11.5596 13.5 11 12.9404 11 12.25ZM5 11H3.75C3.05964 11 2.5 11.5596 2.5 12.25C2.5 12.9404 3.05964 13.5 3.75 13.5C4.44036 13.5 5 12.9404 5 12.25V11ZM5 3.75V5H3.75C3.05964 5 2.5 4.44036 2.5 3.75C2.5 3.05964 3.05964 2.5 3.75 2.5C4.44036 2.5 5 3.05964 5 3.75Z"
									fill="currentColor"
								/>
							</svg>
							<span>+</span>
							<span>{index + 1}</span>
						</motion.div>
					</motion.div>
				))}
			</div>

			{!showMore && (
				<motion.div
					className="flex justify-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3, delay: 0.2 }}>
					<motion.button
						onClick={onShowMore}
						className="px-4 py-2 text-sm text-[rgba(55,50,47,0.70)] hover:text-[#37322F] font-medium transition-colors duration-200"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						transition={{ duration: 0.2 }}>
						Show more engines
					</motion.button>
				</motion.div>
			)}
		</motion.div>
	);
}
