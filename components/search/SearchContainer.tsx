"use client";

import type React from "react";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "./SearchInput";
import { SearchEngineGrid } from "./SearchEngineGrid";
import { searchEngines, additionalSearchEngines } from "@/lib/searchEngines";
import { saveSearchToHistory } from "@/lib/searchHistory";
import { getDefaultSearchEngine, setDefaultSearchEngine } from "@/lib/defaultSearchEngine";

export function SearchContainer() {
	const [searchQuery, setSearchQuery] = useState("");
	const [showMore, setShowMore] = useState(false);
	const [showStartMessage, setShowStartMessage] = useState(true);
	const [defaultEngine, setDefaultEngine] = useState(getDefaultSearchEngine());
	const [hasScrolled, setHasScrolled] = useState(false);
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
			handleSearch(defaultEngine.url, defaultEngine.name);
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

	const handleSetDefault = (engineName: string) => {
		setDefaultSearchEngine(engineName);
		const engine = [...searchEngines, ...additionalSearchEngines].find(e => e.name === engineName);
		if (engine) {
			setDefaultEngine(engine);
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
				<AnimatePresence>
					{showStartMessage && !searchQuery.trim() && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className="text-center text-[rgba(0, 0, 0, 0.4)] text-xs sm:text-sm font-instrument-serif mb-2">
							start typing to search
						</motion.div>
					)}
				</AnimatePresence>
				<SearchInput
					searchQuery={searchQuery}
					setSearchQuery={(query) => {
						setSearchQuery(query);
						if (query.trim() && showStartMessage) {
							setShowStartMessage(false);
						}
					}}
					onKeyPress={handleKeyPress}
					onFirstType={() => {
						if (!hasScrolled) {
							setHasScrolled(true);
							setTimeout(() => {
								containerRef.current?.scrollIntoView({
									behavior: "smooth",
									block: "center",
								});
								window.scrollBy({ top: 60, behavior: "smooth" });
							}, 100);
						}
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
								defaultEngine={defaultEngine}
								onSetDefault={handleSetDefault}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
