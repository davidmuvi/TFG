import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

export function AdminPageCard({ header, paragraph, icon, buttonText, redirection }) {
    return (
        <Card className="w-96 h-64">
            <CardBody>
                {icon}
                <Typography variant="h5" color="blue-gray" className="mb-2 mt-3">
                    {header}
                </Typography>
                <Typography>
                    {paragraph}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Link to={redirection}>
                    <a className="inline-block cursor-pointer">
                        <Button size="sm" variant="outlined" className="">
                            {buttonText}
                        </Button>
                    </a>
                </Link>
            </CardFooter>
        </Card>
    );
}

AdminPageCard.propTypes = {
    header: PropTypes.string.isRequired,
    paragraph: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    buttonText: PropTypes.string.isRequired,
    redirection: PropTypes.string.isRequired,
}