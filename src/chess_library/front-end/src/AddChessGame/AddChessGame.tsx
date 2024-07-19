import { useDynamicProperty } from "taipy-gui";
import ChessPiece from "../ChessPiece/ChessPiece";
import MoveList from "../MoveList/MoveList";
import { Chess, Move } from "chess.js";
import { useEffect, useState } from "react";

import styles from "./AddChessGame.module.css";
import { getBoardFromFen, getBoardFromMove } from "../utils";

const chess = new Chess();

interface AddChessGameProps {
  gameLen?: number;
  defaultGameLen?: number;
}

const numToChessIndex = ["a", "b", "c", "d", "e", "f", "g", "h"]

const AddChessGame = (props: AddChessGameProps) => {
  const data = useDynamicProperty(props.gameLen, props.defaultGameLen, 0);
  const [index, setIndex] = useState(-1);

  return (
    <div className={styles.panel}>
      <div className={styles.board}>
          <div className={styles.grid}>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((i) =>
              Array.from({ length: 8 }, (_, j) => j + 1).map((j) => (
                  <div
                  key={`${i}-${j}`}
                  style={{
                    gridColumn: i,
                    gridRow: j,
                    backgroundColor:
                      (i + j) % 2 === 0
                        ? "rgba(240,217,181,255)"
                        : "rgba(181,136,99,255)",
                    fontSize: 10,
                    color:
                    (i + j) % 2 === 1
                      ? "rgba(240,217,181,127)"
                      : "rgba(181,136,99,127)",
                    userSelect: "none",

                  }}
                >
                  {numToChessIndex[i - 1]}{-j + 9}
                </div>
              ))
            )}

            {
              getBoardFromFen(
                "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
              ).map((piece) => (
                <ChessPiece
                  position={piece.position}
                  piece={piece.piece}
                  color={piece.color}                
                />
              ))
            }
          </div>
          <MoveList index={index} moves={"e4 e5 f4 f5"} setIndex={setIndex} />
        </div>
    </div>
  );
};

export default AddChessGame;
