import React from 'react';
import { HelpCircle, BarChart2 } from 'lucide-react';

const Header = ({ onHelpClick, onStatsClick }) => {
    return (
        <header className="relative flex items-center justify-center px-4 py-3 border-b border-gray-200 bg-white">
            <h1 className="text-3xl font-bold text-primary tracking-tight">Privle</h1>
            <div className="absolute right-4 flex items-center space-x-2">
                <button
                    onClick={onHelpClick}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                    aria-label="Help"
                >
                    <HelpCircle size={24} />
                </button>
                <button
                    onClick={onStatsClick}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                    aria-label="Statistics"
                >
                    <BarChart2 size={24} />
                </button>
            </div>
        </header>
    );
};

export default Header;
