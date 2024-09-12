let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg");

let turnOfPlayerO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    count = 0;
    turnOfPlayerO = true;
    msgContainer.classList.add("hide");
    enableBoxes();
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const showWinner = (winner) => {
    message.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const draw = () => {
    message.innerText = "It's a draw";
    msgContainer.classList.remove("hide");
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnOfPlayerO){
            box.innerText = "O";
            turnOfPlayerO = false;
        } else{
            box.innerText = "X";
            turnOfPlayerO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            draw();
        }
    });
});