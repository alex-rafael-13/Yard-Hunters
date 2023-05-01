import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import { logout } from '../../store/session';
import OpenModalButton from "../OpenModalButton";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './sideNav.css'


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
        <div className='main-side-nav'>
            <ul ref={ulRef} className='options-list'>
                <li className='row' onClick={() => {history.push('/')}}>
                    <div>Home</div>
                </li>
                <li className='row' onClick={() => {history.push('/marketplace')}}>
                <div >Marketplace</div>
                </li>
                {user ? (
                    <>
                        <li onClick={createEventButton} className='row'>
                            <div>Post Event</div>
                        </li>
                        <li onClick={createProductButton} className='row'>
                            <div>Post Product</div>
                        </li>
                        <li  onClick={handleLogout} className='row'>
                            <div>Log Out</div>
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
        </div>
    );
}