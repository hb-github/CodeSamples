import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateUsername, validateEmail, validatePassword } from './validate';
import Constants from '../../config/constants';
const Schema = mongoose.Schema;

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

const UserSchema = new Schema(
	{
		name: String,
		username: {
			type: String,
			unique: true,
			validate: [ { validator: validateUsername, message: 'Invalid username' } ],
			required: [ true, REQUIRED_VALIDATION_MESSAGE ]
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			required: [ true, REQUIRED_VALIDATION_MESSAGE ],
			validate: [
				{ validator: validateEmail, message: '{VALUE} is not a valid email.' }
				//{ validator: isEmailUnique, message: 'Email already exists' }
			]
		},
		address:{
			type:String
		},
		mobile:{
			type:Number,
			required:true
		},
		password: {
			type: String,
			required: [ true, REQUIRED_VALIDATION_MESSAGE ],
			validate: [
				{ validator: validatePassword, message: 'Password be at least 6 characters long and contain 1 number.' }
			]
		},
		role: {
			type: String,
			default: 'user'
		},
		status:{type: Boolean, default: true}

	},
	{ timestamps: true }
);

// Strip out password field when sending user object to client
UserSchema.set('toJSON', {
	virtuals: true,
	transform(doc, obj) {
		obj.id = obj._id;
		delete obj._id;
		delete obj.__v;
		delete obj.password;
		return obj;
	}
});

// function isEmailUnique(value) {
// 	if (value) {
// 		UserModel.findOne({ value })
// 			.then((user) => {
// 				return user ? false : true;
// 			})
// 			.catch(() => {
// 				return false;
// 			});
// 	}
// }

// function isUserNameUnique(value) {
// 	UserModel.findOne({ username: value }, 'id', function(err, user) {
// 		if (err) return false;
// 		if (user) return false;
// 		return true;
// 	});
// }

var handleE11000 = function(error, res, next) {
	if (error.name === 'MongoError' && error.code === 11000) {
		var regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i,
			match = error.message.match(regex),
			indexName = match[1] || match[2];
		error.message = indexName + ' already exists.';
		next(new Error(error.message));
	} else {
		next();
	}
};
UserSchema.post('save', handleE11000);
//
UserSchema.pre('save', function(done) {
	// Encrypt password before saving the document
	if (this.isModified('password')) {
		const { saltRounds } = Constants.security;
		this._hashPassword(this.password, saltRounds, (err, hash) => {
			this.password = hash;
			done();
		});
	} else {
		done();
	}
	// eslint-enable no-invalid-this
});

/**
 * User Methods
 */
UserSchema.methods = {
	/**
   * Authenticate - check if the passwords are the same
   * @public
   * @param {String} password
   * @return {Boolean} passwords match
   */
	authenticate(password) {
		return bcrypt.compareSync(password, this.password);
	},

	/**
   * Generates a JSON Web token used for route authentication
   * @public
   * @return {String} signed JSON web token
   */
	generateToken() {
		return jwt.sign(
			{
				_id: this._id,
				email: this.email,
				username: this.username
			},
			Constants.security.sessionSecret,
			{
				expiresIn: Constants.security.sessionExpiration
			}
		);
	},

	/**
   * Create password hash
   * @private
   * @param {String} password
   * @param {Number} saltRounds
   * @param {Function} callback
   * @return {Boolean} passwords match
   */
	_hashPassword(password, saltRounds = Constants.security.saltRounds, callback) {
		return bcrypt.hash(password, saltRounds, callback);
	}
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
