import styles from './InputDefault.module.css'
import type { ChangeEvent } from "react";

type Props = {
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type:string
}

function InputDefault({label,placeholder,onChange,type}:Props) {
  return (
    <div>
        <span className={styles.button}>{label}</span>
        <input 
        type={type} 
        placeholder={placeholder} 
        onChange={onChange}
        
        />
    </div>
  )
}

export default InputDefault