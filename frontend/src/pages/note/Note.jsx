import styles from "../../styles/app/notes.module.css";
import mainStyles from "../../styles/main.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import useNotes from "../../stores/useNotes";
import NoteItem from "../../components/note/NoteItem";
import DialogConfirm from "../../components/dialog/DialogConfirm";
import AddCard from "../../components/card/AddCard";

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
			<section className={"app-container " + styles.section_one}>
				<div className={mainStyles.cols}>
					<AddCard onClick={() => navigate("/app/note/editor")} text="Create Note" />
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