import React from 'react'
import '../ReactTable.css'

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <div>
      <input className='searchFilter'
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </div>
  )
}