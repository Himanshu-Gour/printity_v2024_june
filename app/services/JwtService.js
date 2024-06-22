const jwt = require('jsonwebtoken');
require('dotenv').config();

class JwtService {
	static sign(payload, expiry = '1h', secret = process.env.JWT_SECRET) {
		return jwt.sign(payload, secret, { expiresIn: expiry });
	}

	static verify(token, secret = process.env.JWT_SECRET) {
		console.log("Verifying: ", token);
		return jwt.verify(token, secret);
	}
}

module.exports = JwtService;