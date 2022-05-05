import Button from "./Button";
import React, {useState, useEffect} from 'react';
import Todo from "./Todo";

function r(todos, setLsLength){
    return(
        <div>
            {todos.map(
                todo => 
                (<div key={todo}>
                    <Todo
                        todo={todo}
                        setLsLength={setLsLength}
                    />
                </div>)
            )}
        </div>
    );
}

function MainBox(){
    const [inputData, setInputData] = useState("");
    const [submitData, setSubmitData] = useState("");
    const [lsLength, setLsLength] = useState(0);
    const [todos, setTodos] = useState([]);
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

    const inputOnChange = (e) => {
        setInputData(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setSubmitData(inputData);
        setInputData("");
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input
                    placeholder="Today..."
                    onChange={inputOnChange}
                    value={inputData}
                />
            </form>
            <div>
                <Button name={"진행중"} tag={"button"}/>
                <Button name={"오늘"} tag={"button"}/>
                <Button name={"완료"} tag={"button"}/>
            </div>
            {   
                r(todos, setLsLength)
            }
        </div>
    );
}

export default MainBox;