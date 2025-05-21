import React from 'react'

const ButtonComponents = () => {
  return (
    <section id='button-components' className='bg-background p-3 border-1 border-amber-200'>
      <div>Button Components</div>
      <h2 className="text-primary-500">Buttons</h2>
        <div className="flex gap-1">
          <button className="btn-primary">Primary Button</button>
          <button className="btn-secondary">Primary Button</button>
          <button className="btn-accent">Accent Button</button>
          <button className="btn-outline">Outline Button</button>
          <button>Noraml buton</button>
        </div>
    </section>
  )
}

export default ButtonComponents;