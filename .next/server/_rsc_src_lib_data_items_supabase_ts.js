"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_rsc_src_lib_data_items_supabase_ts";
exports.ids = ["_rsc_src_lib_data_items_supabase_ts"];
exports.modules = {

/***/ "(rsc)/./src/lib/data/items.supabase.ts":
/*!****************************************!*\
  !*** ./src/lib/data/items.supabase.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   listSupabaseAvailableItems: () => (/* binding */ listSupabaseAvailableItems)\n/* harmony export */ });\n/* harmony import */ var _supabase_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../supabase/server */ \"(rsc)/./src/lib/supabase/server.ts\");\n// src/lib/data/items.supabase.ts\n\nasync function listSupabaseAvailableItems() {\n    const supabase = (0,_supabase_server__WEBPACK_IMPORTED_MODULE_0__.createServerClient)();\n    const { data, error } = await supabase.from(\"items\").select(\"*\").eq(\"status\", \"available\").order(\"created_at\", {\n        ascending: false\n    });\n    if (error) throw error;\n    return data ?? [];\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RhdGEvaXRlbXMuc3VwYWJhc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpQ0FBaUM7QUFDdUI7QUFFakQsZUFBZUM7SUFDcEIsTUFBTUMsV0FBV0Ysb0VBQWtCQTtJQUVuQyxNQUFNLEVBQUVHLElBQUksRUFBRUMsS0FBSyxFQUFFLEdBQUcsTUFBTUYsU0FDM0JHLElBQUksQ0FBQyxTQUNMQyxNQUFNLENBQUMsS0FDUEMsRUFBRSxDQUFDLFVBQVUsYUFDYkMsS0FBSyxDQUFDLGNBQWM7UUFBRUMsV0FBVztJQUFNO0lBRTFDLElBQUlMLE9BQU8sTUFBTUE7SUFDakIsT0FBT0QsUUFBUSxFQUFFO0FBQ25CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF6YXItZG9uYWJlbnZpbmRhLy4vc3JjL2xpYi9kYXRhL2l0ZW1zLnN1cGFiYXNlLnRzPzE4NzAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL2xpYi9kYXRhL2l0ZW1zLnN1cGFiYXNlLnRzXG5pbXBvcnQgeyBjcmVhdGVTZXJ2ZXJDbGllbnQgfSBmcm9tIFwiLi4vc3VwYWJhc2Uvc2VydmVyXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsaXN0U3VwYWJhc2VBdmFpbGFibGVJdGVtcygpIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVTZXJ2ZXJDbGllbnQoKTtcblxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgIC5mcm9tKFwiaXRlbXNcIilcbiAgICAuc2VsZWN0KFwiKlwiKVxuICAgIC5lcShcInN0YXR1c1wiLCBcImF2YWlsYWJsZVwiKVxuICAgIC5vcmRlcihcImNyZWF0ZWRfYXRcIiwgeyBhc2NlbmRpbmc6IGZhbHNlIH0pO1xuXG4gIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG4gIHJldHVybiBkYXRhID8/IFtdO1xufVxuIl0sIm5hbWVzIjpbImNyZWF0ZVNlcnZlckNsaWVudCIsImxpc3RTdXBhYmFzZUF2YWlsYWJsZUl0ZW1zIiwic3VwYWJhc2UiLCJkYXRhIiwiZXJyb3IiLCJmcm9tIiwic2VsZWN0IiwiZXEiLCJvcmRlciIsImFzY2VuZGluZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/data/items.supabase.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/supabase/server.ts":
/*!************************************!*\
  !*** ./src/lib/supabase/server.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createServerClient: () => (/* binding */ createServerClient)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/index.mjs\");\n\nfunction createServerClient() {\n    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';\n    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';\n    return (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3N1cGFiYXNlL3NlcnZlci50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUFxRDtBQUU5QyxTQUFTQztJQUNkLE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0Msd0JBQXdCLElBQUk7SUFDNUQsTUFBTUMsa0JBQWtCSCxRQUFRQyxHQUFHLENBQUNHLDZCQUE2QixJQUFJO0lBRXJFLE9BQU9QLG1FQUFZQSxDQUFDRSxhQUFhSTtBQUNuQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhemFyLWRvbmFiZW52aW5kYS8uL3NyYy9saWIvc3VwYWJhc2Uvc2VydmVyLnRzPzJlOGUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlcnZlckNsaWVudCgpIHtcbiAgY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwgfHwgJyc7XG4gIGNvbnN0IHN1cGFiYXNlQW5vbktleSA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIHx8ICcnO1xuXG4gIHJldHVybiBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlQW5vbktleSk7XG59XG4iXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50IiwiY3JlYXRlU2VydmVyQ2xpZW50Iiwic3VwYWJhc2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwic3VwYWJhc2VBbm9uS2V5IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/supabase/server.ts\n");

/***/ })

};
;