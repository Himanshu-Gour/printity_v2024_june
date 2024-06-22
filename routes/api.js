const authController = require("../app/http/controllers/authController");

function apiRoutes(app) {
	const express = require('express');

	app.get('/api/reset_password/:secretToken', authController().resetPassword);
	app.post('/api/forgot_password/', authController().PostForgotPassowrd);
	app.post('/api/reset_password', authController().PostResetPassword);
}

module.exports = apiRoutes;