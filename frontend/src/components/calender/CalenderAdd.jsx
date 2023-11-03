import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Textarea } from "@material-tailwind/react";

export default function CalenderAdd({ open, handler, onSubmit, input, inputHandler }) {
	return (
		<Dialog {...{ open, handler }}>
			<DialogHeader>Add Events</DialogHeader>
			<DialogBody>
				<div className="flex flex-col gap-2">
					<Input value={input.title} onChange={inputHandler} name="title" label="Title" />
					<Textarea value={input.description} onChange={inputHandler} name="description" label="Description" />
					<Input value={input.date} onChange={inputHandler} name="date" label="Date" type="datetime-local" />
				</div>
			</DialogBody>
			<DialogFooter className="gap-2">
				<Button
					onClick={() => {
						handler();
						onSubmit(input);
					}}
				>
					Submit
				</Button>
				<Button onClick={() => handler(true)} color="red">
					Cancel
				</Button>
			</DialogFooter>
		</Dialog>
	);
}