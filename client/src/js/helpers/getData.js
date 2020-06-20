import axios from "axios";

/**
 * Gets the data from server
 * @param {*} url 
 * @param {*} endPoint 
 * @param {*} type 
 * @param {*} cb 
 */
const getData = (url, cb=false, options, source=false) => {

    axios.get(url, {cancelToken : source.token})
    .then(response => {
        
        if(response.status == 200 && cb){
            cb({...options, response: response})
        }
        else{
            console.log(response.status);
            console.log(response.statusText);
        }
    })
    .catch(err=>{
        console.error("Error Caught:", err)
        if(cb)
            cb({...options, error: err})   
    });
}

export default getData;