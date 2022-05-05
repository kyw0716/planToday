function Button({name, tag, todo, setLsLength}){
    const OnClick = () => {
        if(name === "삭제"){
            localStorage.removeItem(todo);
            setLsLength(current => current - 1);
        }
    }
    return(
        <>
        {
            tag == "input" ? 
                <input 
                    type={"checkbox"}
                />
                :
                <button onClick={OnClick}>
                    {name}
                </button> 
        }
        </>
    );
}

export default Button;