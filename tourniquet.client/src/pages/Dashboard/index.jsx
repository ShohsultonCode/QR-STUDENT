import React, { useState, useEffect } from "react";
import "./index.scss";
import { api } from "../../api/api";
import { toast, ToastContainer } from "react-toastify";

const index = () => {
	const [student, setStudent] = useState({});
	const [status, setStatus] = useState("Not Verified");
	const [qr, setQr] = useState("");

	useEffect(() => {
		api
			.findonebytoken(localStorage.getItem("access_token"))
			.then((res) => {
				if (res.status === 200) {
					if (res.data.student_is_activated === true) {
						setStatus("Verified");
						api
							.generateqr(localStorage.getItem("access_token"))
							.then((res) => {
								if (res.status === 200) {
									setQr(res.data);
								}
							})
							.catch((err) => {
								toast.error(`${err.message}`, {
									position: "top-center",
									autoClose: 3500,
									hideProgressBar: false,
									closeOnClick: false,
									pauseOnHover: false,
									draggable: false,
									progress: undefined,
								});
							});
					} else {
						setQr("");
						setStatus(`Not Verified`);
					}
					setStudent(res.data);
				} else {
					localStorage.removeItem("access_token");
					window.location.href = "/signin";
				}
			})
			.catch((err) => {
				toast.error(`${err.message}`, {
					position: "top-center",
					autoClose: 3500,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
				});
			});
	}, []);



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

					{/* student info */}
					<div className="student-info d-flex flex-column align-items-center">
						<div className="col d-flex flex-column align-items-center">
							<h4 className="student-name mb-0">{student.student_first_name} {student.student_last_name}
							</h4>
						</div>
						<p className="student-email mb-0">{student.student_email}</p>
						{/* get status activated status */}
						<div className="student-status d-flex flex-column align-items-center">
							{/* <p className="student-status-box">{status}</p>
							 */}
							{
								status === "Verified" ? (
									<div className="qr-code-box d-flex flex-column align-items-center">
										<p className="student-status-box text-success mb-0">Google Account Verified</p>
										<p className="student-status-box text-success mb-0">
											your qr code
										</p>
										<img width={300} height={300} src={qr} alt="qr code" className="qr-code img-fluid" />
									</div>
								) : (
									<p className="student-status-box text-warning">Not Verified
										please <a href={`http://localhost:4000/students/verify/${student._id}`}>click here</a> to verify</p>
								)
							}
						</div>
					</div>

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
