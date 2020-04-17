/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dbstore/dbstore.ts":
/*!****************************!*\
  !*** ./dbstore/dbstore.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst sqlite3 = __webpack_require__(/*! sqlite3 */ \"sqlite3\").verbose();\r\nconst index_1 = __webpack_require__(/*! ./models/index */ \"./dbstore/models/index.ts\");\r\nclass DbStore {\r\n    constructor() {\r\n        this.db = new sqlite3.Database('./data/rsp.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);\r\n        this.init();\r\n    }\r\n    init() {\r\n        this.db.run(index_1.User.createQuery(), (err) => {\r\n            if (!err) {\r\n                this.db.run(index_1.Message.createQuery());\r\n            }\r\n        });\r\n    }\r\n    getMessages(callback) {\r\n        this.db.all(index_1.Message.getQuery(), (err, messages) => {\r\n            if (!err) {\r\n                if (callback) {\r\n                    callback(messages);\r\n                }\r\n            }\r\n        });\r\n    }\r\n    getUsers(callback) {\r\n        this.db.all(index_1.User.getQuery(), (err, users) => {\r\n            if (!err) {\r\n                if (callback) {\r\n                    callback(users);\r\n                }\r\n            }\r\n        });\r\n    }\r\n    getUserByName(name, callback) {\r\n        this.db.get(index_1.User.getQuery(`WHERE name = ?`), [name], (err, row) => {\r\n            if (!err && callback) {\r\n                callback(row);\r\n            }\r\n        });\r\n    }\r\n    saveMessage(message, callback) {\r\n        this.db.run(index_1.Message.saveQuery(), [\r\n            message.message, message.sender, message.sent_on\r\n        ], function (err, res) {\r\n            // @ts-ignore\r\n            if (callback) {\r\n                callback(message, this.lastID);\r\n            }\r\n        });\r\n    }\r\n    saveUser(user, callback) {\r\n        this.db.run(index_1.User.saveQuery(), [\r\n            user.name, user.color, user.joined_on,\r\n            user.last_online_on, user.password, user.email\r\n        ], function (err, res) {\r\n            // @ts-ignore\r\n            if (callback) {\r\n                callback(this.lastID);\r\n            }\r\n        });\r\n    }\r\n    userExists() {\r\n    }\r\n}\r\nexports.DbStore = DbStore;\r\n\n\n//# sourceURL=webpack:///./dbstore/dbstore.ts?");

/***/ }),

/***/ "./dbstore/models/index.ts":
/*!*********************************!*\
  !*** ./dbstore/models/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nfunction __export(m) {\r\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\r\n}\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__export(__webpack_require__(/*! ./message.model */ \"./dbstore/models/message.model.ts\"));\r\n__export(__webpack_require__(/*! ./user.model */ \"./dbstore/models/user.model.ts\"));\r\n\n\n//# sourceURL=webpack:///./dbstore/models/index.ts?");

/***/ }),

/***/ "./dbstore/models/message.model.ts":
/*!*****************************************!*\
  !*** ./dbstore/models/message.model.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Message {\r\n    constructor(message, sender, sent_on, id = -1) {\r\n        this.message = message;\r\n        this.sender = sender;\r\n        this.sent_on = sent_on;\r\n        this.id = id;\r\n    }\r\n    static createQuery() {\r\n        return `\r\n      CREATE TABLE IF NOT EXISTS message(\r\n        id integer primary key autoincrement,\r\n        message text,\r\n        sent_on integer,\r\n        sender integer,\r\n        FOREIGN KEY(sender) REFERENCES user(id)\r\n      )\r\n    `;\r\n    }\r\n    static getQuery(where = '') {\r\n        return `SELECT message.*, user.name, user.color FROM message ${where} INNER JOIN user on user.id = message.sender`;\r\n    }\r\n    static saveQuery() {\r\n        return 'INSERT INTO message (message, sender, sent_on) VALUES (?, ?, ?)';\r\n    }\r\n}\r\nexports.Message = Message;\r\n\n\n//# sourceURL=webpack:///./dbstore/models/message.model.ts?");

/***/ }),

/***/ "./dbstore/models/user.model.ts":
/*!**************************************!*\
  !*** ./dbstore/models/user.model.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass User {\r\n    constructor(name, color, joined_on, last_online_on, password, email, id = -1) {\r\n        this.name = name;\r\n        this.color = color;\r\n        this.joined_on = joined_on;\r\n        this.last_online_on = last_online_on;\r\n        this.password = password;\r\n        this.email = email;\r\n        this.id = id;\r\n        this.table = 'user';\r\n    }\r\n    static createQuery() {\r\n        return `\r\n      CREATE TABLE IF NOT EXISTS user(\r\n        id integer primary key autoincrement,\r\n        name text,\r\n        color text,\r\n        joined_on integer,\r\n        last_online_on integer,\r\n        password text,\r\n        email text\r\n      )\r\n    `;\r\n    }\r\n    static getQuery(where = '') {\r\n        return `SELECT * FROM user ${where}`;\r\n    }\r\n    static saveQuery() {\r\n        return 'INSERT INTO user '\r\n            + '(name, color, joined_on, last_online_on, password, email)'\r\n            + ' VALUES (?, ?, ?, ?, ?, ?)';\r\n    }\r\n}\r\nexports.User = User;\r\n\n\n//# sourceURL=webpack:///./dbstore/models/user.model.ts?");

/***/ }),

/***/ "./server.ts":
/*!*******************!*\
  !*** ./server.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst http = __webpack_require__(/*! http */ \"http\");\r\nconst WebSocket = __webpack_require__(/*! ws */ \"ws\");\r\nconst dbstore_1 = __webpack_require__(/*! ./dbstore/dbstore */ \"./dbstore/dbstore.ts\");\r\nconst index_1 = __webpack_require__(/*! ./dbstore/models/index */ \"./dbstore/models/index.ts\");\r\nprocess.title = 'game-server';\r\nconst webSocketsServerPort = 1337, clients = [], colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];\r\nlet history = [], lastColorIdx = -1;\r\nconst dbstore = new dbstore_1.DbStore();\r\nconst getRandomColor = function () {\r\n    lastColorIdx++;\r\n    return colors[lastColorIdx % colors.length];\r\n};\r\nconst app = express();\r\nconsole.log('ABOUT TO GET MESSAGES ... ');\r\ndbstore.getMessages((messages) => {\r\n    history = messages;\r\n});\r\napp.get('/', (req, res) => res.send('Hello World!'));\r\nconst server = http.createServer(app);\r\nconst wss = new WebSocket.Server({\r\n    server,\r\n    path: '/game-socket'\r\n});\r\nwss.on('connection', (conn) => {\r\n    clients.push(conn) - 1;\r\n    let user;\r\n    console.log(`${(new Date())} Connection accepted.`);\r\n    if (history.length > 0) {\r\n        conn.send(JSON.stringify({ type: 'history', data: history }));\r\n    }\r\n    conn.on('message', (message) => {\r\n        console.log('MESSAGE CAME IN:', message);\r\n        let msgText;\r\n        try {\r\n            msgText = JSON.parse(message);\r\n        }\r\n        catch (e) {\r\n            return;\r\n        }\r\n        if (!user) {\r\n            dbstore.getUserByName(msgText, (found) => {\r\n                if (found) {\r\n                    console.log('FOUND!', found);\r\n                    user = found;\r\n                    conn.send(JSON.stringify({ type: 'color', data: user.color }));\r\n                }\r\n                else {\r\n                    console.log('DID NOT FIND :(');\r\n                    const color = getRandomColor();\r\n                    const ts = (new Date()).getTime();\r\n                    user = new index_1.User(msgText, color, ts, ts, 'demo', 'demo');\r\n                    dbstore.saveUser(user, (userId) => {\r\n                        user.id = userId;\r\n                        conn.send(JSON.stringify({ type: 'color', data: color }));\r\n                    });\r\n                }\r\n            });\r\n            const color = colors.shift() || 'pink';\r\n            const ts = (new Date()).getTime();\r\n            user = new index_1.User(msgText, color, ts, ts, 'demo', 'demo');\r\n            conn.send(JSON.stringify({ type: 'color', data: color }));\r\n            dbstore.saveUser(user, (userId) => { user.id = userId; });\r\n            console.log(`${(new Date())} User is known as: ${user.name} with ${user.color} color`);\r\n        }\r\n        else {\r\n            console.log(`${(new Date())} Received message from ${user.name}: ${msgText}`);\r\n            const obj = new index_1.Message(msgText, user.id, (new Date()).getTime());\r\n            // {\r\n            //   time: (new Date()).getTime(),\r\n            //   text: msgText,\r\n            //   author: userName,\r\n            //   color: userColor\r\n            // };\r\n            dbstore.saveMessage(obj, (msg, msgId) => {\r\n                msg.id = msgId;\r\n                history.push(msg);\r\n                history = history.slice(-100);\r\n                const json = JSON.stringify({ type: 'message', data: msg });\r\n                clients.forEach((client) => {\r\n                    client.send(json);\r\n                });\r\n            });\r\n        }\r\n    });\r\n});\r\nserver.listen(process.env.PORT || webSocketsServerPort, () => {\r\n    console.log(`Server started on port ${server.address().port} :)`);\r\n});\r\n\n\n//# sourceURL=webpack:///./server.ts?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "sqlite3":
/*!**************************!*\
  !*** external "sqlite3" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sqlite3\");\n\n//# sourceURL=webpack:///external_%22sqlite3%22?");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ws\");\n\n//# sourceURL=webpack:///external_%22ws%22?");

/***/ })

/******/ });