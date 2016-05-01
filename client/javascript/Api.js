/**
 * Created by naik on 24.04.16.
 */
import axios from 'axios';

export default {

    login(name, password) {
        return axios.post('users/login', {
            username: name,
            password: password
        })
    },

    autoLogin() {
        return axios.post('users/autologin');
    }
}