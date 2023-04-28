import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import { logout } from '../../store/session';
import OpenModalButton from "../OpenModalButton";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';


export default function SideNav({ isLoaded }) {
    const user = useSelector(state => state.session.user);
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const dispatch = useDispatch()

    useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };
    
        document.addEventListener("click", closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

    const createEventButton = () => {
        history.push('/events/new')
    }

    const createProductButton = () => {
        history.push('/products/new')
    }

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const closeMenu = () => setShowMenu(false);

    return (
        <ul ref={ulRef}>
            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>
            <li>
                <NavLink exact to='/marketplace'>Marketplace</NavLink>
            </li>
            {user ? (
                <>
                    <li>
                        <button onClick={createEventButton}>Post Event</button>
                    </li>
                    <li>
                        <button onClick={createProductButton}>Post Product</button>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Log Out</button>
                    </li>
                </>
            ) : (
                <>
                    <OpenModalMenuItem
                        itemText="Log In"
                        onItemClick={closeMenu}
                        modalComponent={<LoginFormModal />}
                    />

                    <OpenModalMenuItem
                        itemText="Sign Up"
                        onItemClick={closeMenu}
                        modalComponent={<SignupFormModal />}
                    />
                </>
            )}
        </ul>
    );
}