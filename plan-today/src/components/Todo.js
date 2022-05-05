import Button from "./Button";
import {useState, useEffect} from 'react';

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
        <div>
            {
                mod ?
                    <>
                        <Button tag={"input"}/>
                        {newSubmit}
                        <button onClick={modify}>
                            수정
                        </button>
                        <Button name={"삭제"} todo={newSubmit} setLsLength={setLsLength}/>
                    </>
                    :
                    <>
                        <form onSubmit={onSubmit}>
                            <input onChange={onChange}/>
                        </form>
                        <button onClick={modify}>
                            x
                        </button>
                    </>
            }
        </div>
    )
}

export default Todo;