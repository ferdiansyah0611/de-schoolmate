import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ThemeInterface from "../../components/ThemeInterface";

export default function Timer() {
  const [time, setTime] = useState(25 * 60); // Waktu awal 25 menit
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('Work');

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
      if (sessionType === 'Work') {
        setSessionType('Break'); // Jika sedang bekerja, ganti ke jeda
        setTime(5 * 60); // Waktu jeda 5 menit
      } else {
        setSessionType('Work'); // Jika sedang jeda, ganti ke bekerja
        setTime(25 * 60); // Waktu bekerja 25 menit
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time, sessionType]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
    setSessionType('Work');
  };

  return (
    <main>
    	<section className="screen-center">
    		<Typography color="white" variant="h5">{sessionType}</Typography>
    		<Typography color="white" variant="h1">{formatTime(time)}</Typography>
    		<div className="mt-6 flex justify-center gap-4">
          <Button color="blue" onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</Button>
          <Button color="red" onClick={resetTimer}>Reset</Button>
    		</div>
    	</section>
    	<ThemeInterface/>
    </main>
  );
}