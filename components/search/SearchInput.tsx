"use client";

import type React from "react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface SearchInputProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	onKeyPress: (e: React.KeyboardEvent) => void;
	onFirstType?: () => void;
}

export function SearchInput({
	searchQuery,
	setSearchQuery,
	onKeyPress,
	onFirstType,
}: SearchInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			inputRef.current?.focus();
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	return (
		<motion.div
			className="relative"
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.2 }}>
			<motion.input
				ref={inputRef}
				type="text"
				value={searchQuery}
				onChange={(e) => {
					const next = e.target.value;
					if (!searchQuery.trim() && next.trim()) {
						onFirstType?.();
					}
					setSearchQuery(next);
				}}
				onKeyDown={onKeyPress}
				placeholder="Enter your search query..."
				className="w-full h-12 sm:h-14 px-4 sm:px-6 py-3 sm:py-4 bg-white border border-[rgba(55,50,47,0.12)] rounded-full text-[#37322F] text-sm sm:text-base font-medium placeholder:text-[rgba(55,50,47,0.60)] focus:outline-none focus:ring-2 focus:ring-[#37322F] focus:border-transparent shadow-[0px_2px_8px_rgba(55,50,47,0.08)]"
				whileFocus={{
					scale: 1.02,
					boxShadow: "0px_4px_16px_rgba(55,50,47,0.12)",
				}}
				transition={{ duration: 0.2 }}
			/>
			<motion.div
				className="absolute right-3 top-1/2 transform -translate-y-1/2"
				whileHover={{ scale: 1.1 }}
				transition={{ duration: 0.2 }}>
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
						stroke="#37322F"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</motion.div>
		</motion.div>
	);
}
