import { useDynamicProperty } from "taipy-gui";
import ChessPiece from "../ChessPiece/ChessPiece";
import MoveAdder from "../MoveAdder/MoveAdder";
import { Move } from "chess.js";
import { useState } from "react";

import styles from "./AddChessGame.module.css";
import { getBoardFromMove } from "../utils";

interface AddChessGameProps {
  gameLen?: number;
  defaultGameLen?: number;
}

const numToChessIndex = ["a", "b", "c", "d", "e", "f", "g", "h"]

const AddChessGame = (props: AddChessGameProps) => {
  const _ = useDynamicProperty(props.gameLen, props.defaultGameLen, 0);
  const [history, setHistory] = useState<Move | null>();

  return (
    <div className={styles.panel}>
      <div className={styles.container}>
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
              {history &&
              getBoardFromMove(history).map((piece) => (
                  <ChessPiece
                    position={piece.position}
                    piece={piece.piece}
                    color={piece.color}
                    checked={piece.checked}
                  />
                ))
            }
            </div>
            <MoveAdder setHistory={setHistory}/>
        </div>
      </div>
    </div>
  );
};

export default AddChessGame;
