import styles from "../../styles/app/todolist.module.css";
import { Droppable } from "react-beautiful-dnd";
import { Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import TodolistItem from "./TodolistItem";

export default function TodolistSection({ section, addTaskClick, doEditItem }) {
	return(
		<div className={styles.section}>
			<div className={styles.title}>
				<Typography variant="h4">{section.title}</Typography>
				<Menu placement="bottom-end">
		      <MenuHandler>
		        <Button size="sm" variant="text">
		        	<span class="material-symbols-outlined">menu</span>
		        </Button>
		      </MenuHandler>
		      <MenuList>
		        <MenuItem>Change Name</MenuItem>
		        <MenuItem>Delete</MenuItem>
		      </MenuList>
		    </Menu>
			</div>
			<div className={styles.root_items}>
				<Droppable droppableId={section.id}>
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{section.items.map((item, index) => (
								<TodolistItem
									index={index}
									item={item}
									key={item.id}
									sectionId={section.id}
									editable={doEditItem}
								/>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
			<div className={styles.addTask} onClick={() => addTaskClick(section.title)}>
				<span className="material-symbols-outlined">add</span>
				<Typography variant='paragraph'>Add Task</Typography>
			</div>
		</div>
	)
}