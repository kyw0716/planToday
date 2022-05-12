import { useState, useEffect } from 'react';
import styles from "../styles/Todo.module.css";

function Todo({todo, handleDelete, id, todos, setTodos, checked, show}){
    const [mod, setMod] = useState(true);
    const [newInput, setNewInput] = useState(todo);
    const [newSubmit, setNewSubmit] = useState(todo);
    const [check, setCheck] = useState(checked);
    const [hide, setHide] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{
        if(refresh){
            let copyArray = Array.from(todos);
            copyArray[id - 1] = {id : id, todo : newSubmit, checked : check};
            setTodos(copyArray);
        }
    },[newSubmit, check]);

    useEffect(()=>{
        if(show === 0) setHide(false);
        else if(show === -1 & check === false) setHide(false);
        else if(show === 1 & check === true) setHide(false);
        else setHide(true);
    },[check, show])

    const modify = () =>{
        setMod(current => !current);
    }

    const onChange = (e) =>{
        setNewInput(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setNewSubmit(newInput);
        setRefresh(true);
        modify();
    }

    const handleChecked = (e) => {
        if(e.target.checked === true){
            setRefresh(true);
            setCheck(true);
        }
        else{
            setRefresh(true);
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
                        <span className={check ? styles.spanChecked : styles.span}>
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