/**
 * Configuration of the server middlewares.
 */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import passport from 'passport';
import expressWinston from 'express-winston';
import methodOverride from 'method-override';
import helmet from 'helmet';
import cors from 'cors';
import fs from 'fs';
import expressStatusMonitor from 'express-status-monitor';
import apiCpanelRoute from '../api/cpanel/routes';
import apiWebRoute from '../api/web/routes';
import winstonInstance from './winston';
import DB from './databse';
import Constants from './constants';


const isTest = process.env.NODE_ENV === 'test';
const isDev = process.env.NODE_ENV === 'development';
const app = express();

class ExpressApp {
	constructor() {
		app.disable('x-powered-by');
		this.helmetSecurity();
		this.middleware();
		this.connectDatabase();
		this.registerRoutes();
		this.seedDB();
		this.logger();
		this.logDirectoryCreate();
	}
	get instance() {
		return app;
	}
	middleware = () => {
		app.use(compression());
		app.use(bodyParser.json());
		app.use(
			bodyParser.urlencoded({
				limit: '50mb',
				extended: true,
				parameterLimit: 50000
			})
		);
		app.use(passport.initialize());
		app.use(cors());
		app.use(expressStatusMonitor());
		app.use(methodOverride());

		console.log('middleware set');
	};

	registerRoutes = () => {
		app.use('/api', apiCpanelRoute);
		app.use('/api', apiWebRoute);
	};

	logger = () => {
		if (isDev && !isTest) {
			app.use(morgan('dev'));
			expressWinston.requestWhitelist.push('body');
			expressWinston.responseWhitelist.push('body');
			app.use(
				expressWinston.logger({
					winstonInstance,
					meta: false, // optional: control whether you want to log the meta data about the request (default to true)
					msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
					expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
					colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
					colorStatus: true,
					ignoreRoute: function(req, res) {
						return false;
					} // optional: allows to skip some log messages based on request and/or response
				})
			);
		}
	};

	helmetSecurity = () => {
		var SIX_MONTHS = 15778476000;
		app.use(helmet.hidePoweredBy());
		app.use(helmet.frameguard());
		app.use(helmet.xssFilter());
		app.use(helmet.noSniff());
		app.use(helmet.ieNoOpen());
		app.use(
			helmet.hsts({
				maxAge: SIX_MONTHS,
				includeSubdomains: true,
				force: true
			})
		);
	};

	connectDatabase = () => {
		DB.connect();
	};
	logDirectoryCreate = () => {
		if (!fs.existsSync('log')) {
			fs.mkdirSync('log');
			console.log('log folder created successfully.');
		}
	};
	seedDB = () => {
		if(Constants.seedDB){
			require("../../seed");
			console.log('seedig db')
		}
	};
}

export default new ExpressApp().instance;

// export default (app) => {
// 	app.use(compression());
// 	app.use(bodyParser.json());
// 	app.use(
// 		bodyParser.urlencoded({
// 			limit: '50mb',
// 			extended: true,
// 			parameterLimit: 50000
// 		})
// 	);
// 	app.use(passport.initialize());
// 	app.use(helmet());
// 	app.use(cors());
// 	app.use(expressStatusMonitor());
// 	app.use(methodOverride());

// 	app.use('/api', apiRouteAdmin);
// 	app.use('/api', apiRouteUser);
// 	console.log('middleware set');
// 	if (isDev && !isTest) {
// 		app.use(morgan('dev'));
// 		expressWinston.requestWhitelist.push('body');
// 		expressWinston.responseWhitelist.push('body');
// 		app.use(
// 			expressWinston.logger({
// 				winstonInstance,
// 				meta: false, // optional: control whether you want to log the meta data about the request (default to true)
// 				msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
// 				expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
// 				colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
// 				colorStatus: true,
// 				ignoreRoute: function(req, res) {
// 					return false;
// 				} // optional: allows to skip some log messages based on request and/or response
// 			})
// 		);
// 	}
// };
