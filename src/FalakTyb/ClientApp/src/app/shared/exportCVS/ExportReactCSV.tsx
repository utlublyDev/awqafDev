import React from 'react'
import { CSVLink } from 'react-csv'


export const ExportReactCSV = ({csvData, fileName}) => {
    return (
        <button >
            <CSVLink data={csvData} filename={fileName}>Export</CSVLink>
        </button>
    )
}