import mongoose from 'mongoose';
import Constants from './constants';

mongoose.Promise = global.Promise;

class DB {
	connect = () => {
		mongoose
			.connect(Constants.mongo.uri, { useNewUrlParser: true })
			.then(() => {
				console.log('Database connection successful');
			})
			.catch((err) => {
				console.error('Database connection error');
			});
		if (Constants.envs.development) {
			mongoose.set('debug', false);
		}
	};
}
export default new DB();

// Use native promises
//mongoose.Promise = global.Promise;

// Exit application on error
// mongoose.connection.on('error', err => {
//   console.error(`MongoDB connection error: ${err}`);
//   process.exit(-1);
// });

// print mongoose logs in dev env
// if (Constants.envs.development) {
// 	mongoose.set('debug', false);
// }

//mongoose.connect(Constants.mongo.uri, { useNewUrlParser: true });
// mongoose.connection.once('open', () => console.log('MongoDB Running')).on('error', (e) => {
// 	throw e;
// });

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
// exports.connect = () => {
// 	mongoose.connect(Constants.mongo.uri,{ useNewUrlParser: true });
// 	return mongoose.connection;
// };

// let mongoose = require('mongoose');
// const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
// const database = 'fcc-Mail';      // REPLACE WITH YOUR DB NAME
// class Database {
//   constructor() {
//     this._connect()
//   }
// _connect() {
//      mongoose.connect(`mongodb://${server}/${database}`)
//        .then(() => {
//          console.log('Database connection successful')
//        })
//        .catch(err => {
//          console.error('Database connection error')
//        })
//   }
// }
// module.exports = new Database()
