import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
  } from "@material-tailwind/react";
import { Link } from 'react-router-dom'

  export function MenuDefault({redirection, menuName, items = []}) {
    return (
      <Menu>
        <div className="flex items-center gap-2 mt-10 p-2 rounded-xl hover:bg-blue-500">
            <Link to={redirection}>
            <p>{menuName}</p>
            </Link>
            <MenuHandler>
                <ChevronDownIcon className="w-6 h-6 cursor-pointer"/>
            </MenuHandler>
        </div>
        <MenuList>
        {items.map((item, index) => (
          <MenuItem key={index}>{item}</MenuItem>
        ))}
        </MenuList>
      </Menu>
    );
  }