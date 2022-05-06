import styles from "../css/Todo.module.css"

function Button({name, tag, todo, setLsLength, setChecked}){
    const OnClick = () => {
        if(name === "삭제"){
            localStorage.removeItem(todo);
            setLsLength(current => current - 1);
        }
    }
    const onChange = (e) =>{
        if(e.checked === true){
            setChecked(true);
            console.log("체크박스 눌림");
        }
        else{
            setChecked(false);
            console.log("체크박스 눌림");
        }
    }
    return(
        <>
        {
            tag == "input" ? 
                <input 
                    type={"checkbox"}
                    onChange={onChange}
                />
                :
                <button onClick={OnClick} className={styles.button}>
                    {name}
                </button> 
        }
        </>
    );
}

export default Button;