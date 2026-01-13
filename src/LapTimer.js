import { useState, useEffect } from "react";
const LapTimer = () => {
    const [isOn, setIsOn] = useState(0);
    const [sec, setSec] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setSec((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning((prev) => !prev);
        setIsOn(prev => !prev)
    }

    const addLapReset = () => {
        if (isRunning) {
            setLaps(prev => [sec, ...prev])
            setSec(0);
        } else {
            setSec(0);
            setLaps([]);
        }
    }


    const formatTime = (sec) => {
        const hours = String(Math.floor(sec / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
        const seconds = String(sec % 60).padStart(2, "0");
        return `${hours}:${minutes}.${seconds}`;
    };

    return (
        <div className="main-container">
            <h2>{formatTime(sec)}</h2>
            <div className="btn-container">
                <button
                    className="btn lap"
                    onClick={addLapReset}
                    disabled={!isRunning && sec === 0}
                >
                    {isRunning ? "Lap" : "Reset"}
                </button>
                <button className="btn start" onClick={() => handleStartStop()}>{isOn ? 'Stop' : 'Start'}</button>
            </div>
            <ul>
                {laps.map((ele, index) => (
                    <li className="listElement" style={{
                        color:
                            index === 0
                                ? "white"
                                : index === laps.length - 1
                                    ? "red"
                                    : "green"
                    }} key={index}>
                        <p>Lap {laps.length - index}</p> <span>{formatTime(ele)}</span> </li>
                ))}
            </ul>
        </div>
    )
}

export default LapTimer;
