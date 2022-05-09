import React, {useState, useEffect} from 'react';
import Todo from "./Todo";
import styles from "../css/MainBox.module.css";

function MainBox(){
    const [inputData, setInputData] = useState("");
    const [submitData, setSubmitData] = useState("");
    const [show, setShow] = useState(0);
    const [todos, setTodos] = useState(()=>{
        const savedTodos = localStorage.getItem("todos");

        if(savedTodos){
            return JSON.parse(savedTodos);
        }
        else{
            return [];
        }
    });
    
    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todos));
    },[todos]);

    useEffect(()=>{
        if(submitData !== ""){
            setTodos([
                ...todos, {
                    id : todos.length + 1, todo : submitData, checked : false
                }
            ]);
        }
        setSubmitData("");
    },[submitData]);

    const inputOnChange = (e) => {
        setInputData(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setSubmitData(inputData);
        setInputData("");
    }
    const onClick = (e) => {
        if(e.target.name === "doing"){
            setShow(-1);
        }
        else if(e.target.name === "all"){
            setShow(0);
        }
        else if(e.target.name === "done"){
            setShow(1);
        }
    }

    const handleDelete = (e) => {
        setTodos(todos.filter(current => `${current.id}` !== `${e.target.id}`));
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
                <button onClick={onClick} className={show === -1 ? styles.buttonClicked : styles.button} name={"doing"}>진행중</button>
                <button onClick={onClick} className={show === 0 ? styles.buttonClicked : styles.button} name={"all"}>오늘</button>
                <button onClick={onClick} className={show === 1 ? styles.buttonClicked : styles.button} name={"done"}>완료</button>
            </div>
            <div className={styles.todoBox}>
                {
                    ShowTodo(todos, handleDelete, setTodos)
                }
            </div>
        </div>
    );
}

function ShowTodo(todos, handleDelete, setTodos){
    return(<>
            {todos.map(
            (current) =>{
                return <Todo todo={current.todo} handleDelete={handleDelete} key={current.id} id={current.id} todos={todos} setTodos={setTodos}/>
            })}
        </>
    );
}

export default MainBox;