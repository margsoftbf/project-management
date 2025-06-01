interface RoleSelectorProps {
  selectedRole: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function RoleSelector({
  selectedRole,
  onChange,
  error,
}: RoleSelectorProps) {
  const roles = [
    {
      value: 'tenant',
      title: "I'm a Tenant",
      description: 'Looking for a place to rent',
    },
    {
      value: 'landlord',
      title: "I'm a Landlord",
      description: 'I have properties to rent',
    },
  ];

  return (
    <div className='space-y-3'>
      <label className='block text-sm font-medium text-gray-700'>
        Account Type
      </label>
      <div className='grid grid-cols-2 gap-4'>
        {roles.map((role) => (
          <label
            key={role.value}
            className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
              selectedRole === role.value
                ? 'border-blue-500 ring-2 ring-blue-500'
                : 'border-gray-300'
            } ${error ? 'border-red-300' : ''}`}
          >
            <input
              name='role'
              type='radio'
              value={role.value}
              checked={selectedRole === role.value}
              onChange={onChange}
              className='sr-only'
            />
            <div className='flex flex-1'>
              <div className='flex flex-col'>
                <span className='block text-sm font-medium text-gray-900'>
                  {role.title}
                </span>
                <span className='mt-1 flex items-center text-sm text-gray-500'>
                  {role.description}
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>
      {error && <p className='mt-1 text-xs text-red-600'>{error}</p>}
    </div>
  );
}
