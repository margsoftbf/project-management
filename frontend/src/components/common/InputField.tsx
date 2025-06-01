interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

export default function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
}: InputFieldProps) {
  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full px-4 py-3 rounded-lg bg-gray-50 border ${
          error
            ? 'border-red-300 focus:ring-red-400'
            : 'border-gray-300 focus:ring-blue-500'
        } shadow-sm focus:ring-2 focus:outline-none`}
      />
      {error && <p className='mt-1 text-xs text-red-600'>{error}</p>}
    </div>
  );
}
