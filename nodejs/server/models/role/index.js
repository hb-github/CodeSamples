import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateUsername, validateEmail, validatePassword } from './validate';
import Constants from '../../config/constants';
const Schema = mongoose.Schema;

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

const RoleSchema = new Schema(
  {
    name: String,
    status: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const RoleModel = mongoose.model('Role', RoleSchema);

export default RoleModel;
