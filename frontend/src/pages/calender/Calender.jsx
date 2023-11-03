import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import { Button, Card, List, ListItem, Tooltip, Typography } from '@material-tailwind/react';

export default function Calender() {
	const navigate = useNavigate();
	const [value, onChange] = useState(new Date());

	function onClickDay(val) {
		console.log(val)
	}
	return (
		<main>
			<section className="min-h-screen flex items-center flex-col">
				<div className='max-w-xl w-4/5'>
					<div className='flex my-4 gap-2'>
						<Typography variant='h2' className='flex-1'>Calendar</Typography>
						<Tooltip content="Add Event">
							<Button size="sm" className="flex items-center">
								<span className="material-symbols-outlined">add</span>
							</Button>
						</Tooltip>
						<Tooltip content="Back to App">
							<Button size="sm" color="blue" className="flex items-center" onClick={() => navigate("/app")}>
								<span className="material-symbols-outlined pl-2">arrow_back_ios</span>
							</Button>
						</Tooltip>
					</div>
					<Calendar onChange={onChange} value={value} onClickDay={onClickDay} />
					<Card className='mt-4'>
						<div className='p-4 pb-0'>
							<Typography variant='h3'>Today</Typography>
						</div>
						<List>
						{Array.from({length: 5}).map((_, key) => (
							<ListItem key={key}>
								<p>Item {key}</p>
							</ListItem>
						))}
						</List>
					</Card>
				</div>
			</section>
		</main>
	)
}