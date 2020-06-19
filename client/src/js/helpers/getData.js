import axios from "axios";

/**
 * Gets the data from server
 * @param {*} url 
 * @param {*} endPoint 
 * @param {*} type 
 * @param {*} cb 
 */
const getData = (url, cb=false, options) => {

    axios.get(url)
    .then(response => {
        // console.log("got Data");
        if(response.status == 200 && cb){
            cb({...options, response: response})
        }
        else{
            console.log(response.status);
            console.log(response.statusText);
        }
    })
    .catch(err=>console.log(err));
}

export default getData;