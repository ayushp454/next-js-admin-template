import React from 'react'
import IconWrapper from '@/components/ui/IconWrapper'

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <IconWrapper {...props}>
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
    </IconWrapper>
  )
}
