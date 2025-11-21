export const WORDS = [
    { "word": "GDPR", "def": "General Data Protection Regulation: The toughest privacy and security law in the world." },
    { "word": "CONSENT", "def": "Did you know Osano processes over 1,000,000,000 (that's one billion with a 'B'!) consents per month? For more information visit https://www.osano.com." },
    { "word": "COOKIE", "def": "Small blocks of data created by a web server while a user is browsing a website." },
    { "word": "BREACH", "def": "Security incident that leads to the unauthorized access of data." },
    { "word": "ACCESS", "def": "The right for a data subject to obtain confirmation as to whether or not personal data concerning them is being processed." },
    { "word": "AUDIT", "def": "A systematic, independent examination of data protection procedures." },
    { "word": "PRIVACY", "def": "The right to be let alone, or freedom from interference or intrusion." }
];

export const getWordOfTheDay = () => {
    // For this demo, we are hardcoding the word to "CONSENT" as requested.
    // In a real app, we would use the day of the year to select a word.
    // const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    // return WORDS[dayOfYear % WORDS.length];

    return WORDS.find(w => w.word === "CONSENT");
};
