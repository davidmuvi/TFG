import {
    Card,
    CardBody
  } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

  export function EmployeePageCard({icon, children, redirection}) {
    return (
    <Link to={redirection}>
      <Card className="mt-6 w-52 h-48 text-black flex flex-col items-center justify-center hover:scale-105 transition">
        <div>
        {icon}
        </div>
        <CardBody>
            {children}
        </CardBody>
      </Card>
      </Link>   
    )
  }

  // Declaramos los tipos de las propiedades que le pasan al componente
  EmployeePageCard.propTypes = {
    icon: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    redirection: PropTypes.string.isRequired,
  }
