import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from 'react-router-dom'
import { SERVER_URL } from "../../redux/actions/actionNames";
import {useTable, useGroupBy, useFilters, useSortBy, useExpanded, usePagination} from 'react-table';
import { ColumnFilter } from "./utils/ColumnFilter";
import {format} from 'date-fns';
import _ from 'lodash';
import { formatRFC7231 } from "date-fns/fp";


export default function ReportingResultsReactTable() {
    const location = useLocation()
    const data = React.useMemo(()=>location.state,[])

    const defaultColumn = useMemo(()=>{
        return{
            Filter: ColumnFilter
        }
    },[])

    const columns = React.useMemo(()=>[
       {
           Header: 'Cod. Reserva',
           accessor: 'external_reference',
           Footer: 'Total'
       },
       {
        Header: 'Fecha',
        accessor: 'day',
        Cell: ({value})=>{return format(new Date(value), 'yyyy-MM-dd')},
        } ,
        {
            Header: 'Sede',
            accessor: 'siteName',
        } ,
        {
            Header: 'Cancha',
            accessor: 'courtName',
        } ,
        {
            Header: 'Deporte',
            accessor: 'sport',
        } ,
        {
            Header: 'Importe',
            accessor: 'finalAmount',
            Cell: props => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(props.value),
            Footer: (<span>{_.sum(_.map(data, d => d.finalAmount))}</span>)
        }  
    ],[])

    const tableInstance = useTable(
        {columns,data, defaultColumn},
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination)
   
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setPageSize,
        state,
        prepareRow,
    } = tableInstance 

    const {pageIndex, pageSize} = state

    return (
        <div>
            {!data.length ? 
            (<span>No hay resultado</span>) 
            :
            (
            <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span>
                                {column.isSorted ? 
                                (column.isSortedDesc ? ' 🔽' : ' 🔼')
                                : ''}
                            </span>
                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                            <td {...cell.getCellProps()}>
                                {cell.render('Cell')}
                            </td>
                            )
                        })}
                        </tr>
                    )
                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                        {footerGroup.headers.map(column => (
                            <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                        ))}
                        </tr>
                    ))}
                </tfoot>
                </table>
            </div>
            )}
            <div id={'paging'}>
                <span className="text-white">
                    Página{' '}
                    <strong>
                        {pageIndex + 1} de {pageOptions.length}
                    </strong>{' '}
                    
                </span>
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [10,20,30,50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Mostrar {pageSize}
                            </option>
                        ))
                    }
                </select>
                <button 
                    className="bg-blue-700 hover:bg-blue-500 text-white font-ligth  py-1 px-2 border border-blue-700 hover:border-transparent rounded w-10 h-8 align-middle text-center mx-0.5 my-1 disabled:bg-gray-300 disabled:text-black disabled:border-gray-300"
                    onClick={()=>{previousPage()}}
                    disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button
                    className="bg-blue-700 hover:bg-blue-500 text-white font-ligth  py-1 px-2 border border-blue-700 hover:border-transparent rounded w-10 h-8 align-middle text-center mx-0.5 my-1 disabled:bg-gray-300 disabled:text-black disabled:border-gray-300"
                    onClick={()=>{nextPage()}}
                    disabled={!canNextPage}>
                    {'>>'}
                </button>
            </div>
            {/* <Link to={{pathname:'/establishmentprofile', state:{visualInit: 'reporting', establishmentId:establishmentId}}}>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">
                Volver
              </button>
            </Link> */}
        </div>
    )
}