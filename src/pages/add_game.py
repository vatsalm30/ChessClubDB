from typing import List
import pandas as pd
from taipy.gui import  Markdown, State
import csv
import json

# Initialize the variables
whitePlayerID = ""
blackPlayerID = ""
gameTime = 10
gameWinner = "White"
victoryStatus = "Mate"
gameMoves = []
CHESSBOARD_DATA = "e4 e5 d3 d6 Be3 c6 Be2 b5 Nd2 a5 a4 c5 axb5 Nc6 bxc6 Ra6 Nc4 a4 c3 a3 Nxa3 Rxa3 Rxa3 c4 dxc4 d5 cxd5 Qxd5 exd5 Be6 Ra8+ Ke7 Bc5+ Kf6 Bxf8 Kg6 Bxg7 Kxg7 dxe6 Kh6 exf7 Nf6 Rxh8 Nh5 Bxh5 Kg5 Rxh7 Kf5 Qf3+ Ke6 Bg4+ Kd6 Rh6+ Kc5 Qe3+ Kb5 c4+ Kb4 Qc3+ Ka4 Bd1#/white player/black player/mate/black"
gameLen = 31

gameWinnerOptions = ["White", "Black", "Draw"]
gameStausOptions = ["Mate", "Timeout", "Resign", "Draw"]

game = {
    "White Player": whitePlayerID,
    "Black Player": blackPlayerID,
    "Game Duration":  gameTime,
    "Game Winner": gameWinner,
    "Result Type": victoryStatus,
    "Game Moves": gameMoves,
}

def onChangeGameWinner(state: State):
    if state.victoryStatus == "Draw":
        state.gameWinner = "Draw"

def onChangeVictoryStatus(state: State):
    if state.victoryStatus == "Draw":
        state.gameWinner = "Draw"
def add_game_to_csv(state: State):
    dataTransferDict = {
        "chessData": [],
    }
    
    with open("src/api_layer/apiTransfer.json", "r") as json_file:
        dataTransferDict = json.load(json_file)

    with open("src/api_layer/apiTransfer.json", "w") as json_file:
        dataTransferDict = {
            "chessData": [],
        }
        json.dump(dataTransferDict, json_file)

    with open("src/data/games.csv", "a", newline='\n') as csv_file:
        writer = csv.writer(csv_file)
                       # id,turns,victory_status,winner,white_id,white_rating,black_id,black_rating,moves
        writer.writerow(["id", len(state.gameMoves) // 2, state.victoryStatus, state.gameWinner, state.whitePlayerID, 0, state.blackPlayerID, 0, state.gameMoves])
        csv_file.close()

add_game = Markdown("src/pages/add_game.md")