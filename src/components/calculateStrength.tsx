import zxcvbn from 'zxcvbn';

// Interface for password strength
interface PasswordStrength {
  label: string; // Strength label (e.g., "Weak", "Moderate", "Strong")
  color: string; // Tailwind CSS class for progress bar color
  width: string; // Tailwind CSS class for progress bar width
  crackTime: string; // Estimated time to crack the password
  entropy?: string; // Optional entropy in bits
}

// Calculate password strength using zxcvbn
const calculateStrength = (password: string): PasswordStrength => {
  try {
    // Run zxcvbn analysis; return default values if password is empty
    const result = password ? zxcvbn(password) : { score: 0, crack_times_display: { offline_fast_hashing_1e10_per_second: 'N/A' } };
    const score = result.score; // zxcvbn score (0-4)
    const crackTime = result.crack_times_display.offline_fast_hashing_1e10_per_second;
    const entropy = password ? Math.log2(Math.pow(94, password.length)).toFixed(2) : '0'; // Approximate entropy

    // Map score to UI-friendly strength indicators
    const strengthConfig: Record<number, PasswordStrength> = {
      0: { label: 'Weak', color: 'bg-red-500', width: 'w-1/3', crackTime: String(crackTime), entropy },
      1: { label: 'Weak', color: 'bg-red-500', width: 'w-1/3', crackTime: String(crackTime), entropy },
      2: { label: 'Moderate', color: 'bg-yellow-500', width: 'w-2/3', crackTime: String(crackTime), entropy },
      3: { label: 'Moderate', color: 'bg-yellow-500', width: 'w-2/3', crackTime: String(crackTime), entropy },
      4: { label: 'Strong', color: 'bg-green-500', width: 'w-full', crackTime: String(crackTime), entropy },
    };

    return strengthConfig[score] || strengthConfig[0];
  } catch (error) {
    console.error('Error calculating password strength:', error);
    return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3', crackTime: 'N/A', entropy: '0' };
  }
};

export default calculateStrength;