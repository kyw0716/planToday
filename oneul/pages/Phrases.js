import styles from "../styles/Phrases.module.css";
import {useState, useEffect} from "react";

function Phrases(){
    const [advice, setAdvice] = useState("");
    const [hidden, setHidden] = useState(false);

    useEffect(()=>{
        fetch("https://api.adviceslip.com/advice")
        .then(response => response.json())
        .then(data => setAdvice(data.slip.advice))
    },[])

    useEffect(()=>{
        if(hidden){
            document.getElementById("advice").style.display = "none";
        }
        else{
            document.getElementById("advice").style.display = "";
        }
    },[hidden])

    const onClick = () => {
        fetch("https://api.adviceslip.com/advice")
        .then(response => response.json())
        .then(data => setAdvice(data.slip.advice));
    }

    const hiddenToggle = () => {
        setHidden(current => !current);
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>오늘</h1>
            <span id="advice">
                {advice}
            </span>
            <div className={styles.buttonBox}>
                <button className={styles.button} onClick={onClick}>update</button>
                {
                    hidden ? 
                        <button className={styles.button} onClick={hiddenToggle}>show</button>
                    :
                        <button className={styles.button} onClick={hiddenToggle}>hide</button>
                }
            </div>
        </div>
    );
}

export default Phrases;