var cellColors = {
    0: { background: "#CCC0B2", text: "#776E65" },
    2: { background: "#EEE4DA", text: "#776E65" },
    4: { background: "#EDE0C8", text: "#776E65" },
    8: { background: "#F2B179", text: "#F9F6F2" },
    16: { background: "#F59563", text: "#F9F6F2" },
    32: { background: "#F67C5F", text: "#F9F6F2" },
    64: { background: "#F65E3B", text: "#F9F6F2" },
    128: { background: "#EDCF72", text: "#F9F6F2" },
    256: { background: "#EDCC61", text: "#F9F6F2" },
    512: { background: "#EDC850", text: "#F9F6F2" },
    1024: { background: "#EDC53F", text: "#F9F6F2" },
    2048: { background: "#EDC22E", text: "#F9F6F2" },
    4096: { background: "#3E3933", text: "#F9F6F2" }
};

class Board {
    constructor(board) {
        this.board = board;
    }

    spawnCell() {
        var odds = Math.floor(Math.random() * 10);
        if (odds === 0) var cellValue = 4;
        else cellValue = 2;
        var x = Math.floor(Math.random() * 4);
        var y = Math.floor(Math.random() * 4);
        if (this.board[x][y].dataset.value != "0") return this.spawnCell();
        var cell = this.board[x][y];
        var cellColor = Object.values(cellColors)[Object.keys(cellColors).indexOf(cellValue.toString())];

        cell.dataset.value = cellValue;
        cell.style.backgroundColor = cellColor.background;
        cell.style.color = cellColor.text;
        cell.innerHTML = cellValue;
    }

    move(direction) {
        switch (direction) {
            case "up":
                var move = [-1, 0];
                break;
            case "down":
                move = [1, 0];
                break;
            case "left":
                move = [0, -1];
                break;
            case "right":
                move = [0, 1];
                break;
            default:
                break;
        }

        this.compress(move);

        try {
            this.spawnCell();
            this.spawnCell();
        } catch (e) {
            this.gameOver();
        }
    }

    compress(move, compressed = false) {
        for (var row in this.board) {
            if (!isNaN(row)) {
                for (var cell in this.board[row]) {
                    if (!isNaN(cell)) {
                        var currentCell = this.board[row][cell];
                        if (currentCell != undefined && currentCell.classList != undefined && currentCell.classList.contains("cell")) {
                            if (currentCell.dataset.value != "0") {
                                var previousCell = (this.board[parseInt(row) + parseInt(move[0])] != undefined ? this.board[parseInt(row) + parseInt(move[0])][parseInt(cell) + parseInt(move[1])] : undefined);
                                while (previousCell != undefined && previousCell.dataset.value === "0") {
                                    previousCell.dataset.value = currentCell.dataset.value;
                                    previousCell.style.backgroundColor = currentCell.style.backgroundColor;
                                    previousCell.style.color = currentCell.style.color;
                                    previousCell.innerHTML = currentCell.innerHTML;
                                    currentCell.dataset.value = "0";
                                    currentCell.style.backgroundColor = cellColors[0].background;
                                    currentCell.style.color = cellColors[0].text;
                                    currentCell.innerHTML = "";
                                }
                                if (previousCell != undefined && previousCell.dataset.value === currentCell.dataset.value) this.merge(previousCell, currentCell);
                                if (!compressed) this.compress(move, true);
                            }
                        }
                    }
                }
            }
        }
    }

    merge(previousCell, currentCell) {
        var previousCellColor = Object.values(cellColors)[Object.keys(cellColors).indexOf((parseInt(previousCell.dataset.value) + parseInt(currentCell.dataset.value)).toString())];
        previousCell.dataset.value = parseInt(previousCell.dataset.value) + parseInt(currentCell.dataset.value);
        previousCell.style.backgroundColor = previousCellColor.background;
        previousCell.style.color = previousCellColor.text;
        previousCell.innerHTML = previousCell.dataset.value;
        currentCell.dataset.value = "0";
        currentCell.style.backgroundColor = cellColors[0].background;
        currentCell.style.color = cellColors[0].text;
        currentCell.innerHTML = "";
    }

    gameOver() {
        //alert("Game Over");
    }
}