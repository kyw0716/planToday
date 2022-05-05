import React, {useState, useEffect} from 'react';
import Todo from "./Todo";
import styles from "../css/MainBox.module.css";

let j = 0;

function MainBox(){
    const [inputData, setInputData] = useState("");
    const [submitData, setSubmitData] = useState("");
    const [lsLength, setLsLength] = useState(0);
    const [todos, setTodos] = useState([]);
    const [show, setShow] = useState(0);
    let TODO = document.getElementsByClassName('todo');

    useEffect(()=>{
        setTodos([]);
        for(let i = 0; i < localStorage.length; i++){
            setTodos(current => [localStorage.getItem(localStorage.key(i)), ...current]);
        }
    },[lsLength]);

    useEffect(()=>{
        if(submitData !== ""){
            setLsLength(current => current + 1);
            localStorage.setItem(submitData,submitData);
            setTodos(current => [localStorage.getItem(submitData), ...current]);
        }
    },[submitData]);

    useEffect(()=>{
        j += 1;
        if(j > 2){
            if(show === -1){
                for(let i = 0; i < localStorage.length; i++){
                    if(TODO[i].firstChild.firstChild.checked === true){
                        TODO[i].style.display = "none";
                    }
                    else if(TODO[i].firstChild.firstChild.checked === false){
                        TODO[i].style.display = "";
                    }
                }
                document.getElementById("ing").style.color = "lightgray";
                document.getElementById("today").style.color = "black";
                document.getElementById("done").style.color = "black";
            }
            else if(show === 0){
                for(let i = 0; i < localStorage.length; i++){
                    if(TODO[i].firstChild.firstChild.checked === true){
                        TODO[i].style.display = "";
                    }
                    else if(TODO[i].firstChild.firstChild.checked === false){
                        TODO[i].style.display = "";
                    }
                }
                document.getElementById("ing").style.color = "black";
                document.getElementById("today").style.color = "lightgray";
                document.getElementById("done").style.color = "black";
            }
            else if(show === 1){
                for(let i = 0; i < localStorage.length; i++){
                    if(TODO[i].firstChild.firstChild.checked === true){
                        TODO[i].style.display = "";
                    }
                    else if(TODO[i].firstChild.firstChild.checked === false){
                        TODO[i].style.display = "none";
                    }
                }
                document.getElementById("ing").style.color = "black";
                document.getElementById("today").style.color = "black";
                document.getElementById("done").style.color = "lightgray";
            }
        }
    },[show]);

    const inputOnChange = (e) => {
        setInputData(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setSubmitData(inputData);
        setInputData("");
    }
    const onClick = (e) => {
        if(e.target.innerHTML === "진행중"){
            setShow(-1);
        }
        else if(e.target.innerHTML === "오늘"){
            setShow(0);
        }
        else if(e.target.innerHTML === "완료"){
            setShow(1);
        }
    }

    return(
        <div className={styles.mainBox}>
            <form onSubmit={onSubmit} className={styles.formTag}>
                <input
                    placeholder="Today..."
                    onChange={inputOnChange}
                    value={inputData}
                    className={styles.inputTag}
                />
            </form>
            <div className={styles.buttonBox}>
                <button onClick={onClick} className={styles.button} id="ing">진행중</button>
                <button onClick={onClick} className={styles.button} id="today">오늘</button>
                <button onClick={onClick} className={styles.button} id="done">완료</button>
            </div>
            {   
                r(todos, setLsLength)
            }
        </div>
    );
}

function r(todos, setLsLength){
    return(
        <div className={styles.todoBox}>
            {todos.map(
                todo => 
                (<div key={todo} className={styles.todo + ' ' + 'todo'}>
                    <Todo
                        todo={todo}
                        setLsLength={setLsLength}
                    />
                </div>)
            )}
        </div>
    );
}

export default MainBox;