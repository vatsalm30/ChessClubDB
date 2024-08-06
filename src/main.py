from taipy.gui import Gui
from taipy import Config

from chess_library import ChessLibrary

from pages.root import root
from pages.games import games
from pages.add_game import add_game


Config.configure_global_app(websocket=True)

pages = {
    "/": root,
    "Games": games, 
    "Add-Game": add_game
}

if __name__ == "__main__":
    gui = Gui(pages=pages, libraries=[ChessLibrary()])
    
    gui.run(title="Chess Club DB", dark_mode=True, host="0.0.0.0", port=5000)

