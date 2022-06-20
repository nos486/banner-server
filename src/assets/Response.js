class Response {
    constructor() {
    }

    static success({result={}, code = 200, message = "success"}) {
        return JSON.stringify({
            code: 200,
            message: message,
            result: result
        })
    }

    static error({result={}, code = 400, message = "error"}) {
        return JSON.stringify({
            code: code,
            message: message,
            result: result
        })
    }
}

export default Response
