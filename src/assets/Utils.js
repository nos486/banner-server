import Response from "@/assets/Response";

function validate(schema, data, socket) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    const {error, value} = schema.validate(data, options);
    if (error) {
        socket.write(Response.error({message: error.details[0].message}))
        if (this.getClient(socket) === undefined) socket.destroy()
        throw "request validate error"
    } else {
        return value
    }
}

export {validate}
