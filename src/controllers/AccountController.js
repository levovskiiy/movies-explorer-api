import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { EXPIRES_JWT, JWT_SECRET } from '../../config/config.js';
import BadRequestError from '../exceptions/BadRequestError.js';
import ConflictError from '../exceptions/ConflictError.js';
import AccountService from '../services/AccountService.js';
import { USER_ERROR_MESSAGES } from '../utils/constants.js';
import factory from '../utils/factory.js';


const registerUser = ({service}) => async (req, res, next) => {
  try {
    const {
      email,
      name,
      password
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const createdUser = await service.register({
      email,
      name,
      password: hash
    });

    res.status(201)
      .send(createdUser);
  } catch (error) {
    if (error.code === 11000) {
      next(new ConflictError(USER_ERROR_MESSAGES.EMAIL_ALREADY_EXIST));
    } else {
      next(error instanceof mongoose.Error.ValidationError
        ? new BadRequestError(error.message)
        : error);
    }
  }
};

const login = ({service}) => async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;
    const user = await service.login(email, password);
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: EXPIRES_JWT });

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: true,
    })
      .send({ message: 'logged!' });
  } catch (err) {
    next(err);
  }
};

const fns = {
  registerUser,
  login
};

const accountController = factory({AccountService}, fns);

export default accountController;

// class AccountController {
//   constructor(accountService) {
//     this.service = accountService;
//   }
//
//   registerUser() {
//     return async (req, res, next) => {
//       try {
//         const {
//           email,
//           name,
//           password,
//         } = req.body;
//
//         const hash = await bcrypt.hash(password, 10);
//
//         const createdUser = await this.service.register({
//           email,
//           name,
//           password: hash,
//         });
//
//         res.status(201)
//           .send(createdUser);
//       } catch (err) {
//         if (err.code === 11000) {
//           next(new ConflictError(USER_ERROR_MESSAGES.EMAIL_ALREADY_EXIST));
//         } else {
//           next(err instanceof mongoose.Error.ValidationError
//             ? new BadRequestError(err.message)
//             : err);
//         }
//       }
//     }
//   }
//
//   async login(req, res, next) {
//     try {
//       const {
//         email,
//         password,
//       } = req.body;
//       const user = await this.service.login(email, password);
//       const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: EXPIRES_JWT });
//
//       res.cookie('jwt', token, {
//         httpOnly: true,
//         sameSite: true,
//       })
//         .send({ message: 'logged!' });
//     } catch (err) {
//       next(err);
//     }
//   }
// }
//
// export default new AccountController(AccountService);
