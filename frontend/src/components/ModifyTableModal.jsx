import { Dialog, Input, Button, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'

function ModifyTableModal({ open, setOpen, table, updateTable }) {
    const [formData, setFormData] = useState({
        name: ''
    })

    // Cuando cargamos el modal, ponemos en el formulario los datos de la mesa que queremos modificar
    useEffect(() => {
        if (table) {
            setFormData({
                tableNumber: table.tableNumber,
                capacity: table.capacity
            })
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.tableNumber < 0) { 
            Swal.fire({
                icon: 'error',
                title: 'Número de mesa incorrecto',
                text: 'El número de la mesa debe ser mayor que 0.'
            })
        }
        else if (formData.capacity < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Capacidad incorrecta',
                text: 'La capacidad de la mesa debe ser mayor que 0.'
            })
        }
        else {
            updateTable(table._id, {
                tableNumber: formData.tableNumber,
                capacity: formData.capacity
            })
        }
        setOpen(false)
    }

    return (
        <Dialog size="xs" open={open} handler={() => setOpen(!open)} className='bg-transparent shadow-none'>
            <div className='flex-1 w-full flex items-center justify-center'>
                <form className='w-full max-w-md bg-secondary_purple p-6 rounded-lg shadow-lg' onSubmit={handleSubmit}>
                    <div className='flex justify-between items-center mb-6'>
                        <Typography variant="h4" className='text-center text-main_purple'>Modificar mesa</Typography>
                        <XMarkIcon className='text-main_purple cursor-pointer w-6 h-6' onClick={() => setOpen(false)} />
                    </div>
                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2 text-main_purple'>Numero de mesa</Typography>
                        <Input
                            type="number"
                            name="tableNumber"
                            value={formData.tableNumber}
                            onChange={handleChange}
                            labelProps={{
                                className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                            }}
                            className='w-full text-main_purple border-main_purple focus:border-main_purple'
                        />
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2 text-main_purple'>Capacidad de la mesa</Typography>
                        <Input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            labelProps={{
                                className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                            }}
                            className='w-full text-main_purple border-main_purple focus:border-main_purple'
                        />
                    </div>

                    <Button type="submit" className='w-full mt-4 bg-main_purple'>Guardar</Button>
                </form>
            </div>
        </Dialog>
    )
}

// Declaramos los tipos de las propiedades que le pasan al componente
ModifyTableModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    table: PropTypes.object.isRequired,
    updateTable: PropTypes.func.isRequired
}

export default ModifyTableModal