import * as request from "superagent";

const apiConfig = {
    host: "0.0.0.0",
    port: 5005,
    protocol: "http"
}

export const sonosApi = {
    playText: (text: string) => {
        const {host, port, protocol} = apiConfig;
        const path = `${protocol}://${host}:${port}/sayall/${text}/sv-se/0`
        return request.get(path);
    }
}