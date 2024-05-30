import Layout from '../layouts/LayoutPages.jsx'
import { providerService } from '../services/provider.service.js'
import { Input, Button, Typography } from '@material-tailwind/react'
import { useState } from 'react'
import Swal from 'sweetalert2'

function AddProviderPage() {
    const [formData, setFormData] = useState({
        name: '',
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.name) newErrors.name = 'El nombre del proveedor es obligatorio'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const createProvider = async () => {
        const { name } = formData

        const newProvider = { name: name }
        await providerService.createProvider(newProvider)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validate()) {
            try {
                createProvider()

                Swal.fire({
                    icon: 'success',
                    title: 'Proveedor creado',
                    text: 'El proveedor se ha creado correctamente.',
                })

                setFormData({
                    name: '',
                })

            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Proveedor no creado',
                    text: 'No se ha podido crear el proveedor.',
                })
            }
        }
    }

    return (
        <Layout>
            <div className='flex-1 w-full flex items-center justify-center'>
                <form onSubmit={handleSubmit}
                    className='w-80 sm:w-full max-w-md bg-secondary_purple p-6 rounded-lg shadow-lg text-main_purple flex flex-col gap-6'
                >
                    <Typography variant="h4" className='text-center text-md sm:text-2xl mb-2'> Añadir proveedor </Typography>

                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        color="purple"
                        label="Nombre del proveedor"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.name && <Typography className='text-red-500 text-sm'>{errors.name}</Typography>}

                    <Button type="submit" className='w-full mt-4 bg-main_purple'>Añadir</Button>
                </form>
            </div>
        </Layout>
    )
}

export default AddProviderPage