let baseUrl = "http://localhost:4000";

export const api = {
	singIn: async (params) => {
		const response = await fetch(`${baseUrl}/students/signin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(params),
		});
		const result = await response.json();
		return result;
	},
	singUp: async (params) => {
		const response = await fetch(`${baseUrl}/students/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(params),
		});
		const result = await response.json();
		return result;
	},
	findonebytoken: async (params) => {
		const response = await fetch(`${baseUrl}/students/findonebytoken`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${params}`,
			}
		});
		const result = await response.json();
		return result;
	},
	generateqr: async (params) => {
		const response = await fetch(`${baseUrl}/students/generate`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${params}`,
			}
		});
		const result = await response.json();
		return result;
	},
	check: async (params) => {
		const response = await fetch(`${baseUrl}/students/check`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(params),
		});
		const result = await response.json();
		return result;
	},
};
