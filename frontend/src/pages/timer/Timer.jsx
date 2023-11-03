import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ThemeInterface from "../../components/ThemeInterface";

export default function Timer() {
  const [dialogSetting, setDialogSetting] = useState({
    open: false,
    minutes: 25 * 60,
    breakMinutes: 5 * 60,
  });

  const [time, setTime] = useState(25 * 60); // start time 25m
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState("Work");

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      if (sessionType === "Work") {
        setSessionType("Break"); // if on work, switch to break
        setTime(dialogSetting.breakMinutes); // break time ??m
      } else {
        setSessionType("Work"); // if on break, switch to work
        setTime(dialogSetting.minutes); // work time ??m
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time, sessionType, dialogSetting.breakMinutes, dialogSetting.minutes]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(dialogSetting.minutes);
    setSessionType("Work");
  };

  function handlerDialogSetting(e) {
    const { name, value } = e.target;
    setDialogSetting((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function toggleDialogSetting() {
    setDialogSetting((prev) => ({
      ...prev,
      open: !prev.open,
    }));
  }
  function saveSetting() {
    setTime(dialogSetting.minutes);
    toggleDialogSetting();
    resetTimer();
  }

  return (
    <main>
      <section className="screen-center">
        <Typography color="white" variant="h5">
          {sessionType}
        </Typography>
        <Typography color="white" variant="h1">
          {formatTime(time)}
        </Typography>
        <div className="mt-6 flex justify-center gap-4">
          <Button color="blue" onClick={toggleTimer}>
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button color="red" onClick={resetTimer}>
            Reset
          </Button>
        </div>
      </section>
      <ThemeInterface
        lastChildren={
          <IconButton color="indigo" onClick={toggleDialogSetting}>
            <span class="material-symbols-outlined">settings</span>
          </IconButton>
        }
      />
      <Dialog open={dialogSetting.open} handler={toggleDialogSetting} size="xs">
        <DialogHeader className="border-b border-gray-300">Configuration</DialogHeader>
        <DialogBody>
          <div className="flex flex-col items-center gap-2">
            <Input
              value={dialogSetting.minutes}
              onChange={handlerDialogSetting}
              className="flex-1"
              type="number"
              max={60 * 25}
              label="Minutes (Work)"
              name="minutes"
            />
            <Input
              value={dialogSetting.breakMinutes}
              onChange={handlerDialogSetting}
              className="flex-1"
              type="number"
              max={60 * 25}
              label="Minutes (Break)"
              name="breakMinutes"
            />
          </div>
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button onClick={saveSetting} color="indigo">
            Submit
          </Button>
          <Button onClick={toggleDialogSetting} color="red">
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </main>
  );
}