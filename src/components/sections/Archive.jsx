const archivedPuzzles = [
	{
		title: "Daily Brain Teaser",
		description: "A fresh challenge to get your mind moving.",
		icon: "🧩",
		label: "Play now",
	},
	{
		title: "Logic Puzzles",
		description: "Follow the clues and find the answer.",
		icon: "🔍",
		label: "Explore",
	},
	{
		title: "Memory Match",
		description: "See what you can remember in a quick round.",
		icon: "🧠",
		label: "Play now",
	},
	{
		title: "Word Scramble",
		description: "Untangle the letters and discover the words.",
		icon: "🔤",
		label: "Explore",
	},
];

export default function Archive() {
	return (
		<section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8">
			<div className="mb-10 text-center">
				<p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
					Puzzle Archive
				</p>
				<h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
					Play a past favorite
				</h1>
				<p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600">
					Revisit older puzzles and give them another try.
				</p>
			</div>

			<div className="flex flex-wrap gap-5">
				{archivedPuzzles.map((puzzle) => (
					<button
						key={puzzle.title}
						type="button"
						aria-label={`${puzzle.label} ${puzzle.title}`}
						className="group flex w-full flex-col items-start rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-[calc(50%-0.625rem)]"
					>
						<span
							aria-hidden="true"
							className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl"
						>
							{puzzle.icon}
						</span>
						<h2 className="text-xl font-semibold text-slate-900">{puzzle.title}</h2>
						<p className="mt-2 flex-1 leading-6 text-slate-600">{puzzle.description}</p>
						<span className="mt-6 font-semibold text-indigo-600 group-hover:text-indigo-700">
							{puzzle.label} <span aria-hidden="true">→</span>
						</span>
					</button>
				))}
			</div>
		</section>
	);
}

export { Archive };