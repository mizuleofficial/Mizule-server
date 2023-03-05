const errorHandler = (fn) => {
    return (req, res, next) => {
        return fn(req, res, next).catch(e => next(e))
    }
}

class AppError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = { errorHandler, AppError }