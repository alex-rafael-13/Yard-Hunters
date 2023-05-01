import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './logo.png'

function Navigation({ isLoaded }){
	const history = useHistory()
	const sessionUser = useSelector(state => state.session.user);

	const toHome = () => {
		history.push('/')
	}

	return (
		<div className='nav'>
			<img className='logo' onClick={toHome} src={logo}></img>
		</div>
	);
}

export default Navigation;