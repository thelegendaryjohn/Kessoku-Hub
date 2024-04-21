let env = process.env.NODE_ENV;
export const render = (req, res, page, params = {}) =>
	res.render(page, {
		env: env,
		user: req.session.user,
		...params,
	});
