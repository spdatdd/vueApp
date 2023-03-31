import axios from  'axios'

const commonConfig = {
    headers: {
        "Content-Tyype": "application/json",
        Accpt: "application/json",
    },
}

export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig,
    })
}