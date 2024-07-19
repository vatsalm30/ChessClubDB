from taipy.gui import  Markdown

from data.data import GAME_DATA

CHESSBOARD_DATA = ""

def on_action(state, _, payload):
    data = GAME_DATA.iloc[payload['index']]
    state.CHESSBOARD_DATA = f'{data.moves}/{data.white_id}/{data.black_id}/{data.victory_status}/{data.winner}'

games = Markdown("src/pages/games.md")