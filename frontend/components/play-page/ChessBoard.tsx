import { makeMove } from "@/lib/store/features/chessboard/chessboard.slice";
import { AppDispatch, RootState } from "@/lib/store/store";
import { Chess } from "chess.js";
import { Chessboard, DraggingPieceDataType } from "react-chessboard";
import { useDispatch, useSelector } from "react-redux";

const ChessBoard = () => {
  const { fen, lastMove, checkSquare } = useSelector(
    (state: RootState) => state.chessboard,
  );

  const dispatch = useDispatch<AppDispatch>();

  function onPieceDrop({
    sourceSquare,
    targetSquare,
    piece,
  }: {
    sourceSquare: string;
    targetSquare: string | null;
    piece: DraggingPieceDataType;
  }) {
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

  //custom colors for from, to and the king square when in check
  const customSquareColors = {
    //  1. Highlight the from and to of the last move
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: "#FCF163" },
      [lastMove.to]: { backgroundColor: "#FBEC33" },
    }),
    ...(checkSquare && {
      [checkSquare]: {
        background:
          "radial-gradient(circle, rgba(255,0,0,.5) 0%, rgba(255,0,0,1) 80%)",
        },
    }),
  };
  const chessboardOptions = {
    position: fen,
    onPieceDrop,
    showAnimations: true,
    allowDrawingArrows: true,

    squareStyles: customSquareColors,
  };

  return (
    <div className="w-3xl">
      <Chessboard options={chessboardOptions} />
    </div>
  );
};

export default ChessBoard;
