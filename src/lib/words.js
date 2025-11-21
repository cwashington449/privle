export const WORDS = [
    { "word": "CONSENT", "def": "Did you know Osano processes over 1,000,000,000 (that's one billion with a 'B'!) consents per month? For more information visit https://www.osano.com." },
    { "word": "TRUST", "def": "Trust is the foundation of privacy. 60% of consumers are willing to spend more with brands they trust to protect their data." },
    { "word": "BOLD", "def": "One of Osano's core values is 'Bold Action'. We believe in moving fast and going against the grain to make privacy accessible to all." },
    { "word": "RIGHTS", "def": "Data Subject Access Rights (DSAR) allow individuals to request access to or deletion of their data. Osano automates this complex process." },
    { "word": "VENDOR", "def": "The average company shares data with 730 vendors. Osano's database tracks over 11,000 vendors to help manage this risk." },
    { "word": "MAPPING", "def": "Data Mapping is crucial for compliance. Osano automates the discovery of where personal information lives across your systems." },
    { "word": "COOKIE", "def": "Osano is the most popular cookie compliance solution globally, used on over 900,000 websites." },
    { "word": "POLICY", "def": "Privacy policies must be clear and up-to-date. Osano helps generate and manage policies that comply with laws in 50+ countries." },
    { "word": "RISK", "def": "Third parties are responsible for 2 out of 3 data breaches. Osano's Vendor Risk Management helps you assess and monitor these risks." },
    { "word": "DATA", "def": "Data privacy is a fundamental human right. Osano's mission is to empower businesses and consumers with knowledge about data sharing." },
    { "word": "SECURE", "def": "Companies with poor privacy practices are nearly 2x as likely to suffer a data breach. Security and privacy go hand in hand." },
    { "word": "LAWS", "def": "The privacy landscape is complex. Osano helps organizations comply with over 95 privacy laws across more than 50 countries." },
    { "word": "GLOBAL", "def": "Privacy is a global issue. Osano supports consent banners and interfaces in over 40 languages to reach users everywhere." },
    { "word": "FINES", "def": "Non-compliance can be costly. Osano offers a 'No Fines, No Penalties' guarantee for its customers." },
    { "word": "AUDIT", "def": "Accountability matters. Osano provides detailed audit trails of how user consent preferences have changed over time." },
    { "word": "ACCESS", "def": "The 'Right of Access' lets users see what data you hold on them. Osano simplifies fulfilling these requests." },
    { "word": "BREACH", "def": "Organizations with inadequate privacy practices are 80% more likely to experience a data breach." },
    { "word": "SAFETY", "def": "94% of organizations believe customers won't buy from them if data isn't properly protected. Safety builds loyalty." },
    { "word": "ETHICS", "def": "Osano is a Certified B-Corp and Public Benefit Corporation, committed to balancing profit with purpose." },
    { "word": "VALUE", "def": "Privacy isn't just compliance; it's a business value. 'Delightful Experience' is one of Osano's core values." },
    { "word": "GUARD", "def": "Osano acts as a guardian for your data compliance, monitoring regulatory changes so you don't have to." },
    { "word": "RULES", "def": "With regulations changing constantly, Osano helps you play by the rules without slowing down your business." }
];

export const getWordOfTheDay = () => {
    // Simple day of year logic:
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);

    // Modulo to loop through the words.
    // Adding offset of 4 so that Nov 21 (Day 326 in 2024) maps to index 0 (CONSENT)
    // 326 % 22 = 18. We need 0. So (326 + 4) % 22 = 0.
    return WORDS[(day + 4) % WORDS.length];
};
