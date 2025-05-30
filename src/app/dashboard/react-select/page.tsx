'use client'
import React, { useState } from 'react'
import Select, { StylesConfig } from 'react-select';


const ReactSelectPage = () => {
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const customStyles: StylesConfig = {
    option: (style, props) => {
      console.log(style, "<--- Style");
      console.log(props, "<--- Props");
      return {
        ...style,
        color: props.isSelected ? '#fff' : '#000',
        borderRadius: '5px',
        backgroundColor: props.isSelected ? 'var(--react-select-selected)' : props.isFocused ? 'var(--react-select-hover)' : '#fff',
      };
    }
  }
  return (
    <div className='relative p-4 bg-gray-100'>
      <h1 className='text-center text-2xl font-bold text-gray-800'>React Select Page</h1>
      <hr className='dark:text-white my-4'/>
      <div className='relative max-w-md mx-auto'>
        <label
          htmlFor={'temp_id'}
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          Country
        </label>
        <Select
          inputId="temp_id"
          options={options}
          // classNames={customClassNames}
          styles={customStyles}
          isClearable={true}
          isSearchable={true}
          value={selectedOption}
          onChange={(newValue) => setSelectedOption(newValue as { value: string; label: string } | null)}
          // classNamePrefix="custom_Select"
          menuIsOpen={true}
          // isMulti={true}
        />
      </div>
    </div>
  )
}

export default ReactSelectPage
