import React from 'react';
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  classname?: string;
}

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={
        className
          ? `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`
          : 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
      }
      {...props}
    />
  );
}
