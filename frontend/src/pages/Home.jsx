import "../styles/Home.css";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

export default function Home() {
	return (
		<main>
			<section className="app-container">
				<div className="bg-gray-200 p-4 md:p-8 text-center rounded-xl">
					<Typography variant="h1">De SchoolMate</Typography>
					<Typography>A complete solution for your daily studies</Typography>
					<Button variant="filled">Open Apps</Button>
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
					<Card>
						<CardBody>
							<Typography variant="h5">Book Search</Typography>
							<Typography variant="paragraph">
								A book search feature on a website is a tool that allows 
								users to search for books by various criteria such as title, 
								author, subject, or keyword.
							</Typography>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<Typography variant="h5">Calender</Typography>
							<Typography variant="paragraph">
								A calendar feature on a website is a tool that allows 
								users to view and organize events, tasks, and other 
								appointments on a digital calendar.
							</Typography>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<Typography variant="h5">Note</Typography>
							<Typography variant="paragraph">
								A note making feature on a website is a tool that allows 
								users to create and store short text-based notes or memos.
							</Typography>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<Typography variant="h5">Timer</Typography>
							<Typography variant="paragraph">
								A timer feature on a website is a tool that helps users manage 
								their time more effectively by breaking their work or study 
								sessions into smaller, more manageable chunks.
							</Typography>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<Typography variant="h5">Todo List</Typography>
							<Typography variant="paragraph">
								A todos list feature on a website is a tool that allows users to 
								create and manage a list of tasks or items that need to be completed.
							</Typography>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<Typography variant="h5">Search Tutorial</Typography>
							<Typography variant="paragraph">
								A YouTube tutorials search feature on a website is a tool that 
								allows users to search for instructional videos on YouTube by 
								using various criteria such as keywords, categories, or specific channels.
							</Typography>
						</CardBody>
					</Card>
				</div>
			</section>
		</main>
	)
}