export default class Authentication {

    /**
     * Authenticate the User by saving in Local Storage
     *
     * @author Lukas Fruntke
     */
    static authenticate(token){
        // perform vodoo
        localStorage.setItem('token', token);
    }

    /**
     * Check if User is authenticated
     *
     * @author Lukas Fruntke
     * @returns {boolean}
     */
    static isAuthenticated(){
        return localStorage.getItem('token') !== null;
    }

    /**
     * Deauthenticate User by removing from Local Storage
     *
     * @author Lukas Fruntke
     */
    static deauthenticate(){
        localStorage.removeItem('token');
    }

    /**
     * Read the saved Token from Local Storage
     *
     * @author Lukas Fruntke
     * @returns {string | null}
     */
    static getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Reauthenticate User with new Token
     *
     * @author Lukas Fruntke
     * @param new_token
     */
    static reauthenticate(new_token){
        this.deauthenticate();
        this.authenticate(new_token);
    }
}

