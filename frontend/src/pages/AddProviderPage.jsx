import Layout from '../layouts/LayoutPages.jsx'
import { providerService } from '../services/provider.service.js'
import { Input, Button, Typography } from '@material-tailwind/react'
import { useState } from 'react'
import Swal from 'sweetalert2'

function AddProviderPage() { 
    const [formData, setFormData] = useState({
        name: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'El nombre del proveedor es obligatorio';
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createProvider = async () => {
        const { name } = formData;

        const newProvider = { name: name };
        await providerService.createProvider(newProvider)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                createProvider() 

                Swal.fire({
                    icon:'success',
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
    };

    return (
        <Layout> 
            <div className='flex-1 w-full flex items-center justify-center'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-lg'>
                    <Typography variant="h4" className='text-center mb-6 text-blue-500'> Añadir proveedor </Typography>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Nombre del proveedor </Typography>
                        <Input 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.name && <Typography className='text-red-500 text-sm'>{errors.name}</Typography>}
                    </div>

                    <Button type="submit" color="blue" className='w-full mt-4'>Añadir</Button>
                </form>
            </div>
        </Layout>
    )
}

export default AddProviderPage