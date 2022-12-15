import { useRecoilState } from "recoil";
import { boardState } from "../atoms";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const FormCategory = styled.form`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  input {
    font-size: 22px;
    padding: 15px;
    border: solid 1px ${(props) => props.theme.bgColor};
    outline: none;
    border-radius: 5px;
  }
  button {
    font-size: 22px;
    padding: 20px;
    border: solid 1px ${(props) => props.theme.bgColor};
    border-radius: 5px;
    &:hover {
      opacity: 0.9;
    }
  }
`;

interface ICategoryForm {
  newCategory: string;
}

function CreateBoard() {
  const [boards, setBoards] = useRecoilState(boardState);
  const { register, setValue, handleSubmit } = useForm<ICategoryForm>();
  const onValid = ({ newCategory }: ICategoryForm) => {
    if(newCategory === "") return;
    if(boards.find(({ category }) => category === newCategory)) return;
    setBoards((currentBoard) => {
      const newBoard = {
        category: newCategory,
        content: [],
      };
      return ([
        ...currentBoard, newBoard,
      ])
    })
    setValue("newCategory", "");
  }
  return (
    <FormCategory onSubmit={handleSubmit(onValid)}>
      <input {...register("newCategory", { required: false })}
        type="text"
        placeholder="Add New Category"
      />
      <button type="submit">+</button>
    </FormCategory>
  );
}

export default CreateBoard;