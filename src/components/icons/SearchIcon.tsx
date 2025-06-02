import React from 'react'
import IconWrapper from '@/components/ui/IconWrapper'

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <IconWrapper {...props}>
      <path d="m21 21-4.34-4.34"></path>
      <circle cx="11" cy="11" r="8"></circle>
    </IconWrapper>
  )
}

export default SearchIcon
