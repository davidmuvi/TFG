import { useEffect, useState } from 'react'
import { tableService } from '../services/table.service.js'
import Layout from '../layouts/LayoutPages'
import { Card, Typography } from "@material-tailwind/react"
import { XCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import Swal from 'sweetalert2'
import ModifyTableModal from '../components/ModifyTableModal.jsx'
import PropTypes from "prop-types"

function TablesPage({ bookings }) {
    const [tables, setTables] = useState([])
    const [currentTable, setCurrentTable] = useState({ _id: '', tableNumber: 0, capacity: 0 })
    const [open, setOpen] = useState(false)

    const TABLE_HEAD = ["Numero de mesa", "Capacidad", "Disponibilidad", ""]
    const TABLE_ROWS = tables

    useEffect(() => {
        getTables()
    }, [bookings])

    const getTables = async () => {
        try {
            // Recuperamos todos las tablas sin el campo availability y creamos un array vació donde meteremos las tablas y le añadiremos el campo.
            const tables = await tableService.getTables()
            const tablesWithAvailabilityField = []
            for (const table of tables) {
                const availability = await getAvailability(table)
                tablesWithAvailabilityField.push({ ...table, availability })
            }

            setTables(tablesWithAvailabilityField)
        } catch (error) {
            console.log(error.message)
        }
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
    const getAvailability = async (table) => {
        try {
            // El método some recorre el array y comprueba que al menos un elemento cumpla la condición.
            // En este caso, si cumple la condición, devolvería true y lo revertimos porque si hay una coincidencia no está disponible.
            let isAvailable
            if (bookings.length > 0) {
                bookings.forEach((booking) => {
                    if (booking.tableId && booking.tableId._id === table._id) {
                        isAvailable = false
                        return
                    } else {
                        isAvailable = true
                        return
                    }
                })
            }
            else {
                isAvailable = true
            }

            return isAvailable ? 'Disponible' : 'No disponible'
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <Card className="flex-1 w-screen p-4">
                <div className='grid grid-cols-4 gap-2 mb-4'>
                    {TABLE_HEAD.map((head) => (
                        <div
                            key={head}
                            className="bg-main_purple rounded-3xl text-white text-2xl font-extrabold flex items-center justify-center p-2"
                        >
                            {head}
                        </div>
                    ))}
                </div>
                    <div className='grid grid-cols-4 gap-2 auto-rows-max'>
                        {TABLE_ROWS.map(({ _id, tableNumber, capacity, availability }) => {
                            return (
                                <>
                                    <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                            {tableNumber}
                                    </div>
                                    <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                            {capacity}
                                    </div>
                                    <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                            {availability}
                                    </div>
                                    <div className='bg-secondary_purple rounded-3xl p-2 flex justify-around'>
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
                                            <PencilSquareIcon className='w-6 h-6 text-main_purple' />
                                        </Typography>
                                    </div>
                                </>
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
                    </div>
            </Card>
            {open && <ModifyTableModal open={open} setOpen={setOpen} table={currentTable} updateTable={updateTable} />}
        </Layout>
    )
}

TablesPage.propTypes = {
    bookings: PropTypes.array.isRequired,
}

export default TablesPage