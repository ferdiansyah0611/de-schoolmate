import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import application from "../data/application";

export default function Application() {
	const navigate = useNavigate();

	function openAppHandler(title) {
		switch(title) {
			case "Note":
				return navigate("/app/note");
			case "Todo List":
				return navigate("/app/todolist");
		}
	}
	return(
		<>
			<section className="app-container flex flex-col gap-10 justify-center items-center">
				<nav>
					<div>
						<Typography variant="h3">List of Application</Typography>
					</div>
				</nav>
				<div className="grid sm:grid-cols-6 md:grid-cols-3 lg:grid-cols-4 gap-5 text-center max-w-5xl">
					{application.map((item) => (
						<Card key={item.title}>
							<CardBody>
								<Typography variant="h5">{item.title}</Typography>
								<Typography variant="paragraph">{item.description}</Typography>
							</CardBody>
							<CardFooter>
								<Button onClick={() => openAppHandler(item.title)}>Open Now</Button>
							</CardFooter>
						</Card>
					))}
				</div>
				<div>
					<Button className="flex items-center gap-3" onClick={() => navigate("/")} color="blue">
						<span className="material-symbols-outlined">arrow_back_ios</span>
						Back to Home
					</Button>
				</div>
			</section>
		</>
	)
}