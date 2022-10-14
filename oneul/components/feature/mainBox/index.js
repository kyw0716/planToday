import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Todo from "./Todo";

const Style = {
  Container: styled.div`
    width: 40%;
    height: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid rgb(223, 205, 201);
    border-radius: 30px;
    background-color: rgb(223, 205, 201);
    color: rgb(180, 156, 150);
    @media (max-width: 900px) {
      width: 95%;
      height: 75%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid rgb(223, 205, 201);
      border-radius: 30px;
      background-color: rgb(223, 205, 201);
      color: rgb(180, 156, 150);
    }
  `,
  Form: styled.form`
    width: 100%;
    height: 50px;
    margin: 15px 0px;
    display: flex;
    justify-content: center;
  `,
  Input: styled.input`
    width: 95%;
    height: 100%;
    padding: 0;
    border: none;
    border-bottom: 1px solid rgb(211, 185, 179);
    background-color: inherit;
    :focus {
      outline: none;
    }
  `,
  ButtonContainer: styled.div`
    width: 95%;
    display: flex;
    justify-content: space-around;
    height: 50px;
    margin-bottom: 10px;
  `,
  Button: styled.div`
    width: 30%;
    border: none;
    background-color: inherit;
    font-size: 18px;
    color: rgb(180, 156, 150);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Todo: styled.div`
    width: 95%;
    height: 60px;
    display: flex;
  `,
  TodoCotainer: styled.div`
    width: 100%;
    height: 71%;
    overflow: scroll;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  `,
};

function MainBox() {
  const [inputData, setInputData] = useState("");
  const [submitData, setSubmitData] = useState("");
  const [show, setShow] = useState(0);
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (submitData !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          todo: submitData,
          checked: false,
        },
      ]);
    }
    setSubmitData("");
  }, [submitData]);

  const inputOnChange = (e) => {
    setInputData(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitData(inputData);
    setInputData("");
  };
  const onClick = (e) => {
    switch (e.target.innerHTML) {
      case "진행중":
        setShow(-1);
        break;
      case "오늘":
        setShow(0);
        break;
      case "완료":
        setShow(1);
        break;
    }
  };

  const handleDelete = (e) => {
    setTodos(todos.filter((todo) => `${todo.id}` !== `${e.target.id}`));
  };

  return (
    <Style.Container>
      <Style.Form onSubmit={onSubmit}>
        <Style.Input
          placeholder="Today..."
          onChange={inputOnChange}
          value={inputData}
        />
      </Style.Form>
      <Style.ButtonContainer>
        <Style.Button
          onClick={onClick}
          style={show === -1 ? { color: "rgb(146, 121, 115)" } : {}}
        >
          진행중
        </Style.Button>
        <Style.Button
          onClick={onClick}
          style={show === 0 ? { color: "rgb(146, 121, 115)" } : {}}
        >
          오늘
        </Style.Button>
        <Style.Button
          onClick={onClick}
          style={show === 1 ? { color: "rgb(146, 121, 115)" } : {}}
        >
          완료
        </Style.Button>
      </Style.ButtonContainer>
      <Style.TodoCotainer>
        {todos.map((current) => {
          return (
            <Todo
              todo={current.todo}
              handleDelete={handleDelete}
              key={current.id}
              id={current.id}
              todos={todos}
              setTodos={setTodos}
              checked={current.checked}
              show={show}
            />
          );
        })}
      </Style.TodoCotainer>
    </Style.Container>
  );
}

export default MainBox;
