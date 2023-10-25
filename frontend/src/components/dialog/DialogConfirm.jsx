import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export function DialogConfirm({ open, handler, title, description, onConfirm }) {
 
  return (
    <>
      <Dialog
        open={open}
        size="xs"
        handler={handler}
      >
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>{description}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handler}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handler()
              onConfirm()
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}