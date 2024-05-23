import { Dialog, Input, Button, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'

function ModifyTableModal({ open, setOpen, table, updateTable }) {
    const [formData, setFormData] = useState({
        name: ''
    })

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
        updateTable(table._id, {
            tableNumber: formData.tableNumber,
            capacity: formData.capacity
        })
        setOpen(false)
    }

    return (
        <Dialog size="xs" open={open} handler={() => setOpen(!open)} className='bg-transparent shadow-none'>
            <div className='flex-1 w-full flex items-center justify-center'>
                <form className='w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-lg' onSubmit={handleSubmit}>
                    <div className='flex justify-between items-center mb-6'>
                        <Typography variant="h4" className='text-center text-gray-900'>Modificar tabla</Typography>
                        <XMarkIcon className='text-black cursor-pointer w-6 h-6' onClick={() => setOpen(false)} />
                    </div>
                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'>Numero de mesa</Typography>
                        <Input
                            type="number"
                            name="tableNumber"
                            value={formData.tableNumber}
                            onChange={handleChange}
                            className='w-full'
                        />
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'>Capacidad de la mesa</Typography>
                        <Input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            className='w-full'
                        />
                    </div>

                    <Button type="submit" className='w-full mt-4'>Guardar</Button>
                </form>
            </div>
        </Dialog>
    )
}

{/* Declaramos los tipos de las propiedades que le pasan al componente */ }
ModifyTableModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    table: PropTypes.object.isRequired,
    updateTable: PropTypes.func.isRequired
}

export default ModifyTableModal