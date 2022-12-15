import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface ITodo {
  id: number;
  text: string;
}

interface IBoardState {
  category: string;
  content: ITodo[];
}

export const boardState = atom<IBoardState[]>({
    key: "board",
    default: [{
      category: "To Do",
      content: [],
    },{
      category: "Doing",
      content: [],
    },{
      category: "Done",
      content: [],
    }],
    effects_UNSTABLE: [persistAtom],
});