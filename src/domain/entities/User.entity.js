class User {
	constructor({ id, name, email, password }) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.validate();
	}

	validate() {
		if (!this.email || !this.password || !this.name) {
			throw new Error('Email, password, and name are required');
		}
	}
}
module.exports = User;
