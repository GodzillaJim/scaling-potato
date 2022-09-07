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
var logger_config_1 = __importDefault(__webpack_require__(/*! ./logger.config */ "./src/config/logger.config.ts"));
var corsOptions = {
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
        "Authorization",
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};
var corsOptionsWhiteList = function (request, callback) {
    var whiteList = [
        "localhost:4200",
        "localhost:3000",
        "localhost:5000",
        "collaborator-app-dev-dev.us-west-2.elasticbeanstalk.com",
    ];
    var origin = request.header("origin")
        ? request.header("origin")
        : request.header("host");
    if (origin && whiteList.some(function (host) { return origin.includes(host); })) {
        corsOptions.origin = true;
        callback(null, corsOptions);
        return;
    }
    corsOptions.origin = false;
    callback(new Error("Origin not allowed by CORS: ".concat(origin)), corsOptions);
};
exports.corsOptionsWhiteList = corsOptionsWhiteList;
var morganConfig = function (tokens, req, res) {
    var log = [
        tokens.method(req, res),
        tokens.url(req, res),
        "-",
        "statusCode:",
        tokens.status(req, res),
        "-",
        "response-size:",
        tokens.res(req, res, "content-length"),
        "-",
        "response-time:",
        tokens["response-time"](req, res),
        "ms",
    ].join(" ");
    logger_config_1.default.info(log);
    return log;
};
exports.morganConfig = morganConfig;


/***/ }),

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
dotenv_1.default.config();
exports["default"] = {
    mailer: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT, 10),
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    },
    kafka: {
        bootstrapServerHost: process.env.KAFKA_BOOTSTRAP_SERVER || "localhost:9092",
        port: process.env.KAFKA_PORT || 9092,
        clientId: process.env.KAFKA_CLIENT_ID,
    },
    jwt: {
        secret: process.env.JWT_SECRET || "SECRET",
        expiration: process.env.JWT_EXPIRATION || 3000,
    },
};


/***/ }),

/***/ "./src/config/logger.config.ts":
/*!*************************************!*\
  !*** ./src/config/logger.config.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var winston_1 = __webpack_require__(/*! winston */ "winston");
var logger = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.combine(winston_1.format.simple(), winston_1.format.timestamp(), winston_1.format.printf(function (info) {
        return "[".concat(info.timestamp, "] ").concat(info.level, ": ").concat(info.message);
    })),
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
var dotenv_1 = __webpack_require__(/*! dotenv */ "dotenv");
var mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
var logger_config_1 = __importDefault(__webpack_require__(/*! ./logger.config */ "./src/config/logger.config.ts"));
var MongoDb = (function () {
    function MongoDb() {
        (0, dotenv_1.config)();
    }
    MongoDb.prototype.connect = function () {
        mongoose_1.default
            .connect(process.env.MONGO_URI)
            .then(function () {
            logger_config_1.default.info("MongoDb connected");
        })
            .catch(function (error) {
            logger_config_1.default.error(error);
        });
    };
    return MongoDb;
}());
exports["default"] = MongoDb;


/***/ }),

/***/ "./src/controllers/auth/index.ts":
/*!***************************************!*\
  !*** ./src/controllers/auth/index.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var autobind_decorator_1 = __webpack_require__(/*! autobind-decorator */ "autobind-decorator");
var accounts_1 = __importDefault(__webpack_require__(/*! ../../services/auth/accounts */ "./src/services/auth/accounts/index.ts"));
var AuthController = (function () {
    function AuthController() {
        this.accountService = new accounts_1.default();
    }
    AuthController.prototype.registerNewUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newUser = req.body;
                        return [4, this.accountService.registerNewAccount(newUser)];
                    case 1:
                        _a.sent();
                        res.status(200).json({ success: true, data: "Check email to continue" });
                        return [3, 3];
                    case 2:
                        e_1 = _a.sent();
                        next(e_1);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    AuthController.prototype.loginUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, tokenInfo, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user = req.body;
                        return [4, this.accountService.loginUser(user)];
                    case 1:
                        tokenInfo = _a.sent();
                        res.status(200).json(tokenInfo);
                        return [3, 3];
                    case 2:
                        e_2 = _a.sent();
                        next(e_2);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    AuthController = __decorate([
        autobind_decorator_1.boundClass
    ], AuthController);
    return AuthController;
}());
exports["default"] = AuthController;


/***/ }),

/***/ "./src/controllers/contact/index.ts":
/*!******************************************!*\
  !*** ./src/controllers/contact/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var autobind_decorator_1 = __webpack_require__(/*! autobind-decorator */ "autobind-decorator");
var logger_config_1 = __importDefault(__webpack_require__(/*! ../../config/logger.config */ "./src/config/logger.config.ts"));
var contact_1 = __importDefault(__webpack_require__(/*! ../../services/contact */ "./src/services/contact/index.ts"));
var ContactFormController = (function () {
    function ContactFormController() {
        this.name = "Contact-Form-Controller";
        this.contactService = new contact_1.default();
    }
    ContactFormController.prototype.sendContactFormSubmission = function (req, _res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var form, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        form = req.body;
                        return [4, this.contactService.submitContactForm(form)];
                    case 1:
                        _a.sent();
                        logger_config_1.default.info(form);
                        return [3, 3];
                    case 2:
                        e_1 = _a.sent();
                        logger_config_1.default.error(e_1);
                        next(e_1);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ContactFormController = __decorate([
        autobind_decorator_1.boundClass
    ], ContactFormController);
    return ContactFormController;
}());
exports["default"] = ContactFormController;


/***/ }),

/***/ "./src/controllers/task/TaskController/index.ts":
/*!******************************************************!*\
  !*** ./src/controllers/task/TaskController/index.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var task_1 = __importDefault(__webpack_require__(/*! ../../../services/task */ "./src/services/task/index.ts"));
var errors_1 = __importDefault(__webpack_require__(/*! ../../../errors */ "./src/errors/index.ts"));
var ClassController = (function () {
    function ClassController() {
    }
    ClassController.createTask = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userEmail, task, response, e_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userEmail = res.locals.user.email;
                        task = req.body;
                        _a = {
                            status: 200
                        };
                        return [4, task_1.default.createTask(task, userEmail)];
                    case 1:
                        response = (_a.data = _b.sent(),
                            _a);
                        return [2, res.json(response)];
                    case 2:
                        e_1 = _b.sent();
                        return [2, res.status(500).json((0, errors_1.default)(e_1))];
                    case 3: return [2];
                }
            });
        });
    };
    ClassController.getTaskById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, task, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.body;
                        return [4, task_1.default.getTaskById(id)];
                    case 1:
                        task = _a.sent();
                        if (!task) {
                            res
                                .status(404)
                                .json((0, errors_1.default)({ message: "Task with id: ".concat(id.id, " does not exist") }, 404));
                        }
                        res.json({ status: 200, data: task });
                        return [3, 3];
                    case 2:
                        e_2 = _a.sent();
                        res.status(500).json((0, errors_1.default)(e_2));
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return ClassController;
}());
exports["default"] = ClassController;


/***/ }),

/***/ "./src/controllers/user/index.ts":
/*!***************************************!*\
  !*** ./src/controllers/user/index.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var UserService_1 = __importDefault(__webpack_require__(/*! ../../services/UserService */ "./src/services/UserService/index.ts"));
var errors_1 = __importDefault(__webpack_require__(/*! ../../errors */ "./src/errors/index.ts"));
var UserController = (function () {
    function UserController() {
    }
    UserController.getUsers = function (_req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, UserService_1.default.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        return [2, res.json(users)];
                    case 2:
                        e_1 = _a.sent();
                        return [2, res.json((0, errors_1.default)(e_1))];
                    case 3: return [2];
                }
            });
        });
    };
    return UserController;
}());
exports["default"] = UserController;


/***/ }),

/***/ "./src/errors/index.ts":
/*!*****************************!*\
  !*** ./src/errors/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var http_errors_1 = __importDefault(__webpack_require__(/*! http-errors */ "http-errors"));
var createErrorResponse = function (error, status) {
    if (status === void 0) { status = 500; }
    switch (status) {
        case 404:
            return new http_errors_1.default.NotFound(error.message);
        case 400:
            return new http_errors_1.default.BadRequest(error.message);
        case 401:
            return new http_errors_1.default.Unauthorized(error.message);
        case 403:
            return new http_errors_1.default.Forbidden(error.message);
        default:
            return {
                error: {
                    statusCode: status,
                    message: error.message,
                },
            };
    }
};
exports["default"] = createErrorResponse;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var dotenv_1 = __webpack_require__(/*! dotenv */ "dotenv");
var mongodb_config_1 = __importDefault(__webpack_require__(/*! ./config/mongodb.config */ "./src/config/mongodb.config.ts"));
var server_1 = __importDefault(__webpack_require__(/*! ./server */ "./src/server.ts"));
var seed_1 = __webpack_require__(/*! ./seed */ "./src/seed/index.ts");
var logger_config_1 = __importDefault(__webpack_require__(/*! ./config/logger.config */ "./src/config/logger.config.ts"));
(0, dotenv_1.config)();
var port = process.env.PORT || 3000;
var mongodb = new mongodb_config_1.default();
mongodb.connect();
server_1.default.listen(port, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_config_1.default.info("connected to port ".concat(port));
                console.log("connected to port ".concat(port));
                return [4, (0, seed_1.seedRoles)()];
            case 1:
                _a.sent();
                return [4, (0, seed_1.seedAdmin)()];
            case 2:
                _a.sent();
                return [2];
        }
    });
}); });


/***/ }),

/***/ "./src/middleware/auth/index.ts":
/*!**************************************!*\
  !*** ./src/middleware/auth/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var lodash_1 = __webpack_require__(/*! lodash */ "lodash");
var http2_1 = __webpack_require__(/*! http2 */ "http2");
var tools_1 = __importDefault(__webpack_require__(/*! ../../services/auth/tools */ "./src/services/auth/tools/index.ts"));
var logger_config_1 = __importDefault(__webpack_require__(/*! ../../config/logger.config */ "./src/config/logger.config.ts"));
var errors_1 = __importDefault(__webpack_require__(/*! ../../errors */ "./src/errors/index.ts"));
var HTTP_STATUS_UNAUTHORIZED = http2_1.constants.HTTP_STATUS_UNAUTHORIZED;
var AuthChecker = (function () {
    function AuthChecker() {
        this.authService = new tools_1.default();
    }
    AuthChecker.isAuthenticated = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, decoded, _a, email, firstName, roles;
            return __generator(this, function (_b) {
                try {
                    token = req.header("Authorization");
                    if (token || !(0, lodash_1.isEmpty)(token)) {
                        decoded = tools_1.default.verifyToken(token.split(" ")[1]);
                        if (decoded) {
                            _a = decoded.payload, email = _a.email, firstName = _a.firstName, roles = _a.roles;
                            res.locals = { user: { email: email, firstName: firstName, roles: roles } };
                            return [2, next()];
                        }
                    }
                    return [2, res
                            .status(HTTP_STATUS_UNAUTHORIZED)
                            .json((0, errors_1.default)({ message: "Please provide a valid token on header" }, HTTP_STATUS_UNAUTHORIZED))];
                }
                catch (e) {
                    return [2, res.status(500).json((0, errors_1.default)(e))];
                }
                return [2];
            });
        });
    };
    AuthChecker.checkAuthorization = function (role, roles) {
        try {
            var isAuthorization = roles.find(function (permission) {
                console.log("Comparison: ", permission, role.toString());
                return "".concat(permission) === role.toString();
            });
            if (isAuthorization) {
                return true;
            }
        }
        catch (e) {
            logger_config_1.default.error(e);
        }
        return false;
    };
    AuthChecker.isAuthorized = function (role) { return function (_req, res, next) {
        try {
            var user = res.locals.user;
            var roles = user.roles;
            var isAuthorized = AuthChecker.checkAuthorization(role, roles);
            if (isAuthorized) {
                return next();
            }
            return res
                .status(403)
                .json((0, errors_1.default)({ message: "Unauthorized" }, 403));
        }
        catch (e) {
            logger_config_1.default.error(e);
            return res.status(500).json((0, errors_1.default)(e, 500));
        }
    }; };
    return AuthChecker;
}());
exports["default"] = AuthChecker;


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
var express_rate_limit_1 = __importDefault(__webpack_require__(/*! express-rate-limit */ "express-rate-limit"));
exports.mainLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        message: "Too Many Requests",
    },
});
exports["default"] = exports.mainLimiter;


/***/ }),

/***/ "./src/models/index.ts":
/*!*****************************!*\
  !*** ./src/models/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = exports.User = void 0;
var roles_1 = __importDefault(__webpack_require__(/*! ./roles */ "./src/models/roles/index.ts"));
var users_1 = __importDefault(__webpack_require__(/*! ./users */ "./src/models/users/index.ts"));
exports.User = users_1.default;
exports.Role = roles_1.default;


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
var mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
var types_1 = __webpack_require__(/*! ../../types */ "./src/types/index.ts");
exports.RoleSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        enum: types_1.Role,
        default: types_1.Role.END_USER,
    },
    createdBy: String,
}, { timestamps: true });
exports["default"] = mongoose_1.default.model("Role", exports.RoleSchema);


/***/ }),

/***/ "./src/models/task/index.ts":
/*!**********************************!*\
  !*** ./src/models/task/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
var str = "function(){\n  //Write code here\n}";
var TaskSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: { type: String, required: true },
    code: { type: String, required: false, default: str },
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("Task", TaskSchema);


/***/ }),

/***/ "./src/models/users/index.ts":
/*!***********************************!*\
  !*** ./src/models/users/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
var UserSchema = new mongoose_1.Schema({
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
    emailVerifiedAt: {
        type: Date,
        default: undefined,
    },
    emailVerificationCode: String,
    avatar: {
        type: String,
        default: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/986.jpg",
    },
    salt: String,
    roles: {
        type: Array,
        default: [],
    },
});
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
var express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
var limiters_1 = __importDefault(__webpack_require__(/*! ../../middleware/limiters */ "./src/middleware/limiters.ts"));
var auth_1 = __importDefault(__webpack_require__(/*! ../../controllers/auth */ "./src/controllers/auth/index.ts"));
var validators_1 = __importDefault(__webpack_require__(/*! ../../tools/validators */ "./src/tools/validators/index.ts"));
var registration_1 = __importDefault(__webpack_require__(/*! ../../types/dto/registration */ "./src/types/dto/registration/index.ts"));
var login_1 = __importDefault(__webpack_require__(/*! ../../types/dto/login */ "./src/types/dto/login/index.ts"));
var router = express_1.default.Router();
var authController = new auth_1.default();
router
    .route("/register")
    .post([
    limiters_1.default,
    validators_1.default.validateInput(registration_1.default),
    authController.registerNewUser,
]);
router
    .route("/login")
    .post([
    limiters_1.default,
    validators_1.default.validateInput(login_1.default),
    authController.loginUser,
]);
exports["default"] = router;


/***/ }),

/***/ "./src/routes/guest/index.ts":
/*!***********************************!*\
  !*** ./src/routes/guest/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var express_1 = __webpack_require__(/*! express */ "express");
var validators_1 = __importDefault(__webpack_require__(/*! ../../tools/validators */ "./src/tools/validators/index.ts"));
var ContactForm_1 = __importDefault(__webpack_require__(/*! ../../types/dto/contact/ContactForm */ "./src/types/dto/contact/ContactForm.ts"));
var contact_1 = __importDefault(__webpack_require__(/*! ../../controllers/contact */ "./src/controllers/contact/index.ts"));
var router = (0, express_1.Router)();
var controller = new contact_1.default();
var handler = function (req, res) {
    res.json({
        status: "Route is live",
        url: req.url,
    });
};
router
    .route("/contact")
    .get(handler)
    .post([
    validators_1.default.validateInput(ContactForm_1.default),
    controller.sendContactFormSubmission,
]);
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
var express_1 = __webpack_require__(/*! express */ "express");
var auth_1 = __importDefault(__webpack_require__(/*! ./auth */ "./src/routes/auth/index.ts"));
var user_1 = __importDefault(__webpack_require__(/*! ./user */ "./src/routes/user/index.ts"));
var guest_1 = __importDefault(__webpack_require__(/*! ./guest */ "./src/routes/guest/index.ts"));
var task_1 = __importDefault(__webpack_require__(/*! ./task */ "./src/routes/task/index.ts"));
var router = (0, express_1.Router)();
router.use("/auth", auth_1.default);
router.use("/user", user_1.default);
router.use("/guest", guest_1.default);
router.use("/task", task_1.default);
var handler = function (_req, res) {
    res.json({ health: "Okay", message: "Hello world" });
};
router.get("/", handler);
exports["default"] = router;


/***/ }),

/***/ "./src/routes/task/index.ts":
/*!**********************************!*\
  !*** ./src/routes/task/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
var limiters_1 = __importDefault(__webpack_require__(/*! ../../middleware/limiters */ "./src/middleware/limiters.ts"));
var auth_1 = __importDefault(__webpack_require__(/*! ../../middleware/auth */ "./src/middleware/auth/index.ts"));
var types_1 = __webpack_require__(/*! ../../types */ "./src/types/index.ts");
var TaskController_1 = __importDefault(__webpack_require__(/*! ../../controllers/task/TaskController */ "./src/controllers/task/TaskController/index.ts"));
var validators_1 = __importDefault(__webpack_require__(/*! ../../tools/validators */ "./src/tools/validators/index.ts"));
var create_1 = __importDefault(__webpack_require__(/*! ../../types/dto/task/create */ "./src/types/dto/task/create/index.ts"));
var findOne_1 = __importDefault(__webpack_require__(/*! ../../types/dto/task/findOne */ "./src/types/dto/task/findOne/index.ts"));
var router = express_1.default.Router();
router
    .route("/")
    .post([
    limiters_1.default,
    auth_1.default.isAuthenticated,
    auth_1.default.isAuthorized(types_1.Role.END_USER),
    validators_1.default.validateInput(create_1.default),
    TaskController_1.default.createTask,
]);
router
    .route("/id")
    .post([
    limiters_1.default,
    validators_1.default.validateInput(findOne_1.default),
    TaskController_1.default.getTaskById,
]);
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
var express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
var limiters_1 = __importDefault(__webpack_require__(/*! ../../middleware/limiters */ "./src/middleware/limiters.ts"));
var auth_1 = __importDefault(__webpack_require__(/*! ../../middleware/auth */ "./src/middleware/auth/index.ts"));
var types_1 = __webpack_require__(/*! ../../types */ "./src/types/index.ts");
var user_1 = __importDefault(__webpack_require__(/*! ../../controllers/user */ "./src/controllers/user/index.ts"));
var router = express_1.default.Router();
router
    .route("/")
    .get([
    limiters_1.default,
    auth_1.default.isAuthenticated,
    auth_1.default.isAuthorized(types_1.Role.END_USER),
    auth_1.default.isAuthorized(types_1.Role.ADMIN),
    user_1.default.getUsers,
]);
exports["default"] = router;


/***/ }),

/***/ "./src/seed/index.ts":
/*!***************************!*\
  !*** ./src/seed/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.seedAdmin = exports.seedRoles = void 0;
var faker_1 = __webpack_require__(/*! @faker-js/faker */ "@faker-js/faker");
var models_1 = __webpack_require__(/*! ../models */ "./src/models/index.ts");
var logger_config_1 = __importDefault(__webpack_require__(/*! ../config/logger.config */ "./src/config/logger.config.ts"));
var tools_1 = __importDefault(__webpack_require__(/*! ../services/auth/tools */ "./src/services/auth/tools/index.ts"));
var types_1 = __webpack_require__(/*! ../types */ "./src/types/index.ts");
var roleList = [types_1.Role.ADMIN, types_1.Role.END_USER, types_1.Role.SUPER_ADMIN];
var authService = new tools_1.default();
var seedRoles = function () { return __awaiter(void 0, void 0, void 0, function () {
    var roles, roleArr, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4, models_1.Role.find({})];
            case 1:
                roles = _a.sent();
                if (!(roles.length === 0)) return [3, 3];
                roleArr = roleList.map(function (role) {
                    var temp = new models_1.Role();
                    temp.name = role.toString();
                    temp.createdBy = "GodzillaJim";
                    return temp;
                });
                return [4, models_1.Role.bulkSave(roleArr)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [3, 5];
            case 4:
                error_1 = _a.sent();
                logger_config_1.default.error(error_1);
                return [3, 5];
            case 5: return [2];
        }
    });
}); };
exports.seedRoles = seedRoles;
var seedAdmin = function () { return __awaiter(void 0, void 0, void 0, function () {
    var superAdmin, user, _a, salt, hash, _b, e_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                return [4, models_1.User.findOne({
                        email: "superadmin@collaborate.com",
                    })];
            case 1:
                superAdmin = _c.sent();
                if (!!superAdmin) return [3, 4];
                user = new models_1.User();
                _a = authService.encryptPassword("password123"), salt = _a.salt, hash = _a.hash;
                user.email = "superadmin@collaborate.com";
                user.firstName = faker_1.faker.name.firstName();
                user.lastName = faker_1.faker.name.lastName();
                user.password = hash;
                user.salt = salt;
                user.avatar = faker_1.faker.image.avatar();
                user.disabled = false;
                user.verified = true;
                user.emailVerifiedAt = new Date();
                user.emailVerificationCode = faker_1.faker.word.noun(6);
                _b = user;
                return [4, models_1.Role.find({})];
            case 2:
                _b.roles = _c.sent();
                return [4, user.save()];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4: return [3, 6];
            case 5:
                e_1 = _c.sent();
                logger_config_1.default.error(e_1);
                return [3, 6];
            case 6: return [2];
        }
    });
}); };
exports.seedAdmin = seedAdmin;


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
var cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
var dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
var express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
var helmet_1 = __importDefault(__webpack_require__(/*! helmet */ "helmet"));
var morgan_1 = __importDefault(__webpack_require__(/*! morgan */ "morgan"));
var config_1 = __webpack_require__(/*! ./config/config */ "./src/config/config.ts");
var routes_1 = __importDefault(__webpack_require__(/*! ./routes */ "./src/routes/index.ts"));
var server_1 = __importDefault(__webpack_require__(/*! ./services/socket/server */ "./src/services/socket/server/index.ts"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var middleware = [
    (0, morgan_1.default)(config_1.morganConfig),
    (0, helmet_1.default)(),
    (0, cors_1.default)(),
    express_1.default.json(),
    express_1.default.urlencoded({ extended: false }),
];
app.use(middleware);
app.use("/api/v1", routes_1.default);
var server = (0, server_1.default)(app);
exports["default"] = server;


/***/ }),

/***/ "./src/services/UserService/index.ts":
/*!*******************************************!*\
  !*** ./src/services/UserService/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var users_1 = __importDefault(__webpack_require__(/*! ../../models/users */ "./src/models/users/index.ts"));
var UserService = (function () {
    function UserService() {
    }
    UserService.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, users_1.default.find()];
            });
        });
    };
    return UserService;
}());
exports["default"] = UserService;


/***/ }),

/***/ "./src/services/auth/accounts/index.ts":
/*!*********************************************!*\
  !*** ./src/services/auth/accounts/index.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var http_errors_1 = __importDefault(__webpack_require__(/*! http-errors */ "http-errors"));
var models_1 = __webpack_require__(/*! ../../../models */ "./src/models/index.ts");
var tools_1 = __importDefault(__webpack_require__(/*! ../tools */ "./src/services/auth/tools/index.ts"));
var Account = (function () {
    function Account() {
        this.authService = new tools_1.default();
    }
    Account.prototype.registerNewAccount = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, salt, hash, newUser, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, models_1.User.findOne({ email: account.email })];
                    case 1:
                        user = _c.sent();
                        if (user) {
                            throw new http_errors_1.default.BadRequest("This email is already registered.");
                        }
                        _a = this.authService.encryptPassword(account.password), salt = _a.salt, hash = _a.hash;
                        newUser = new models_1.User();
                        newUser.email = account.email;
                        newUser.firstName = account.firstName;
                        newUser.lastName = account.lastName;
                        newUser.password = hash;
                        newUser.salt = salt;
                        _b = newUser;
                        return [4, this.authService.getDefaultRoles()];
                    case 2:
                        _b.roles = _c.sent();
                        if (account.avatar) {
                            newUser.avatar = account.avatar;
                        }
                        return [4, newUser.save()];
                    case 3:
                        _c.sent();
                        return [2, { success: true, message: "Account created successfully!" }];
                }
            });
        });
    };
    Account.prototype.loginUser = function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var user, error, isPassValid, error, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, models_1.User.findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            error = new http_errors_1.default.BadRequest("This person does not exist!");
                            error.status = 400;
                            throw error;
                        }
                        isPassValid = this.authService.validatePassword(password, user.password, user.salt);
                        if (!isPassValid) {
                            error = new http_errors_1.default.BadRequest("Wrong username or password!");
                            error.status = 400;
                            throw error;
                        }
                        token = this.authService.generateJwtToken({
                            email: email,
                            firstName: user.firstName,
                            roles: user.roles.map(function (_a) {
                                var name = _a.name;
                                return name;
                            }),
                        });
                        return [2, __assign(__assign({}, token), { firstName: user.firstName, avatar: user.avatar })];
                }
            });
        });
    };
    return Account;
}());
exports["default"] = Account;


/***/ }),

/***/ "./src/services/auth/tools/index.ts":
/*!******************************************!*\
  !*** ./src/services/auth/tools/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var crypto_1 = __importDefault(__webpack_require__(/*! crypto */ "crypto"));
var lodash_1 = __webpack_require__(/*! lodash */ "lodash");
var jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
var config_1 = __importDefault(__webpack_require__(/*! ../../../config */ "./src/config/index.ts"));
var roles_1 = __importDefault(__webpack_require__(/*! ../../../models/roles */ "./src/models/roles/index.ts"));
var AuthService = (function () {
    function AuthService() {
        this.salt = crypto_1.default.randomBytes(16).toString("hex");
        this.defaultRole = ["endUser"];
        this.secret = config_1.default.jwt.secret;
        this.expiration = config_1.default.jwt.expiration;
    }
    AuthService.verifyToken = function (token) {
        try {
            return jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret, { complete: true });
        }
        catch (e) {
            console.log(e);
            return null;
        }
    };
    AuthService.prototype.getDefaultRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, roles_1.default.find({ name: this.defaultRole })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.encryptPassword = function (password) {
        var hash = crypto_1.default
            .pbkdf2Sync(password, this.salt, 1000, 64, "sha1")
            .toString("hex");
        return { salt: this.salt, hash: hash };
    };
    AuthService.prototype.validatePassword = function (password, hash, salt) {
        var candidateHash = crypto_1.default
            .pbkdf2Sync(password, salt, 1000, 64, "sha1")
            .toString("hex");
        return (0, lodash_1.isEqual)(candidateHash, hash);
    };
    AuthService.prototype.generateJwtToken = function (_a) {
        var email = _a.email, firstName = _a.firstName, roles = _a.roles;
        var token = jsonwebtoken_1.default.sign({ email: email, firstName: firstName, roles: roles }, this.secret, {
            expiresIn: this.expiration,
        });
        return { token: token, expiresIn: this.expiration };
    };
    return AuthService;
}());
exports["default"] = AuthService;


/***/ }),

/***/ "./src/services/contact/index.ts":
/*!***************************************!*\
  !*** ./src/services/contact/index.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var logger_config_1 = __importDefault(__webpack_require__(/*! ../../config/logger.config */ "./src/config/logger.config.ts"));
var kafka_1 = __importDefault(__webpack_require__(/*! ../kafka */ "./src/services/kafka/index.ts"));
var ContactFormService = (function () {
    function ContactFormService() {
        this.TOPIC = "collaborate_contact_form_messages";
    }
    ContactFormService.prototype.submitContactForm = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var producerService, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        producerService = new kafka_1.default();
                        return [4, producerService.produceMessage(this.TOPIC, form)];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        logger_config_1.default.error(error_1);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return ContactFormService;
}());
exports["default"] = ContactFormService;


/***/ }),

/***/ "./src/services/kafka/index.ts":
/*!*************************************!*\
  !*** ./src/services/kafka/index.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var autobind_decorator_1 = __webpack_require__(/*! autobind-decorator */ "autobind-decorator");
var logger_config_1 = __importDefault(__webpack_require__(/*! ../../config/logger.config */ "./src/config/logger.config.ts"));
var kafka_1 = __webpack_require__(/*! ../../tools/kafka */ "./src/tools/kafka/index.ts");
var KafkaProducerService = (function () {
    function KafkaProducerService() {
        this.producer = kafka_1.producer;
    }
    KafkaProducerService.prototype.produceMessage = function (topic, message) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.producer.connect()];
                    case 1:
                        _a.sent();
                        return [4, this.producer.send({
                                topic: topic,
                                messages: [{ value: JSON.stringify(message) }],
                            })];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        logger_config_1.default.error(error_1);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    KafkaProducerService = __decorate([
        autobind_decorator_1.boundClass
    ], KafkaProducerService);
    return KafkaProducerService;
}());
exports["default"] = KafkaProducerService;


/***/ }),

/***/ "./src/services/socket/server/index.ts":
/*!*********************************************!*\
  !*** ./src/services/socket/server/index.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var http_1 = __webpack_require__(/*! http */ "http");
var logger_config_1 = __importDefault(__webpack_require__(/*! ../../../config/logger.config */ "./src/config/logger.config.ts"));
var User_1 = __importDefault(__webpack_require__(/*! ./services/User */ "./src/services/socket/server/services/User/index.ts"));
var task_1 = __importDefault(__webpack_require__(/*! ../../../models/task */ "./src/models/task/index.ts"));
var SocketIO = __webpack_require__(/*! socket.io */ "socket.io");
var removeUser = User_1.default.removeUser, usersInRoom = User_1.default.usersInRoom, addUser = User_1.default.addUser;
var roomList = {};
var str = "function(){\n  //Write code here\n}";
var socketServer = function (app) {
    try {
        var server = (0, http_1.createServer)(app);
        var io_1 = SocketIO(server);
        io_1.on("connection", function (socket) {
            socket.on("joinRoom", function (_a) {
                var room = _a.room;
                socket.join(room);
            });
            socket.on("chatMessage", function (_a) {
                var message = _a.message, sender = _a.sender, avatar = _a.avatar, date = _a.date, room = _a.room;
                io_1.to(room).emit("newMessage", { message: message, sender: sender, avatar: avatar, date: date, room: room });
            });
            socket.on("join", function (_a) {
                var name = _a.name, room = _a.room;
                return __awaiter(void 0, void 0, void 0, function () {
                    var task, user;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, task_1.default.findById(room)];
                            case 1:
                                task = _b.sent();
                                if (!roomList[room]) {
                                    roomList[room] = { users: [], data: task.code };
                                }
                                user = addUser({ id: socket.id, name: name, room: room });
                                socket.join(room);
                                socket.broadcast.to(room).emit("notification", {
                                    text: "".concat(user.name, " has joined!"),
                                    type: "connect",
                                });
                                io_1.to(room).emit("roomData", {
                                    room: room,
                                    users: usersInRoom(user.room),
                                    data: roomList[room].data,
                                });
                                return [2];
                        }
                    });
                });
            });
            socket.on("sendText", function (_a) {
                var data = _a.data, room = _a.room, name = _a.name;
                if (roomList[room]) {
                    roomList[room].data = data;
                }
                else {
                    roomList[room] = { users: [], data: data };
                }
                task_1.default.updateOne({ id: room }, { code: data });
                socket.broadcast.to(room).emit("text", { data: data, name: name });
            });
            socket.on("sendModeValue", function (_a) {
                var mode = _a.mode, room = _a.room;
                socket.broadcast.to(room).emit("changeMode", mode);
            });
            socket.on("sendThemeValue", function (_a) {
                var theme = _a.theme, room = _a.room;
                socket.broadcast.to(room).emit("changeTheme", theme);
            });
            socket.on("disconnect", function () {
                var user = removeUser(socket.id);
                if (user) {
                    if (usersInRoom(user.room).length <= 1) {
                        task_1.default.updateOne({ id: user.room });
                    }
                    io_1.to(user.room).emit("notification", {
                        text: "".concat(user.name, " has left"),
                        type: "disconnect",
                    });
                }
            });
        });
        return server;
    }
    catch (e) {
        logger_config_1.default.error(e);
        console.log(e);
        return app;
    }
};
exports["default"] = socketServer;


/***/ }),

/***/ "./src/services/socket/server/services/User/index.ts":
/*!***********************************************************!*\
  !*** ./src/services/socket/server/services/User/index.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var users = [];
var addUser = function (_a) {
    var id = _a.id, name = _a.name, room = _a.room;
    var user = users.find(function (_a) {
        var i = _a.id;
        return i === id;
    });
    if (!findUser) {
        user = { id: id, name: name, room: room };
        users.push(user);
    }
    return __assign({}, user);
};
var removeUser = function (id) {
    var index = users.findIndex(function (user) { return user.id === id; });
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};
var findUser = function (id) {
    return users.find(function (_a) {
        var userId = _a.id;
        return userId === id;
    });
};
var usersInRoom = function (room) {
    return users.filter(function (user) { return user.room === room; });
};
exports["default"] = { addUser: addUser, removeUser: removeUser, findUser: findUser, usersInRoom: usersInRoom };


/***/ }),

/***/ "./src/services/task/index.ts":
/*!************************************!*\
  !*** ./src/services/task/index.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var task_1 = __importDefault(__webpack_require__(/*! ../../models/task */ "./src/models/task/index.ts"));
var TaskService = (function () {
    function TaskService() {
    }
    TaskService.createTask = function (task, ownerEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var newTask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newTask = new task_1.default();
                        newTask.name = task.name;
                        newTask.owner = ownerEmail;
                        return [4, newTask.save()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    TaskService.getTaskById = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, task_1.default.findById(taskId.id)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return TaskService;
}());
exports["default"] = TaskService;


/***/ }),

/***/ "./src/tools/kafka/index.ts":
/*!**********************************!*\
  !*** ./src/tools/kafka/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.consumer = exports.producer = void 0;
var kafkajs_1 = __webpack_require__(/*! kafkajs */ "kafkajs");
var dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
var config_1 = __importDefault(__webpack_require__(/*! ../../config */ "./src/config/index.ts"));
dotenv_1.default.config();
var _a = config_1.default.kafka, clientId = _a.clientId, bootstrapServerHost = _a.bootstrapServerHost;
var kafka = new kafkajs_1.Kafka({
    clientId: clientId,
    brokers: [bootstrapServerHost],
});
exports.producer = kafka.producer();
exports.consumer = kafka.consumer({ groupId: "collabor@te" });
exports["default"] = kafka;


/***/ }),

/***/ "./src/tools/validators/index.ts":
/*!***************************************!*\
  !*** ./src/tools/validators/index.ts ***!
  \***************************************/
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
var lodash_1 = __webpack_require__(/*! lodash */ "lodash");
var autobind_decorator_1 = __webpack_require__(/*! autobind-decorator */ "autobind-decorator");
var class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
var class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var logger_config_1 = __importDefault(__webpack_require__(/*! ../../config/logger.config */ "./src/config/logger.config.ts"));
var Validators = (function () {
    function Validators() {
    }
    Validators.validateForm = function (form) {
        var definedFields = form.name && form.email && form.message && form.subject;
        var nonEmptyFields = (0, lodash_1.isEmpty)(form) ||
            (0, lodash_1.isEmpty)(form.name) ||
            (0, lodash_1.isEmpty)(form.message) ||
            (0, lodash_1.isEmpty)(form.subject) ||
            (0, lodash_1.isEmpty)(form.email);
        if (Boolean(definedFields) && !nonEmptyFields) {
            return true;
        }
        return false;
    };
    Validators.validateInput = function (dtoClass) {
        return function (req, res, next) {
            var output = (0, class_transformer_1.plainToInstance)(dtoClass, req.body);
            (0, class_validator_1.validate)(output, req.body, {
                skipMissingProperties: true,
                stopAtFirstError: true,
            }).then(function (errors) {
                if (errors.length > 0) {
                    logger_config_1.default.error(errors);
                    var errorTexts_1 = [];
                    errors.forEach(function (err) {
                        errorTexts_1.push(err.constraints);
                    });
                    return res.status(400).json({ error: true, data: errorTexts_1 });
                }
                req.body = output;
                return next();
            });
        };
    };
    Validators = __decorate([
        autobind_decorator_1.boundClass
    ], Validators);
    return Validators;
}());
exports["default"] = Validators;


/***/ }),

/***/ "./src/types/dto/contact/ContactForm.ts":
/*!**********************************************!*\
  !*** ./src/types/dto/contact/ContactForm.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var ContactForm = (function () {
    function ContactForm(email, name, subject, message) {
        this.email = email;
        this.name = name;
        this.subject = subject;
        this.message = message;
    }
    __decorate([
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.IsNotEmpty)()
    ], ContactForm.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], ContactForm.prototype, "name", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], ContactForm.prototype, "subject", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], ContactForm.prototype, "message", void 0);
    return ContactForm;
}());
exports["default"] = ContactForm;


/***/ }),

/***/ "./src/types/dto/login/index.ts":
/*!**************************************!*\
  !*** ./src/types/dto/login/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var Login = (function () {
    function Login() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEmail)()
    ], Login.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], Login.prototype, "password", void 0);
    return Login;
}());
exports["default"] = Login;


/***/ }),

/***/ "./src/types/dto/registration/index.ts":
/*!*********************************************!*\
  !*** ./src/types/dto/registration/index.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var NewAccount = (function () {
    function NewAccount() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], NewAccount.prototype, "firstName", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], NewAccount.prototype, "lastName", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEmail)()
    ], NewAccount.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], NewAccount.prototype, "password", void 0);
    return NewAccount;
}());
exports["default"] = NewAccount;


/***/ }),

/***/ "./src/types/dto/task/create/index.ts":
/*!********************************************!*\
  !*** ./src/types/dto/task/create/index.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var TaskDTO = (function () {
    function TaskDTO() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], TaskDTO.prototype, "name", void 0);
    return TaskDTO;
}());
exports["default"] = TaskDTO;


/***/ }),

/***/ "./src/types/dto/task/findOne/index.ts":
/*!*********************************************!*\
  !*** ./src/types/dto/task/findOne/index.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var TaskID = (function () {
    function TaskID() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], TaskID.prototype, "id", void 0);
    return TaskID;
}());
exports["default"] = TaskID;


/***/ }),

/***/ "./src/types/index.ts":
/*!****************************!*\
  !*** ./src/types/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role[Role["END_USER"] = 0] = "END_USER";
    Role[Role["ADMIN"] = 1] = "ADMIN";
    Role[Role["SUPER_ADMIN"] = 2] = "SUPER_ADMIN";
})(Role = exports.Role || (exports.Role = {}));


/***/ }),

/***/ "@faker-js/faker":
/*!**********************************!*\
  !*** external "@faker-js/faker" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@faker-js/faker");

/***/ }),

/***/ "autobind-decorator":
/*!*************************************!*\
  !*** external "autobind-decorator" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("autobind-decorator");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

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

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "kafkajs":
/*!**************************!*\
  !*** external "kafkajs" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("kafkajs");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("lodash");

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

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");

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

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

module.exports = require("http2");

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