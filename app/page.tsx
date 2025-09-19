"use client";

import { SearchContainer } from "@/components/search/SearchContainer";
import { Navigation } from "@/components/layout/Navigation";
import { HeroSection } from "@/components/layout/HeroSection";
import { FeatureSection } from "@/components/layout/FeatureSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
	return (
		<div className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col justify-start items-center">
			<div className="relative flex flex-col justify-start items-center w-full">
				<div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] relative flex flex-col justify-start items-start min-h-screen">
					<div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>
					<div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

					<div className="self-stretch pt-[9px] overflow-hidden border-b border-[rgba(55,50,47,0.06)] flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[66px] relative z-10">
						<Navigation />
						<HeroSection />
						<SearchContainer />
						<FeatureSection />
						<Footer />
					</div>
				</div>
			</div>
		</div>
	);
}
