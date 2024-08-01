import { useEffect, useRef, useState } from "react";

import { Chess, Move as ChessMove } from "chess.js";

import styles from "./MoveAdder.module.css";

interface MoveProps {
  index: number;
  move: string;
  onChange: (move: string) => void;
  failIndex: boolean;
}

const chess = new Chess();

const Move = ({ index, move, onChange, failIndex }: MoveProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      key={`move-${index}`}
      onClick={() => {
        inputRef.current?.focus();
      }}
      className={failIndex ? styles.fail : styles.move}
    >
      <input ref={inputRef} type="text" style={{ background: "none", border: "none", width: "55px", "color": "white", fontSize: "18px" }} value={move} onChange={(e) => onChange(e.target.value)}/>
    </div>
  );
};

interface MoveAdderProps {
  setHistory: (history: ChessMove) => void;
}

const MoveAdder = ({ setHistory }: MoveAdderProps) => {
  const [movesArray, setMovesArray] = useState(["e4", ""]);
  const [failIndex, setFailIndex] = useState<number>(-1);

  useEffect(() => {
    chess.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    let breakLoop = false;
    movesArray.forEach((move, index) => {
      if(!breakLoop)
      {
        try{
          setHistory(chess.move(move));
        }catch{
          setFailIndex(index);
          breakLoop = true;
        }
      }
    })

    if(!breakLoop)
    {
      setFailIndex(-1);
      setMovesArray([...movesArray, ""]);
    }
  }, [movesArray]);

  const onMoveUpdate = (moveIndex: number, move: string) => {
    let newMovesArray = [...movesArray];

    newMovesArray[moveIndex] = move;

    while(newMovesArray[newMovesArray.length - 1] === "" && newMovesArray[newMovesArray.length - 2] === "")
    {
        newMovesArray.splice(newMovesArray.length - 1);
    }
    
    setMovesArray(newMovesArray);
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
                failIndex={failIndex == i * 2 && movesArray[i * 2] !== ""}
              />
              {i * 2 + 1 < movesArray.length && (
                <Move
                  index={i * 2 + 1}
                  move={movesArray[i * 2 + 1]}
                  onChange={(move) => onMoveUpdate(i * 2 + 1, move)}
                  failIndex={failIndex == i * 2 + 1 && movesArray[i * 2 + 1] !== ""}
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