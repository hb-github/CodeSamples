import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateUsername, validateEmail, validatePassword } from './validate';
import Constants from '../../config/constants';
const Schema = mongoose.Schema;

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

const AdminSchema = new Schema(
  {
    name: { type: String, required: [true] },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, REQUIRED_VALIDATION_MESSAGE],
      validate: [
        { validator: validateEmail, message: '{VALUE} is not a valid email.' }
      ]
    },
    password: {
      type: String,
      required: [true, REQUIRED_VALIDATION_MESSAGE],
      validate: [
        {
          validator: validatePassword,
          message:
            'Password be at least 6 characters long and contain 1 number.'
        }
      ]
    },
    mobile: {
      type: Number
    },
    role: {
      type: String,
      default: 'sub-admin'
    },
    status: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminModel' }
  },
  { timestamps: true }
);

// Strip out password field when sending user object to client
AdminSchema.set('toJSON', {
  virtuals: true,
  transform(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    delete obj.password;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
  }
});

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

var encryptPassword = function(next) {
  if (this.isModified('password')) {
    const { saltRounds } = Constants.security;
    this._hashPassword(this.password, saltRounds, (err, hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
};

AdminSchema.post('save', handleE11000);
//
AdminSchema.pre('save', encryptPassword);

/**
 * User Methods
 */
AdminSchema.methods = {
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
        username: this.username,
        role: this.role
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
  _hashPassword(
    password,
    saltRounds = Constants.security.saltRounds,
    callback
  ) {
    return bcrypt.hash(password, saltRounds, callback);
  }
};

const AdminModel = mongoose.model('Admin', AdminSchema);

export default AdminModel;
