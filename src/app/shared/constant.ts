import { environment } from '../../environments/environment';

const baseUrl = environment.baseURL;

export const apiRoutes = {
    login: baseUrl + 'auth/login',
    signup: baseUrl + 'auth/signup',
    allPublicImages: baseUrl + 'image/publicImages'
};

