"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
    static BadRequest(message) {
        return new ApiError(400, message);
    }
    static Unauthorized() {
        return new ApiError(401, "Unauthorized");
    }
}
exports.default = ApiError;
