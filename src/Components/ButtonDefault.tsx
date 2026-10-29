import styles from './ButtonDefauly.module.css';
import type { MouseEvent } from "react"

type Props ={
    title:string;
    color:string;
    backgroundColor:string;
    onPress:(e: MouseEvent<HTMLButtonElement>)=>void;
}

function ButtonDefault({title,color,backgroundColor,onPress}:Props) {
  return (
    <div>
        <button
            className={styles.button}
            style={{color:color,backgroundColor:backgroundColor}}
            onClick={onPress}
        >
        <p>{title}</p>
        </button>
    </div>
  )
}

export default ButtonDefault