/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLIENT: () => (/* binding */ CLIENT),
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   SERVER: () => (/* binding */ SERVER)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Might be SERVER_CODES and CLIENT_CODES if we had more and different constants
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_TASK: 'required-task',
  TASK_MISSING: 'noSuchId' // Someone was inconsistent!
};

var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network.  Please try again'), SERVER.AUTH_INSUFFICIENT, 'Your username/password combination does not match any records, please try again.'), SERVER.REQUIRED_USERNAME, 'Please enter a valid (letters and/or numbers) username'), SERVER.REQUIRED_TASK, 'Please enter the task to do'), "default", 'Something went wrong.  Please try again');

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addsLoginListener: () => (/* binding */ addsLoginListener),
/* harmony export */   addsLogoutListener: () => (/* binding */ addsLogoutListener),
/* harmony export */   addsMessageSendListener: () => (/* binding */ addsMessageSendListener),
/* harmony export */   getMessages: () => (/* binding */ getMessages),
/* harmony export */   getUsers: () => (/* binding */ getUsers)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utility */ "./src/utility.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./src/constants.js");





function addsLoginListener(_ref) {
  var state = _ref.state,
    appEle = _ref.appEle;
  appEle.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('login__form')) {
      return;
    }
    e.preventDefault();
    var username = document.querySelector('#username').value;
    //loader
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchLogin)(username).then(function (response) {
      var image = response.image;
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.login)({
        username: username,
        image: image
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        appEle: appEle
      });
      return (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchMessageList)();
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        appEle: appEle
      });
      return Promise.reject(err);
    }).then(function (messages) {
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.recentMessages)(messages);
      (0,_utility__WEBPACK_IMPORTED_MODULE_1__.addsMessages)(state);
      return (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchUsersList)();
    }).then(function (Users) {
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.currentUsers)(Users);
      (0,_utility__WEBPACK_IMPORTED_MODULE_1__.addsUsers)(state);
      return;
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        appEle: appEle
      });
      return;
    });
  });
}
function addsLogoutListener(_ref2) {
  var state = _ref2.state,
    appEle = _ref2.appEle;
  appEle.addEventListener('click', function (e) {
    if (!e.target.classList.contains('logout__button')) {
      return;
    }
    e.preventDefault();
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.logout)();
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchLogout)()["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        appEle: appEle
      });
    }).then(function (response) {
      (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        appEle: appEle
      });
    });
  });
}
function addsMessageSendListener(_ref3) {
  var state = _ref3.state,
    appEle = _ref3.appEle;
  appEle.addEventListener('submit', function (e) {
    if (!e.target.classList.contains("chat__form")) {
      return;
    }
    e.preventDefault();
    var message = appEle.querySelector(".form__message").value;
    appEle.querySelector(".form__message").value = '';
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchMessage)(message)["catch"](function (err) {
      if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_4__.SERVER.AUTH_MISSING) {
        (0,_state__WEBPACK_IMPORTED_MODULE_3__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
        (0,_state__WEBPACK_IMPORTED_MODULE_3__.logout)();
        (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
          state: state,
          appEle: appEle
        });
        return;
      }
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        appEle: appEle
      });
    }).then(function (response) {
      return (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchMessageList)();
    }).then(function (response) {
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.recentMessages)(response);
      (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        appEle: appEle
      });
    })["catch"](function (err) {
      if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_4__.SERVER.AUTH_MISSING) {
        (0,_state__WEBPACK_IMPORTED_MODULE_3__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
        (0,_state__WEBPACK_IMPORTED_MODULE_3__.logout)();
        (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
          state: state,
          appEle: appEle
        });
        return;
      }
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        appEle: appEle
      });
    });
  });
}
function getMessages(_ref4) {
  var state = _ref4.state,
    appEle = _ref4.appEle;
  var messageEl = document.querySelector('.chat__message');
  if (!messageEl) {
    return;
  }
  (0,_state__WEBPACK_IMPORTED_MODULE_3__.addMessageLoader)();
  (0,_utility__WEBPACK_IMPORTED_MODULE_1__["default"])({
    state: state
  });
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchMessageList)().then(function (response) {
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.recentMessages)(response);
    (0,_utility__WEBPACK_IMPORTED_MODULE_1__.addsMessages)(state);
    return;
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_4__.SERVER.AUTH_MISSING) {
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
        state: state,
        appEle: appEle
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
      state: state,
      appEle: appEle
    });
  });
}
function getUsers(_ref5) {
  var state = _ref5.state,
    appEle = _ref5.appEle;
  var userEl = document.querySelector('.usersList');
  if (!userEl) {
    return;
  }
  (0,_state__WEBPACK_IMPORTED_MODULE_3__.addUserLoader)();
  (0,_utility__WEBPACK_IMPORTED_MODULE_1__["default"])({
    state: state
  });
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchUsersList)().then(function (response) {
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.currentUsers)(response);
    (0,_utility__WEBPACK_IMPORTED_MODULE_1__.addsUsers)(state);
  })["catch"](function (err) {
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    (0,_render__WEBPACK_IMPORTED_MODULE_0__["default"])({
      state: state,
      appEle: appEle
    });
  });
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
var currentState = '';
var app = '';
function render(_ref) {
  var state = _ref.state,
    appEle = _ref.appEle;
  currentState = state;
  app = appEle;
  if (!currentState.isLoggedIn) {
    addsLogin();
  } else {
    addsChat();
  }
}
function addsLogin() {
  var errorHtml;
  if (currentState.error) {
    errorHtml = "<span class=\"error-message\">".concat(currentState.error, "</span>");
  }
  var html = "<div class=\"login\">\n            <h1 class=\"login__title\">Swift Whisper</h1>\n            <form class=\"login__form\">\n                <label class=\"login__label\">\n                    ".concat(errorHtml || "", "\n                    <span>Username:</span>\n                    <input class=\"login__username\" value=\"\" id=\"username\" name=\"username\">\n                </label>\n                <button class=\"login__button\" type=\"submit\">Login</button>\n            </form>\n        </div>");
  app.innerHTML = html;
}
function addsChat() {
  var errorHtml;
  if (currentState.error) {
    errorHtml = "<span class=\"error-message\">".concat(currentState.error, "</span>");
  }
  var messages = currentState.messages;
  var messageItems = messages.map(function (item) {
    return "<li><div class=\"message\"><div class=\"profile\"><img class=\"user-profile__avatar\" src=".concat(item.image, " alt=\"user photo\"/><span>").concat(item.username, "</span></div><span class=\"text\">").concat(item.message, "</span></div></li>");
  }).join('') || "<p>no messages yet</p>";
  var users = currentState.users;
  users = users.filter(function (item) {
    return item.username !== currentState.username;
  });
  var usersItems = users.map(function (item) {
    return "<li><div class=\"user-profile\"><img class=\"user-profile__avatar\" src=\"".concat(item.image, "\" alt=\"user photo\"/><span>").concat(item.username, "</span></div></li>");
  }).join(' ');
  var messageForm = "<form class=\"chat__form\">\n                            <label class=\"form__label\">\n                                <input class=\"form__message\" value=\"\" id=\"message\" name=\"message\" required placeholder=\"Enter message to send\">\n                            </label>\n                            <button class=\"form__button\" type=\"submit\">Send</button> \n                        </form>";
  var logout = "<button class=\"logout__button\">Logout</button>";
  var messageList = "<ul class=\"chat__message\">".concat(messageItems).concat(errorHtml || "", "</ul>");
  var usersList = "<ul class=\"usersList\">".concat(usersItems, "</ul>");
  var html = "<div class=\"dashboard\">\n            <div class=\"sidebar\">\n                <div class=\"current-user\">\n                    <img class=\"current-user__avatar\" src=".concat(currentState.userimage, " alt=\"user photo\"/>\n                    <h2>").concat(currentState.username, "</h2>\n                </div>\n                <div class=\"active-users\">\n                    <h3>Active Users</h3>\n                    ").concat(usersList, "\n                </div>\n                <div class=\"logout\">\n                    ").concat(logout, "\n                </div>\n            </div>\n            <div class=\"chat-section\">\n                <div class=\"chat-section__title\">\n                    <h3>INFO6250</h3>\n                    <img class=\"user-profile__avatar\" src=\"images/memoji-group.png\" alt=\"group photo\"/>\n                </div>\n                <div class=\"chat-section__chat\">\n                    ").concat(messageList, "\n                    ").concat(messageForm, "\n                </div>\n            </div>\n        </div>");
  app.innerHTML = html;
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchMessage: () => (/* binding */ fetchMessage),
/* harmony export */   fetchMessageList: () => (/* binding */ fetchMessageList),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchUsersList: () => (/* binding */ fetchUsersList)
/* harmony export */ });
function fetchSession() {
  return fetch('/api/v1/session')["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: "POST",
    body: JSON.stringify({
      username: username
    }),
    headers: new Headers({
      'content-type': 'application/json'
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch('/api/v1/session', {
    method: "DELETE",
    headers: new Headers({
      'content-type': 'application/json'
    })
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchMessage(message) {
  return fetch('/api/v1/message', {
    method: "POST",
    body: JSON.stringify({
      message: message
    }),
    headers: new Headers({
      'content-type': 'application/json'
    })
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchMessageList() {
  return fetch('/api/v1/message')["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchUsersList() {
  return fetch('/api/v1/users')["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addMessageLoader: () => (/* binding */ addMessageLoader),
/* harmony export */   addUserLoader: () => (/* binding */ addUserLoader),
/* harmony export */   clearInterval: () => (/* binding */ clearInterval),
/* harmony export */   currentUsers: () => (/* binding */ currentUsers),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   intervals: () => (/* binding */ intervals),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   messageIntervalId: () => (/* binding */ messageIntervalId),
/* harmony export */   recentMessages: () => (/* binding */ recentMessages),
/* harmony export */   removeMessageLoader: () => (/* binding */ removeMessageLoader),
/* harmony export */   removeUserLoader: () => (/* binding */ removeUserLoader),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   userIntervalId: () => (/* binding */ userIntervalId)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  'isLoggedIn': false,
  'isLoadingMessageData': false,
  'isLoadingUserData': false,
  'error': '',
  'username': '',
  'userimage': '',
  'messages': [],
  'users': [],
  'userIntervalId': '',
  'messageIntervalId': ''
};
function login(_ref) {
  var username = _ref.username,
    image = _ref.image;
  state['isLoggedIn'] = true;
  state['username'] = username;
  state['userimage'] = image;
}
function logout() {
  state['isLoggedIn'] = false;
  state['username'] = '';
}
function recentMessages(messages) {
  state['messages'] = messages;
}
function currentUsers(users) {
  state['users'] = users;
}
function addMessageLoader() {
  state['isLoadingMessageData'] = true;
  return;
}
function addUserLoader() {
  state['isLoadingUserData'] = true;
}
function removeMessageLoader() {
  state['isLoadingMessageData'] = false;
}
function removeUserLoader() {
  state['isLoadingUserData'] = false;
}
function messageIntervalId(id) {
  state['messageIntervalId'] = id;
}
function userIntervalId(id) {
  state['userIntervalId'] = id;
}
function intervals() {
  var intervalsList = [];
  intervalsList.push(state['messageIntervalId']);
  intervalsList.push(state['userIntervalId']);
  return intervalsList;
}
function clearInterval() {
  state['messageIntervalId'] = '';
  state['userIntervalId'] = '';
}
function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ }),

/***/ "./src/utility.js":
/*!************************!*\
  !*** ./src/utility.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addsMessages: () => (/* binding */ addsMessages),
/* harmony export */   addsUsers: () => (/* binding */ addsUsers),
/* harmony export */   "default": () => (/* binding */ loader)
/* harmony export */ });
var currentState = '';
var app = '';
function loader(_ref) {
  var state = _ref.state,
    appEle = _ref.appEle;
  currentState = state;
  app = appEle;
  if (currentState.isLoadingMessageData && currentState.isLoggedIn) {
    addsMessageLoader();
  }
  if (currentState.isLoadingUserData && currentState.isLoggedIn) {
    addsUserLoader();
  }
}
function addsMessageLoader() {
  var loaderEle = document.querySelector('.chat__message');
  var html = "<span>Loading Data</span>";
  loaderEle.innerHTML = html;
}
function addsUserLoader() {
  var loaderEle = document.querySelector('.usersList');
  var html = "<span>Loading Data</span>";
  loaderEle.innerHTML = html;
}
function addsMessages(state) {
  var messageEle = document.querySelector('.chat__message');
  var newMessages = state.messages;
  var messageItems = newMessages.map(function (item) {
    return "<li><div class=\"message\"><div class=\"profile\"><img class=\"user-profile__avatar\" src=".concat(item.image, " alt=\"user photo\"/><span>").concat(item.username, "</span></div><span class=\"text\">").concat(item.message, "</span></div></li>");
  }).join('') || "<p>No messages to show</p>";
  messageEle.innerHTML = messageItems;
  return;
}
function addsUsers(state) {
  var usersEle = document.querySelector('.usersList');
  var users = state.users;
  users = users.filter(function (item) {
    return item.username !== state.username;
  });
  var usersItems = users.map(function (item) {
    return "<li><div class=\"user-profile\"><img class=\"user-profile__avatar\" src=\"".concat(item.image, "\" alt=\"user photo\"/><span>").concat(item.username, "</span></div></li>");
  }).join(' ');
  usersEle.innerHTML = usersItems;
  return;
}

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/chat.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utility */ "./src/utility.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./src/constants.js");






var appEle = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
  state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
  appEle: appEle
});
setInterval(function () {
  (0,_listeners__WEBPACK_IMPORTED_MODULE_1__.getMessages)({
    state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
    appEle: appEle
  });
  (0,_listeners__WEBPACK_IMPORTED_MODULE_1__.getUsers)({
    state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
    appEle: appEle
  });
}, 5000);
(0,_listeners__WEBPACK_IMPORTED_MODULE_1__.addsLoginListener)({
  state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
  appEle: appEle
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_1__.addsLogoutListener)({
  state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
  appEle: appEle
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_1__.addsMessageSendListener)({
  state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
  appEle: appEle
});
checkForSession();

//inital or on refresh
function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function (session) {
    var username = session.username;
    var image = session.image;
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.login)({
      username: username,
      image: image
    });
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
      appEle: appEle
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessageList)();
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_5__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_5__.CLIENT.NO_SESSION
      });
    }
    return Promise.reject(err);
  }).then(function (messages) {
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.recentMessages)(messages);
    (0,_utility__WEBPACK_IMPORTED_MODULE_4__.addsMessages)(_state__WEBPACK_IMPORTED_MODULE_2__["default"]);
    return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsersList)();
  }).then(function (Users) {
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.currentUsers)(Users);
    (0,_utility__WEBPACK_IMPORTED_MODULE_4__.addsUsers)(_state__WEBPACK_IMPORTED_MODULE_2__["default"]);
    return;
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_5__.CLIENT.NO_SESSION) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
        state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
        appEle: appEle
      });
      return;
    }
    setError((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
      appEle: appEle
    });
  });
}
;
})();

/******/ })()
;
//# sourceMappingURL=chat.js.map