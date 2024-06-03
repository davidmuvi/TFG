import { useEffect, useState } from 'react'
import { orderService } from '../services/order.service.js'
import { productService } from '../services/product.service.js'
import { Dialog, Typography } from '@material-tailwind/react'
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'
import { stockService } from '../services/stock.service.js'

function OrderModal({ openOrderModal, setOpenOrderModal, bookingId }) {
    const [order, setOrder] = useState([])
    const [productsWithStock, setProductsWithStock] = useState([])
    const [formData, setFormData] = useState({
        product: ''
    })

    useEffect(() => {
        getOrderByBookingId()
        getProductsWithStock()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const getProductsWithStock = async () => {
        try {
            const products = await productService.getProducts()
            const productsWithStock = await Promise.all(products.map(async (product) => {
                const stock = await stockService.getStockByProductId(product._id)
                return {
                    ...product,
                    quantity: stock ? stock.quantity : 0
                }
            }))

            // Filtramos los productos que están disponibles, ya que su stock es positivo.
            const availableProducts = productsWithStock.filter(product => product.quantity > 0)
            setProductsWithStock(availableProducts)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getOrderByBookingId = async () => {
        try {
            let order = await orderService.getOrderByBookingId(bookingId)
            if (!order) {
                order = await orderService.createOrder({ bookingId: bookingId, products: [] })
            }
            setOrder(order)
        } catch (error) {
            console.log(error)
        }
    }

    const updateOrderByBookingId = (bookingId, productName) => {
        productService.getProductByName(productName)
            .then((product) => {
                if (product) {
                    orderService.updateOrderByBookingId(bookingId, product._id)
                        .then(() => {
                            getOrderByBookingId()
                            stockService.decreaseStockByProductId(product._id, 1)
                            setFormData({ product: '' })
                            getProductsWithStock()
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            })
    }

    const deleteProductInOrderByBookingId = (bookingId, productId) => {
        orderService.deleteProductInOrderByBookingId(bookingId, productId)
            .then(() => {
                getOrderByBookingId()
                stockService.increaseStockByProductId(productId, 1)
                getProductsWithStock()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Dialog
            size="lg"
            open={openOrderModal}
            handler={() => setOpenOrderModal(!openOrderModal)}
            className='bg-transparent shadow-none flex items-center justify-center h-full'
        >
            <div className='w-full h-2/3 max-w-md bg-secondary_purple p-6 rounded-lg shadow-lg flex flex-col justify-between'>
                <div className='flex justify-between items-center mb-6'>
                    <Typography variant="h4" className='text-center text-main_purple'>Pedido</Typography>
                    <XMarkIcon className='text-main_purple cursor-pointer w-6 h-6' onClick={() => setOpenOrderModal(false)} />
                </div>
                <div className='mb-3 border-2 border-blue-gray-100 p-1 rounded-lg break-words flex-1 overflow-y-auto max-h-full custom-scrollbar'>
                    {order && order.products && order.products.length > 0 ? (
                        order.products.map((product, index) => (
                            <div key={index} className='mb-1 flex items-center justify-around text-main_purple'>
                                <p className='w-60'>{product.name}</p>
                                <p>{product.price}€</p>
                                <MinusIcon
                                    className='w-6 h-6 text-red-700 font-extrabold cursor-pointer'
                                    onClick={() => deleteProductInOrderByBookingId(bookingId, product._id)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No hay productos en el pedido</p>
                    )}
                </div>
                <div className='flex gap-4 items-center'>
                    <select
                        name='product'
                        value={formData.product}
                        onChange={handleChange}
                        className='w-full p-2 rounded border text-secondary_purple border-secondary_purple bg-main_purple'
                    >
                        <option value=''>Seleccione un producto</option>
                        {productsWithStock.map((product) => (
                            <option key={product._id} value={product.name}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                    <PlusIcon
                        className='h-6 w-6 text-main_purple'
                        onClick={() => updateOrderByBookingId(bookingId, formData.product)}
                    />
                </div>
            </div>
        </Dialog>
    )
}

OrderModal.propTypes = {
    openOrderModal: PropTypes.bool.isRequired,
    setOpenOrderModal: PropTypes.func.isRequired,
    bookingId: PropTypes.string.isRequired,
}
export default OrderModal