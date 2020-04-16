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

/***/ "./dbstore.ts":
/*!********************!*\
  !*** ./dbstore.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst sqlite3 = __webpack_require__(/*! sqlite3 */ \"sqlite3\").verbose();\r\nclass DbStore {\r\n    constructor() {\r\n        this.db = new sqlite3.Database('./data/rsp.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);\r\n        this.init();\r\n    }\r\n    init() {\r\n        this.db.run(`\r\n      CREATE TABLE IF NOT EXISTS message(\r\n        id integer primary key autoincrement,\r\n        sent integer,\r\n        message text,\r\n        user integer\r\n      )\r\n    `);\r\n        this.db.run(`\r\n      CREATE TABLE IF NOT EXISTS user(\r\n        id integer primary key autoincrement,\r\n        name text,\r\n        color text,\r\n        created integer,\r\n        last_online integer\r\n      )\r\n    `);\r\n    }\r\n    getMessages(callback) {\r\n        this.db.all('SELECT * FROM message;', (err, res) => {\r\n            callback(res);\r\n        });\r\n    }\r\n    saveMessage(message, callback) {\r\n        this.db.run(`\r\n      INSERT INTO message (sent, message, user) VALUES (\r\n        ${message.sentOn}, '${message.text}', ${message.author}\r\n      )\r\n    `, (err, res) => {\r\n            if (callback) {\r\n                callback(res);\r\n            }\r\n        });\r\n    }\r\n    saveUser(user, callback) {\r\n        const ts = (new Date()).getTime();\r\n        this.db.run(`\r\n      INSERT INTO user (name, color, created, last_online) VALUES (\r\n        '${user.name}', '${user.color}', ${ts}, ${ts}\r\n      )\r\n    `, function (err, res) {\r\n            console.log(err, '|', res);\r\n            // @ts-ignore\r\n            console.log(this.lastID);\r\n            if (callback) {\r\n                callback(res);\r\n            }\r\n        });\r\n    }\r\n    userExists() {\r\n    }\r\n}\r\nexports.DbStore = DbStore;\r\n\n\n//# sourceURL=webpack:///./dbstore.ts?");

/***/ }),

/***/ "./server.ts":
/*!*******************!*\
  !*** ./server.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst http = __webpack_require__(/*! http */ \"http\");\r\nconst WebSocket = __webpack_require__(/*! ws */ \"ws\");\r\nconst dbstore_1 = __webpack_require__(/*! ./dbstore */ \"./dbstore.ts\");\r\nprocess.title = 'game-server';\r\nconst webSocketsServerPort = 1337, clients = [], colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];\r\nlet history = [];\r\nconst dbstore = new dbstore_1.DbStore();\r\nconst app = express();\r\napp.get('/', (req, res) => res.send('Hello World!'));\r\nconst server = http.createServer(app);\r\nconst wss = new WebSocket.Server({\r\n    server,\r\n    path: '/game-socket'\r\n});\r\nconsole.log('CHAT HISTORY:');\r\ndbstore.getMessages((res) => { console.log(res); });\r\nwss.on('connection', (conn) => {\r\n    clients.push(conn) - 1;\r\n    let userName, userColor;\r\n    console.log(`${(new Date())} Connection accepted.`);\r\n    if (history.length > 0) {\r\n        conn.send(JSON.stringify({ type: 'history', data: history }));\r\n    }\r\n    conn.on('message', (message) => {\r\n        console.log('MESSAGE CAME IN:', message);\r\n        let msgText;\r\n        try {\r\n            msgText = JSON.parse(message);\r\n        }\r\n        catch (e) {\r\n            return;\r\n        }\r\n        if (!userName) {\r\n            userName = msgText;\r\n            userColor = colors.shift() || 'pink';\r\n            conn.send(JSON.stringify({ type: 'color', data: userColor }));\r\n            dbstore.saveUser({\r\n                name: userName, color: userColor\r\n            }, (res) => {\r\n                console.log('USER SAVED!', res);\r\n            });\r\n            console.log(`${(new Date())} User is known as: ${userName} with ${userColor} color`);\r\n        }\r\n        else {\r\n            console.log(`${(new Date())} Received message from ${userName}: ${msgText}`);\r\n            const obj = {\r\n                time: (new Date()).getTime(),\r\n                text: msgText,\r\n                author: userName,\r\n                color: userColor\r\n            };\r\n            history.push(obj);\r\n            history = history.slice(-100);\r\n            const json = JSON.stringify({ type: 'message', data: obj });\r\n            clients.forEach((client) => {\r\n                client.send(json);\r\n            });\r\n        }\r\n    });\r\n});\r\nserver.listen(process.env.PORT || webSocketsServerPort, () => {\r\n    console.log(`Server started on port ${server.address().port} :)`);\r\n});\r\n\n\n//# sourceURL=webpack:///./server.ts?");

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