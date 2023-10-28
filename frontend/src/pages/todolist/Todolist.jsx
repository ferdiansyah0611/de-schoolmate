import React, { useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styles from "../../styles/app/todolist.module.css";
import useTodolist from "../../stores/useTodolist";
import TodolistSection from "../../components/todolist/TodolistSection";
import TodolistDialogAdd from "../../components/todolist/TodolistDialogAdd";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import TodolistDialogSection from "../../components/todolist/TodolistDialogSection";

const TodoList = () => {
	const navigate = useNavigate();
	const [stateDialogAdd, setStateDialogAdd] = useState({
		open: false,
		input: "",
		group: "Task",
		editable: null,
	});
	const inputRef = useRef(null);
	const todolist = useTodolist();

	function stateDialogAddHandler() {
		setStateDialogAdd((current) => ({ ...current, open: !current.open }));
	}
	function stateDialogAddInput(value) {
		setStateDialogAdd((current) => ({ ...current, input: value }));
	}
	function stateDialogAddGroup(value) {
		setStateDialogAdd((current) => ({ ...current, group: value }));
	}

	function saveTask() {
		if (!stateDialogAdd.input) return;
		// do edit
		if (stateDialogAdd.editable) {
			todolist.update(stateDialogAdd.editable.sectionId, stateDialogAdd.editable.id, stateDialogAdd.input);
			setStateDialogAdd((current) => ({
				...current,
				input: "",
				open: false,
				editable: null,
			}));
		}
		// do commit
		else {
			todolist.push(stateDialogAdd.group, stateDialogAdd.input);
			stateDialogAddInput("");
		}
	}
	function addTaskClick(title) {
		stateDialogAddHandler();
		stateDialogAddGroup(title);
		inputRef.current.querySelector("textarea").focus();
	}
	function doEditItem(sectionId, id, currentValue) {
		setStateDialogAdd((current) => ({
			...current,
			open: true,
			input: currentValue,
			editable: { sectionId, id },
		}));
	}

	const handleDragEnd = (result) => {
		const { source, destination } = result;

		// Jika item tidak dituju ke section yang valid, batalkan perubahan
		if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
			return;
		}

		// Mengambil item yang di-drag
		const draggedItem = todolist.data.find((section) => section.id === source.droppableId).items[source.index];

		// Menghapus item yang di-drag dari section asal
		const updatedSections = todolist.data.map((section) => {
			if (section.id === source.droppableId) {
				return {
					...section,
					items: section.items.filter((item, index) => index !== source.index),
				};
			}
			return section;
		});

		// Menambahkan item yang di-drag ke section tujuan
		updatedSections.forEach((section, index) => {
			if (section.id === destination.droppableId) {
				section.items.splice(destination.index, 0, draggedItem);
			}
		});

		// Memperbarui state dengan section yang telah diperbarui
		todolist.setValue(updatedSections);
	};

	/**
	 * Dialog Section
	 */
	const [stateDialogSection, setStateDialogSection] = useState({
		open: "",
		input: "",
	});
	function stateDialogSectionHandler() {
		setStateDialogSection((current) => ({ ...current, open: !current.open }));
	}
	function stateDialogSectionInput(value) {
		setStateDialogSection((current) => ({ ...current, input: value }));
	}
	function stateDialogSectionSubmit() {
		const updatedSections = [
			{ id: crypto.randomUUID(), title: stateDialogSection.input, items: [{ id: 1, label: "Task" }] },
			...todolist.data,
		];
		todolist.setValue(updatedSections);
		stateDialogSectionInput("");
	}
	return (
		<>
			<section className="app-container max-w-5xl m-auto">
				<div className="flex justify-center mb-4 gap-4">
					<Button size="sm" className="flex items-center gap-3 flex-1" onClick={stateDialogSectionHandler}>
						<span className="material-symbols-outlined">add</span>
						Create New Section
					</Button>
					<Button size="sm" className="flex items-center gap-3" onClick={() => navigate("/app")} color="blue">
						<span className="material-symbols-outlined">arrow_back_ios</span>
						Back to App
					</Button>
				</div>
				<DragDropContext onDragEnd={handleDragEnd}>
					<div className={styles.cols}>
						{todolist.data.map((section) => (
							<TodolistSection key={section.id} addTaskClick={addTaskClick} doEditItem={doEditItem} section={section} />
						))}
					</div>
				</DragDropContext>
			</section>
			<TodolistDialogAdd
				open={stateDialogAdd.open}
				handler={stateDialogAddHandler}
				input={stateDialogAdd.input}
				inputHandler={stateDialogAddInput}
				inputRef={inputRef}
				onSubmit={saveTask}
			/>
			<TodolistDialogSection
				open={stateDialogSection.open}
				handler={stateDialogSectionHandler}
				input={stateDialogSection.input}
				inputHandler={stateDialogSectionInput}
				onSubmit={stateDialogSectionSubmit}
			/>
		</>
	);
};

export default TodoList;