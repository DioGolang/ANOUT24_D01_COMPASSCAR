class AuthException extends Error {
	constructor(message, status = 401, code = 'AUTH_ERROR') {
		super(message);
		this.name = 'AuthException';
		this.status = status;
		this.code = code;
		this.isOperational = true;
		Error.captureStackTrace(this, this.constructor);
	}
}
module.exports = AuthException;
