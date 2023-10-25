import { Button, Typography } from "@material-tailwind/react";
import useNotes from "../../stores/useNotes";
import { useNavigate } from "react-router-dom";
import NoteItem from "../../components/note/NoteItem";
import { useState } from "react";
import { DialogConfirm } from "../../components/dialog/DialogConfirm";

export default function Note() {
	const notes = useNotes();
	const navigate = useNavigate();
	const [openConfirm, setOpenConfirm] = useState(false);
	const [confirmID, setConfirmID] = useState(false);

	function confirmHandler() {
		setOpenConfirm(!openConfirm)
	}
	return (
		<main>
			<section className="app-container flex flex-col gap-10 justify-center items-center">
				<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 text-center max-w-5xl">
					<div
						onClick={() => navigate("/app/note/editor")}
						className="flex justify-center items-center cursor-pointer border-2 border-gray-300 hover:border-blue-500 rounded-lg p-10 text-gray-500 hover:text-blue-500 hover:bg-blue-100 transition-all duration-300"
					>
						<Typography variant="h4">Create Note</Typography>
					</div>
					{notes.data.map((item) => (
						<NoteItem item={item} key={item.id} onDelete={() => {
							setConfirmID(item.id)
							confirmHandler()
						}} />
					))}
				</div>
				<div>
					<Button className="flex items-center gap-3" onClick={() => navigate("/app")} color="blue">
						<span className="material-symbols-outlined">arrow_back_ios</span>
						Back to App
					</Button>
				</div>
			</section>
			<DialogConfirm
				open={openConfirm}
				title="Important!"
				description="Data can't be recovery after deletion."
				handler={confirmHandler}
				onConfirm={() => {
					notes.delete(confirmID)
				}}
			/>
		</main>
	);
}