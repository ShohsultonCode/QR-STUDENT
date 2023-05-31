import React, { useState } from "react";
import "./index.scss";
import FormInput from "../../UI/FormInput";
import { api } from "../../api/api";
import { toast, ToastContainer } from "react-toastify";

const index = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onsubmit = (e) => {
		e.preventDefault();
		api
			.singIn({
				student_email: email,
				student_password: password,
			})
			.then((res) => {
				if (res.status === 200) {
					localStorage.setItem("access_token", res.access_token);
					toast.success('Successfully Logged In', {
						position: "top-center",
						autoClose: 1200,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: false,
						draggable: false,
					});
					setTimeout(() => {
						window.location.href = "/dashboard";
					}, 1200);
				} else {
					toast.error(`${res.message}`, {
						position: "top-center",
						autoClose: 3500,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: false,
						draggable: false,
						progress: undefined,
					});
				}
			});
	}

	return (
		<div className="main-container container-xxl d-flex col-11 col-md-8 col-xl-4 justify-content-center">
			<div className='main-container-inner card bg-light shadow-lg px-3 mx-auto w-100 pb-3'>
				<form action='#' autoComplete='off' onSubmit={onsubmit}>
					<FormInput
						type={"email"}
						pl={"Enter your email"}
						fo={"email"}
						val={email}
						setVal={setEmail}
					/>

					<FormInput
						type={"password"}
						pl={"Enter your password"}
						fo={"password"}
						val={password}
						setVal={setPassword}
						minLenght={6}
					/>

					<button type="submit" className='btn btn-primary p-2 px-3 w-auto mt-3 d-flex mx-auto'>
						SingIn
					</button>

					<ToastContainer
						position="top-center"
						autoClose={1200}
						limit={3}
						hideProgressBar={false}
						newestOnTop={true}
						closeOnClick={false}
						rtl={false}
						pauseOnFocusLoss
						draggable={false}
						pauseOnHover={false}
						theme="light"
					/>
				</form>
			</div >
		</div >
	);
};

export default index;
