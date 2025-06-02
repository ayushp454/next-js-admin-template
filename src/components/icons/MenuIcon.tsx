import React from 'react'
import IconWrapper from '@/components/ui/IconWrapper'

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <IconWrapper {...props}>
      <path d="M4 12h16"></path>
      <path d="M4 18h16"></path>
      <path d="M4 6h16"></path>
    </IconWrapper>
  )
}

export default MenuIcon
