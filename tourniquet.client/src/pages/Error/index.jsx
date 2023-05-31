import React, { useEffect } from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";

const index = () => {
	useEffect(() => {
		document.title = "404";
	}, []);
	return (
		<div className='container text-center mt-5'>
			<h1 className='display-1'
			>NOT FOUND 404</h1>
			<p className='lead'>
				We are sorry, the page you requested could not be found.
				<br />
				Please go back to the homepage
				<NavLink to='/signup'> SigUp</NavLink>
				<NavLink to='/signin'> SigIn</NavLink>
			</p>
		</div>
	);
};

export default index;
