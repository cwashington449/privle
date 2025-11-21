import React from 'react';
import { X, Trophy, Share2 } from 'lucide-react';

const ModalOverlay = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden relative animate-slideUp">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X size={24} />
            </button>
            {children}
        </div>
    </div>
);

export const WinModal = ({ wordData, score, onClose, onShowLeaderboard }) => {
    return (
        <ModalOverlay onClose={onClose}>
            <div className="p-6 text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="text-success" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Compliance Achieved!</h2>
                <div className="text-4xl font-bold text-primary mb-4 tracking-widest">{wordData.word}</div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {wordData.def}
                    </p>
                </div>

                <div className="flex items-center justify-center space-x-8 mb-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">{score}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Score</div>
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={onShowLeaderboard}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                        Submit Score to Leaderboard
                    </button>
                    <div className="text-xs text-gray-500">
                        Top scorer this month wins $30 off the Osano Store!
                    </div>
                </div>
            </div>
        </ModalOverlay>
    );
};

export const LeaderboardModal = ({ onClose }) => {
    const mockUsers = [
        { name: "PrivacyPro99", score: 150 },
        { name: "GDPR_Guru", score: 140 },
        { name: "DataDefender", score: 120 },
        { name: "CookieMonster", score: 90 },
        { name: "ConsentKing", score: 80 },
    ];

    return (
        <ModalOverlay onClose={onClose}>
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Monthly Leaderboard</h2>

                <div className="space-y-4 mb-6">
                    {mockUsers.map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <span className={`font-bold w-6 text-center ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-orange-500' : 'text-gray-500'}`}>
                                    {index + 1}
                                </span>
                                <span className="font-medium text-gray-900">{user.name}</span>
                            </div>
                            <span className="font-bold text-primary">{user.score} pts</span>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                    Close
                </button>
            </div>
        </ModalOverlay>
    );
};

export const HelpModal = ({ onClose }) => (
    <ModalOverlay onClose={onClose}>
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Play</h2>
            <ul className="space-y-3 text-gray-600 mb-6 list-disc pl-5">
                <li>Guess the <strong>Privacy Word</strong> in 6 tries.</li>
                <li>The word length varies each day.</li>
                <li>After each guess, the color of the tiles will change to show how close your guess was to the word.</li>
            </ul>

            <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-success text-white flex items-center justify-center font-bold rounded">G</div>
                    <span className="text-sm"><strong>Green</strong>: Correct letter in the correct spot.</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-warning text-white flex items-center justify-center font-bold rounded">D</div>
                    <span className="text-sm"><strong>Yellow</strong>: Correct letter in the wrong spot.</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gray-500 text-white flex items-center justify-center font-bold rounded">P</div>
                    <span className="text-sm"><strong>Gray</strong>: Letter not in the word.</span>
                </div>
            </div>

            <button
                onClick={onClose}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
                Start Playing
            </button>
        </div>
    </ModalOverlay>
);
