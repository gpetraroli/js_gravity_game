/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/main.js":
/*!***************************!*\
  !*** ./assets/js/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _public_levels_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/levels.json */ \"./public/levels.json\");\n/* harmony import */ var _objs_planet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objs/planet */ \"./assets/js/objs/planet.js\");\n/* harmony import */ var _objs_bullet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objs/bullet */ \"./assets/js/objs/bullet.js\");\n\n\n\n\n\n// Set up scene\nconst scene = new three__WEBPACK_IMPORTED_MODULE_3__.Scene();\n\n// Set up camera\nconst camera = new three__WEBPACK_IMPORTED_MODULE_3__.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );\ncamera.position.z = 10;\n\n// Set up renderer\nconst renderer = new three__WEBPACK_IMPORTED_MODULE_3__.WebGLRenderer();\nrenderer.setSize(window.innerWidth, window.innerHeight);\ndocument.body.appendChild(renderer.domElement);\n\nconst textureLoader = new three__WEBPACK_IMPORTED_MODULE_3__.TextureLoader();\nconst texture = textureLoader.load(\n    'build/images/stars.jpg',\n    () => {\n        scene.background = texture;\n    },\n    undefined,\n    (err) => {\n        console.error(err);\n    }\n);\n\nconst level = _public_levels_json__WEBPACK_IMPORTED_MODULE_0__.levels[0];\n\nconst bodies = [];\nlevel.bodies.forEach((body) => {\n    bodies.push(new _objs_planet__WEBPACK_IMPORTED_MODULE_1__[\"default\"](body.radius, body.position, 'build/images/' + body.texture, body.mass));\n    scene.add(bodies[bodies.length - 1].mesh);\n});\n\n// // Earth\n// const earthGeometry = new THREE.SphereGeometry(2, 32, 32);\n// const earthMaterial = new THREE.MeshBasicMaterial({\n//     map: textureLoader.load('build/images/earth_6K.jpg'),\n// });\n// const earth = new THREE.Mesh(earthGeometry, earthMaterial);\n// scene.add(earth);\n//\n// const cloudsGeometry = new THREE.SphereGeometry(2 + 0.05, 32, 32);\n// const cloudsMaterial = new THREE.MeshBasicMaterial({\n//     alphaMap: textureLoader.load('build/images/earth_clouds.jpg'),\n//     transparent: true,\n// });\n// const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);\n// earth.add(clouds);\n//\n// const atmosphereGeometry = new THREE.SphereGeometry(2 + 0.06, 32, 32);\n// const atmosphereMaterial = new THREE.MeshBasicMaterial({\n//     color: 0x0000ff,\n//     opacity: 0.10,\n//     transparent: true,\n// });\n// earth.add(new THREE.Mesh(atmosphereGeometry, atmosphereMaterial));\n//\n\nconst bullet = new _objs_bullet__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({x: 8, y: -5}, 1, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-0.17, -0.01, 0));\nscene.add(bullet.mesh);\n\nconst G = 0.0001; // Gravitational constant for the simulation\n\n\n(function animate() {\n    // Calculate the vector pointing from the bullet to the Earth\n    let forceDirection = bodies[0].mesh.position.clone().sub(bullet.mesh.position);\n    let distance = forceDirection.length();\n    forceDirection.normalize(); // Normalize vector to get the direction\n\n    // Calculate gravitational force magnitude\n    let forceMagnitude = G * (bodies[0].mass * bullet.mass) / (distance * distance);\n\n    // // Apply the force to the bullet's velocity\n    let acceleration = forceDirection.multiplyScalar(forceMagnitude / bullet.mass);\n    bullet.velocity.add(acceleration);\n\n    // Update bullet position\n    bullet.mesh.position.add(bullet.velocity);\n    requestAnimationFrame(animate);\n    renderer.render(scene, camera);\n\n    // earth.rotation.y += 0.001;\n})();\n\n//# sourceURL=webpack:///./assets/js/main.js?");

/***/ }),

/***/ "./assets/js/objs/bullet.js":
/*!**********************************!*\
  !*** ./assets/js/objs/bullet.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\nclass Bullet {\n    #mesh;\n    #mass;\n    #velocity;\n\n    constructor(position, mass, velocity) {\n        const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(0.05, 32, 32);\n        const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color: 0xff0000});\n        this.#mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);\n\n        this.#mesh.position.x = position.x;\n        this.#mesh.position.y = position.y;\n\n        this.#mass = mass;\n\n        this.#velocity = velocity;\n    }\n\n    get mesh() {\n        return this.#mesh;\n    }\n\n    get mass() {\n        return this.#mass;\n    }\n\n    get velocity() {\n        return this.#velocity;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bullet);\n\n//# sourceURL=webpack:///./assets/js/objs/bullet.js?");

/***/ }),

/***/ "./assets/js/objs/planet.js":
/*!**********************************!*\
  !*** ./assets/js/objs/planet.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\nclass Planet {\n    #mesh;\n    #mass;\n\n    constructor(radius, position, texture, mass) {\n        const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(radius, 32, 32);\n        const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({\n            map: new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader().load(texture),\n        });\n        this.#mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);\n        this.#mesh.position.set(position.x, position.y, position.z);\n\n        const atmosphereGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(radius + 0.06, 32, 32);\n        const atmosphereMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({\n            color: 0x0000ff,\n            opacity: 0.10,\n            transparent: true,\n        });\n\n        this.#mesh.add(new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(atmosphereGeometry, atmosphereMaterial));\n\n        this.#mass = mass;\n    }\n\n    get mesh() {\n        return this.#mesh;\n    }\n\n    get mass() {\n        return this.#mass;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Planet);\n\n//# sourceURL=webpack:///./assets/js/objs/planet.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


/***/ }),

/***/ "./public/levels.json":
/*!****************************!*\
  !*** ./public/levels.json ***!
  \****************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"levels\":[{\"name\":\"test\",\"bodies\":[{\"name\":\"Earth\",\"type\":\"planet\",\"radius\":2,\"mass\":1000,\"position\":{\"x\":0,\"y\":0},\"texture\":\"earth_6K.jpg\"}]}]}');\n\n//# sourceURL=webpack:///./public/levels.json?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/js/main.js");
/******/ 	
/******/ })()
;