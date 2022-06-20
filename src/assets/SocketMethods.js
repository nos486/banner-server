import Joi from "joi";
import Client from "@/assets/Client";
import Response from "@/assets/Response";
import {validate} from "@/assets/Utils";

function connect(param,socket,clients){
    let paramSchema = Joi.object({
        width: Joi.number().required(),
    })
    validate(paramSchema,param,socket)
    clients.push(new Client(socket,param.width))
    socket.write(Response.success({message:"connected successfully"}))
}

export {connect}
