import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 90vw;
  text-align: center;
  background-color: #EB332E80;
  border: dashed 5px #EB332E;
  border-radius: 5px;
  color: white;
  max-height: 300px;
    div {
      padding: 50px;
    }
`;

function RemoveCard() {
  return (
    <Wrapper>
      <Droppable droppableId="remove">
        {(magic) => (
          <div 
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            Please Drag Here To Remove To Do
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default RemoveCard;