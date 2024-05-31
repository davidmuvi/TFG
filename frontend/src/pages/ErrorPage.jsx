import { Button, Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"

function ErrorPage() {
    return (
        <div
            className="w-full h-screen bg-gradient-to-t from-main_green to-main_purple flex flex-col items-center justify-center text-secondary_purple"
        >
            <Typography variant="h1"> Error 404 </Typography>
            <Typography variant="h6"> No se ha podido encontrar la página que estás buscando.</Typography>
            <Link to='/'>
            <Button className="bg-main_purple mt-10">Volver al inicio</Button>
            </Link>
        </div>
    )
}

export default ErrorPage