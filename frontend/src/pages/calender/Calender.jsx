import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { useShallow } from "zustand/react/shallow";
import CalenderAdd from "../../components/calender/CalenderAdd";
import DialogConfirm from "../../components/dialog/DialogConfirm";
import useCalender from "../../stores/useCalender";
import CalenderSection from "../../components/calender/CalenderSection";

export default function Calender() {
	const navigate = useNavigate();
	// react-calender
	const [value, onChange] = useState(new Date());
	function onClickDay(val) {
		setSelectedCalender(val);
	}
	// confirm state
	const [openConfirm, setOpenConfirm] = useState(false);
	const [confirmID, setConfirmID] = useState(null);
	function confirmHandler() {
		setOpenConfirm(!openConfirm);
	}
	// calender action
	const calenderAction = useCalender(
		useShallow((state) => ({
			push: state.push,
			update: state.update,
			delete: state.delete,
			clear: state.clear,
		})),
	);
	// get event on current date
	const todayEvent = useCalender(
		useShallow((state) =>
			state.data.filter((event) => {
				const [current, now] = [new Date(event.date), new Date()];
				if (
					current.getFullYear() === now.getFullYear() &&
					current.getMonth() === now.getMonth() &&
					current.getDate() === now.getDate()
				) {
					return true;
				}
				return false;
			}),
		),
	);
	// calender click
	const [selectedCalender, setSelectedCalender] = useState(null);
	const selectedEvent = useCalender(
		useShallow((state) => {
			if (!selectedCalender) return [];
			return state.data.filter((event) => {
				const current = new Date(event.date);
				if (
					current.getFullYear() === selectedCalender.getFullYear() &&
					current.getMonth() === selectedCalender.getMonth() &&
					current.getDate() === selectedCalender.getDate()
				) {
					return true;
				}
				return false;
			});
		}),
	);
	// dialog add
	const [openAdd, setOpenAdd] = useState(false);
	function openHandler(isCancel) {
		if (isCancel) {
			setInputAdd({
				id: null,
				title: "",
				description: "",
				date: "",
				type: "event",
			})
		}
		setOpenAdd((current) => !current);
	}

	// edit calender state
	const [inputAdd, setInputAdd] = useState({
		id: null,
		title: "",
		description: "",
		date: "",
		type: "event",
	});

	const handleInputAddChange = (event) => {
		const { name, value } = event.target;
		setInputAdd((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	// more action...
	function pushCalender(data) {
		if (data.id) {
			calenderAction.update(data.id, data);
			setInputAdd((prevState) => ({
			...prevState,
			id: null,
		}));
		} else {
			calenderAction.push(data);
		}
	}
	function editCalender(data) {
		const currentTime = new Date(data.date)
		const year = currentTime.getFullYear();
		const month = String(currentTime.getMonth() + 1).padStart(2, '0');
		const day = String(currentTime.getDate()).padStart(2, '0');
		const hours = String(currentTime.getHours()).padStart(2, '0');
		const minutes = String(currentTime.getMinutes()).padStart(2, '0');

		const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
		setInputAdd({...data, date: formattedDateTime});
		setOpenAdd(true);
	}
	function deleteCalender(id) {
		setConfirmID(id);
		confirmHandler();
	}
	return (
		<main>
			<section className="min-h-screen flex items-center flex-col">
				<div className="max-w-xl w-4/5">
					<div className="app-nav">
						<Typography variant="h4" className="flex-1">
							Calendar
						</Typography>
						<Tooltip content="Add Event">
							<IconButton onClick={openHandler}>
								<span className="material-symbols-outlined">add</span>
							</IconButton>
						</Tooltip>
						<Tooltip content="Back to App">
							<IconButton color="blue" onClick={() => navigate("/app")}>
								<span className="material-symbols-outlined pl-2">arrow_back_ios</span>
							</IconButton>
						</Tooltip>
					</div>
					<Calendar onChange={onChange} value={value} onClickDay={onClickDay} />
					{selectedCalender ? (
						<CalenderSection
							key="selected"
							title={selectedCalender.toLocaleDateString()}
							events={selectedEvent}
							onEdit={editCalender}
							onDelete={deleteCalender}
						/>
					) : (
						false
					)}
					<CalenderSection
						key="today"
						title="Today"
						events={todayEvent}
						onEdit={editCalender}
						onDelete={deleteCalender}
					/>
				</div>
			</section>
			<CalenderAdd
				open={openAdd}
				handler={openHandler}
				onSubmit={pushCalender}
				input={inputAdd}
				inputHandler={handleInputAddChange}
			/>
			<DialogConfirm
				open={openConfirm}
				title="Important!"
				description="Data can't be recovery after deletion."
				handler={confirmHandler}
				onConfirm={() => {
					calenderAction.delete(confirmID);
				}}
			/>
		</main>
	);
}