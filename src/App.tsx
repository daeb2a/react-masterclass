import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "./atoms";
import Board from "./components/Board";
import RemoveCard from "./components/RemoveCard";
import CreateBoard from "./components/CreateBoard";

const Wrapper = styled.div`
  display: flex;
  width: 90vw;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [boards, setBoards] = useRecoilState(boardState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setBoards((currentBoards) => {
        console.log(info);
        const boards = [...currentBoards];
        const targetIndex = boards.findIndex(
          ({ category }) => category === source.droppableId
        );
        const targetBoardContent = [...boards[targetIndex].content];
        const targetToDo = targetBoardContent[source.index];
        targetBoardContent.splice(source.index, 1);
        targetBoardContent.splice(destination?.index, 0, targetToDo);
        boards[targetIndex] = {
          category: source.droppableId,
          content: [...targetBoardContent],
        };
        return [...boards];
      });
    }
    if (destination?.droppableId === "remove") {
      // remove to do.
      setBoards((currentBoards) => {
        const boards = [...currentBoards];
        const targetIndex = boards.findIndex(
          ({ category }) => category === source.droppableId
        );
        const targetBoardContent = [...boards[targetIndex].content];
        targetBoardContent.splice(source.index, 1);
        boards[targetIndex] = {
          category: source.droppableId,
          content: [...targetBoardContent],
        };
        return [...boards];
      });
    } else if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setBoards((currentBoards) => {
        const boards = [...currentBoards];
        const sourceIndex = boards.findIndex(
          ({ category }) => category === source.droppableId
        );
        const destinationIndex = boards.findIndex(
          ({ category }) => category === destination.droppableId
        );
        const sourceBoardContent = [...boards[sourceIndex].content];
        const destinationBoardContent = [...boards[destinationIndex].content];
        const targetToDo = sourceBoardContent[source.index];
        sourceBoardContent.splice(source.index, 1);
        destinationBoardContent.splice(destination?.index, 0, targetToDo);
        boards[sourceIndex] = {
          category: source.droppableId,
          content: [...sourceBoardContent],
        };
        boards[destinationIndex] = {
          category: destination.droppableId,
          content: [...destinationBoardContent],
        };
        return [...boards];
      });
    }
  };
  return (
    <>
      <CreateBoard />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {boards.map((board, index) => (
              <Board index={index} category={board.category} key={board.category} content={board.content} />
            ))}
          </Boards>
          <Boards>
            <RemoveCard />
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}
export default App;