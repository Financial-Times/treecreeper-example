const logger = require('@financial-times/n-logger');
const { getCMS } = require('@financial-times/tc-ui');

const wrapCmsHandler = handler => async (req, res) => {
	try {
		const { status, body, headers } = await handler({
			...req.params,
			metadata: { clientUserId: 'rhys.evans' },
			query: req.query || {},
			method: req.method,
			body: req.body,
		});
		if (headers) {
			res.set(headers);
		}

		res.status(status).send(body);
	} catch (e) {
		logger.error(e);
		res.send(500).end();
	}
};

const { handleError, renderPage } = require('./render');

const { viewHandler, deleteHandler, editHandler } = getCMS({
	logger,
	restApiUrl: 'http://local.in.ft.com:8888/api/rest',
	graphqlApiUrl: 'http://local.in.ft.com:8888/api/graphql',
	clientId: 'treecreeper-demo',
	apiHeaders: ({ metadata: { clientUserId } }) => ({
		'client-user-id': clientUserId,
	}),
	handleError,
	renderPage,
	customTypeMappings: {
		Paragraph: 'LargeText',
	},
});

module.exports = {
	viewController: wrapCmsHandler(viewHandler),
	editController: wrapCmsHandler(editHandler),
	deleteController: wrapCmsHandler(deleteHandler),
};
