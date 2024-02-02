import Storage from '../Utils/Storage';

const getAccount = async () => {
    return await Storage.get('account');
};



const setAccount = async data => {
    return await Storage.set('account', data);
};

const Logout = async () => {
    await Storage.clear();
};

const register = async (data) => {
    let endpoint = 'register';
    return HttpClient.post(endpoint, data);
};

const login = async (data) => {
    let endpoint = 'login';
    return HttpClient.post(endpoint, data);
};


export default {
    Logout,
    getAccount,
    setAccount,
    register,
    login,

};