import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Style = {
  Container: styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  CountContainer: styled.div`
    width: 60vw;
    height: 100px;
    border: 1px solid;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(223, 205, 201);
    border-bottom: none;
  `,
  TextInput: styled.textarea`
    width: 60vw;
    height: 60vh;
    resize: none;
    background-color: #efe4e0;
    border: 1px solid rgb(180, 156, 150);
    outline: none;
    font-size: 20px;
    padding: 10px;
  `,
};

export default function WooWaCourse() {
  const [input, setInput] = useState("");
  const [lengthWithWhiteSpace, setLengthWithWhiteSpace] = useState(
    input.length
  );
  const [lengthWithoutWhiteSpace, setLengthWithoutWhiteSpace] = useState(
    input.length
  );
  useEffect(() => {
    setLengthWithWhiteSpace(input.length);
    setLengthWithoutWhiteSpace(input.replace(/\s/g, "").length);
  }, [input]);
  return (
    <Style.Container>
      <Link href={"/"}>
        <h1 style={{ cursor: "pointer" }}>우아한 테크코스 합격 기원!!!</h1>
      </Link>
      <Style.CountContainer>
        <div style={{ fontSize: "25px" }}>
          공백 포함: 총&nbsp;
          <span style={{ color: "blue", fontWeight: "bold" }}>
            {lengthWithWhiteSpace}
          </span>
          &nbsp;자
        </div>
        <div style={{ fontSize: "25px" }}>
          공백 제외: 총&nbsp;
          <span style={{ color: "blue", fontWeight: "bold" }}>
            {lengthWithoutWhiteSpace}
          </span>
          &nbsp;자
        </div>
      </Style.CountContainer>
      <Style.TextInput
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </Style.Container>
  );
}
