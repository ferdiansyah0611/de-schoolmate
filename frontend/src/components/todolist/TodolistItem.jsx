import { Button, Collapse } from "@material-tailwind/react";
import styles from "../../styles/app/todolist.module.css";
import { Draggable } from 'react-beautiful-dnd';
import { useState } from "react";

export default function TodolistItem({ item, index, sectionId, editable, doDeleteItemSection }) {
	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen((current) => !current);

	return(
		<>
			<Draggable key={item.id} draggableId={item.id} index={index}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={styles.item}
						onClick={toggleOpen}
					>
						<span>{item.label}</span>
					</div>
				)}
			</Draggable>
			<Collapse open={open} className="flex gap-2">
				<Button className="flex items-center gap-3" size="sm" color="blue" onClick={() => {
					editable(sectionId, item.id, item.label)
				}}>
					<span className="material-symbols-outlined">edit</span>
				</Button>
				<Button className="flex items-center gap-3" size="sm" color="red" onClick={() => doDeleteItemSection(sectionId, item.id)}>
					<span className="material-symbols-outlined">delete</span>
				</Button>
			</Collapse>
		</>
	)
}