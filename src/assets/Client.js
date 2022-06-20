class Client{
    get ip() {
        return this._ip;
    }
    get socket() {
        return this._socket;
    }

    set socket(value) {
        this._socket = value;
    }

    constructor(socket,width) {
        this._ip = socket.remoteAddress
        this._socket = socket
        this._width = width
    }
}

export default Client
