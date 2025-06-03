interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  unit?: string;
}

const SliderControl = ({ label, value, min, max, onChange, id, unit }: SliderControlProps) => (
  <div className="mb-6">
    <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
      {label}: {value} {unit || ''}
    </label>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`Adjust ${label.toLowerCase()}`}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
    />
  </div>
);

export default SliderControl;