import React from 'react'
import IconWrapper from '@/components/ui/IconWrapper'

export const TableIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <IconWrapper {...props}>
      <path d="M12 3v18"></path>
      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
      <path d="M3 9h18"></path>
      <path d="M3 15h18"></path>
    </IconWrapper>
  )
}
