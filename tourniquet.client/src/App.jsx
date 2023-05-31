import React from "react";
import { Routes, Route } from "react-router-dom";
import SingIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import QrReader from "./pages/QrReader";
import Error from "./pages/Error";

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<QrReader />} />
				<Route path='/signin' element={<SingIn />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</>
	);
};

export default App;
