import net from "net";
import Joi from "joi";
import Response from "@/assets/Response";
import {validate} from "@/assets/Utils";
import Client from "@/assets/Client";

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

    sendToAll({method=null,data={}}) {
        for (let client of this._clients) {
            client.socket.write(Response.success({
                method,
                result:data
            }));
        }
    }

    sendToSocket({socket,method=null,data={}}) {
        socket.write(Response.success({
            method,
            result:data
        }));
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

        // check client has existed
        let client = undefined
        if(data.method !== "connect"){
            client = this.getClient(socket)
            if (client === undefined){
                socket.write(Response.error({message:"forbidden"}))
                socket.destroy()
                throw "forbidden"
            }
        }

        switch (data.method) {
            case "connect" :
                this.connect(data.param,socket)
                break
            case "changeWidth" :
                this.changeWidth(data.param,client)
                console.log("Ddd")
                break
            default:
                socket.write(JSON.stringify(Response.error({message: data.method + " method is unknown"})))
                if (this.getClient(socket) === undefined) socket.destroy()

        }
        console.log('Server Received: ', socket, data);
    }


    // socket functions
    connect(param,socket){
        let paramSchema = Joi.object({
            width: Joi.number().required(),
            id: Joi.number().required(),
        })
        validate(paramSchema,param,socket)

        this._clients.push(new Client(socket,param.width,param.id))
        socket.write(Response.success({message:"connected successfully"}))
        this.updateClients()
    }


    changeWidth(param,client){
        let paramSchema = Joi.object({
            width: Joi.number().required(),
        })
        validate(paramSchema,param,client.socket)
        client.width = param.width
        client.socket.write(Response.success({message:"saved"}))
        this.updateClients()
    }

    updateClients(){
        let transform = 0
        for (let client of this.clients){
            transform += client.width
        }

        let shifted = 0

        this.clients.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));

        for (let client of this.clients){
            shifted += client.width
            let data = {
                shift : shifted,
                time : this._vue.$store.getters.settings.time,
                text: this._vue.$store.getters.settings.text,
                transform: transform,
                dateTime : new Date().getTime()
            }
            client.socket.write(Response.success({
                method:"setData",
                result:data
            }));
        }
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
