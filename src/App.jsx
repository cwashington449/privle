import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import { WinModal, LeaderboardModal, HelpModal } from './components/Modals';
import { getWordOfTheDay, isWeekend, getRandomFact } from './lib/words';
import { checkGuess, calculateScore, MAX_GUESSES } from './lib/gameLogic';

function App() {
  const [targetWordData, setTargetWordData] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isWeekendMode, setIsWeekendMode] = useState(false);
  const [weekendFact, setWeekendFact] = useState(null);

  const [showWinModal, setShowWinModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Load game state
  useEffect(() => {
    if (isWeekend()) {
      setIsWeekendMode(true);
      setWeekendFact(getRandomFact());
      return;
    }

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
      if (!savedState) setShowHelp(true);
    }
  }, []);

  // Save game state
  useEffect(() => {
    if (!targetWordData || isWeekendMode) return;

    const today = new Date().toDateString();
    const state = {
      date: today,
      guesses,
      isGameOver,
      isWon
    };
    localStorage.setItem('privle-state', JSON.stringify(state));
  }, [guesses, isGameOver, isWon, targetWordData, isWeekendMode]);

  const handleChar = (char) => {
    if (isGameOver || !targetWordData || isWeekendMode) return;
    if (currentGuess.length < targetWordData.word.length) {
      setCurrentGuess(prev => prev + char);
    }
  };

  const handleDelete = () => {
    if (isGameOver || isWeekendMode) return;
    setCurrentGuess(prev => prev.slice(0, -1));
  };

  const handleEnter = () => {
    if (isGameOver || !targetWordData || isWeekendMode) return;
    if (currentGuess.length !== targetWordData.word.length) {
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
      setTimeout(() => setShowWinModal(true), 1500);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setIsGameOver(true);
    }
  };

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

  if (isWeekendMode && weekendFact) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header
          onHelpClick={() => { }}
          onStatsClick={() => { }}
        />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-primary mb-4">Happy Weekend!</h2>
            <p className="text-gray-600 mb-8">
              Privle takes a break on weekends. Come back on Monday for a new challenge!
            </p>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
              <h3 className="text-sm font-semibold text-purple-900 uppercase tracking-wide mb-2">Did You Know?</h3>
              <p className="text-gray-800 italic mb-4">"{weekendFact.def}"</p>
              <a
                href="https://www.osano.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-purple-700 font-medium text-sm inline-flex items-center"
              >
                Learn more at Osano.com →
              </a>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
