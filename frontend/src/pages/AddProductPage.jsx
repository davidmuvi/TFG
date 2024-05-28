import Layout from '../layouts/LayoutPages.jsx'
import { productService } from '../services/product.service.js'
import { providerService } from '../services/provider.service.js'
import { Input, Button, Typography } from '@material-tailwind/react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { stockService } from '../services/stock.service.js'

function AddProductPage() {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        providerName: '',
        quantity: ''
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
        if (!formData.name) newErrors.name = 'El nombre del producto es obligatorio'
        if (!formData.category) newErrors.category = 'La categoría del producto es obligatoria'
        if (!formData.price) newErrors.price = 'El precio del producto es obligatorio'
        if (!formData.providerName) newErrors.providerName = 'El nombre del proveedor es obligatorio'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const createProduct = async () => {
        const { name, category, price, providerName, quantity } = formData
        try {
            const provider = await providerService.getProviderByName(providerName)

            if (!provider) {
                Swal.fire({
                    icon: 'error',
                    title: 'Proveedor no existe',
                    text: 'El proveedor introducido no existe.',
                })
                return
            }

            const newProduct = { name: name, category: category, price: Number(price), providerId: provider._id }
            const product = await productService.createProduct(newProduct)
            
            if (product && product._id && quantity) {
                const newStock = { productId: product._id, quantity: Number(quantity) }
                await stockService.createStock(newStock)
            }

            Swal.fire({
                icon: 'success',
                title: 'Producto creado',
                text: 'El producto se ha creado correctamente.',
            })

            setFormData({
                name: '',
                category: '',
                price: '',
                providerName: '',
                quantity: ''
            })

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Producto no creado',
                text: 'No se ha podido crear el producto.',
            })
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            createProduct()
        }
    }


    return (
        <Layout>
            <div className='flex-1 w-full flex items-center justify-center'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-lg'>
                    <Typography variant="h4" className='text-center mb-6 text-gray-900'> Añadir producto </Typography>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Nombre del producto </Typography>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.name && <Typography className='text-red-500 text-sm'>{errors.name}</Typography>}
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Categoría del producto </Typography>
                        <Input
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.category && <Typography className='text-red-500 text-sm'>{errors.category}</Typography>}
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Precio del producto </Typography>
                        <Input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.price && <Typography className='text-red-500 text-sm'>{errors.price}</Typography>}
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Nombre del proveedor </Typography>
                        <Input
                            type="text"
                            name="providerName"
                            value={formData.providerName}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.providerName && <Typography className='text-red-500 text-sm'>{errors.providerName}</Typography>}
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Cantidad del producto </Typography>
                        <Input
                            type="text"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className='w-full'
                        />
                    </div>

                    <Button type="submit" className='w-full mt-4'>Añadir</Button>
                </form>
            </div>
        </Layout>
    )
}

export default AddProductPage