import { Badge } from "@/components/ui/badge";

const searchEngines = [
	{ name: "Google", color: "bg-[#4285F4]" },
	{ name: "Bing", color: "bg-[#0078D7]" },
	{ name: "DuckDuckGo", color: "bg-[#FF3300]" },
	{ name: "Yahoo", color: "bg-[#450080]" },
	{ name: "Yandex", color: "bg-[#FFC107]" },
	{ name: "Baidu", color: "bg-[#C00000]" },
];

const additionalSearchEngines = [
	{ name: "Qwen", color: "bg-[#FF6347]" },
	{ name: "Alibaba Cloud", color: "bg-[#FFA500]" },
];

export function FeatureSection() {
	return (
		<>
			<div className="self-stretch border-t border-[#E0DEDB] border-b border-[#E0DEDB] flex justify-center items-start mt-16 sm:mt-20 md:mt-24 lg:mt-32">
				<div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
					<div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
						{Array.from({ length: 50 }).map((_, i) => (
							<div
								key={i}
								className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"></div>
						))}
					</div>
				</div>

				<div className="flex-1 px-0 sm:px-2 md:px-0 flex flex-col md:flex-row justify-center items-stretch gap-0">
					<FeatureCard
						title="Multiple engines"
						description="Search across Google, Bing, DuckDuckGo, Yahoo, Yandex, and Baidu simultaneously."
					/>
					<FeatureCard
						title="Instant results"
						description="Open search results in new tabs to compare findings across different platforms."
					/>
					<FeatureCard
						title="Privacy focused"
						description="No tracking, no data collection. Your searches remain completely private."
					/>
				</div>

				<div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
					<div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
						{Array.from({ length: 50 }).map((_, i) => (
							<div
								key={i}
								className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"></div>
						))}
					</div>
				</div>
			</div>

			<div className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col items-center">
				<div className="w-full max-w-4xl px-6 md:px-12 lg:px-24 py-12 md:py-20 flex flex-col items-center text-center gap-6">
					{/* Headline */}
					<h1 className="text-[#49423D] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-[56px] tracking-tight font-sans">
						search smarter, not harder
					</h1>

					{/* Subtext */}
					<p className="text-[#605A57] text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
						why limit yourself to one search engine
						<br className="hidden sm:block" />
						when you can query them all at once?
					</p>
				</div>
			</div>

			<div className="self-stretch border-[rgba(55,50,47,0.12)] flex justify-center items-center border-t border-b-0 py-8">
				<div className="w-full overflow-hidden">
					<div className="flex animate-marquee whitespace-nowrap">
						{[
							...searchEngines,
							...additionalSearchEngines,
							...searchEngines,
						].map((engine, index) => (
							<div
								key={`${engine.name}-${index}`}
								className="flex items-center gap-3 mx-8">
								<div
									className={`w-4 h-4 rounded-full ${engine.color}`}></div>
								<span className="text-[#37322F] text-lg font-medium">
									{engine.name}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

function FeatureCard({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className="w-full md:flex-1 self-stretch px-6 py-5 overflow-hidden flex flex-col justify-start items-start gap-2 border-b md:border-b-0 last:border-b-0 border-l-0 border-r-0 md:border border-[#E0DEDB]/80">
			<div className="self-stretch flex justify-center flex-col text-[#49423D] text-sm md:text-sm font-semibold leading-6 md:leading-6 font-sans">
				{title}
			</div>
			<div className="self-stretch text-[#605A57] text-[13px] md:text-[13px] font-normal leading-[22px] md:leading-[22px] font-sans">
				{description}
			</div>
		</div>
	);
}
