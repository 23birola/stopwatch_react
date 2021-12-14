import { useState } from "react";
import "./App.css";

export default function App() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [interv, setInterv] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [status, setStatus] = useState(0);
 
  const start = () => {
    if (status === 1) {
      clearInterval(interv);
      setTime({ h: 0, m: 0, s: 0 });
      setStatus(0);
      setInterv(0);
      return;
    }
    run();
    setInterv(setInterval(run, 1000));
    setStatus(1);
  }
  
  const wait = () => {
    if (isClicked) {
       if (interv) {
         clearInterval(interv);
         setIsClicked(false);
         setStatus(0);
         return;
       }
    };
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
   
 }
  
  let updatedS = time.s;
  let updatedM = time.m;
  let updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH += updatedH + 1;
      updatedM = 0;
    }

    if (updatedS === 60) {
      updatedM = updatedM + 1;
      updatedS = 0;
    }

    updatedS = updatedS + 1;
    return setTime({h:updatedH, m:updatedM, s:updatedS});
  }

  const reset = () => {
    if (interv) {
      clearInterval(interv);
      setInterv(0);
      setTime({ h: 0, m: 0, s: 0 });
      updatedS = 0;
      updatedM = 0;
      updatedH = 0;
      setInterv(setInterval(run, 1000));
      setStatus(1);
      return;
    }
  }


  return (
    <div className="stopwatcher">
        <h2 className="title">STOPWATCH</h2>
        <div className="clockFace">
           <span className="time">{(time.h >= 10) ? time.h :  `0${time.h}`}</span>&nbsp;:&nbsp;
           <span className="time">{(time.m >= 10) ? time.m :  `0${time.m}`}</span>&nbsp;:&nbsp;
           <span className="time">{(time.s >= 10) ? time.s :  `0${time.s}`}</span>
        </div>
        <div className="clockBtns">
          <button type='button' className="clockBtn" onClick={start}>Start/Stop</button>
          <button type='button' className="clockBtn" onClick={wait}>Wait</button>
          <button type='button' className="clockBtn" onClick={() => reset()}>Reset</button>
        </div>
    </div>
  );
}
