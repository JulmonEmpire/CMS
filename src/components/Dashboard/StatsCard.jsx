import React from 'react'

export default function StatsCard({count}) {
  return (
    <div className='w-[250px] h-[200px] bg-[white] shadow-lg rounded-lg'>
      <p>{count}</p>
    </div>
  )
}
