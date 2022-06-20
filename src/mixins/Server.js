import net from "net";
import Joi from "joi";
import Response from "@/assets/Response";
import {connect} from "@/assets/SocketMethods";
import {validate} from "@/assets/Utils";

class Server {
    constructor(vue) {
        this._vue = vue
        this._server = null
        this._clients = []

        //singleton class
        let inst = !!Server.instance;
        if (inst) {
            return Server.instance;
        }
        Server.instance = this;
        return this;
    }

    start() {
        this._server = net.createServer((socket) => {

            // socket.pipe(socket);
            socket.on('data', (data) => {
                try {
                    this.dataReceived(data, socket)
                }catch (e) {
                    console.log("dataReceived",e)
                }
            });

            socket.on("close", () => {
                this.removeClient(socket)
                console.log('close', socket);
            })

        })

        this._server.on('connection', (socket) => {
            // this._clients.push(new Client(socket,100))
            // socket.setEncoding('utf8');
        })


        this._server.listen(1337, '0.0.0.0');

        console.log("server is up")
    }

    stop() {
        this._server.close()
        this._clients = []
        console.log("server stop")
    }

    sendToAll(data) {
        for (let client of this._clients) {
            client.write(JSON.stringify(data));
        }
    }

    get isListening() {
        if (this._server != null) {
            return this._server.listening
        } else {
            return false
        }
    }

    get clients() {
        return this._clients
    }

    getClient(socket) {
        return this._clients.find((client) => {
            return client.socket === socket
        })
    }

    removeClient(socket){
        this._clients.forEach((client,index) => {
            if (client.socket === socket){
                this._clients.splice(index, 1)
            }
        })
    }

    dataReceived(data, socket) {
        data = JSON.parse(data)
        let dataSchema = Joi.object({
            method: Joi.string().required(),
            param: Joi.object().required()
        })

        validate(dataSchema, data, socket)

        switch (data.method) {
            case "connect" :
                connect(data.param,socket,this._clients)
                break
            default:
                socket.write(JSON.stringify(Response.error({message: data.method + " method is unknown"})))
                if (this.getClient(socket) === undefined) socket.destroy()

        }
        console.log('Server Received: ', socket, data);
    }


}

export default {
    mounted() {

    },
    data() {
        return {
            server: new Server(this)
        };
    },
    methods: {}
}
