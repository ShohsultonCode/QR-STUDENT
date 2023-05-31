import React, { useState, useEffect } from "react";
import "./index.scss";
import FormInput from "../../UI/FormInput";
import { api } from "../../api/api";
import { toast, ToastContainer } from "react-toastify";

const index = () => {
	const [student_first_name, setStudent_first_name] = useState("");
	const [student_last_name, setStudent_last_name] = useState("");
	const [student_email, setStudent_email] = useState("");
	const [student_phone, setStudent_phone] = useState("");
	const [student_password, setStudent_password] = useState("");
	const [student_lesson, setStudent_lesson] = useState("");

	const onsubmit = (e) => {
		e.preventDefault();
		api
			.singUp({
				student_first_name,
				student_last_name,
				student_email,
				student_phone,
				student_password,
				student_lesson,
			})
			.then((res) => {
				if (res.status === 201) {
					localStorage.setItem("access_token", res.access_token);
					toast.success('Successfully Signed Up', {
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
						type={"text"}
						pl={"Enter your first name"}
						fo={"frist_name"}
						val={student_first_name}
						setVal={setStudent_first_name}
						minLenght={2}
					/>

					<FormInput
						type={"text"}
						pl={"Enter your last name"}
						fo={"last_name"}
						val={student_last_name}
						setVal={setStudent_last_name}
						minLenght={2}
					/>

					<FormInput
						type={"email"}
						pl={"Enter your email"}
						fo={"email"}
						val={student_email}
						setVal={setStudent_email}
						minLenght={2}
					/>

					<FormInput
						type={"text"}
						pl={"Enter your phone number"}
						fo={"phone"}
						val={student_phone}
						setVal={setStudent_phone}
						maxLenght={13}
						minLenght={13}
					/>

					<FormInput
						type={"password"}
						pl={"Enter your password"}
						fo={"password"}
						val={student_password}
						setVal={setStudent_password}
						minLenght={6}
					/>

					<FormInput
						type={"text"}
						pl={"Enter your lesson ID"}
						fo={"lesson"}
						val={student_lesson}
						setVal={setStudent_lesson}
						minLenght={2}
					/>

					<button type="submit" className='btn btn-primary p-2 px-3 w-auto mt-3 d-flex mx-auto'>
						Sing Up
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
