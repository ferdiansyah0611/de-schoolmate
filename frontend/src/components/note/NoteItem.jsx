import { useEffect, useState } from "react"
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"

const MAX_DESCRIPTION = 200

export default function NoteItem({ item, onDelete }) {
	const navigate = useNavigate()
	const [description, setDescription] = useState('');

	useEffect(() => {
		let text = getOnlyTextOnDom(item.description);
		setDescription(text.slice(0, MAX_DESCRIPTION) + (text.length > MAX_DESCRIPTION ? '...': ''));
	}, [item])

	return(
		<Card key={item.id}>
			<CardBody>
				<Typography variant="paragraph">{description}</Typography>
			</CardBody>
			<CardFooter className="flex gap-5 justify-center">
				<Button className="flex items-center gap-3" size="sm" color="blue" onClick={() => navigate('/app/note/editor/' + item.id)}>
					<span className="material-symbols-outlined">edit</span>
				</Button>
				<Button className="flex items-center gap-3" size="sm" color="red" onClick={onDelete}>
					<span className="material-symbols-outlined">delete</span>
				</Button>
			</CardFooter>
		</Card>
	)
}

function getOnlyTextOnDom(description) {
	const result = new DOMParser().parseFromString(description, "text/html")
	const p = result.querySelector("p")
	if (p) return p.innerText;
	return '[No Paragraph Found]';
}