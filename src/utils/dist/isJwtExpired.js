"use strict";
exports.__esModule = true;
exports.isJwtExpired = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
exports.isJwtExpired = function (token) {
    var currentTime = Math.floor(Date.now() / 1000);
    var decoded = jsonwebtoken_1["default"].decode(token);
    if (decoded && typeof decoded === "object") {
        var decodedToken = decoded;
        if (decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.exp) {
            var adjustedExpiry = decoded["exp"] || 0;
            if (adjustedExpiry < currentTime) {
                return true;
            }
            return false;
        }
    }
    return true;
};
