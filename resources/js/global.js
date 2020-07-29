import conf from "./conf"

global._log = (...params) => {
    if(conf.MODE === 'production') {
        return
    }
    params.forEach((param) => {
        console.log(param)
    })
}
