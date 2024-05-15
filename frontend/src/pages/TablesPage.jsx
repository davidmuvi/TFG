import { useEffect, useState } from 'react'
import { tableService } from '../services/table.service.js'
import Layout from '../layouts/LayoutPages'
function TablesPage() {
    const [tableNumbers, setTableNumbers] = useState([])
    const [tableCapacity, setTableCapacity] = useState([])

    useEffect(() => {
        printTableNumber()
    }, [])

    useEffect(() => { 
        printTableCapacity()
    }, [])

    const printTableNumber = () => { 
        tableService.getTables()
        .then((tables) => {
            const numbers = tables.map((table) => table.tableNumber)
            setTableNumbers(numbers)
        })
        .catch(error => {console.error(error)})  
    }

    const printTableCapacity = () => { 
        tableService.getTables()
        .then((tables) => {
            const capacity = tables.map((table) => table.capacity)
            setTableCapacity(capacity)
        })
        .catch(error => {console.error(error)})  
    }



    return (
        <Layout>
            <section className="bg-white w-full h-5/6 grid grid-rows-8">
                <section className="row-span-7 bg-slate-200 rounded-xl m-4 grid grid-cols-3 pt-4 text-center h-full">
                    <div className="col-span-1 grid">
                        <h2 className="font-bold"> Número de mesa </h2>
                        {tableNumbers.map((number, index) => {
                                return <p key={index} className="border-b-2 border-b-slate-300 h-1/3">{number}</p>
                            })
                        }
                    </div>
                    <div className="col-span-1 grid">
                        <h2 className="font-bold"> Capacidad </h2>
                        {tableCapacity.map((capacity, index) => {
                                return <p key={index} className="border-b-2 border-b-slate-300 h-1/3">{capacity}</p>
                            })
                        }
                    </div>
                    <div className="col-span-1 grid">
                        <h2 className="font-bold"> Disponibilidad </h2>
                        <p className="border-b-2 border-b-slate-300 h-1/3">Libre</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">Libre</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">Libre</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">Libre</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">Libre</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">Libre</p>
                    </div>
                </section> 
            </section>
        </Layout>
    )
}

export default TablesPage