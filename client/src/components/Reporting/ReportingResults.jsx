import React, { useMemo, useRef } from "react";
import { useLocation, Link} from 'react-router-dom'
import {useTable, useGroupBy, useFilters, useSortBy, useExpanded, usePagination} from 'react-table';
import { ColumnFilter } from "./utils/ColumnFilter";
import {format} from 'date-fns';
import {useReactToPrint} from 'react-to-print'
import './ReactTable.css'


export default function ReportingResultsReactTable() {
    const location = useLocation()
    const establishmentDetail = location.state.establishmentDetail
    const data = React.useMemo(()=>location.state.data,[])


    const defaultColumn = useMemo(()=>{
        return{
            Filter: ColumnFilter
        }
    },[])

    const columns = React.useMemo(()=>[
       {
           Header: 'Cod. Reserva',
           accessor: 'external_reference',
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
            Footer: <div>
                <div>Total</div>
                <div>Total -5% comisión</div>
            </div>
        } ,
        {
            Header: 'Importe',
            accessor: 'finalAmount',
            Cell: props => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits:0}).format(props.value),
            Footer: <div>
                        <div>{(data.reduce((total, { finalAmount }) => total += finalAmount, 0)).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' , maximumFractionDigits:0})}</div>
                        <div>{(data.reduce((total, { finalAmount }) => total += finalAmount*0.95, 0)).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' , maximumFractionDigits:0})}</div>
                    </div>
        }  
    ],[])

    const tableInstance = useTable(
        {columns,data, defaultColumn, initialState:{pageSize:999999999}},
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
        state: {pageIndex, pageSize},
        prepareRow,
    } = tableInstance 

    // const {pageIndex, pageSize} = state

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: ()=> componentRef.current,
    })

    return (
        <div>
            <span>
                <Link to={{pathname:'/establishmentprofile', state:{visualInit: 'reporting', estabDetailInit:establishmentDetail}}}>
                    <button className="bg-blue-700 hover:bg-blue-500 text-white font-ligth  py-1 px-2 border border-blue-700 hover:border-transparent rounded h-8 align-middle text-center mx-3 my-2 disabled:bg-gray-300 disabled:text-black disabled:border-gray-300">
                        Volver
                    </button>
                </Link>
                <button 
                className="bg-blue-700 hover:bg-blue-500 text-white font-ligth  py-1 px-2 border border-blue-700 hover:border-transparent rounded h-8 align-middle text-center mx-3 my-2 disabled:bg-gray-300 disabled:text-black disabled:border-gray-300"
                onClick={handlePrint}>
                    Imprimir
                </button>
                    
            </span>
            {!data.length ? 
            (<h1 className='tituloTabla'>No existen reservas para los filtros selecionados</h1>) 
            :
            (
            <div>
                
                <div ref={componentRef}>
                    <h1 className="text-black bg-blue-300">Reporte de reservas</h1>
                    <div className="overflow-y-auto max-h-[78vh] m-[0.5vw] ml-[1vw] mt-0 tableFixHead">
                        <table className="w-full border-collapse border border-slate-500 reactTable">
                            <thead className="sticky top-0">
                                {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className="border-2 border-solid border-[#ddd] p-[6px] bg-[#04AA6D] text-white">
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
                            <tbody {...getTableBodyProps()} className="h-[10px]">
                                {page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                        <td {...cell.getCellProps()} className="border-2 border-solid border-[#ddd] p-[6px]">
                                            {cell.render('Cell')}
                                        </td>
                                        )
                                    })}
                                    </tr>
                                )
                                })}
                            </tbody>
                            <tfoot className="sticky bottom-0">
                                {footerGroups.map(footerGroup => (
                                    <tr {...footerGroup.getFooterGroupProps()} className="sticky bottom-0">
                                    {footerGroup.headers.map(column => (
                                        <td {...column.getFooterProps()} className="border-2 border-solid border-[#ddd] p-[6px]">{column.render('Footer')}</td>
                                    ))}
                                    </tr>
                                    
                                ))}
                            </tfoot>
                        </table>
                    </div>
                </div>
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
                        [10,20,30,50,999999999].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                    Mostrar {pageSize<100? pageSize : 'Todo'}
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
            
        </div>
    )
}