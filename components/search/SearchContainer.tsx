"use client";

import type React from "react";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "./SearchInput";
import { SearchEngineGrid } from "./SearchEngineGrid";
import { searchEngines, additionalSearchEngines } from "@/lib/searchEngines";
import { saveSearchToHistory } from "@/lib/searchHistory";

export function SearchContainer() {
	const [searchQuery, setSearchQuery] = useState("");
	const [showMore, setShowMore] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleSearch = (engineUrl: string, engineName: string) => {
		if (searchQuery.trim()) {
			const query = searchQuery.trim();
			window.open(engineUrl + encodeURIComponent(query), "_blank");
			// fire-and-forget async save
			void saveSearchToHistory(query, engineName);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && searchQuery.trim()) {
			handleSearch(searchEngines[0].url, searchEngines[0].name);
		} else if (e.metaKey || e.ctrlKey) {
			const num = Number.parseInt(e.key);
			if (num >= 1 && num <= 6) {
				e.preventDefault();
				handleSearch(
					searchEngines[num - 1].url,
					searchEngines[num - 1].name
				);
			} else if (num >= 7 && num <= 9) {
				e.preventDefault();
				handleSearch(
					additionalSearchEngines[num - 7].url,
					additionalSearchEngines[num - 7].name
				);
			} else if (e.key === "0") {
				e.preventDefault();
				handleSearch(
					additionalSearchEngines[3].url,
					additionalSearchEngines[3].name
				);
			}
		}
	};

	const allEngines = showMore
		? [...searchEngines, ...additionalSearchEngines]
		: searchEngines;

	return (
		<motion.div
			ref={containerRef}
			className="w-full max-w-[600px] lg:w-[600px] flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative z-10 mt-6 sm:mt-8 md:mt-10 lg:mt-12"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.8 }}>
			<div className="w-full flex flex-col gap-4">
				<SearchInput
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					onKeyPress={handleKeyPress}
					onFirstType={() => {
						containerRef.current?.scrollIntoView({
							behavior: "smooth",
							block: "start",
						});
						// Nudge slightly more to ensure full visibility below sticky/absolute elements
						window.scrollBy({ top: 80, behavior: "smooth" });
					}}
				/>

				<AnimatePresence>
					{searchQuery.trim() && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}>
							<SearchEngineGrid
								engines={allEngines}
								onSearch={handleSearch}
								showMore={showMore}
								onShowMore={() => setShowMore(true)}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
