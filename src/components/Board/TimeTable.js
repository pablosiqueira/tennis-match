import styles from './Board.module.css'
import { useState, useEffect } from 'react';

const TimeTable = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [matchTime, setMatchTime] = useState('0.0.0');
  const [timeNow, setTimeNow] = useState(0);

  const getTime = () => {
        let time = seconds
        time = time+1
        setSeconds(time)
        setMatchTime(Math.floor(time/3600) + '.' + Math.floor(time/60) + '.' + Math.floor(time%60));
      const date = new Date()
      setTimeNow(date.getHours() + ':' + date.getMinutes());
  };

  useEffect(() => {
    if(!props.stopTime){
      const interval = setInterval(() => getTime(), 1000);
      return () => clearInterval(interval);
    }
  });

    return(
        <>
        <div className={styles.board}>
            <h3 className="p-2 my-2 ms-3">{timeNow}</h3>
            <h1>{props.title}</h1>
            <h3 className="p-2 my-2 me-3" ref={props.elapsedRef}>{matchTime}</h3>
        </div>
        <div className={styles.line + ' mb-2'}></div>
        </>
    )
}

export default TimeTable