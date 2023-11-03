import { Button, Input, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { THEME, readableTheme, changeTheme } from "../../data/theme";

export default function Tutorial() {
	const navigate = useNavigate();
	const [input, setInput] = useState('')

	useEffect(() => {
		document.body.classList.add(THEME[Math.floor(Math.random() * THEME.length)]);
		return() => {
			THEME.forEach((color) => {
				document.body.classList.remove(color);
			});
		}
	}, [])

	function submit() {
		window.open("https://www.youtube.com/results?search_query=" + encodeURIComponent(input))
	}
	return (
		<main>
			<section className="screen-center">
				<div className="max-w-lg w-4/5">
					<div className="app-card-filter">
						<h2>Search Tutorial</h2>
						<div>
							<Input color="indigo" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1" label="Type Here" />
							<Button onClick={submit} size="sm" color="indigo" disabled={!input.length}>
								<span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
							</Button>
						</div>
					</div>
				</div>
			</section>
			<div className="fixed right-10 top-10">
				<div className="flex gap-2">
					{THEME.map((color) => (
						<Button style={{width: 10}} title={readableTheme(color)} onClick={() => changeTheme(color)} className={color} key={color}></Button>
					))}
					<Button size="sm" color="indigo" className="flex items-center gap-3" onClick={() => navigate("/app")}>
						<span className="material-symbols-outlined">arrow_back_ios</span>
						Back to App
					</Button>
				</div>
			</div>
		</main>
	)
}