import { useEffect, useState } from "react"
import { Typography } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
import date from "../../utils/date"
import ManagerCard from "../card/ManagerCard"

const MAX_DESCRIPTION = 200

export default function NoteItem({ item, onDelete }) {
	const navigate = useNavigate()
	const [description, setDescription] = useState('');

	useEffect(() => {
		let text = getOnlyTextOnDom(item.description);
		setDescription(text.slice(0, MAX_DESCRIPTION) + (text.length > MAX_DESCRIPTION ? '...': ''));
	}, [item])

	return(
		<ManagerCard
			description={<Typography variant="paragraph" style={{wordBreak: 'break-word'}}>{description}</Typography>}
			onDelete={onDelete}
			onEdit={() => navigate('/app/note/editor/' + item.id)}
			timer={
				item.createdAt ?
					<Typography variant="small" className="text-gray-600">{date.parseTimeToHuman(item.createdAt)}</Typography>
				: false
			}
		/>
	)
}

function getOnlyTextOnDom(description) {
	const result = new DOMParser().parseFromString(description, "text/html")
	const p = result.querySelector("p")
	if (p) return p.innerText;
	return '[No Paragraph Found]';
}