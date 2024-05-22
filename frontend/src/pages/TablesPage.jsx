import { useEffect, useState } from 'react'
import { tableService } from '../services/table.service.js'
import Layout from '../layouts/LayoutPages'
import { Card, Typography } from "@material-tailwind/react"
import { XCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import Swal from 'sweetalert2'
import ModifyTableModal from '../components/ModifyTableModal.jsx'
function TablesPage() {
    const [tables, setTables] = useState([])
    const [currentTable, setCurrentTable] = useState({ _id: '', tableNumber: 0, capacity: 0 })
    const [open, setOpen] = useState(false)

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
            .catch(error => { console.error(error) })
    }

    const deleteTable = (tableId) => {
        tableService.deleteTable(tableId)
            .then(() => {
                getTables()
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar la mesa',
                    text: 'No se ha podido eliminar la mesa.',
                })
            })
    }

    const updateTable = (id, updatedTable) => {
        tableService.updateTable(id, updatedTable)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Mesa modificada',
                    text: 'La mesa se ha modificado correctamente.',
                })
                getTables()
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al modificar la mesa',
                    text: 'No se ha podido modificar la mesa.',
                })
            })
    }

    const handleOpen = (table) => {
        setCurrentTable(table)
        setOpen(true)
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
            .catch(error => { console.error(error) })
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
                            const isLast = index === TABLE_ROWS.length - 1
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"

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
                                    <td className={`${classes} bg-blue-gray-50/50 h-full flex items-center justify-around`}>
                                        <Typography as="a"
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium w-6 h-6 cursor-pointer"
                                            onClick={() => deleteTable(_id)}
                                        >
                                            <XCircleIcon className='w-6 h-6 text-red-500' />
                                        </Typography>

                                        <Typography as="a"
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium w-6 h-6 cursor-pointer"
                                            onClick={() => handleOpen({ _id, tableNumber, capacity })}
                                        >
                                            <PencilSquareIcon className='w-6 h-6 text-black' />
                                        </Typography>
                                    </td>
                                </tr>
                            )
                        })}

                        {/* Si no hay datos en la base de datos, mostramos un mensaje indicándolo.*/}
                        {
                            TABLE_ROWS.length === 0 && (
                                <tr>
                                    <td colSpan={TABLE_HEAD.length} className="p-4">
                                        <Typography variant="h5" color="blue-gray" className="font-normal">
                                            NO HAY MESAS REGISTRADAS
                                        </Typography>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </Card>
            {open && <ModifyTableModal open={open} setOpen={setOpen} table={currentTable} updateTable={updateTable} />}
        </Layout>
    )
}

export default TablesPage