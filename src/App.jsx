import { useEffect, useState } from "react";
import "./App.css";
import StarParticles from "./StarParticles";

const App = () => {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber(1, 50));
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState({ message: "", type: "" });
  const [hint, setHint] = useState("");
  const [playerScore, setPlayerScore] = useState(100);
  const [difficulty, setDifficulty] = useState("easy");
  const [isGameOver, setIsGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (startTime && !isGameOver) {
      const elapsedTime = (Date.now() - startTime) / 1000; // Calculate elapsed time in seconds
      const timeBonus = Math.max(0, 10 - elapsedTime); // Calculate time bonus (max 10 seconds)
      const score = Math.max(0, 100 - attempts * 10 + timeBonus);
      setPlayerScore(score >= 100 ? 100 : score);
    }
  }, [startTime, attempts, isGameOver]);

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function checkGuess() {
    const userGuess = parseInt(guess);

    if (attempts >= 6) {
      setMessage({
        message: "You've reached the maximum number of attempts!",
        type: "ERROR",
      });
      setIsGameOver(true);
    } else {
      if (userGuess < targetNumber) {
        setMessage({ message: "Try higher.", type: "HINT" });
      } else if (userGuess > targetNumber) {
        setMessage({ message: "Try lower.", type: "HINT" });
      } else {
        setMessage({
          message: `Congratulations! You guessed the number in ${
            attempts + 1
          } attempts. Score: ${playerScore.toFixed(2)}%`,
          type: "WIN",
        });
        setIsGameOver(true);
        setHint("You're a genius!");
      }

      setAttempts(attempts + 1);
    }
  }

  function startGame() {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }

  function resetGame() {
    setGuess("");
    setAttempts(0);
    setMessage({ message: "", type: "" });
    setHint("");
    setIsGameOver(false);
    setPlayerScore(100);
    setTargetNumber(
      generateRandomNumber(
        1,
        difficulty === "easy" ? 50 : difficulty === "medium" ? 100 : 200
      )
    );
    setStartTime(null);
  }

  // Function to handle difficulty level selection
  const selectDifficulty = (level) => {
    setDifficulty(level);
    resetGame();
  };

  return (
    <>
      <StarParticles />

      <div className="container">
        <h1>Number Guessing Game</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p id="attempts">Attempts: {attempts} / 6</p>{" "}
          {/* Display the number of attempts */}
          <p id="attempts">Score: {playerScore.toFixed(2)}</p>
        </div>
        {message.message ? (
          <p id="message" className={message.type === "ERROR" ? "error" : ""}>
            {message.message}
          </p>
        ) : (
          <p>Can you guess the number?</p>
        )}
        <div id="difficulty" className="tab-bar">
          <div
            className={`tab ${difficulty === "easy" ? "active" : ""}`}
            onClick={() => selectDifficulty("easy")}
          >
            Easy (1-50)
          </div>
          <div
            className={`tab ${difficulty === "medium" ? "active" : ""}`}
            onClick={() => selectDifficulty("medium")}
          >
            Medium (1-100)
          </div>
          <div
            className={`tab ${difficulty === "hard" ? "active" : ""}`}
            onClick={() => selectDifficulty("hard")}
          >
            Hard (1-200)
          </div>
        </div>
        <input
          type="number"
          id="guessInput"
          placeholder="Enter your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              startGame();
              checkGuess();
            }
          }}
          disabled={isGameOver}
          onClick={startGame}
        />
        <p id="hint">{hint}</p>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "end",
            gap: "1rem",
          }}
        >
          {!isGameOver && (
            <button onClick={checkGuess} disabled={isGameOver}>
              Submit Guess
            </button>
          )}
          <button
            id="playAgain"
            onClick={resetGame}
            style={{ display: isGameOver ? "block" : "none" }}
          >
            Play Again
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
