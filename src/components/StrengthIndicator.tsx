import calculateStrength from './calculateStrength';

interface StrengthIndicatorProps {
  password: string;
}

const StrengthIndicator = ({ password }: StrengthIndicatorProps) => {
  const { label, color, width, crackTime, entropy } = calculateStrength(password);

  return (
    <div className="mb-6" aria-live="polite">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Strength: {label}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Crack Time: {crackTime} | Entropy: {entropy} bits
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
        <div className={`${color} ${width} h-2.5 rounded-full transition-all duration-300`}></div>
      </div>
    </div>
  );
};

export default StrengthIndicator;