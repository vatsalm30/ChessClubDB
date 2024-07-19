from taipy.gui import Gui
from chess_library import ChessLibrary

from pages.root import root
from pages.games import games
from pages.add_game import add_game

pages = {
    "/": root,
    "Games": games, 
    "Add-Game": add_game
}

if __name__ == "__main__":
    Gui(pages=pages, libraries=[ChessLibrary()]).run(title="Chess Club DB", dark_mode=True)