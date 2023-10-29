import { Button, Card, CardBody, CardFooter } from "@material-tailwind/react";

export default function ManagerCard({ description, timer, onEdit, onDelete }) {
	return(
		<Card className="flex flex-cols">
			<CardBody className="flex-1">
				{description}
			</CardBody>
			{timer}
			<CardFooter className="flex gap-5 justify-center">
				<Button className="flex items-center gap-3" size="sm" color="blue" onClick={onEdit}>
					<span className="material-symbols-outlined">edit</span>
				</Button>
				<Button className="flex items-center gap-3" size="sm" color="red" onClick={onDelete}>
					<span className="material-symbols-outlined">delete</span>
				</Button>
			</CardFooter>
		</Card>
	)
}