import React from 'react';
import IconWrapper from '../ui/IconWrapper';

export const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <IconWrapper {...props}>
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'></path>
      <path d='M16 3.128a4 4 0 0 1 0 7.744'></path>
      <path d='M22 21v-2a4 4 0 0 0-3-3.87'></path>
      <circle cx='9' cy='7' r='4'></circle>
    </IconWrapper>
  );
};
