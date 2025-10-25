let userScore = 0;
let robotScore = 0;
let totalRounds = 0;
let currentRound = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const robotScorePara = document.querySelector("#robot-score");
const robotChoiceText = document.querySelector("#robot-choice-text");
const resetBtn = document.querySelector("#reset-btn");
const endMsg = document.querySelector("#end-msg");

const roundsSelect = document.querySelector("#rounds-select");
const currentRoundPara = document.querySelector("#current-round");

// Generate Robot's random choice
const genRobotChoice = () => {
  const options = ["Rock", "Paper", "Scissors"];
  const ranIdx = Math.floor(Math.random() * 3);
  return options[ranIdx];
};

// Update message text and style using CSS classes
const updateMsg = (text, result) => {
  msg.innerText = text;
  msg.classList.remove("win", "lose", "draw");
  msg.classList.add(result);
};

// Highlight robot's chosen element
const highlightRobotChoice = (robotChoice) => {
  const robotDiv = document.getElementById(robotChoice);
  if (robotDiv) {
    robotDiv.classList.add("highlight");
    setTimeout(() => robotDiv.classList.remove("highlight"), 600);
  }
};

// Update current round display
const updateRoundDisplay = () => {
  currentRoundPara.innerText = `Round: ${currentRound} / ${totalRounds}`;
};

// Show winner of a single round (no message update)
const updateScore = (userWin) => {
  if (userWin) userScore++;
  else robotScore++;

  userScorePara.innerText = userScore;
  robotScorePara.innerText = robotScore;
};

// Main game function
const playGame = (userChoice) => {
  if (!totalRounds || totalRounds === 0) {
    updateMsg("Please select number of rounds first!", "draw");
    return;
  }

  if (currentRound >= totalRounds) return; // game ended

  const robotChoice = genRobotChoice();
  robotChoiceText.innerText = robotChoice;

  let userWin = null;
  if (userChoice === robotChoice) userWin = null; // draw
  else if (
    (userChoice === "Rock" && robotChoice === "Scissors") ||
    (userChoice === "Paper" && robotChoice === "Rock") ||
    (userChoice === "Scissors" && robotChoice === "Paper")
  )
    userWin = true;
  else userWin = false;

  if (userWin !== null) updateScore(userWin); // update score only for win/lose
  highlightRobotChoice(robotChoice);

  currentRound++;
  updateRoundDisplay();

  // Show final winner message only after all rounds
  if (currentRound === totalRounds) declareOverallWinner();
};

// Declare overall winner after all rounds
const declareOverallWinner = () => {
  if (userScore > robotScore) updateMsg("🏆 You Win the Game!", "win");
  else if (robotScore > userScore) updateMsg("🤖 Robot Wins the Game!", "lose");
  else updateMsg("😐 Game Draw!", "draw");

  endMsg.innerText = "Click Reset — Game Completed!";
};

// Add click events to all user choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Reset Game
const resetGame = () => {
  userScore = 0;
  robotScore = 0;
  currentRound = 0;
  userScorePara.innerText = 0;
  robotScorePara.innerText = 0;
  robotChoiceText.innerText = "❔";
  updateRoundDisplay();
  updateMsg("Battle Begins! Pick Your Move", "draw");
  endMsg.innerText = "";

  roundsSelect.value = "Select";
  document.getElementById("rounds-container").style.display = "flex";
  document.getElementById("current-round").style.display = "none";
};

roundsSelect.addEventListener("change", () => {
  const selectedValue = roundsSelect.value;

  if (selectedValue && selectedValue !== "Select") {
    totalRounds = parseInt(selectedValue);
    resetGame();

    document.getElementById("rounds-container").style.display = "none";
    document.getElementById("current-round").style.display = "block";
  } else {
    totalRounds = 0;
    currentRound = 0;
    updateRoundDisplay();
    updateMsg("Please select number of rounds to start!", "draw");

    document.getElementById("rounds-container").style.display = "flex";
    document.getElementById("current-round").style.display = "none";
  }
});

resetBtn.addEventListener("click", resetGame);
