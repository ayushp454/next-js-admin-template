import React from 'react'
import IconWrapper from '@/components/ui/IconWrapper'

export const ArrowUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <IconWrapper {...props}>
      <path d="m5 12 7-7 7 7"></path>
      <path d="M12 19V5"></path>
    </IconWrapper>
  )
}
