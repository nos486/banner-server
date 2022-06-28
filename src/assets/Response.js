class Response {
    constructor() {
    }

    static success({method=null,result={}, code = 200, message = "success"}) {
        return JSON.stringify({
            code: 200,
            message: message,
            method : method,
            result: result
        })+"/n"
    }

    static error({result={}, code = 400, message = "error"}) {
        return JSON.stringify({
            code: code,
            message: message,
            result: result
        })+"/n"
    }
}

export default Response
