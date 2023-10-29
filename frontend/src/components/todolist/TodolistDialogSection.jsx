import {
	Button,
	Dialog,
	Card,
	CardBody,
	CardFooter,
	Typography,
    Input,
} from "@material-tailwind/react";

export default function TodolistDialogSection({ open, handler, input, inputHandler, onSubmit }) {
	return (
		<>
			<Dialog size="md" open={open} handler={handler} className="bg-transparent shadow-none">
				<Card className="mx-auto w-full max-w-[24rem]">
					<CardBody className="flex flex-col gap-4">
						<Typography variant="h4" color="blue-gray">
							Title of Section
						</Typography>
						<Input value={input} onChange={(e) => inputHandler(e.target.value)} label="Title" />
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