import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 25%;
    color: rgb(180, 156, 150);
    width: 40%;
    @media (max-width: 900px) {
      width: 80%;
      font-size: 25px;
    }
    @media (max-width: 750px) {
      width: 80%;
      font-size: 13px;
    }
  `,
  ButtonContainer: styled.div`
    margin-top: 15px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  `,
  Button: styled.div`
    background-color: inherit;
    color: rgb(180, 156, 150);
    border: none;
    margin-right: 10px;
    cursor: pointer;
  `,
  Title: styled.h1`
    cursor: pointer;
    animation: blinking 2s infinite;
    @keyframes blinking {
      0% {
        filter: brightness(1);
      }
      100% {
        filter: brightness(0.3);
      }
    }
  `,
};

function Phrases() {
  const [advice, setAdvice] = useState("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => setAdvice(data.slip.advice));
  }, []);

  useEffect(() => {
    if (hidden) {
      document.getElementById("advice").style.display = "none";
    } else {
      document.getElementById("advice").style.display = "";
    }
  }, [hidden]);

  const onClick = () => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => setAdvice(data.slip.advice));
  };

  const hiddenToggle = () => {
    setHidden((current) => !current);
  };

  return (
    <Style.Container>
      <Link href={"/woowacourse"}>
        <Style.Title>오늘</Style.Title>
      </Link>
      <span id="advice">{advice}</span>
      <Style.ButtonContainer>
        <Style.Button onClick={onClick}>update</Style.Button>
        {hidden ? (
          <Style.Button onClick={hiddenToggle}>show</Style.Button>
        ) : (
          <Style.Button onClick={hiddenToggle}>hide</Style.Button>
        )}
      </Style.ButtonContainer>
    </Style.Container>
  );
}

export default Phrases;
