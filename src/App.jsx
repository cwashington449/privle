import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import { WinModal, LeaderboardModal, HelpModal } from './components/Modals';
import { getWordOfTheDay } from './lib/words';
import { checkGuess, calculateScore, MAX_GUESSES } from './lib/gameLogic';

function App() {
  const [targetWordData, setTargetWordData] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);

  const [showWinModal, setShowWinModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Load game state
  useEffect(() => {
    const wordData = getWordOfTheDay();
    setTargetWordData(wordData);

    const today = new Date().toDateString();
    const savedState = JSON.parse(localStorage.getItem('privle-state'));

    if (savedState && savedState.date === today) {
      setGuesses(savedState.guesses);
      setIsGameOver(savedState.isGameOver);
      setIsWon(savedState.isWon);
      if (savedState.isGameOver && savedState.isWon) {
        setShowWinModal(true);
      }
    } else {
      // New game or first time
      // Check if we should show help first time? Maybe.
      if (!savedState) setShowHelp(true);
    }
  }, []);

  // Save game state
  useEffect(() => {
    if (!targetWordData) return;

    const today = new Date().toDateString();
    const state = {
      date: today,
      guesses,
      isGameOver,
      isWon
    };
    localStorage.setItem('privle-state', JSON.stringify(state));
  }, [guesses, isGameOver, isWon, targetWordData]);

  const handleChar = (char) => {
    if (isGameOver || !targetWordData) return;
    if (currentGuess.length < targetWordData.word.length) {
      setCurrentGuess(prev => prev + char);
    }
  };

  const handleDelete = () => {
    if (isGameOver) return;
    setCurrentGuess(prev => prev.slice(0, -1));
  };

  const handleEnter = () => {
    if (isGameOver || !targetWordData) return;
    if (currentGuess.length !== targetWordData.word.length) {
      // Shake animation or toast could go here
      return;
    }

    const result = checkGuess(currentGuess, targetWordData.word);
    const newGuesses = [...guesses, { word: currentGuess, result }];
    setGuesses(newGuesses);
    setCurrentGuess('');

    const won = currentGuess === targetWordData.word;

    if (won) {
      setIsWon(true);
      setIsGameOver(true);
      setTimeout(() => setShowWinModal(true), 1500); // Delay for flip animation
    } else if (newGuesses.length >= MAX_GUESSES) {
      setIsGameOver(true);
      // Maybe show lost modal? Requirement only specified Win Modal details.
      // I'll just leave it as is or show a "Game Over" toast.
    }
  };

  // Calculate key statuses
  const keyStatuses = {};
  guesses.forEach(guess => {
    guess.word.split('').forEach((char, i) => {
      const status = guess.result[i];
      const currentStatus = keyStatuses[char];

      if (status === 'correct') {
        keyStatuses[char] = 'correct';
      } else if (status === 'present' && currentStatus !== 'correct') {
        keyStatuses[char] = 'present';
      } else if (status === 'absent' && currentStatus !== 'correct' && currentStatus !== 'present') {
        keyStatuses[char] = 'absent';
      }
    });
  });

  if (!targetWordData) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header
        onHelpClick={() => setShowHelp(true)}
        onStatsClick={() => setShowLeaderboard(true)}
      />

      <main className="flex-1 flex flex-col items-center justify-center overflow-hidden">
        <div className="flex-1 flex items-center justify-center w-full overflow-y-auto">
          <GameBoard
            guesses={guesses}
            currentGuess={currentGuess}
            wordLength={targetWordData.word.length}
            maxGuesses={MAX_GUESSES}
            isGameOver={isGameOver}
          />
        </div>

        <div className="w-full">
          <Keyboard
            onChar={handleChar}
            onDelete={handleDelete}
            onEnter={handleEnter}
            keyStatuses={keyStatuses}
          />
        </div>
      </main>

      {showWinModal && (
        <WinModal
          wordData={targetWordData}
          score={calculateScore(guesses.length)}
          onClose={() => setShowWinModal(false)}
          onShowLeaderboard={() => {
            setShowWinModal(false);
            setShowLeaderboard(true);
          }}
        />
      )}

      {showLeaderboard && (
        <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
      )}

      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)} />
      )}
    </div>
  );
}

export default App;
