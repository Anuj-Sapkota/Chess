import { GAME_STATUS } from "@/constants/game";
import { STARTING_FEN } from "@/constants/initial-fen.constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chess } from "chess.js";

export type GameStatus = "waiting" | "started" | "checkmate" | "draw";

export type TurnType = "w" | "b";
export enum TurnValues {
  w = "w",
  b = "b",
}

interface InitialChessBoardState {
  fen: string;
  history: string[];
  gameId: string | null;
  players: {
    white: string;
    black: string;
  } | null;
  turn: TurnType;
  status: GameStatus;
  isMoveLoading: boolean;
  lastMove: {
    from: string;
    to: string;
  } | null;
  capturedPieces: {
    w: string[];
    b: string[];
  };
}

interface MakeMove {
  from: string;
  to: string;
  promotion: string;
}
const initialState: InitialChessBoardState = {
  fen: STARTING_FEN,
  history: [],

  //game metadata
  gameId: null,
  players: null,
  turn: TurnValues.w, // w= White
  status: GAME_STATUS.STARTED, // ---------- UPDATE THIS AFTER INTEGRATING SOCKET.IO--------------------- //

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
    makeMove: (state, action: PayloadAction<MakeMove>) => {
      // Dont allow moves when the game hasn't started //
      if (state.status !== GAME_STATUS.STARTED) {
        return;
      }

      const game = new Chess(state.fen);
      const move = game.move(action.payload);


      if (move) {
        //update the board FEN
        state.fen = game.fen();

        //store the history
        state.history.push(move.san);

        // change the turn
        state.turn = game.turn();

        //store the last move
        state.lastMove = {
          from: move.from,
          to: move.to,
        };

        //captured pieces
        if (move.captured) {
          if (move.color == "w") {
            state.capturedPieces.w.push(move.captured);
          } else {
            state.capturedPieces.b.push(move.captured);
          }
        }

        //if checkmate
        if (game.isCheckmate()) state.status = GAME_STATUS.CHECKMATE;

        //if draw
        if (game.isDraw()) state.status = GAME_STATUS.DRAW;

        // if no capture has been made and no pawn has been moved in the last fifty moves,  make draw
        if (game.isDrawByFiftyMoves()) state.status = GAME_STATUS.DRAW;
      }
      
    },
  },
});

export const { makeMove } = chessboardSlice.actions;

export default chessboardSlice.reducer;
