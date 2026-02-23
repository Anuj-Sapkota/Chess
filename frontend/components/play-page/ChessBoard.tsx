import { Chess } from "chess.js";
import React from "react";
import { Chessboard } from "react-chessboard";
const ChessBoard = () => {
  const chess = new Chess();
  console.log("Chess FEN:", chess.fen());

  return (
    <div className="w-3xl">
      <Chessboard options={chessboardOptions} />
    </div>
  );
};

export default ChessBoard;
