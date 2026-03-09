import React from 'react'
import { NavLink } from 'react-router-dom'

function SideBarLink({
    children,
    destination,
    Icon,
    className= "",
}) {
    const linkClass = ({ isActive }) => (isActive ? `sidebarLink active-link ${className}` : `sidebarLink ${className}`);

    return (
        <NavLink to={destination} className={linkClass}>
            <Icon className="sideBar-link-icon"/>
            <span>{children}</span>
        </NavLink>
    )
}

export default SideBarLink
