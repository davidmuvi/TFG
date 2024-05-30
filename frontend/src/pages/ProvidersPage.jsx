import { useEffect, useState } from 'react'
import { providerService } from '../services/provider.service.js'
import Layout from '../layouts/LayoutPages'
import { Card, Typography } from "@material-tailwind/react"
import { XCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import Swal from 'sweetalert2'
import ModifyProviderModal from '../components/ModifyProviderModal.jsx'

function ProductPage() {
    const [providers, setProviders] = useState([])
    const [open, setOpen] = useState(false)
    const [currentProvider, setCurrentProvider] = useState({ _id: '', name: '' })

    const TABLE_HEAD = ["Nombre", "Productos", ""]
    const TABLE_ROWS = providers

    // Al entrar por primera vez se ejecuta para cargar los proveedores.
    useEffect(() => {
        getProviders()
    }, [])

    const getProviders = async () => {
        const providers = await providerService.getProviders()

        const providersWithProducts = await Promise.all(providers.map(async (provider) => {
            const products = await providerService.getProductsByProvider(provider._id)
            return {
                ...provider,
                products: products
            }
        }))

        setProviders(providersWithProducts)
    }

    const deleteProvider = (providerId) => {
        providerService.deleteProvider(providerId)
            .then(() => {
                getProviders()
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Proveedor no eliminado',
                    text: 'El proveedor no se ha podido eliminar.',
                })
            })
    }

    const updateProvider = (id, updatedProvider) => {
        providerService.updateProvider(id, updatedProvider)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Proveedor modificado',
                    text: 'El proveedor se ha modificado correctamente.',
                })

                getProviders()
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Proveedor no modificado',
                    text: 'No se ha podido modificar el proveedor.',
                })
            })
    }

    const handleOpen = (provider) => {
        setCurrentProvider(provider)
        setOpen(true)
    }

    return (
        <Layout>
            <Card className="flex-1 w-screen p-4">
                <div className='grid grid-cols-3 gap-2 mb-4'>
                    {TABLE_HEAD.map((head) => (
                        <div
                            key={head}
                            className="bg-main_purple rounded-3xl text-white text-2xl font-extrabold flex items-center justify-center p-2"
                        >
                            {head}
                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-3 gap-2 auto-rows-max'>
                    {TABLE_ROWS.map(({ _id, name, products }) => {
                        return (
                            <>
                                <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                    {name}
                                </div>
                                <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                    {products}
                                </div>
                                <div className='bg-secondary_purple rounded-3xl p-2 flex justify-around'>
                                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium w-6 h-6" onClick={() => deleteProvider(_id)}>
                                        <XCircleIcon className='w-6 h-6 text-red-500' />
                                    </Typography>

                                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium w-6 h-6" onClick={() => handleOpen({ _id, name })}>
                                        <PencilSquareIcon className='w-6 h-6 text-main_purple' />
                                    </Typography>
                                </div>
                            </>
                        )
                    })}

                    {/* Si no hay datos en la base de datos, mostramos un mensaje indicándolo.*/}
                    {
                        TABLE_ROWS.length === 0 && (
                            <tr>
                                <td colSpan={TABLE_HEAD.length} className="p-4">
                                    <Typography variant="h5" color="blue-gray" className="font-normal">
                                        NO HAY PROVEEDORES REGISTRADOS
                                    </Typography>
                                </td>
                            </tr>
                        )
                    }
                </div>
            </Card>
            <ModifyProviderModal open={open} setOpen={setOpen} provider={currentProvider} updateProvider={updateProvider} />
        </Layout>
    )
}

export default ProductPage