import { useState, useEffect } from "react";
import styled from "styled-components";

const Style = {
  Todo: styled.div`
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgb(211, 185, 179);
    padding: 20px 0px;
  `,
  Span: styled.span`
    width: 80%;
    padding-left: 15px;
  `,
  SpanChecked: styled.span`
    width: 80%;
    text-decoration: line-through;
    padding-left: 15px;
  `,
  Modify: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
  `,
  Form: styled.form`
    width: 90%;
    height: 100%;
  `,
  Input: styled.input`
    width: 100%;
    height: 80%;
    padding: 0;
    margin: 0;
    border: none;
    border-bottom: 1px solid rgb(180, 156, 150);
    background-color: inherit;
    :focus {
      outline: none;
      border-bottom: 1px solid;
    }
  `,
  ButtonBox: styled.div`
    display: flex;
    height: 80%;
    width: 20%;
    gap: 10px;
    @media (max-width: 900px) {
      display: flex;
      height: 100%;
      width: 30%;
      justify-content: space-evenly;
      align-items: center;
    }
    @media (max-width: 750px) {
      display: flex;
      height: 80%;
      width: 20%;
    }
  `,
  Button: styled.div`
    background-color: inherit;
    border: none;
    color: rgb(146, 121, 115);
    cursor: pointer;
    @media (max-width: 900px) {
      background-color: inherit;
      border: none;
      color: rgb(146, 121, 115);
      font-size: 15px;
      width: 60px;
    }
    @media (max-width: 750px) {
      background-color: inherit;
      border: none;
      color: rgb(146, 121, 115);
      font-size: 10px;
      width: 40px;
    }
  `,
};

function Todo({ todo, handleDelete, id, todos, setTodos, checked, show }) {
  const [mod, setMod] = useState(true);
  const [newInput, setNewInput] = useState(todo);
  const [newSubmit, setNewSubmit] = useState(todo);
  const [check, setCheck] = useState(checked);
  const [hide, setHide] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (refresh) {
      let copyArray = Array.from(todos);
      copyArray[id - 1] = { id: id, todo: newSubmit, checked: check };
      setTodos(copyArray);
    }
  }, [newSubmit, check]);

  useEffect(() => {
    if (show === 0) setHide(false);
    else if ((show === -1) & (check === false)) setHide(false);
    else if ((show === 1) & (check === true)) setHide(false);
    else setHide(true);
  }, [check, show]);

  const modify = () => {
    setMod((current) => !current);
  };

  const onChange = (e) => {
    setNewInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setNewSubmit(newInput);
    setRefresh(true);
    modify();
  };

  const handleChecked = (e) => {
    if (e.target.checked === true) {
      setRefresh(true);
      setCheck(true);
    } else {
      setRefresh(true);
      setCheck(false);
    }
  };

  return (
    <>
      {mod ? (
        <>
          {hide || (
            <Style.Todo>
              <input
                type="checkbox"
                onChange={handleChecked}
                checked={checked}
                style={{ cursor: "pointer" }}
              />
              {checked ? (
                <Style.SpanChecked>{newSubmit}</Style.SpanChecked>
              ) : (
                <Style.Span>{newSubmit}</Style.Span>
              )}
              <Style.ButtonBox>
                <Style.Button onClick={modify}>수정</Style.Button>
                <Style.Button onClick={handleDelete} id={id}>
                  삭제
                </Style.Button>
              </Style.ButtonBox>
            </Style.Todo>
          )}
        </>
      ) : (
        <Style.Modify>
          <Style.Form onSubmit={onSubmit}>
            <Style.Input onChange={onChange} value={newInput} />
          </Style.Form>
          <Style.Button onClick={modify}>x</Style.Button>
        </Style.Modify>
      )}
    </>
  );
}

export default Todo;
