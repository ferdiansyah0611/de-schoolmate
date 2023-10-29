import styles from "../../styles/app/notes.module.css";
import mainStyles from "../../styles/main.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { DialogConfirm } from "../../components/dialog/DialogConfirm";
import useTodolist from "../../stores/useTodolist";
import AddCard from "../../components/card/AddCard";
import ManagerCard from "../../components/card/ManagerCard";

export default function Note() {
	const todolist = useTodolist();
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
					<AddCard onClick={() => navigate("/app")} text="Create Todo" />
					{todolist.project.map((item) => (
						<ManagerCard
							 key={item.id}
							 description={
							 	<Typography variant="paragraph" style={{wordBreak: 'break-word'}}>{item.title}</Typography>
							 }
							 onEdit={() => navigate('/app/todolist/project/' + item.id)}
							 onDelete={() => {
								setConfirmID(item.id)
								confirmHandler()
							}}
						/>
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
					todolist.deleteProject(confirmID)
				}}
			/>
		</main>
	);
}