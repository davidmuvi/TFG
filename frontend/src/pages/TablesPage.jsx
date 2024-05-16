import { useEffect, useState } from 'react'
import { tableService } from '../services/table.service.js'
import Layout from '../layouts/LayoutPages'
import { Card, Typography } from "@material-tailwind/react"
import { XCircleIcon } from '@heroicons/react/24/solid'
function TablesPage() {
    const [tables, setTables] = useState([])

    const TABLE_HEAD = ["Numero de mesa", "Capacidad", "Disponibilidad", ""]
    const TABLE_ROWS = tables

    useEffect(() => {
        getTables()
    }, [])

    const getTables = () => { 
        tableService.getTables()
        .then((tables) => {
            // Le pongo la propiedad availability a cada objeto de la lista de mesas, ya que esta no es necesaria en la base de datos.
            setTables(tables.map(table => ({
                ...table,
                availability: ''
            })))
            getAvailability(tables)
        })
        .catch(error => {console.error(error)})  
    }

    const deleteTable = (tableId) => { 
        tableService.deleteTable(tableId)
        .then(() => {
            getTables()
        })
        .catch(error => {console.log(error)})
    }

    // Esta función se encarga de obtener las mesas que no tienen disponibilidad, 
    // y luego compara con la lista de todas las mesas para ver cuáles están disponibles.
    const getAvailability = (tables) => { 
        tableService.getTablesWithoutAvailability()
        .then((response) => {
            const unavailableTableNumbers = response.map(table => table.tableNumber)
            setTables(tables.map(table => ({
                ...table,
                availability: unavailableTableNumbers.includes(table.tableNumber) ? 'No disponible' : 'Disponible'
            })))
        })
        .catch(error => {console.error(error)})
    }

    return (
        <Layout>
            <Card className="flex-1 w-screen">
                <table className="w-full h-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="leading-none opacity-70 font-bold"
                            >
                            {head}
                            </Typography>
                        </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {TABLE_ROWS.map(({ _id, tableNumber, capacity, availability }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            
                        return (
                        <tr key={tableNumber}>
                            <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {tableNumber}
                            </Typography>
                            </td>
                            <td className={`${classes} bg-blue-gray-50/50`}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {capacity}
                            </Typography>
                            </td>
                            <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {availability}
                            </Typography>
                            </td>
                            <td className={`${classes} bg-blue-gray-50/50 h-full flex items-center justify-center`}>
                            <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium w-6 h-6" onClick={() => deleteTable(_id)}>
                                <XCircleIcon className='w-6 h-6 text-red-500'/>
                            </Typography>
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            </Card>
        </Layout>
    )
}

export default TablesPage