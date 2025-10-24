let userScore = 0;
let robotScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const robotScorePara = document.querySelector("#robot-score");
const robotChoiceText = document.querySelector("#robot-choice-text");
const resetBtn = document.querySelector("#reset-btn");

// Generate Robot's random choice
const genRobotChoice = () => {
  const options = ["Rock", "Paper", "Scissors"];
  const ranIdx = Math.floor(Math.random() * 3);
  return options[ranIdx];
};

// Update message text and style
const updateMsg = (text, result) => {
  msg.innerText = text;
  msg.classList.remove("win", "lose", "draw"); // remove old
  msg.classList.add(result); // add new
};

// Draw game
const drawGame = () => updateMsg("Game was a Draw, Play Again...", "draw");

// Show winner
const showWinner = (userWin, userChoice, robotChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    updateMsg(
      `You Win! Your ${userChoice} beats Robot's ${robotChoice}`,
      "win"
    );
  } else {
    robotScore++;
    robotScorePara.innerText = robotScore;
    updateMsg(
      `You Lose! Robot's ${robotChoice} beats Your ${userChoice}`,
      "lose"
    );
  }
};

// Highlight robot's chosen element
const highlightRobotChoice = (robotChoice) => {
  const robotDiv = document.getElementById(robotChoice);
  if (robotDiv) {
    robotDiv.classList.add("highlight");
    setTimeout(() => robotDiv.classList.remove("highlight"), 600);
  }
};

// Main game function
const playGame = (userChoice) => {
  const robotChoice = genRobotChoice();

  // Display robot's choice text
  robotChoiceText.innerText = robotChoice;

  if (userChoice === robotChoice) {
    drawGame();
  } else {
    let userWin = true;

    if (userChoice === "Rock") {
      userWin = robotChoice === "Paper" ? false : true;
    } else if (userChoice === "Paper") {
      userWin = robotChoice === "Scissors" ? false : true;
    } else {
      userWin = robotChoice === "Rock" ? false : true;
    }

    showWinner(userWin, userChoice, robotChoice);
  }

  // Highlight robot's chosen image
  highlightRobotChoice(robotChoice);
};

// Add click events to all user choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Reset Game button logic
resetBtn.addEventListener("click", () => {
  userScore = 0;
  robotScore = 0;
  userScorePara.innerText = 0;
  robotScorePara.innerText = 0;
  robotChoiceText.innerText = "❔";
  updateMsg("Play Your Move...", "#1d3557");
});
