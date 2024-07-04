import { useEffect, useState } from "react";
import styles from "./index.module.scss";
interface CountDownProps {
  time: number;
  onEnd: () => void;
}
export default function CountDown(props: CountDownProps) {
  const { time, onEnd } = props;
  const [count, setCount] = useState(time || 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((preCount) => {
        if (preCount <= 0) {
          clearInterval(timer);
          onEnd();
          return 0;
        }
        return preCount - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onEnd, time]);
  return <div className={styles.countDown}>{count}</div>;
}

