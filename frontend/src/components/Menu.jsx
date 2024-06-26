import { ChevronDownIcon } from "@heroicons/react/24/solid"
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react"
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export function MenuDefault({ redirection, menuName, items = [] }) {
  return (
    <Menu>
      <div className="flex items-center gap-2 p-2 rounded-xl hover:bg-black hover:bg-opacity-10">
        <Link to={redirection}>
          <p>{menuName}</p>
        </Link>
        <MenuHandler>
          <ChevronDownIcon className="w-6 h-6 cursor-pointer" />
        </MenuHandler>
      </div>
      <MenuList className="text-main_purple font-bold">
        {items.map((item, index) => (
          <Link to={item.redirection} key={index}>
            <MenuItem className="hover:text-white hover:bg-main_purple">
              {item.name}
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  )
}

// Declaramos los tipos de las propiedades que le pasan al componente
MenuDefault.propTypes = {
  redirection: PropTypes.string.isRequired,
  menuName: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      redirection: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default MenuDefault
