import { makeMove } from "@/lib/store/features/chessboard/chessboard.slice";
import { AppDispatch, RootState } from "@/lib/store/store";
import { Chess } from "chess.js";
import { Chessboard, DraggingPieceDataType } from "react-chessboard";
import { useDispatch, useSelector } from "react-redux";

const ChessBoard = () => {
  const { fen } = useSelector((state: RootState) => state.chessboard);

  const dispatch = useDispatch<AppDispatch>();

  function onPieceDrop({sourceSquare, targetSquare, piece}: {sourceSquare: string, targetSquare: string | null, piece: DraggingPieceDataType}) {
    console.log(
      `Source Square: ${sourceSquare}, target Square: ${targetSquare}.`,
    );

    if (!targetSquare) return false;

    dispatch(
      makeMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      }),
    );

    return true;
  }
  const chessboardOptions = {
    position: fen,
    onPieceDrop,
    id: "play-vs-random",
  };

  return (
    <div className="w-3xl">
      <Chessboard options={chessboardOptions} />
    </div>
  );
};

export default ChessBoard;
