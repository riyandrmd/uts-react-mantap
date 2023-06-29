import React from 'react'
import { GiGunRose } from 'react-icons/gi'
import './index.css'
import { NavLink } from 'react-router-dom'


const Header = () => {
    return (
        <header>
            <div className='wrapper-logo'>
                <GiGunRose size={28} />
                <h3>CHARACTER LIST</h3>
            </div>
            <nav>
                <ul className='list-nav'>
                    <li className='nav-item'>
                        <NavLink to={'/'} >Dashboard</NavLink></li>
                    <li className='nav-item'>
                        <NavLink to={'/about'} >About</NavLink>
                    </li >
                </ul>
            </nav>
        </header>
    )
}

export default Header