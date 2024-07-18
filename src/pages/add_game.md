# Add A New Game


## Players
<|layout|columns=300px 1fr 50px|
White Player ID: <br/>
<|{whitePlayerID}|input|> <br/><br/>

Black Player ID: <br/>
<|{blackPlayerID}|input|> <br/><br/>
|>


## Game Settings
Game Time (minutes): <br/>
<|{gameTime}|slider|lov=3;5;10;15;30;60;90;120;Unlimited|> <br/><br/>


## Game Result
<|layout|columns=300px 1fr 50px|
Game Winner: <br/>
<|{gameWinner}|lov={gameWinnerOptions}|toggle|on_change=onChangeGameWinner|><br/><br/>

Victory Status: <br/>
<|{victoryStatus}|lov={gameStausOptions}|toggle|on_change=onChangeVictoryStatus|><br/><br/>
|>
