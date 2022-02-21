import React from 'react'

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <div>
      <input className="text-black text-center"
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </div>
  )
}