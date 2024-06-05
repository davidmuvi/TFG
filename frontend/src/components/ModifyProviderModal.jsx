import { Dialog, Input, Button, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'

function ModifyProviderModal({ open, setOpen, provider, updateProvider }) {
    const [formData, setFormData] = useState({
        name: ''
    })

    // Cuando cargamos el modal, ponemos en el formulario los datos del proveedor que queremos modificar
    useEffect(() => {
        if (provider) {
            setFormData({
                name: provider.name
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
        updateProvider(provider._id, {
            name: formData.name
        })
        setOpen(false)
    }

    return (
        <Dialog size="xs" open={open} handler={() => setOpen(!open)} className='bg-transparent shadow-none'>
            <div className='flex-1 w-full flex items-center justify-center'>
                <form className='w-full max-w-md bg-secondary_purple p-6 rounded-lg shadow-lg' onSubmit={handleSubmit}>
                    <div className='flex justify-between items-center mb-6'>
                        <Typography variant="h4" className='text-center text-main_purple'>Modificar proveedor</Typography>
                        <XMarkIcon className='text-main_purple cursor-pointer w-6 h-6' onClick={() => setOpen(false)} />
                    </div>
                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2 text-main_purple'>Nombre del proveedor</Typography>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
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
ModifyProviderModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    provider: PropTypes.object.isRequired,
    updateProvider: PropTypes.func.isRequired
}

export default ModifyProviderModal