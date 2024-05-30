import { useEffect, useState } from 'react'
import { productService } from '../services/product.service.js'
import { stockService } from '../services/stock.service.js'
import Layout from '../layouts/LayoutPages'
import ModifyProductModal from '../components/ModifyProductModal'
import { Card, Typography } from "@material-tailwind/react"
import { XCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import Swal from 'sweetalert2'

function ProductPage() {
    const [products, setProducts] = useState([])
    const [currentProduct, setCurrentProduct] = useState({ _id: '', name: '', category: '', price: '' })
    const [open, setOpen] = useState(false)

    const TABLE_HEAD = ["Nombre", "Categoría", "Precio", "Cantidad", "Proveedor", ""]
    const TABLE_ROWS = products

    // Al entrar por primera vez se ejecuta para cargar los productos.
    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        try {
            const products = await productService.getProducts()
            const productsWithStock = await Promise.all(products.map(async (product) => {
                const stock = await stockService.getStockByProductId(product._id)
                return {
                    ...product,
                    quantity: stock ? stock.quantity : 0
                }
            }))
            setProducts(productsWithStock)
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteProduct = (productId) => {
        productService.deleteProduct(productId)
            .then(() => {
                getProducts()
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Producto no eliminado',
                    text: 'El producto no se ha eliminado correctamente.',
                })
            })
    }

    const updateProduct = (id, updatedProduct) => {
        productService.updateProduct(id, updatedProduct)
            .then(() => {
                Swal.fire({
                    icon: 'success',
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

    // Para abrir el modal de modificar el producto. Se coge el producto actual para poder actualizarlo.
    const handleOpen = (product) => {
        setCurrentProduct(product)
        setOpen(true)
    }

    return (
        <Layout>
            <Card className="flex-1 w-screen p-4">
                <div className='grid grid-cols-6 gap-2 mb-4'>
                    {TABLE_HEAD.map((head) => (
                        <div
                            key={head}
                            className="bg-main_purple rounded-3xl text-white text-2xl font-extrabold flex items-center justify-center p-2"
                        >
                            {head}
                        </div>
                    ))}
                </div>

                <div className='grid grid-cols-6 gap-2 auto-rows-max'>
                    {TABLE_ROWS.map(({ _id, name, category, price, providerId, quantity }) => {
                        // Compruebo que el proveedor existe, si existe asigno su nombre sino un mensaje de error
                        const providerName = providerId && providerId.name ? providerId.name : 'No existe el proveedor'

                        return (
                            <>
                                <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                    {name}
                                </div>
                                <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                    {category}
                                </div>
                                <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                    {price}
                                </div>
                                <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                    {quantity}
                                </div>
                                <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                    {providerName}
                                </div>
                                <div className='bg-secondary_purple rounded-3xl p-2 flex justify-around'>
                                    <Typography variant="small" color="blue-gray" className="font-medium w-6 h-6 cursor-pointer" onClick={() => deleteProduct(_id)}>
                                        <XCircleIcon className='w-6 h-6 text-red-500' />
                                    </Typography>

                                    <Typography variant="small" color="blue-gray" className="font-medium w-6 h-6 cursor-pointer" onClick={() => { handleOpen({ _id, name, category, price }) }}>
                                        <PencilSquareIcon className='w-6 h-6 text-main_purple' />
                                    </Typography>
                                </div>
                            </>
                        )
                    })}

                    {/* Si no hay datos en la base de datos, mostramos un mensaje indicándolo. */}
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
                </div>
            </Card>

            {/* Si el modal de modificar está abierto, le pasamos el producto desde el que se ha abierto y la función para modificar el producto. */}
            {open && <ModifyProductModal open={open} setOpen={setOpen} product={currentProduct} updateProduct={updateProduct} />}
        </Layout>
    )
}

export default ProductPage