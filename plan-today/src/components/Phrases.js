import styles from "../css/Phrases.module.css";
import {useState, useEffect} from "react";

function Phrases(){
    const [advice, setAdvice] = useState("");
    const [hidden, setHidden] = useState(false);
    const [blink, setBlink] = useState(true);

    useEffect(()=>{
        fetch("https://api.adviceslip.com/advice")
        .then(response => response.json())
        .then(data => setAdvice(data.slip.advice))

        setInterval(()=>{
            setBlink(current => !current);
        },1000)
    },[])

    useEffect(()=>{
        if(hidden){
            document.getElementById("advice").style.display = "none";
        }
        else{
            document.getElementById("advice").style.display = "";
        }
    },[hidden])
    useEffect(()=>{
        if(blink){
            document.getElementById("title").style.filter = "brightness(50%)"
        }
        else{
            document.getElementById("title").style.filter = "brightness(1)"
        }
    },[blink])

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
            <h1 id="title">오늘</h1>
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