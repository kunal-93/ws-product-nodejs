import axios from "axios";

/**
 * Checks if error is returned by GetData Method or not
 * @param {*} history 
 * @param {*} error 
 */
export const isValidError = (history, error) => {
    if(error){
        history.push({
            pathname: '/error',
            error: [error.response.status, error.response.statusText].join(": ")
          });
        
        return true;
    }

    return false;
}
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