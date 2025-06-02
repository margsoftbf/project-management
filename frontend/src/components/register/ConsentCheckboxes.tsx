interface ConsentCheckboxesProps {
  privacyConsent: boolean;
  marketingConsent: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  privacyError?: string;
}

export default function ConsentCheckboxes({
  privacyConsent,
  marketingConsent,
  onChange,
  privacyError,
}: ConsentCheckboxesProps) {
  return (
    <div className='space-y-3'>
      <div className='flex items-center'>
        <input
          name='privacyConsent'
          type='checkbox'
          checked={privacyConsent}
          onChange={onChange}
          className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
        />
        <label className='ml-2 block text-sm text-gray-900'>
          I agree to the{' '}
          <span className='text-blue-600 hover:text-blue-500 cursor-pointer'>
            Privacy Policy
          </span>
        </label>
      </div>
      {privacyError && (
        <p className='mt-1 text-xs text-red-600'>{privacyError}</p>
      )}

      <div className='flex items-center'>
        <input
          name='marketingConsent'
          type='checkbox'
          checked={marketingConsent}
          onChange={onChange}
          className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
        />
        <label className='ml-2 block text-sm text-gray-900'>
          I&apos;d like to receive marketing emails about new features
        </label>
      </div>
    </div>
  );
}
