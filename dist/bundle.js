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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 110);
/******/ })
/************************************************************************/
/******/ ({

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _HomeList = __webpack_require__(105);

var _HomeList2 = _interopRequireDefault(_HomeList);

var _ConsoleOutputContainer = __webpack_require__(99);

var _ConsoleOutputContainer2 = _interopRequireDefault(_ConsoleOutputContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by dannyyassine on 2017-06-08.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var HomeContainer = function (_Component) {
    _inherits(HomeContainer, _Component);

    function HomeContainer(props) {
        _classCallCheck(this, HomeContainer);

        var _this = _possibleConstructorReturn(this, (HomeContainer.__proto__ || Object.getPrototypeOf(HomeContainer)).call(this, props));

        _this.onLoad = function () {
            fetch('http://localhost:3002/api/projects', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                _this.setState({
                    'projects': json.data
                });
            });
        };

        _this.addNewProject = function (e) {
            e.preventDefault();
            _this.props.history.replace('/projects/add');
        };

        _this.onProjectClicked = function (project) {
            _this.setState({
                currentProject: project
            });
        };

        _this.onEditProject = function (project) {
            _this.props.history.replace('/project/' + project.id);
        };

        _this.onDeleteProject = function (project) {
            fetch('http://localhost:3002/api/project/' + project.id, {
                method: "delete",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function (_) {

                var projects = _this.state.projects.filter(function (aProject, index) {
                    return project.id !== aProject.id;
                });

                _this.setState({
                    'projects': projects
                });
            }).catch(function () {
                alert('something went wrong');
            });
        };

        _this.onBuildProject = function (project) {
            fetch('http://localhost:3002/api/project/' + project.id + '/build', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function (_) {
                _this.state.projects.map(function (aProject, index) {
                    if (project.id === aProject.id) {
                        aProject.isRunning = !aProject.isRunning;
                    }
                });
                _this.setState({
                    projects: _this.state.projects,
                    currentProject: project
                });
            });
        };

        _this.onCancelProject = function (project) {
            fetch('http://localhost:3002/api/job/' + project.pid + '/cancel', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
            }).then(function (response) {
                return response.json();
            }).then(function (json) {});
        };

        _this.state = {
            projects: [],
            currentProject: null
        };

        return _this;
    }

    // LIFE CYCLE


    _createClass(HomeContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.onLoad();
        }

        // ACTIONS
        /**
         * @param e UI Event
         */


        /**
         *
         * @param project
         */


        /**
         *
         * @param project
         */


        /**
         *
         * @param project
         */


        /**
         *
         * @param project
         */

    }, {
        key: 'render',
        value: function render() {
            var currentProjectOutput = this.state.currentProject ? _react2.default.createElement(_ConsoleOutputContainer2.default, { project: this.state.currentProject }) : _react2.default.createElement('div', null);

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_HomeList2.default, {
                    projects: this.state.projects,
                    addNewProject: this.addNewProject,
                    onProjectClicked: this.onProjectClicked,
                    onDeleteProject: this.onDeleteProject,
                    onBuildProject: this.onBuildProject,
                    onEditProject: this.onEditProject,
                    onCancelProject: this.onCancelProject
                }),
                currentProjectOutput
            );
        }
    }]);

    return HomeContainer;
}(_react.Component);

exports.default = HomeContainer;

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ProjectDetails = __webpack_require__(106);

var _ProjectDetails2 = _interopRequireDefault(_ProjectDetails);

var _ProjectWebService = __webpack_require__(38);

var _ProjectWebService2 = _interopRequireDefault(_ProjectWebService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by dannyyassine on 2017-06-18.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ProjectDetailsContainer = function (_Component) {
    _inherits(ProjectDetailsContainer, _Component);

    function ProjectDetailsContainer(props) {
        _classCallCheck(this, ProjectDetailsContainer);

        var _this = _possibleConstructorReturn(this, (ProjectDetailsContainer.__proto__ || Object.getPrototypeOf(ProjectDetailsContainer)).call(this, props));

        _this.onLoad = function () {
            fetch('http://localhost:3002/api/project/' + _this.props.match.params.project_id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                _this.setState({
                    'project': json.data
                });
            });
        };

        _this.onUpdateProject = function (project) {
            var body = {
                name: project.name,
                script: JSON.stringify(project.shellTask.script)
            };
            var projectWebService = new _ProjectWebService2.default();
            projectWebService.PUT().updateProject(project, body);
            projectWebService.execute(function (success) {
                console.log('success');
                _this.props.history.push('/');
            }, function (error) {
                alert(error.code);
            });
        };

        _this.state = {
            project: null
        };
        return _this;
    }

    _createClass(ProjectDetailsContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.onLoad();
        }
    }, {
        key: 'render',
        value: function render() {
            var playerDetail = this.state.project ? _react2.default.createElement(_ProjectDetails2.default, {
                project: this.state.project,
                onUpdateProject: this.onUpdateProject.bind(this)
            }) : _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    'Loading'
                )
            );
            return _react2.default.createElement(
                'div',
                null,
                playerDetail
            );
        }
    }]);

    return ProjectDetailsContainer;
}(_react.Component);

exports.default = ProjectDetailsContainer;

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by dannyyassine on 2017-06-08.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SettingsContainer = function (_Component) {
    _inherits(SettingsContainer, _Component);

    function SettingsContainer(props) {
        _classCallCheck(this, SettingsContainer);

        var _this = _possibleConstructorReturn(this, (SettingsContainer.__proto__ || Object.getPrototypeOf(SettingsContainer)).call(this, props));

        _this.state = {};

        return _this;
    }

    _createClass(SettingsContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'h1',
                null,
                'Settings'
            );
        }
    }]);

    return SettingsContainer;
}(_react.Component);

exports.default = SettingsContainer;

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sweetalert = __webpack_require__(61);

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by dannyyassine on 2017-06-11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var AddProjectForm = function (_Component) {
    _inherits(AddProjectForm, _Component);

    function AddProjectForm(props) {
        _classCallCheck(this, AddProjectForm);

        var _this = _possibleConstructorReturn(this, (AddProjectForm.__proto__ || Object.getPrototypeOf(AddProjectForm)).call(this, props));

        _this.addProject = function (event) {
            if (event) event.preventDefault();
            var name = _this.state.name;
            (0, _sweetalert2.default)({
                title: 'Create a new job with name "' + name + '"',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then(function () {
                _this.props.onSubmitForm(name);
                _this.setState({ name: '' });
            });
        };

        _this.onNameChange = function (event) {
            var name = event.target.value;
            _this.setState({ name: name });
        };

        _this.state = {
            name: ''
        };
        return _this;
    }

    _createClass(AddProjectForm, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.addProject },
                    _react2.default.createElement('input', { type: 'text', placeholder: 'Project name', onChange: this.onNameChange }),
                    _react2.default.createElement('input', { type: 'submit', value: 'ADD' })
                )
            );
        }
    }]);

    return AddProjectForm;
}(_react.Component);

AddProjectForm.propTypes = {
    onSubmitForm: _propTypes2.default.func.isRequired
};

exports.default = AddProjectForm;

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by dannyyassine on 2017-06-23.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ConsoleOutput = function (_Component) {
    _inherits(ConsoleOutput, _Component);

    function ConsoleOutput(props) {
        _classCallCheck(this, ConsoleOutput);

        var _this = _possibleConstructorReturn(this, (ConsoleOutput.__proto__ || Object.getPrototypeOf(ConsoleOutput)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(ConsoleOutput, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'console' },
                _react2.default.createElement(
                    'pre',
                    { id: 'logged-text' },
                    this.props.output
                )
            );
        }
    }]);

    return ConsoleOutput;
}(_react.Component);

exports.default = ConsoleOutput;

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _HomeListFooter = __webpack_require__(107);

var _HomeListFooter2 = _interopRequireDefault(_HomeListFooter);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sweetalert = __webpack_require__(61);

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by dannyyassine on 2017-06-10.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var HomeList = function (_Component) {
    _inherits(HomeList, _Component);

    function HomeList(props) {
        _classCallCheck(this, HomeList);

        return _possibleConstructorReturn(this, (HomeList.__proto__ || Object.getPrototypeOf(HomeList)).call(this, props));
    }

    _createClass(HomeList, [{
        key: 'onRowClick',
        value: function onRowClick(project) {
            this.props.onProjectClicked(project);
        }
    }, {
        key: 'onDelete',
        value: function onDelete(project) {
            var _this2 = this;

            (0, _sweetalert2.default)({
                title: 'Are you sure to delete "' + project.name + '"?',
                text: "You will be removing it permanently",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it'
            }).then(function () {
                _this2.props.onDeleteProject(project);
            });
        }
    }, {
        key: 'onCancel',
        value: function onCancel(project) {
            var _this3 = this;

            (0, _sweetalert2.default)({
                title: 'Are you sure to stop "' + project.name + '"?',
                text: "You will be stoping the task",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, stop the build'
            }).then(function () {
                _this3.props.onCancelProject(project);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var projects = this.props.projects.map(function (project, index) {

                var spinner = project.isRunning ? _react2.default.createElement('div', { className: 'loader float-right' }) : _react2.default.createElement('div', null);

                return _react2.default.createElement(
                    'tr',
                    { key: index },
                    _react2.default.createElement(
                        'td',
                        { className: 'td-spinner' },
                        spinner
                    ),
                    _react2.default.createElement(
                        'td',
                        { onClick: function onClick(e) {
                                return _this4.onRowClick(project);
                            } },
                        project.name
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        project.updatedOn
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                            'button',
                            { onClick: function onClick(e) {
                                    return _this4.onDelete(project);
                                } },
                            'DELETE'
                        )
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                            'button',
                            { onClick: function onClick(e) {
                                    return _this4.props.onBuildProject(project);
                                } },
                            'BUILD'
                        )
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                            'button',
                            { onClick: function onClick(e) {
                                    return _this4.props.onEditProject(project);
                                } },
                            'EDIT'
                        )
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                            'button',
                            { onClick: function onClick(e) {
                                    return _this4.onCancel(project);
                                } },
                            'CANCEL'
                        )
                    )
                );
            });

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'table',
                        null,
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    '  '
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Name'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Last updated'
                                )
                            ),
                            projects
                        )
                    )
                ),
                _react2.default.createElement(_HomeListFooter2.default, { addNewProject: this.props.addNewProject })
            );
        }
    }]);

    return HomeList;
}(_react.Component);

exports.default = HomeList;

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by dannyyassine on 2017-06-18.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ProjectDetails = function (_Component) {
    _inherits(ProjectDetails, _Component);

    function ProjectDetails(props) {
        _classCallCheck(this, ProjectDetails);

        var _this = _possibleConstructorReturn(this, (ProjectDetails.__proto__ || Object.getPrototypeOf(ProjectDetails)).call(this, props));

        _this.submitScript = function (event) {
            event.preventDefault();
            _this.state.project.shellTask.script = _this.editor.getValue();
            _this.props.onUpdateProject(_this.state.project);
        };

        _this.onNameChange = function (event) {
            var name = event.target.value;
            var project = _this.state.project;
            project.name = name;
            _this.setState({
                project: project
            });
        };

        _this.runScript = function (event) {};

        _this.state = {
            project: props.project
        };
        return _this;
    }

    _createClass(ProjectDetails, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
                mode: 'shell',
                lineNumbers: true,
                matchBrackets: true,
                styleActiveLine: true,
                viewportMargin: 20,
                theme: 'monokai'
            });
            this.editor = editor;
        }
    }, {
        key: 'render',
        value: function render() {
            var script = this.props.project.shellTask.script.length > 0 ? JSON.parse(this.props.project.shellTask.script) : "";
            return _react2.default.createElement(
                'div',
                { className: 'content' },
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.addProject },
                    _react2.default.createElement('input', { type: 'text', placeholder: 'Project name', value: this.state.project.name, onChange: this.onNameChange })
                ),
                _react2.default.createElement(
                    'h4',
                    null,
                    this.props.project.updatedOn
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'bash' },
                    _react2.default.createElement(
                        'textarea',
                        { id: 'code', className: 'shell-script', name: 'code' },
                        script
                    )
                ),
                _react2.default.createElement(
                    'button',
                    { onClick: this.submitScript },
                    'SAVE'
                ),
                _react2.default.createElement(
                    'button',
                    { onClick: this.runScript },
                    'BUILD'
                )
            );
        }
    }]);

    return ProjectDetails;
}(_react.Component);

exports.default = ProjectDetails;
;

ProjectDetails.propTypes = {
    project: _propTypes2.default.object.isRequired
};

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by dannyyassine on 2017-06-11.
 */

var HomeListFooter = function HomeListFooter(props) {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'button',
            { onClick: props.addNewProject },
            'ADD PROJECT'
        )
    );
};

HomeListFooter.propTypes = {
    addNewProject: _propTypes2.default.func.isRequired
};

exports.default = HomeListFooter;

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by dannyyassine on 2017-04-25.
 */
// import React from 'react'
// import LocalStateDataManager from '../middlewares/persistStateLocalManager';
// import {
//     Route,
//     Redirect
// } from 'react-router-dom'
//
// export const PrivateRoute = ({path, component}) => (
//     <Route path={path} render={(props) => (
//         LocalStateDataManager.loadToken() !== null ? (
//             React.createElement(component, {})
//         ) : (
//             <Redirect to={{
//                 pathname: '/login',
//                 state: {from: props.location}
//             }}/>
//         )
//     )}/>
// )


/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by dannyyassine on 2017-03-05.
 */

var HTTPService = exports.HTTPService = function () {
    function HTTPService() {
        _classCallCheck(this, HTTPService);

        this.method = 'GET';
        this.url = "";
        this.body = new Map();
        this.headers = new Map();
        this.httpRequest = new XMLHttpRequest();
    }

    _createClass(HTTPService, [{
        key: 'URL',
        value: function URL(url) {
            this.url = url;
            return this;
        }
    }, {
        key: 'addParameter',
        value: function addParameter(key, value) {
            this.body.set(key, value);
            return self;
        }
    }, {
        key: 'addHeader',
        value: function addHeader(key, value) {
            this.headers.set(key, value);
            return self;
        }
    }, {
        key: 'GET',
        value: function GET() {
            this.method = 'GET';
            return this;
        }
    }, {
        key: 'POST',
        value: function POST() {
            this.method = 'POST';
            return this;
        }
    }, {
        key: 'DELETE',
        value: function DELETE() {
            this.method = 'DELETE';
            return this;
        }
    }, {
        key: 'PUT',
        value: function PUT() {
            this.method = 'PUT';
            return this;
        }
    }, {
        key: 'execute',
        value: function execute(success, error) {
            var _this = this;

            this.httpRequest.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    var json = JSON.parse(this.responseText);
                    success(json);
                }
                if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
                    var json = JSON.parse(this.responseText);
                    error(json);
                }
            };
            var json = null;
            var index = 0;
            if (this.method !== 'POST' || this.method !== 'PUT') {
                json = {};
                this.body.forEach(function (value, key) {
                    json[key] = value;
                });
            } else {
                this.body.forEach(function (value, key) {
                    if (index == 0) {
                        _this.url += '?' + key + '=' + value;
                    } else {
                        _this.url += '&' + key + '=' + value;
                    }
                    index += 1;
                });
            }
            this.httpRequest.open(this.method, this.url, true);
            this.headers.forEach(function (value, key) {
                _this.httpRequest.setRequestHeader(key, value);
            });
            if (json) {
                console.log(json);
                this.httpRequest.send(JSON.stringify(json));
            } else {
                this.httpRequest.send();
            }
        }
    }]);

    return HTTPService;
}();

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(97);

var _RootRoute = __webpack_require__(96);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(
    'div',
    null,
    (0, _RootRoute.RouterRoot)()
), document.getElementById('root'));

/***/ }),

/***/ 210:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/dannyyassine/Documents/dev/node_shell/node_modules/react-router-dom/es/index.js'\n    at Error (native)");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/dannyyassine/Documents/dev/node_shell/node_modules/react/react.js'\n    at Error (native)");

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HTTPService2 = __webpack_require__(109);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by dannyyassine on 2017-06-11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ProjectWebService = function (_HTTPService) {
    _inherits(ProjectWebService, _HTTPService);

    function ProjectWebService() {
        _classCallCheck(this, ProjectWebService);

        var _this = _possibleConstructorReturn(this, (ProjectWebService.__proto__ || Object.getPrototypeOf(ProjectWebService)).call(this));

        _this.url = "http://localhost:3002/api";
        _this.addHeader('Accept', 'application/json');
        _this.addHeader('Content-Type', 'application/json');
        return _this;
    }

    _createClass(ProjectWebService, [{
        key: 'addNewProject',
        value: function addNewProject(projectName) {
            this.url = this.url + "/projects/add";
            this.addParameter("project_name", projectName);
        }
    }, {
        key: 'updateProject',
        value: function updateProject(project, options) {
            this.url = this.url + ('/project/' + project.id + '/edit');
            this.addParameter('script', options.script);
            this.addParameter('name', options.name);
        }
    }]);

    return ProjectWebService;
}(_HTTPService2.HTTPService);

exports.default = ProjectWebService;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/dannyyassine/Documents/dev/node_shell/node_modules/prop-types/index.js'\n    at Error (native)");

/***/ }),

/***/ 61:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/dannyyassine/Documents/dev/node_shell/node_modules/sweetalert2/dist/sweetalert2.js'\n    at Error (native)");

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RouterRoot = undefined;

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(210);

var _PrivateRoute = __webpack_require__(108);

var _HomeContainer = __webpack_require__(100);

var _HomeContainer2 = _interopRequireDefault(_HomeContainer);

var _SettingsContainer = __webpack_require__(102);

var _SettingsContainer2 = _interopRequireDefault(_SettingsContainer);

var _AddProjectContainer = __webpack_require__(98);

var _AddProjectContainer2 = _interopRequireDefault(_AddProjectContainer);

var _ProjectDetailsContainer = __webpack_require__(101);

var _ProjectDetailsContainer2 = _interopRequireDefault(_ProjectDetailsContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component404 = function Component404() {
    return _react2.default.createElement(
        'h1',
        null,
        '404'
    );
}; /**
    * Created by dannyyassine on 2017-04-25.
    */
var RouterRoot = exports.RouterRoot = function RouterRoot() {
    return _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'ul',
                    { className: 'nav-bar' },
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'nav-a' },
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: '/' },
                                'Home'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'nav-a' },
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: '/settings' },
                                'Settings'
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'content' },
                _react2.default.createElement(
                    _reactRouterDom.Switch,
                    null,
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _HomeContainer2.default }),
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/settings', component: _SettingsContainer2.default }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: '/projects/add', component: _AddProjectContainer2.default }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: '/project/:project_id', component: _ProjectDetailsContainer2.default }),
                    _react2.default.createElement(_reactRouterDom.Route, { component: Component404 })
                )
            )
        )
    );
};

/***/ }),

/***/ 97:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/dannyyassine/Documents/dev/node_shell/node_modules/react-dom/index.js'\n    at Error (native)");

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AddProjectForm = __webpack_require__(103);

var _AddProjectForm2 = _interopRequireDefault(_AddProjectForm);

var _ProjectWebService = __webpack_require__(38);

var _ProjectWebService2 = _interopRequireDefault(_ProjectWebService);

var _sweetalert = __webpack_require__(61);

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by dannyyassine on 2017-06-11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var AddProjectContainer = function (_Component) {
    _inherits(AddProjectContainer, _Component);

    function AddProjectContainer(props) {
        _classCallCheck(this, AddProjectContainer);

        return _possibleConstructorReturn(this, (AddProjectContainer.__proto__ || Object.getPrototypeOf(AddProjectContainer)).call(this, props));
    }

    // ACTIONS


    _createClass(AddProjectContainer, [{
        key: 'onSubmitForm',
        value: function onSubmitForm(projectName) {
            var _this2 = this;

            var projectWebService = new _ProjectWebService2.default();
            projectWebService.POST().addNewProject(projectName);
            projectWebService.execute(function (success) {
                _this2.props.history.push('/');
            }, function (error) {
                (0, _sweetalert2.default)({
                    title: 'Error',
                    text: '' + error.message,
                    type: 'error'
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_AddProjectForm2.default, { onSubmitForm: this.onSubmitForm.bind(this) })
            );
        }
    }]);

    return AddProjectContainer;
}(_react.Component);

exports.default = AddProjectContainer;

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ProjectWebService = __webpack_require__(38);

var _ProjectWebService2 = _interopRequireDefault(_ProjectWebService);

var _ConsoleOutput = __webpack_require__(104);

var _ConsoleOutput2 = _interopRequireDefault(_ConsoleOutput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by dannyyassine on 2017-06-23.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var AddProjectContainer = function (_Component) {
    _inherits(AddProjectContainer, _Component);

    function AddProjectContainer(props) {
        _classCallCheck(this, AddProjectContainer);

        var _this = _possibleConstructorReturn(this, (AddProjectContainer.__proto__ || Object.getPrototypeOf(AddProjectContainer)).call(this, props));

        _this.state = {
            output: 'qwe',
            project: props.project
        };
        return _this;
    }

    _createClass(AddProjectContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.onLoad();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.downloadProjectLog(nextProps.project);
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            this.downloadProjectLog(this.props.project);
        }
    }, {
        key: 'downloadProjectLog',
        value: function downloadProjectLog(project) {
            var _this2 = this;

            fetch('http://localhost:3002/api/project/' + project.id + '/log', {
                headers: {
                    'Accept': '"text/plain"',
                    'Content-Type': '"text/plain"'
                }
            }).then(function (response) {
                return response.text();
            }).then(function (text) {
                if (text !== '') {
                    _this2.setState({
                        log: text
                    });
                }
                _this2.getLogOutput(project);
            }).catch(function () {
                _this2.getLogOutput(project);
            });
        }
    }, {
        key: 'getLogOutput',
        value: function getLogOutput(project) {
            var _this3 = this;

            if (!project.isRunning) {
                return;
            }

            fetch('http://localhost:3002/api/project/' + project.id + '/progressive-log', {
                headers: {
                    'Accept': '"text/plain"',
                    'Content-Type': '"text/plain"'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                if (json.log.length !== 2) {
                    _this3.setState({
                        log: _this3.state.log + "\n" + JSON.parse(json.log)
                    });
                }
                setTimeout(_this3.logOutput.bind(_this3), 2000);
            }).catch(function (err) {
                setTimeout(_this3.logOutput.bind(_this3), 2000);
            });
        }
    }, {
        key: 'logOutput',
        value: function logOutput() {
            this.getLogOutput(this.props.project);
        }
    }, {
        key: 'cancelProcess',
        value: function cancelProcess() {

            fetch('http://localhost:3002/' + pid.toString() + '/cancel', {
                method: 'POST'
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log(json);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    this.props.project.name
                ),
                _react2.default.createElement(_ConsoleOutput2.default, { output: this.state.log })
            );
        }
    }]);

    return AddProjectContainer;
}(_react.Component);

exports.default = AddProjectContainer;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map