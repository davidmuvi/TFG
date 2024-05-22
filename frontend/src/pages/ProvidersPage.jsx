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

    const getProviders = () => {
        providerService.getProviders()
            .then((providers) => {
                setProviders(providers.map(provider => ({
                    ...provider,
                    products: 0
                })))
            })
            .catch(error => { console.error(error) })
    }

    const deleteProvider = (providerId) => {
        try {
            providerService.deleteProvider(providerId)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Proveedor no eliminado',
                text: 'El proveedor no se ha podido eliminar.',
            })
        }
    }

    const updateProvider = (id, updatedProvider) => {
        providerService.updateProvider(id, updatedProvider)
           .then(() => {
                Swal.fire({
                    icon:'success',
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
                        {TABLE_ROWS.map(({ _id, name, products }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"
                            return (
                                <tr key={_id}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {name}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {products}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} h-full flex items-center justify-around`}>
                                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium w-6 h-6" onClick={() => deleteProvider(_id)}>
                                            <XCircleIcon className='w-6 h-6 text-red-500' />
                                        </Typography>

                                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium w-6 h-6" onClick={() => handleOpen({_id, name})}>
                                            <PencilSquareIcon className='w-6 h-6 text-black' />
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
                                            NO HAY PROVEEDORES REGISTRADOS
                                        </Typography>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </Card>
            <ModifyProviderModal open={open} setOpen={setOpen} provider={currentProvider} updateProvider={updateProvider} />
        </Layout>
    )
}

export default ProductPage