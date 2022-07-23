/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config/config.ts":
/*!******************************!*\
  !*** ./src/config/config.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.morganConfig = exports.corsOptionsWhiteList = void 0;
const logger_config_1 = __importDefault(__webpack_require__(/*! ./logger.config */ "./src/config/logger.config.ts"));
const corsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Authorization',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
};
const corsOptionsWhiteList = (request, callback) => {
    const whiteList = ['localhost:4200', 'localhost:3000'];
    const origin = request.header('origin')
        ? request.header('origin')
        : request.header('host');
    if (origin && whiteList.some((host) => origin.includes(host))) {
        corsOptions['origin'] = true;
        callback(null, corsOptions);
        return;
    }
    corsOptions['origin'] = false;
    callback(new Error(`Origin not allowed by CORS: ${origin}`), corsOptions);
};
exports.corsOptionsWhiteList = corsOptionsWhiteList;
const morganConfig = (tokens, req, res) => {
    const log = [
        tokens.method(req, res),
        tokens.url(req, res),
        '-',
        'statusCode:',
        tokens.status(req, res),
        '-',
        'response-size:',
        tokens.res(req, res, 'content-length'),
        '-',
        'response-time:',
        tokens['response-time'](req, res),
        'ms',
    ].join(' ');
    logger_config_1.default.info(log);
    return log;
};
exports.morganConfig = morganConfig;


/***/ }),

/***/ "./src/config/logger.config.ts":
/*!*************************************!*\
  !*** ./src/config/logger.config.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const winston_1 = __webpack_require__(/*! winston */ "winston");
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.combine(winston_1.format.simple(), winston_1.format.timestamp(), winston_1.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston_1.transports.File({
            filename: "./logs/error.log",
            level: "error",
        }),
        new winston_1.transports.File({
            filename: "./logs/info.log",
            level: "info",
        }),
    ],
});
exports["default"] = logger;


/***/ }),

/***/ "./src/config/mongodb.config.ts":
/*!**************************************!*\
  !*** ./src/config/mongodb.config.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dotenv_1 = __webpack_require__(/*! dotenv */ "dotenv");
const logger_config_1 = __importDefault(__webpack_require__(/*! ./logger.config */ "./src/config/logger.config.ts"));
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
class MongoDb {
    constructor() {
        (0, dotenv_1.config)();
    }
    connect() {
        mongoose_1.default
            .connect(process.env.MONGO_DB, {
            servername: "COLLABOR@TOR",
        })
            .then(() => {
            logger_config_1.default.info("MongoDb connected");
        })
            .catch((error) => {
            logger_config_1.default.error(error);
        });
    }
}
exports["default"] = MongoDb;


/***/ }),

/***/ "./src/controllers/auth.controller.ts":
/*!********************************************!*\
  !*** ./src/controllers/auth.controller.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const users_1 = __importDefault(__webpack_require__(/*! ../models/users */ "./src/models/users/index.ts"));
const autobind_decorator_1 = __webpack_require__(/*! autobind-decorator */ "autobind-decorator");
const User = users_1.default;
let AuthController = class AuthController {
    constructor() {
    }
    async authUser(req, res, next) {
    }
};
AuthController = __decorate([
    autobind_decorator_1.boundClass
], AuthController);
exports["default"] = AuthController;


/***/ }),

/***/ "./src/controllers/user.controller.ts":
/*!********************************************!*\
  !*** ./src/controllers/user.controller.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const users_1 = __importDefault(__webpack_require__(/*! ../models/users */ "./src/models/users/index.ts"));
const autobind_decorator_1 = __webpack_require__(/*! autobind-decorator */ "autobind-decorator");
const http_errors_1 = __importDefault(__webpack_require__(/*! http-errors */ "http-errors"));
const User = users_1.default;
let UserController = class UserController {
    constructor() { }
    async createUsers(req, res, next) {
        try {
            const newUser = new User({ ...req.body });
            const userSaved = await newUser.save();
            res.status(200).json(userSaved);
        }
        catch (err) {
            next(err);
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        }
        catch (err) {
            next(err);
        }
    }
    async getSingleUser(req, res, next) {
        const { id } = req.params;
        try {
            const user = await User.findOne({ _id: id });
            if (user) {
                res.status(200).json(user);
                return;
            }
            res.status(404);
            const error = new http_errors_1.default.NotFound();
            next(error);
        }
        catch (err) {
            next(err);
        }
    }
    async removeUser(req, res, next) {
        const { id } = req.params;
        try {
            const userDeleted = await User.deleteOne({ _id: id });
            res.status(200).json({
                message: `User ${id} successfully deleted`,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async updateUser(req, res, next) {
        const { id } = req.params;
        const user = { ...req.body };
        try {
            const updated = await User.findOneAndUpdate({ _id: id }, user, {
                new: true,
            });
            res.status(200).json(updated);
        }
        catch (err) {
            next(err);
        }
    }
};
UserController = __decorate([
    autobind_decorator_1.boundClass
], UserController);
exports["default"] = UserController;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const mongodb_config_1 = __importDefault(__webpack_require__(/*! ./config/mongodb.config */ "./src/config/mongodb.config.ts"));
const server_1 = __importDefault(__webpack_require__(/*! ./server */ "./src/server.ts"));
const dotenv_1 = __webpack_require__(/*! dotenv */ "dotenv");
const logger_config_1 = __importDefault(__webpack_require__(/*! ./config/logger.config */ "./src/config/logger.config.ts"));
(0, dotenv_1.config)();
const port = process.env.PORT || 3000;
const mongodb = new mongodb_config_1.default();
mongodb.connect();
server_1.default.listen(port, () => {
    logger_config_1.default.info(`connected to port ${port}`);
});


/***/ }),

/***/ "./src/middleware/errorHandler.ts":
/*!****************************************!*\
  !*** ./src/middleware/errorHandler.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleError = exports.notFound = void 0;
const logger_config_1 = __importDefault(__webpack_require__(/*! ../config/logger.config */ "./src/config/logger.config.ts"));
const http_errors_1 = __importDefault(__webpack_require__(/*! http-errors */ "http-errors"));
const notFound = (req, res, next) => {
    res.status(404);
    const error = new http_errors_1.default.NotFound();
    next(error);
};
exports.notFound = notFound;
const handleError = (err, req, res, next) => {
    const jsonError = {
        error: {
            statusCode: res.statusCode || 500,
            message: err.message,
        },
    };
    logger_config_1.default.error(`statusCode: ${jsonError.error.statusCode}; statusText: ${jsonError.error.message}; stacks: ${err.stack};`);
    res.status(jsonError.error.statusCode).json(jsonError);
};
exports.handleError = handleError;


/***/ }),

/***/ "./src/middleware/limiters.ts":
/*!************************************!*\
  !*** ./src/middleware/limiters.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mainLimiter = void 0;
const express_rate_limit_1 = __importDefault(__webpack_require__(/*! express-rate-limit */ "express-rate-limit"));
exports.mainLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        message: 'Too Many Requests',
    },
});


/***/ }),

/***/ "./src/models/roles/index.ts":
/*!***********************************!*\
  !*** ./src/models/roles/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleSchema = void 0;
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
exports.RoleSchema = new mongoose_1.default.Schema({
    name: String,
    createdBy: String,
}, { timestamps: true });
exports["default"] = mongoose_1.default.model("Role", exports.RoleSchema);


/***/ }),

/***/ "./src/models/users/index.ts":
/*!***********************************!*\
  !*** ./src/models/users/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
const roles_1 = __webpack_require__(/*! ../roles */ "./src/models/roles/index.ts");
const crypto_1 = __importDefault(__webpack_require__(/*! crypto */ "crypto"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    emailVerfiedAt: {
        type: Date,
        default: undefined,
    },
    emailVerificationCode: String,
    salt: String,
    roles: {
        type: [roles_1.RoleSchema],
        default: [],
    },
});
UserSchema.methods.setPassword = function (password) {
    this.salt = crypto_1.default.randomBytes(16).toString("hex");
    this.hash = crypto_1.default.pbkdf2Sync(password, this.salt, 1000, 64, "sha1").toString("hex");
};
UserSchema.methods.validatePassword = function (password) {
    const hash = crypto_1.default.pbkdf2Sync(password, this.salt, 1000, 64, "sha1").toString("hex");
    return this.password === hash;
};
exports["default"] = (0, mongoose_1.model)("User", UserSchema);


/***/ }),

/***/ "./src/routes/auth/index.ts":
/*!**********************************!*\
  !*** ./src/routes/auth/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const auth_controller_1 = __importDefault(__webpack_require__(/*! ../../controllers/auth.controller */ "./src/controllers/auth.controller.ts"));
const limiters_1 = __webpack_require__(/*! ../../middleware/limiters */ "./src/middleware/limiters.ts");
const router = express_1.default.Router();
const authController = new auth_controller_1.default();
router.route("/").post([limiters_1.mainLimiter, authController.authUser]);
exports["default"] = router;


/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const auth_1 = __importDefault(__webpack_require__(/*! ./auth */ "./src/routes/auth/index.ts"));
const user_1 = __importDefault(__webpack_require__(/*! ./user */ "./src/routes/user/index.ts"));
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    res.json({ health: "App is up!" });
});
router.use("/auth", auth_1.default);
router.use("/user", user_1.default);
exports["default"] = router;


/***/ }),

/***/ "./src/routes/user/index.ts":
/*!**********************************!*\
  !*** ./src/routes/user/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const user_controller_1 = __importDefault(__webpack_require__(/*! ../../controllers/user.controller */ "./src/controllers/user.controller.ts"));
const limiters_1 = __webpack_require__(/*! ../../middleware/limiters */ "./src/middleware/limiters.ts");
const router = express_1.default.Router();
const userController = new user_controller_1.default();
router.route("/").get([limiters_1.mainLimiter, userController.getUsers]);
router
    .route("/:id")
    .get([limiters_1.mainLimiter, userController.getSingleUser])
    .delete([limiters_1.mainLimiter, userController.removeUser])
    .put([limiters_1.mainLimiter, userController.updateUser]);
exports["default"] = router;


/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! ./config/config */ "./src/config/config.ts");
const errorHandler_1 = __webpack_require__(/*! ./middleware/errorHandler */ "./src/middleware/errorHandler.ts");
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
const dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const helmet_1 = __importDefault(__webpack_require__(/*! helmet */ "helmet"));
const morgan_1 = __importDefault(__webpack_require__(/*! morgan */ "morgan"));
const routes_1 = __importDefault(__webpack_require__(/*! ./routes */ "./src/routes/index.ts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const middleware = [
    (0, morgan_1.default)(config_1.morganConfig),
    (0, helmet_1.default)(),
    (0, cors_1.default)(config_1.corsOptionsWhiteList),
    express_1.default.json(),
    express_1.default.urlencoded({ extended: false }),
];
app.use(middleware);
const errorHandlers = [errorHandler_1.notFound, errorHandler_1.handleError];
app.use(errorHandlers);
app.get("/", (_req, res) => {
    return res.json({ App: "App is up!" });
});
app.use("/api/v1", routes_1.default);
exports["default"] = app;


/***/ }),

/***/ "autobind-decorator":
/*!*************************************!*\
  !*** external "autobind-decorator" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("autobind-decorator");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-rate-limit":
/*!*************************************!*\
  !*** external "express-rate-limit" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("express-rate-limit");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("http-errors");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("winston");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map