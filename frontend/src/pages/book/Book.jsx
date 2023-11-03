import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import ThemeInterface from "../../components/ThemeInterface";

export default function Book() {
	const [input, setInput] = useState('')
	function submit() {
		window.open("https://www.google.com/search?tbm=bks&q=" + encodeURIComponent(input))
	}
	return (
		<main>
			<section className="screen-center">
				<div className="max-w-lg w-4/5">
					<div className="app-card-filter">
						<h2>Search Book Information</h2>
						<div>
							<Input color="indigo" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1" label="Type Here" />
							<Button onClick={submit} size="sm" color="indigo" disabled={!input.length}>
								<span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
							</Button>
						</div>
					</div>
				</div>
			</section>
			<ThemeInterface/>
		</main>
	)
}