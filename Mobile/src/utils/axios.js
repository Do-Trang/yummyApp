import axios from 'axios'
// import { IP, PORT } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

const IP = "192.168.31.18";
const PORT = "3000";
export { IP, PORT };

const api = axios.create({
    baseURL: `http://${IP}:${PORT}/`,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('accessToken');
        console.log("hi", token)
        if (token) {
            config.headers['x_authorization'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.data.message === "Invalid or expired access token" 
            && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                
                console.log("Hello", IP, PORT)
                console.log("1", accessToken)
                console.log("2", refreshToken)
                const response = await axios.post(
                    `http://${IP}:${PORT}/auth/refresh-token`,
                    { refreshToken },
                    {
                        headers: {
                            x_authorization: accessToken,
                        },
                    }
                );

                const newAccessToken = response.data.accessToken;
                await AsyncStorage.setItem('accessToken', newAccessToken);

                api.defaults.headers.common['x_authorization'] = newAccessToken;
                originalRequest.headers['x_authorization'] = newAccessToken;

                console.log('new access token');

                return api(originalRequest);
            } catch (err) {
                console.log('error in auto call refresh');
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;