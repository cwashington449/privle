import React from 'react';

const GameBoard = ({ guesses, currentGuess, wordLength, maxGuesses, isGameOver }) => {
    const empties = maxGuesses - guesses.length - (isGameOver ? 0 : 1);
    // If game is over, we don't show a current guess row if we used all guesses, 
    // but if we won early, we might have empty rows.
    // Actually, simpler logic:
    // We always render maxGuesses rows.
    // The first `guesses.length` rows are completed guesses.
    // The next row is the current guess (if not game over).
    // The rest are empty.

    const rows = [];

    // Completed rows
    guesses.forEach((guess, i) => {
        rows.push(<Row key={`guess-${i}`} guess={guess.word} result={guess.result} wordLength={wordLength} isSubmitted={true} />);
    });

    // Current row
    if (guesses.length < maxGuesses && !isGameOver) {
        rows.push(<Row key="current" guess={currentGuess} wordLength={wordLength} isSubmitted={false} />);
    }

    // Empty rows
    const remaining = maxGuesses - rows.length;
    for (let i = 0; i < remaining; i++) {
        rows.push(<Row key={`empty-${i}`} guess="" wordLength={wordLength} isSubmitted={false} />);
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 space-y-2">
            {rows}
        </div>
    );
};

const Row = ({ guess, result, wordLength, isSubmitted }) => {
    const tiles = [];
    const splitGuess = guess.split('');

    for (let i = 0; i < wordLength; i++) {
        const char = splitGuess[i] || '';
        const status = result ? result[i] : null;

        let bgColor = 'bg-white border-2 border-gray-300';
        let textColor = 'text-black';
        let animationDelay = `${i * 150}ms`;
        let animationClass = '';

        if (isSubmitted) {
            animationClass = 'animate-flip';
            if (status === 'correct') {
                bgColor = 'bg-success border-success text-white';
            } else if (status === 'present') {
                bgColor = 'bg-warning border-warning text-white';
            } else if (status === 'absent') {
                bgColor = 'bg-gray-500 border-gray-500 text-white';
            }
        } else if (char) {
            bgColor = 'bg-white border-2 border-gray-400';
            animationClass = 'animate-pop';
        }

        tiles.push(
            <div
                key={i}
                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-2xl font-bold uppercase select-none transition-colors duration-500 ${bgColor} ${textColor} ${animationClass}`}
                style={{ animationDelay: isSubmitted ? animationDelay : '0ms' }}
            >
                {char}
            </div>
        );
    }

    return (
        <div className="flex space-x-2">
            {tiles}
        </div>
    );
};

export default GameBoard;
