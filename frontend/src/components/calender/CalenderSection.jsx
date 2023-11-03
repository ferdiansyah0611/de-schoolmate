import { Card, IconButton, Typography } from "@material-tailwind/react";

export default function CalenderSection({ title, events, onEdit, onDelete }) {
	return (
		<Card className="my-4 rounded-none">
			<div className="p-4">
				<Typography variant="h3">{title}</Typography>
			</div>
			<div className="flex flex-col gap-2">
				{!events.length ?
					<div className="p-4 text-center border-t border-gray-100">
						<p className="text-gray-400 font-bold text-md">No Events Found</p>
					</div>
					: false
				}
				{events.map((event) => (
					<div className="p-4 flex gap-2 justify-center border-t border-gray-100" key={event.id}>
						<div className="flex-1">
							<p className="font-bold">{event.title}</p>
							<p>{event.description}</p>
							<p className="text-sm">{new Date(event.date).toLocaleString()}</p>
						</div>
						<div className="flex gap-2">
							<IconButton color="blue" onClick={() => onEdit(event)}>
								<span className="material-symbols-outlined">edit</span>
							</IconButton>
							<IconButton color="red" onClick={() => onDelete(event.id)}>
								<span className="material-symbols-outlined">delete</span>
							</IconButton>
						</div>
					</div>
				))}
			</div>
		</Card>
	)
}