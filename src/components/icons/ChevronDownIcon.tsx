import React from 'react'
import IconWrapper from '@/components/ui/IconWrapper'

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <IconWrapper {...props}>
      <path d="m6 9 6 6 6-6"></path>
    </IconWrapper>
  )
}
