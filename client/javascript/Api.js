/**
 * Created by naik on 24.04.16.
 */
import axios from 'axios';

export default {

    login(name, password) {

    },
    
    autoLogin(authToken) {
        return axios.get('users/autologin', authToken);
    }
}