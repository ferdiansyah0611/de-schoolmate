import {
	Button,
	Dialog,
	Card,
	CardBody,
	CardFooter,
	Typography,
	Textarea,
} from "@material-tailwind/react";

export default function TodolistDialogAdd({ open, handler, input, inputHandler, onSubmit, onClose }) {
	return (
		<>
			<Dialog size="md" open={open} handler={onClose} className="bg-transparent shadow-none">
				<Card className="mx-auto w-full max-w-[24rem]">
					<CardBody className="flex flex-col gap-4">
						<Typography variant="h4" color="blue-gray">
							Todo List Input
						</Typography>
						<Textarea value={input} onChange={(e) => inputHandler(e.target.value)} label="Message" />
					</CardBody>
					<CardFooter className="pt-0">
						<Button
							variant="gradient"
							onClick={() => {
								handler();
								onSubmit();
							}}
							fullWidth
						>
							Submit
						</Button>
					</CardFooter>
				</Card>
			</Dialog>
		</>
	);
}