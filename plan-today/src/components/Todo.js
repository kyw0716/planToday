import Button from "./Button";
import {useState, useEffect} from 'react';
import styles from "../css/Todo.module.css";

function Todo({todo, setLsLength}){
    const [mod, setMod] = useState(true);
    const [newInput, setNewInput] = useState("");
    const [newSubmit, setNewSubmit] = useState(todo);

    useEffect(()=>{
        if(newSubmit !== ""){
            localStorage.setItem(newSubmit, newSubmit);
        }
    },[newSubmit])
    const modify = () =>{
        setMod(current => !current);
    }
    const onChange = (e) =>{
        setNewInput(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setNewSubmit(newInput);
        localStorage.removeItem(newSubmit);
        modify();
    }
    
    return(
        <>
            {
                mod ?
                    <div className={styles.todo}>
                        <Button tag={"input"}/>
                        <span className={styles.span}>
                            {newSubmit}
                        </span>
                        <div className={styles.buttonBox}>
                            <button onClick={modify} className={styles.button}>
                                수정
                            </button>
                            <Button name={"삭제"} todo={newSubmit} setLsLength={setLsLength}/>
                        </div>
                    </div>
                    :
                    <div className={styles.modify}>
                        <form onSubmit={onSubmit} className={styles.form}>
                            <input onChange={onChange} className={styles.input} value={newSubmit}/>
                        </form>
                        <button className={styles.button} onClick={modify}>
                            x
                        </button>
                    </div>
            }
        </>
    )
}

export default Todo;