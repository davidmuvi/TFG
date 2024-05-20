import { Dialog, Input, Button, Typography } from '@material-tailwind/react'
import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'

function ModifyProductModal({ open, setOpen, product, updateProduct }) {
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: ''
    })

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
        if (!formData.category) newErrors.category = 'La categoría del producto es obligatorio'
        if (!formData.price) newErrors.price = 'El precio del producto es obligatorio'	

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()){
            updateProduct(product, { 
                name: formData.name,
                category: formData.category,
                price: formData.price 
            })
            setOpen(false)
        }
    }

    return (
        <Dialog size="xs" open={open} handler={() => setOpen(!open)} className='bg-transparent shadow-none'>
            <div className='flex-1 w-full flex items-center justify-center'>
                <form className='w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-lg' onSubmit={handleSubmit}>
                    <div className='flex justify-between items-center mb-6'>
                        <Typography variant="h4" className='text-center text-blue-500'>Modificar producto</Typography>
                        <XMarkIcon className='text-black cursor-pointer w-6 h-6' onClick={() => setOpen(false)} />
                    </div>
                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'>Nombre del producto</Typography>
                        <Input 
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.name && <Typography className='text-red-500 text-sm'>{errors.name}</Typography>}
                    </div>
                    <div>
                        <Typography variant="h6" className='mb-2'>Categoría del producto</Typography>
                        <Input 
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.category && <Typography className='text-red-500 text-sm'>{errors.category}</Typography>}
                    </div>
                    <div>
                        <Typography variant="h6" className='mb-2'>Precio del producto</Typography>
                        <Input 
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.price && <Typography className='text-red-500 text-sm'>{errors.price}</Typography>}
                    </div>
                    
                    <Button type="submit" color="blue" className='w-full mt-4'>Guardar</Button>
                </form>
            </div>
        </Dialog>
    )
}

{/* Declaramos los tipos de las propiedades que le pasan al componente */}
ModifyProductModal.propTypes = { 
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    updateProduct: PropTypes.func.isRequired
}
export default ModifyProductModal