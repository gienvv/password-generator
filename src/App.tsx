import { useState, useEffect } from 'react';
import PasswordDisplay from './components/PasswordDisplay';
import StrengthIndicator from './components/StrengthIndicator';
import SliderControl from './components/SliderControl';
import ThemeToggle from './components/ThemeToggle';

// Generate secure password based on length and complexity
const generatePassword = (length: number, complexity: number): string => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%'; // Limited symbols for safety
  let chars = lowercase;

  // Adjust character set based on complexity (1–5)
  if (complexity >= 2) chars += uppercase;
  if (complexity >= 3) chars += numbers;
  if (complexity >= 4) chars += symbols;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
};

const App = () => {
  // State management
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(12);
  const [complexity, setComplexity] = useState<number>(3);
  const [isDarkMode, setDarkMode] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Generate password on length or complexity change
  useEffect(() => {
    const newPassword = generatePassword(length, complexity);
    setPassword(newPassword);
    // removed history update
  }, [length, complexity]);

  // Toggle dark mode
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:p-12 bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Password Generator
          </h1>
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={() => setDarkMode(!isDarkMode)} />
        </div>

        {/* Password Display */}
        <PasswordDisplay password={password} />

        {/* Strength Indicator */}
        <StrengthIndicator password={password} />

        {/* Sliders */}
        <SliderControl
          label="Length"
          value={length}
          min={6}
          max={32}
          onChange={(e) => setLength(Number(e.target.value))}
          id="length-slider"
          unit="chars"
        />
        <SliderControl
          label="Complexity"
          value={complexity}
          min={1}
          max={5}
          onChange={(e) => setComplexity(Number(e.target.value))}
          id="complexity-slider"
        />

        {/* History Section removed */}

        {/* Security Tips Button */}
        <button
          className="text-blue-500 text-sm mt-4 hover:text-blue-600 transition-colors"
          onClick={() => setShowModal(true)}
          aria-label="View security tips"
        >
          Security Tips
        </button>

        {/* Security Tips Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Password Security Tips</h2>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                <li>Use unique passwords for each account.</li>
                <li>Enable two-factor authentication (2FA).</li>
                <li>Store passwords in a password manager.</li>
              </ul>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full text-sm"
                aria-label="Close security tips"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
          Securely built for cybersecurity
        </p>
      </div>
    </div>
  );
};

export default App;