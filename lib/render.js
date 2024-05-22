let env = process.env.NODE_ENV;

export const render = (req, res, page, params = {}) => {
	if (req.session) {
		res.render(page, {
			env: env,
			user: req.session.user,
			...params,
		});
	} else {
		res.render(page, {
			env: env,
			...params,
		});
	}
};
