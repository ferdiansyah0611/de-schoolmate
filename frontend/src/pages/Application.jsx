import { Tooltip, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import application from "../data/application";
import { useEffect, useState } from "react";

export default function Application() {
	const navigate = useNavigate();
	useEffect(() => {
		document.body.classList.add("app");
		return () => {
			document.body.classList.remove("app");
		};
	}, []);
	return (
		<main>
			<section className="app-container">
				<div className="m-auto max-w-2xl flex flex-col" style={{minHeight: '85vh'}}>
					<div className="flex items-center text-white mb-4">
						<Typography className="flex-1" variant="h3">
							Welcome
						</Typography>
						<Clock />
					</div>
					<div className="flex-1">
						<div className="grid sm:grid-cols-6 md:grid-cols-3 lg:grid-cols-4 gap-5 text-center max-w-5xl">
							{application.map((item) => (
								<Tooltip key={item.title} content="Click to Open">
									<div onClick={() => navigate(item.url)} className="text-white p-4 cursor-pointer border border-gray-500 rounded-md hover:border-white">
										<span className="material-symbols-outlined text-5xl">{item.icon}</span>
										<p>{item.title}</p>
									</div>
								</Tooltip>
							))}
						</div>
					</div>
					<div className="text-white text-center text-gray-500 mt-4">
						<p>&copy; 2023 Ferdiansyah</p>
					</div>
				</div>
			</section>
		</main>
	);
}

function Clock() {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	const formatTime = (time) => {
		const hours = time.getHours();
		const minutes = time.getMinutes();
		const seconds = time.getSeconds();
		const date = time.getDate();
		const month = time.getMonth() + 1; // Months are zero-based
		const year = time.getFullYear();

		return `${hours}:${minutes}:${seconds} ${date}/${month}/${year}`;
	};

	return <p>{formatTime(currentTime)}</p>;
}
