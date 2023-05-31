import React, { useEffect } from "react";
import "./index.scss";
import { api } from "../../api/api";
import { toast, ToastContainer } from "react-toastify";
import { Html5QrcodeScanner } from "html5-qrcode";

const index = () => {
	useEffect(() => {
		new Html5QrcodeScanner('reader', {
			qrbox: {
				width: 300,
				height: 300
			},
			fps: 1,
		});

		const scanner = new Html5QrcodeScanner("reader", {
			fps: 1,
			qrbox: 300,
		});

		scanner.render(success, error);

		function success(result) {
			api
				.check({ student_id: result })
				.then((res) => {
					console.log(res);
					if (res.status === 200) {
						toast.success(`${res.message}`, {
							position: "top-center",
							autoClose: 400,
							hideProgressBar: false,
						});
					} else {
						toast.error(`${res.message}`, {
							position: "top-center",
							autoClose: 3500,
							hideProgressBar: false,
						});

					}
				})
				.catch((err) => {
					toast.error(`${err.message}`, {
						position: "top-center",
						autoClose: 3500,
						hideProgressBar: false,
					});
				})
		}
	}, []);

	function error(err) {
		// console.log(err);
	}
	return (
		<div className="main-container container-xxl d-flex col-11 col-md-8 col-xl-4 justify-content-center">
			<div className='main-container-inner card bg-light shadow-lg px-3 mx-auto w-100 pb-3'>
				<form action='#' autoComplete='off' onSubmit={onsubmit}>


					<div id="reader"></div>

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
