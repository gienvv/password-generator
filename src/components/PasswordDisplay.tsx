import { useState } from 'react';

interface PasswordDisplayProps {
  password: string;
}

const PasswordDisplay = ({ password }: PasswordDisplayProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  // Copy password to clipboard with error handling
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative mb-6" aria-live="polite">
      <input
        type="text"
        value={password}
        readOnly
        className="w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        aria-label="Generated password"
      />
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors min-h-[48px] min-w-[48px] text-sm"
        aria-label="Copy password to clipboard"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default PasswordDisplay;