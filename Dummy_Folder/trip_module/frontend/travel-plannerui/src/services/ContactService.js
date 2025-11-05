import axios from 'axios';

 import { CONTACT_API_URL }  from '../constant/APIconstant';
export  async function savecontact(formData){

    return axios.post( CONTACT_API_URL , formData);

}
export  function getAllContact(){
    return axios.put(CONTACT_API_URL);
}

export function deleteContact(id){
    return axios.delete(`${CONTACT_API_URL}/${id}`);
}