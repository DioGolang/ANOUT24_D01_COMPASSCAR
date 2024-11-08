class UserDTO {
	constructor(userData) {
		this.email = userData.email;
		this.password = userData.password;
		this.name = userData.name;
	}
	validate() {
		if (!this.email || !this.password || !this.name) {
			throw new Error('Email, password, and name are required');
		}
	}
	toObject() {
		return {
			email: this.email,
			password: this.password,
			name: this.name,
		};
	}
}
module.exports = UserDTO;
