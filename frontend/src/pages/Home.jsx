import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import application from "../data/application";

export default function Home() {
	const navigate = useNavigate()
	return (
		<main id="home">
			<section className="app-container">
				<div className="bg-gray-200 p-4 md:p-8 text-center rounded-xl">
					<Typography variant="h1">De SchoolMate</Typography>
					<Typography className="mb-4">A complete solution for your daily studies</Typography>
					<Button onClick={() => navigate("/app")} variant="filled">Open Apps</Button>
				</div>
			</section>
			<section className="app-container" id="about-us">
				<Typography variant="h2">About Us</Typography>
				<div>
					<div>
						<img src="https://images.unsplash.com/photo-1514355315815-2b64b0216b14?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbGxlZ2UlMjBnaXJsfGVufDB8fDB8fHww" alt="photo"/>
					</div>
					<div>
						<Typography>
							Our website is a powerful productivity and organization 
							tool designed specifically for students. With a wide 
							range of features such as a Pomodoro timer, note making, 
							todos list, and more, our website is a one-stop-shop for 
							students to manage their daily activities and improve 
							their productivity. Our website is equipped with a variety 
							of features such as a calendar, goal-setting, and task 
							prioritization tools, which help students to plan their 
							study schedule efficiently and effectively. In addition, 
							we offer a comprehensive library of educational resources 
							such as online courses, tutorial videos, and study guides, 
							which are designed to help students achieve their academic 
							goals and excel in their studies.
						</Typography>
					</div>
				</div>
			</section>
			<section className="app-container text-center">
				<Typography variant="h2">Features</Typography>
				<div className="grid grid-cols md:grid-cols-3 gap-10">
					{application.map((item) => (
						<Card key={item.title}>
							<CardBody>
								<Typography variant="h5">{item.title}</Typography>
								<Typography variant="paragraph">{item.description}</Typography>
							</CardBody>
						</Card>
					))}
				</div>
			</section>
		</main>
	)
}