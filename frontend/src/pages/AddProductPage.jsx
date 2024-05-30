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
                <form onSubmit={handleSubmit}
                    className='w-80 sm:w-full max-w-md bg-secondary_purple p-6 rounded-lg shadow-lg text-main_purple flex flex-col gap-6'
                >
                    <Typography variant="h4" className='text-center text-md sm:text-2xl mb-2'> Añadir producto </Typography>

                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        color="purple"
                        label="Nombre del producto"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.name && <Typography className='text-red-500 text-sm'>{errors.name}</Typography>}

                    <Input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        color="purple"
                        label="Categoría del producto"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.category && <Typography className='text-red-500 text-sm'>{errors.category}</Typography>}

                    <Input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        color="purple"
                        label="Precio del producto"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.price && <Typography className='text-red-500 text-sm'>{errors.price}</Typography>}

                    <Input
                        type="text"
                        name="providerName"
                        value={formData.providerName}
                        onChange={handleChange}
                        color="purple"
                        label="Nombre del proveedor"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.providerName && <Typography className='text-red-500 text-sm'>{errors.providerName}</Typography>}

                    <Input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        color="purple"
                        label="Cantidad del producto"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />

                    <Button type="submit" className='w-full mt-4 bg-main_purple'>Añadir</Button>
                </form>
            </div>
        </Layout>
    )
}

export default AddProductPage