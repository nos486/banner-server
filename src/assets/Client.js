class Client{
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }
    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }
    get ip() {
        return this._ip;
    }
    get socket() {
        return this._socket;
    }

    set socket(value) {
        this._socket = value;
    }

    constructor(socket,width,id) {
        this._ip = socket.remoteAddress
        this._socket = socket
        this._width = width
        this._id = id
    }
}

export default Client
