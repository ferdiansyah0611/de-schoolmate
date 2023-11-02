import { Button, Input, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { THEME, readableTheme, changeTheme } from "../../data/theme";

export default function Book() {
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
		window.open("https://www.google.com/search?tbm=bks&q=" + encodeURIComponent(input))
	}
	return (
		<main>
			<section className="min-h-screen flex justify-center items-center flex-col">
				<div className="max-w-xl">
					<div className="p-4 bg-gray-300 rounded-md shadow-md">
						<Typography variant="h2">Search Book Information</Typography>
						<div className="flex gap-2 mt-4">
							<Input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1" label="Type Here" />
							<Button onClick={submit} size="sm" disabled={!input.length}>
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