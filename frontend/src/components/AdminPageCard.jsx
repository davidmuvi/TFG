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
        <Card className="sm:w-96 sm:h-64 w-80 bg-secondary_purple">
            <CardBody>
                {icon}
                <Typography variant="h5" className="mb-2 mt-3 text-main_purple">
                    {header}
                </Typography>
                <Typography className="text-main_purple">
                    {paragraph}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Link to={redirection}>
                    <a className="inline-block cursor-pointer">
                        <Button
                            size="sm"
                            variant="outlined"
                            className="text-main_purple border-main_purple hover:scale-105 transition duration-300 ease-in-out"
                        >
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