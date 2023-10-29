import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styles from "../../styles/app/todolist.module.css";
import useTodolist from "../../stores/useTodolist";
import TodolistSection from "../../components/todolist/TodolistSection";
import TodolistDialogAdd from "../../components/todolist/TodolistDialogAdd";
import { Button, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { useShallow } from 'zustand/react/shallow';
import TodolistDialogSection from "../../components/todolist/TodolistDialogSection";

export default function TodolistProject() {
	const navigate = useNavigate();
	const params = useParams();
	// wrapper action state todolist
	const todolistAction = useTodolist(state => ({
		pushProject: state.pushProject,
		deleteProject: state.deleteProject,
		pushSection: state.pushSection,
		updateSection: state.updateSection,
		deleteSection: state.deleteSection,
		pushItems: state.pushItems,
		updateItems: state.updateItems,
		deleteItems: state.deleteItems,
		setSection: state.setSection,
	}))
	const todolist = useTodolist(useShallow((state) => ({
		project: state.project.find(project => project.id === params.id),
		section: state.section.filter(section => section.projectId === params.id)
	})));
	/**
	 * Dialog Add Section
	 */
	const [stateDialogAdd, setStateDialogAdd] = useState({
		open: false,
		input: "",
		group: "Task",
		editable: null,
	});
	function stateDialogAddHandler() {
		setStateDialogAdd((current) => ({ ...current, open: !current.open }));
	}
	function stateDialogAddInput(value) {
		setStateDialogAdd((current) => ({ ...current, input: value }));
	}
	function stateDialogAddGroup(value) {
		setStateDialogAdd((current) => ({ ...current, group: value }));
	}

	function saveTaskItems() {
		if (!stateDialogAdd.input) return;
		// do edit
		if (stateDialogAdd.editable) {
			todolistAction.updateItems(
				params.id,
				stateDialogAdd.editable.sectionId,
				stateDialogAdd.editable.id,
				stateDialogAdd.input
			);
			setStateDialogAdd((current) => ({
				...current,
				input: "",
				open: false,
				editable: null,
			}));
		}
		// do commit
		else {
			todolistAction.pushItems(params.id, stateDialogAdd.group, stateDialogAdd.input);
			stateDialogAddInput("");
		}
	}
	function addTaskClick(sectionId) {
		stateDialogAddHandler();
		stateDialogAddGroup(sectionId);
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
		const draggedItem = todolist.section.find((section) => section.id === source.droppableId).items[source.index];

		// Menghapus item yang di-drag dari section asal
		const updatedSections = todolist.section.map((section) => {
			if (section.id === source.droppableId) {
				return {
					...section,
					items: section.items.filter((_, index) => index !== source.index),
				};
			}
			return section;
		});

		// Menambahkan item yang di-drag ke section tujuan
		updatedSections.forEach((section) => {
			if (section.id === destination.droppableId) {
				section.items.splice(destination.index, 0, draggedItem);
			}
		});

		// Memperbarui state dengan section yang telah diperbarui
		todolistAction.setSection(updatedSections);
	};

	/**
	 * Dialog Section
	 */
	const [stateDialogSection, setStateDialogSection] = useState({
		open: false,
		input: "",
		editable: null,
	});
	function stateDialogSectionHandler() {
		setStateDialogSection((current) => ({ ...current, open: !current.open }));
	}
	function stateDialogSectionInput(value) {
		setStateDialogSection((current) => ({ ...current, input: value }));
	}
	function stateDialogSectionSubmit() {
		// do edit name
		if (stateDialogSection.editable) {
			todolistAction.updateSection(
				params.id,
				stateDialogSection.editable.sectionId,
				{title: stateDialogSection.input}
			)
			setStateDialogSection((current) => ({ ...current, input: '', editable: null }));
		}
		// do commit
		else {
			todolistAction.pushSection(params.id, stateDialogSection.input)
			stateDialogSectionInput("");
		}
	}
	function stateDialogSectionEditName(sectionId, currentValue) {
		setStateDialogSection((current) => ({
			...current,
			open: true,
			input: currentValue,
			editable: { sectionId },
		}));
	}
	function doDeleteSection(sectionId) {
		todolistAction.deleteSection(params.id, sectionId)
	}

	function doDeleteItemSection(sectionId, itemId) {
		todolistAction.deleteItems(params.id, sectionId, itemId);
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
				{
					!todolist.section.length ?
						<div className="text-gray-500 flex justify-center items-center" style={{minHeight: '70vh'}}>
							<Typography variant="h4">No Section Data</Typography>
						</div>
					: false
				}
				<DragDropContext onDragEnd={handleDragEnd}>
					<div className={styles.cols}>
						{todolist.section.map((section) => (
							<TodolistSection
								key={section.id}
								section={section}
								addTaskClick={addTaskClick}
								doEditItem={doEditItem}
								doEditName={stateDialogSectionEditName}
								doDeleteSection={doDeleteSection}
								doDeleteItemSection={doDeleteItemSection}
							/>
						))}
					</div>
				</DragDropContext>
			</section>
			<TodolistDialogAdd
				open={stateDialogAdd.open}
				handler={stateDialogAddHandler}
				input={stateDialogAdd.input}
				inputHandler={stateDialogAddInput}
				onSubmit={saveTaskItems}
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
}