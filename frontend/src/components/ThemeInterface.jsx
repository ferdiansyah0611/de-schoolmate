import { useNavigate } from "react-router-dom";
import { THEME, changeTheme, readableTheme, useEffectTheme } from "../data/theme";
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";

export default function ThemeInterface() {
	const navigate = useNavigate();
	useEffect(useEffectTheme, []);
	return(
		<div className="fixed right-10 top-10">
			<div className="flex gap-2">
				{THEME.map((color) => (
					<Button style={{width: 10}} title={readableTheme(color)} onClick={() => changeTheme(color)} className={color} key={color}></Button>
				))}
				<Button size="sm" color="indigo" className="flex items-center gap-3" onClick={() => navigate("/app")}>
					<span className="material-symbols-outlined">arrow_back_ios</span>
					Back to App
				</Button>
			</div>
		</div>
	)
}