export const render = (req, res, page, params = {}) => {
	let sentEnv = process.env.NODE_ENV;
	if (sentEnv == "prodtest") sentEnv = "prod";
	if (req.session) {
		res.render(page, {
			env: sentEnv,
			user: req.session.user,
			...params,
		});
	} else {
		res.render(page, {
			env: sentEnv,
			...params,
		});
	}
};
