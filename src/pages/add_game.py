from typing import List
from taipy.gui import  Markdown, State

# Initialize the variables
whitePlayerID = ""
blackPlayerID = ""
gameTime = 10
gameWinner = "White"
victoryStatus = "Mate"
gameMoves: List[tuple:[str, str]] = []

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

add_game = Markdown("src/pages/add_game.md")