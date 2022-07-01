class ApiError extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super();
        this.status = status;
        this.message = message;
    }

    static BadRequest(message: string) {
        return new ApiError(400, message);
    }

    static Unauthorized() {
        return new ApiError(401, "Unauthorized");
    }
}

export default ApiError;
