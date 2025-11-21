export const WORD_LENGTH_MIN = 4;
export const WORD_LENGTH_MAX = 8;
export const MAX_GUESSES = 6;

export const checkGuess = (guess, targetWord) => {
    const result = [];
    const targetChars = targetWord.split('');
    const guessChars = guess.split('');

    // First pass: Check for correct letters in correct spots (Green)
    guessChars.forEach((char, index) => {
        if (char === targetChars[index]) {
            result[index] = 'correct';
            targetChars[index] = null; // Mark as used
        } else {
            result[index] = null; // Placeholder
        }
    });

    // Second pass: Check for correct letters in wrong spots (Yellow)
    guessChars.forEach((char, index) => {
        if (result[index] === null) { // Only check if not already marked correct
            const targetIndex = targetChars.indexOf(char);
            if (targetIndex !== -1) {
                result[index] = 'present';
                targetChars[targetIndex] = null; // Mark as used
            } else {
                result[index] = 'absent';
            }
        }
    });

    return result;
};

export const calculateScore = (guessesTaken) => {
    return (7 - guessesTaken) * 10;
};
