import Navbar from '../components/navbar'
function EmployeePage() {
    return (
        <div className="w-screen h-screen">
            <Navbar />
            <section className="bg-white w-full h-5/6 grid grid-rows-8">
                <section className="row-span-7 bg-slate-200 rounded-xl m-4 grid grid-cols-3 pt-4 text-center h-full">
                    <div className="col-span-1 grid">
                        <h2 className="font-bold"> Número de mesa </h2>
                        <p className="border-b-2 border-b-slate-300 h-1/3">1</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">2</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">3</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">4</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">5</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">6</p>
                    </div>
                    <div className="col-span-1 grid">
                        <h2 className="font-bold"> Capacidad </h2>
                        <p className="border-b-2 border-b-slate-300 h-1/3">10</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">8</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">4</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">2</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">6</p>
                        <p className="border-b-2 border-b-slate-300 h-1/3">2</p>
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
        </div>
    )
}

export default EmployeePage