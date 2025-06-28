import React from 'react'

type Props = {
    children: any;
}

export default function AppContainer({children}: Props) {
  return (
    <div className='flex justify-center md:w-[1200px]'>
        {children}
    </div>
  )
}