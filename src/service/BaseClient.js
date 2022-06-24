import axios from "axios";
import {Config} from "../config/AppConfig";


export const BaseClient = {
    sendRequest : (method, url, body) => {
        let config = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            url: Config.server_url+url,
            body: JSON.stringify(body)
        }
        if(method === 'POST') {
            console.info(`---BaseClient request config>>>${JSON.stringify(config)}`)
            return axios.post(config.url,body).then( (response) => {
                let text = JSON.stringify(response)
                if (text?.length < 1000) console.info(`---BaseClient response>>>${text}`)
                else console.info(`---BaseClient response>>>TOO BIIIIIG`)
                return response.data
            })
        }
        if(method === 'GET') {
            console.info(`---BaseClient request config>>>${JSON.stringify(config)}`)
            return axios.get(config.url,body).then( (response) => {
                let text = JSON.stringify(response)
                if (text?.length < 1000) console.info(`---BaseClient response>>>${text}`)
                else console.info(`---BaseClient response>>>TOO BIIIIIG`)
                return response.data
            })
        }

    }
}



