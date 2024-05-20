import { useEffect, useState } from 'react'
import { productService } from '../services/product.service.js'
import Layout from '../layouts/LayoutPages'
import ModifyProductModal from '../components/ModifyProductModal'
import { Card, Typography } from "@material-tailwind/react"
import { XCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import Swal from 'sweetalert2'

function ProductPage() {
    const [products, setProducts] = useState([])
    const [currentProduct, setCurrentProduct] = useState({ _id: '', name: '', category: '', price: '' })
    const [open, setOpen] = useState(false)


    const TABLE_HEAD = ["Nombre", "Categoría", "Precio", "Proveedor", ""]
    const TABLE_ROWS = products

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => { 
        productService.getProducts()
        .then((products) => {
            setProducts(products.map(product => ({
                ...product
            })))
        })
        .catch(error => {console.error(error)})  
    }

    const deleteProduct = (productId) => { 
        productService.deleteProduct(productId)
        .then(() => {
            getProducts()
        })
        .catch(error => {console.log(error)})
    }

    const handleOpen = (product) => {
        setCurrentProduct(product)
        setOpen(true)
    }

    const updateProduct = (id, updatedProduct) => {
        productService.updateProduct(id, updatedProduct)
       .then(() => { 
            Swal.fire({
                icon:'success',
                title: 'Producto modificado',
                text: 'El producto se ha modificado correctamente.',
            })

            getProducts()
       })
       .catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Producto no modificado',
                text: 'El producto no se ha modificado correctamente.',
            })
       })
    }

    return (
        <Layout>
        <Card className="flex-1 w-screen">
            <table className="w-full h-full min-w-max table-auto text-left">
                <thead>
                <tr>
                    {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="leading-none opacity-70 font-bold"
                        >
                        {head}
                        </Typography>
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {TABLE_ROWS.map(({ _id, name, category, price, providerId }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"
                    
                    {/* Compruebo que el proveedor existe, si existe asigno su nombre sino un mensaje de error.*/}
                    const providerName = providerId && providerId.name ? providerId.name : 'No existe el proveedor'

                    return (
                    <tr key={_id}>
                        <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {name}
                            </Typography>
                        </td>
                        <td className={`${classes} bg-blue-gray-50/50`}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {category}
                            </Typography>
                        </td>
                        <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {price}
                            </Typography>
                        </td>
                        <td className={`${classes} bg-blue-gray-50/50`}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {providerName}
                            </Typography>
                        </td>
                        <td className={`${classes} h-full flex items-center justify-around`}>
                            <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium w-6 h-6" onClick={() => deleteProduct(_id)}>
                                <XCircleIcon className='w-6 h-6 text-red-500'/>
                            </Typography>

                            <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium w-6 h-6" onClick={() => {handleOpen({_id, name, category, price})}}>
                                <PencilSquareIcon className='w-6 h-6 text-black'/>
                            </Typography>
                        </td>
                    </tr>
                    )
                })}

                {/* Si no hay datos en la base de datos, mostramos un mensaje indicándolo.*/}
                {
                    TABLE_ROWS.length === 0 && (
                    <tr>
                        <td colSpan={TABLE_HEAD.length} className="p-4">
                        <Typography variant="h5" color="blue-gray" className="font-normal">
                            NO HAY PRODUCTOS REGISTRADOS
                        </Typography>
                        </td>
                    </tr>
                    )
                }
                </tbody>
            </table>
        </Card>
        {open && <ModifyProductModal open={open} setOpen={setOpen} product={currentProduct} updateProduct={(updatedProduct) => updateProduct(currentProduct._id, updatedProduct)} />}
    </Layout>
    )
}

export default ProductPage