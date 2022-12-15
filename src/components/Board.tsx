import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { ITodo, boardState } from "../atoms";
import { useSetRecoilState } from "recoil";
import React from "react";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  button {
    margin-left: 10px;
    font-size: 18px;
  }
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
    ? "#dfe6e9"
    : props.isDraggingFromThis
    ? "#b2bec3"
    : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 15px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: calc(100% - 30px);
    padding: 10px;
    margin: 0 15px;
  }
`;

interface IBoardProps {
  index: number;
  content: ITodo[];
  category: string;
}

interface IForm {
  toDo: string;
}

function Board({ index, content, category }: IBoardProps) {
  const setToDos = useSetRecoilState(boardState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const addToDo = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((currentBoards) => {
      const boards = [...currentBoards];
      const targetBoardContent = [...currentBoards[index].content];
      targetBoardContent.splice(0, 0, newToDo);
      boards[index] = {
        category: boards[index].category,
        content: targetBoardContent
      };
      return [...boards];
    });
    setValue("toDo", "");
  };
  const removeBoard = () => {
    setToDos((currentBoards) => {
      const boards = [...currentBoards];
      boards.splice(index, 1);
      return boards;
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <TitleContainer style={{display: "flex"}}>
        <h2>{category}</h2>
        <button onClick={removeBoard}>×</button>
      </TitleContainer>
      <Form onSubmit={handleSubmit(addToDo)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${category}`}
        />
      </Form>
      <Droppable droppableId={category}>
      {(magic, info) => (
        <>
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {content.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        </>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;