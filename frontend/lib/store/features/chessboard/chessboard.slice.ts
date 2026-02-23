import { GAME_STATUS } from "@/constants/game";
import { STARTING_FEN } from "@/constants/initial-fen.constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GameStatus = "waiting" | "started" | "checkmate" | "draw";

interface InitialChessBoardState {
  fen: string;
  history: string[];
  gameId: string | null;
  players: {
    white: string | null;
    black: string | null;
  };
  turn: string;
  status: GameStatus;
  isMoveLoading: boolean;
  lastMove: string | null;
  capturedPieces: {
    w: string[];
    b: string[];
  };
}

const initialState: InitialChessBoardState = {
  fen: STARTING_FEN,
  history: [],

  //game metadata
  gameId: null,
  players: {
    white: null,
    black: null,
  },
  turn: "w", // w= White
  status: GAME_STATUS.WAITING,

  //Performance or UI
  isMoveLoading: false,
  lastMove: null,
  capturedPieces: {
    w: [],
    b: [],
  },
};

const chessboardSlice = createSlice({
  name: "chessboard",
  initialState,
  reducers: {
    //move logic 

  },
});

export const {} = chessboardSlice.actions;

export default chessboardSlice.reducer;
