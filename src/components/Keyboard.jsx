import React, { useEffect } from 'react';
import { Delete } from 'lucide-react';

const KEYS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

const Keyboard = ({ onChar, onDelete, onEnter, keyStatuses }) => {

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                onEnter();
            } else if (e.key === 'Backspace') {
                onDelete();
            } else {
                const key = e.key.toUpperCase();
                if (/^[A-Z]$/.test(key)) {
                    onChar(key);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onChar, onDelete, onEnter]);

    const getKeyStyle = (key) => {
        const status = keyStatuses[key];
        let base = "flex items-center justify-center rounded font-bold text-sm sm:text-base h-14 transition-colors duration-150 select-none cursor-pointer";

        if (key === 'ENTER' || key === 'BACKSPACE') {
            return `${base} px-3 sm:px-4 bg-gray-200 hover:bg-gray-300 text-gray-900`;
        }

        switch (status) {
            case 'correct':
                return `${base} flex-1 bg-success text-white hover:bg-green-600`;
            case 'present':
                return `${base} flex-1 bg-warning text-white hover:bg-yellow-600`;
            case 'absent':
                return `${base} flex-1 bg-gray-500 text-white hover:bg-gray-600`;
            default:
                return `${base} flex-1 bg-gray-200 text-gray-900 hover:bg-gray-300`;
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-2 pb-8">
            <div className="flex flex-col space-y-2">
                {KEYS.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex space-x-1.5 justify-center">
                        {row.map((key) => (
                            <button
                                key={key}
                                onClick={() => {
                                    if (key === 'ENTER') onEnter();
                                    else if (key === 'BACKSPACE') onDelete();
                                    else onChar(key);
                                }}
                                className={getKeyStyle(key)}
                            >
                                {key === 'BACKSPACE' ? <Delete size={20} /> : key}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Keyboard;
