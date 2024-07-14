
var sleep = async (time)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(`Slept for ${time}ms`);
        }, time)
    })
}

export default sleep;