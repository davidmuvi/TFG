import { useEffect, useState } from 'react'
import { tableService } from '../services/table.service.js'
import Layout from '../layouts/LayoutPages'
import { Card, Spinner, Typography } from "@material-tailwind/react"
import { XCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import Swal from 'sweetalert2'
import ModifyTableModal from '../components/ModifyTableModal.jsx'
import PropTypes from "prop-types"

function TablesPage({ bookings }) {
    const [tables, setTables] = useState([])
    const [currentTable, setCurrentTable] = useState({ _id: '', tableNumber: 0, capacity: 0 })
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    const TABLE_HEAD = ["Numero de mesa", "Capacidad", "Disponibilidad", ""]
    const TABLE_ROWS = tables

    useEffect(() => {
        getTables()
    }, [bookings])

    const getTables = async () => {
        try {
            // Recuperamos todos las mesas sin el campo availability.
            const tables = await tableService.getTables()

            // Recuperamos la disponibilidad de cada una de las mesas y creamos un array con las mesas y el campo para la disponibilidad.
            const tablesWithAvailabilityField = await Promise.all(tables.map(async (table) => {
                const availability = await getAvailability(table)
                return {...table, availability }
            }))
            setTables(tablesWithAvailabilityField)
            setLoading(false)
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

    // Esta función se encarga de asignar la disponibilidad de las mesas.
    const getAvailability = async (table) => {
        try {
            // Si alguna reserva coincide con la mesa, se le asignará No disponible.
            const isAvailable = !bookings.some((booking) => booking.tableId && booking.tableId._id === table._id)
            return isAvailable ? 'Disponible' : 'No disponible'
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            {loading ?
                <div className='w-full flex-1 flex items-center justify-center'>
                    <Spinner className='h-12 w-12' />
                </div> :
                <Card className="flex-1 w-screen p-4">
                    <div className='grid grid-cols-4 gap-2 mb-4'>
                        {TABLE_HEAD.map((head) => (
                            <div
                                key={head}
                                className="px-5 text-xs bg-main_purple rounded-3xl text-white lg:text-2xl md:font-extrabold flex items-center justify-center md:p-2"
                            >
                                {head}
                            </div>
                        ))}
                    </div>
                    <div className='grid grid-cols-4 gap-2 auto-rows-max'>
                        {TABLE_ROWS.map(({ _id, tableNumber, capacity, availability }) => {
                            return (
                                <>
                                    <div className='bg-secondary_purple rounded-3xl p-2 flex items-center justify-center text-main_purple font-bold'>
                                        {tableNumber}
                                    </div>
                                    <div className='bg-secondary_purple rounded-3xl p-2 flex items-center justify-center text-main_purple font-bold'>
                                        {capacity}
                                    </div>
                                    <div className='text-sm text-center md:text-base bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                        {availability}
                                    </div>
                                    <div className='bg-secondary_purple rounded-3xl p-2 flex items-center justify-around'>
                                        <Typography as="a"
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium cursor-pointer"
                                            onClick={() => deleteTable(_id)}
                                        >
                                            <XCircleIcon className='w-5 h-5 md:w-6 md:h-6 text-red-500' />
                                        </Typography>

                                        <Typography as="a"
                                            variant="small"
                                            color="blue-gray"
                                            className="font-medium cursor-pointer"
                                            onClick={() => handleOpen({ _id, tableNumber, capacity })}
                                        >
                                            <PencilSquareIcon className='w-5 h-5 md:w-6 md:h-6 text-main_purple' />
                                        </Typography>
                                    </div>
                                </>
                            )
                        })}

                        {/* Si no hay datos en la base de datos, mostramos un mensaje indicándolo.*/}
                        {
                            TABLE_ROWS.length === 0 && (
                                <>
                                    <div className="p-4 col-span-4">
                                        <Typography variant="h5" className="font-normal text-main_purple">
                                            NO HAY MESAS REGISTRADAS
                                        </Typography>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </Card>
            }
            {open && <ModifyTableModal open={open} setOpen={setOpen} table={currentTable} updateTable={updateTable} />}
        </Layout>
    )
}

TablesPage.propTypes = {
    bookings: PropTypes.array.isRequired,
}

export default TablesPage