import React from 'react'
import IconWrapper from '../ui/IconWrapper';

export const DashboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <IconWrapper {...props}>
      <rect width="7" height="9" x="3" y="3" rx="1"></rect>
      <rect width="7" height="5" x="14" y="3" rx="1"></rect>
      <rect width="7" height="9" x="14" y="12" rx="1"></rect>
      <rect width="7" height="5" x="3" y="16" rx="1"></rect>
    </IconWrapper>
  )
}

