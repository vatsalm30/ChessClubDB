import { useEffect, useRef, useState } from "react";

import { Chess } from "chess.js";

import styles from "./MoveAdder.module.css";

interface MoveProps {
  index: number;
  move: string;
  onChange: (move: string) => void;
}

const Move = ({ index, move, onChange }: MoveProps) => {
  const [selected, setSelected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      key={`move-${index}`}
      onClick={() => {
        setSelected(!selected);
        inputRef.current?.focus();
      }}
      className={selected ? styles.selected : styles.move}
    >
      <input ref={inputRef} type="text" style={{ background: "none", border: "none", width: "55px", "color": "white", fontSize: "18px" }} value={move} onChange={(e) => onChange(e.target.value)}/>
    </div>
  );
};

interface MoveAdderProps {
  index: number;
  setIndex: (index: number) => void;
  setMoves: (moves: string[]) => void;
}

const chess = new Chess();

const MoveAdder = ({ index, setIndex, setMoves }: MoveAdderProps) => {
  const [movesArray, setMovesArray] = useState(["e4", "e5"]);

  useEffect(() => {
    setMoves(movesArray);
  }, [movesArray]);

  const onMoveUpdate = (moveIndex: number, move: string) => {
    let newMovesArray = [...movesArray];
    
    chess.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

    newMovesArray[moveIndex] = move;

    if(newMovesArray[newMovesArray.length - 1] !== "")
    {
        newMovesArray.push("");
    }

    while(newMovesArray[newMovesArray.length - 1] === "" && newMovesArray[newMovesArray.length - 2] === "")
    {
        newMovesArray.splice(newMovesArray.length - 1);
    }

    setMovesArray(newMovesArray);
    setMoves(newMovesArray);
  };

  return (
    <div className={styles.list}>
      {Array.from(
        {
          length:
            movesArray.length % 2 == 0
              ? movesArray.length / 2
              : movesArray.length / 2 + 1,
        },
        (_, i) => i
      ).map((i) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "10px",
              width: "100%",
              height: "30px",
              backgroundColor:
                i % 2 === 0 ? "rgba(0,0,0,0.0)" : "rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                textAlign: "right",
                width: "20px",
              }}
            >
              {i + 1}.
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <Move
                index={i * 2}
                move={movesArray[i * 2]}
                onChange={(move) => onMoveUpdate(i * 2, move)}
              />
              {i * 2 + 1 < movesArray.length && (
                <Move
                  index={i * 2 + 1}
                  move={movesArray[i * 2 + 1]}
                  onChange={(move) => onMoveUpdate(i * 2 + 1, move)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoveAdder;