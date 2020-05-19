import { useEffect, useState} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    const requestInterceptors = httpClient.interceptors.request.use((request) => {
        setError(null);
        return request;
    });
    const responseInterceptors = httpClient.interceptors.response.use(
        (response) => response,
        (err) => {
            setError(err);
        }
    );

    useEffect(() => {
        httpClient.interceptors.request.eject(requestInterceptors);
        httpClient.interceptors.response.eject(responseInterceptors);
    }, [requestInterceptors,responseInterceptors]);
    
    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
};