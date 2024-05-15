import {
    Card,
    CardBody
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";

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
    );
  }