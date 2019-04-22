
class ApiError extends Error {
    constructor(type, message='') {
        super();
        this.code=503;
        this.type= type;

        switch (this.type) {
            case 'ValidationError':
                this.code = 400;
                this.message = message.error.message;
                break;
            case 'ExistentEmail':
                this.code = 400;
                this.message = 'This email is already in use';
                break;
            case 'AuthToken':
                this.code = 401;
                this.message = 'No token present in header';
                break;
            case 'FacebookApiException':
                this.code = 401;
                this.message = message;
                break;
            case 'InvalidParam':
                this.code = 401;
                this.message = `Invalid param ${message}`;
                break;
            case 'RequiredBody':
                this.code = 401;
                this.message = `The body is required.`;
                break;
            default:
                this.code = 400;
                this.message = 'Something went wrong';
        };
    }
}

module.exports = ApiError;