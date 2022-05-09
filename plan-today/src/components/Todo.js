import { useState, useEffect } from 'react';
import styles from "../css/Todo.module.css";

function Todo({todo, handleDelete, id, todos, setTodos, checked, show}){
    const [mod, setMod] = useState(true);
    const [newInput, setNewInput] = useState("");
    const [newSubmit, setNewSubmit] = useState(todo);
    const [check, setCheck] = useState(checked);
    const [hide, setHide] = useState(false);

    useEffect(()=>{
        let copyArray = Array.from(todos);
        copyArray[id - 1] = {id : id, todo : newSubmit, checked : check};
        setTodos(copyArray);
        if(show === 0) setHide(false);
        else if(show === -1 & check === false) setHide(false);
        else if(show === 1 & check === true) setHide(false);
        else setHide(true);
    },[newSubmit, check, show]);

    const modify = () =>{
        setMod(current => !current);
    }

    const onChange = (e) =>{
        setNewInput(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setNewSubmit(newInput);
        modify();
    }

    const handleChecked = (e) => {
        if(e.target.checked === true){
            setCheck(true);
        }
        else{
            setCheck(false);
        }
    }

    return(
        <>
            {
                mod ?
                    <div className={hide ? styles.hidden : styles.todo}>
                        <input
                            type="checkbox"
                            onChange={handleChecked}
                            checked={checked}
                        />
                        <span className={styles.span}>
                            {newSubmit}
                        </span>
                        <div className={styles.buttonBox}>
                            <button onClick={modify} className={styles.button}>수정</button>
                            <button onClick={handleDelete} className={styles.button} id={id}>삭제</button>
                        </div>
                    </div>
                    :
                    <div className={styles.modify}>
                        <form onSubmit={onSubmit} className={styles.form}>
                            <input onChange={onChange} className={styles.input} value={newInput}/>
                        </form>
                        <button className={styles.button} onClick={modify}>x</button>
                    </div>
            }
        </>
    )
}

export default Todo;