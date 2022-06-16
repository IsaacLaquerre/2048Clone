var board = [];

function setUpBoard() {
    var gameBoard = document.querySelector("#board");

    for (var x = 0; x < 4; x++) {
        var row = document.createElement("div");
        board[x] = row;
        row.classList.add("row");
        for (var y = 0; y < 4; y++) {
            var cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.backgroundColor = cellColors[0].background;
            cell.style.color = cellColors[0].text;
            cell.setAttribute("data-value", "0");
            board[x][y] = cell;
            row.appendChild(cell);
        }
        gameBoard.appendChild(row);
    }

    board = new Board(board);

    startGame();
}

function getBestScore() {

}

function showMenu() {

}

function startGame() {
    board.spawnCell();
    board.spawnCell();

    document.addEventListener("keydown", e => {
        switch (e.key) {
            case "ArrowUp":
                board.move("up");
                break;
            case "ArrowDown":
                board.move("down");
                break;
            case "ArrowLeft":
                board.move("left");
                break;
            case "ArrowRight":
                board.move("right");
                break;
            default:
                break;
        }
    });
}