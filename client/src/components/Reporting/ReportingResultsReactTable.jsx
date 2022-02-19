import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom'
import { SERVER_URL } from "../../redux/actions/actionNames";
import {useTable, useGroupBy, useFilters, useSortBy, useExpanded, usePagination} from 'react-table';


export default function ReportingResultsReactTable() {
    const location = useLocation()
    const data = React.useMemo(()=>location.state,[])

    const columns = React.useMemo(()=>[
       {
           Header: 'Cod. Reserva',
           accessor: 'external_reference'
       },
       {
        Header: 'Fecha',
        accessor: 'day'
        } ,
        {
            Header: 'Sede',
            accessor: 'siteName'
        } ,
        {
            Header: 'Cancha',
            accessor: 'courtName'
        } ,
        {
            Header: 'Deporte',
            accessor: 'sport'
        } ,
        {
            Header: 'Importe',
            accessor: 'finalAmount'
        }  
    ],[])

    const tableInstance = useTable(
        {columns,data},
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination)
   
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance 

    console.log('rows',rows)

    return (
        <div className="w-[20rem] overflow-x-auto sm:w-full my-5">
            {!data.length ? 
            (<span>No hay resultado</span>) 
            :
            (
            <div>
            <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps()}
                            style={{
                            borderBottom: 'solid 3px red',
                            background: 'aliceblue',
                            color: 'black',
                            fontWeight: 'bold',
                            }}
                        >
                            {column.render('Header')}
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                            <td
                                {...cell.getCellProps()}
                                style={{
                                padding: '10px',
                                border: 'solid 1px gray',
                                background: 'papayawhip',
                                }}
                            >
                                {cell.render('Cell')}
                            </td>
                            )
                        })}
                        </tr>
                    )
                    })}
                </tbody>
                </table>
            </div>
            )}
            {/* <Link to={{pathname:'/establishmentprofile', state:{visualInit: 'reporting', establishmentId:establishmentId}}}>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">
                Volver
              </button>
            </Link> */}
        </div>
    )
}