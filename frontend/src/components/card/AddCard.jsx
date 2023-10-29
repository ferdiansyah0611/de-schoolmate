import { Typography } from "@material-tailwind/react";
import mainStyles from "../../styles/main.module.css";

export default function AddCard({onClick, text}) {
	return(
		<div
			onClick={onClick}
			className={mainStyles.add}
		>
			<div>
				<span className="material-symbols-outlined">add</span>
			</div>
			<Typography variant="h5">{text}</Typography>
		</div>
	)
}