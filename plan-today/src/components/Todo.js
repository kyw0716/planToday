import {useState} from 'react';
import styles from "../css/Todo.module.css";

function Todo({todo, handleDelete}){
    const [mod, setMod] = useState(true);
    const [newInput, setNewInput] = useState("");
    const [newSubmit, setNewSubmit] = useState(todo);
    const [checked, setChecked] = useState();

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
            setChecked(true);
        }
        else{
            setChecked(false);
        }
    }

    return(
        <>
            {
                mod ?
                    <div className={styles.todo}>
                        <input
                            type="checkbox"
                            onChange={handleChecked}
                        />
                        <span className={styles.span}>
                            {newSubmit}
                        </span>
                        <div className={styles.buttonBox}>
                            <button onClick={modify} className={styles.button}>수정</button>
                            <button onClick={handleDelete} className={styles.button} name={newSubmit}>삭제</button>
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