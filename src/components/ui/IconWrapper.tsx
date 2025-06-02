import React from 'react';

interface IconWrapperProps extends React.SVGProps<SVGSVGElement> {
  children?: React.ReactNode;
  className?: string;
}

const IconWrapper = ({ children, className, ...props }: IconWrapperProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export default IconWrapper;
