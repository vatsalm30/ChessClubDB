import { useDynamicProperty } from "taipy-gui";
import ChessPiece from "../ChessPiece/ChessPiece";
import MoveAdder from "../MoveAdder/MoveAdder";
import { Chess, Move } from "chess.js";
import { useEffect, useState } from "react";

import styles from "./AddChessGame.module.css";
import { getBoardFromMove } from "../utils";

const chess = new Chess();

interface AddChessGameProps {
  gameLen?: number;
  defaultGameLen?: number;
}

const numToChessIndex = ["a", "b", "c", "d", "e", "f", "g", "h"]

const AddChessGame = (props: AddChessGameProps) => {
  const data = useDynamicProperty(props.gameLen, props.defaultGameLen, 0);
  const [moveData, setMoveData] = useState<string[]>([]);
    const [history, setHistory] = useState<Move[]>([]);
    const [index, setIndex] = useState<number>(-1);

  useEffect(() => {
    let history: Move[] = [];
    chess.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    let breakLoop = false;
    setIndex(-1);
    moveData.forEach((move) => {
      if(!breakLoop)
      {
        try {
          if (move !== "")
          {
            history.push(chess.move(move));
          }
        }catch {
          breakLoop = true;
        }
      }
      
    });
    console.log(history);
    setHistory(history);
  }, [moveData]);


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
            {
              getBoardFromMove(history[history.length - 1]).map((piece) => (
                  <ChessPiece
                    position={piece.position}
                    piece={piece.piece}
                    color={piece.color}
                    checked={piece.checked}
                  />
                ))
            }
          </div>
          <MoveAdder setMoves={setMoveData}/>
        </div>
          <button
            className={styles.control_button}
            onClick={() => {
              if (index > 0) {
                setIndex(index - 1);
              }
            }}
          >
            {"<"}
          </button>
          <button
            className={styles.control_button}
            onClick={() => {
              if (index < history.length - 1) {
                setIndex(index + 1);
              }
            }}
          >
            {">"}
          </button>
      </div>
    </div>
  );
};

export default AddChessGame;
