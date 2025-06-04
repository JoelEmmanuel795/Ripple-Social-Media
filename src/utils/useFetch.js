import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * Custom React hook to perform HTTP requests using Axios, with optional Bearer token authentication from Redux.
 *
 * @returns {{
 *   sendRequest: (
 *     urlEnding: string,
 *     payload?: any,
 *     method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
 *   ) => Promise<void>,
 *   resData: Record<string, any>,
 *   isLoading: boolean,
 *   error: any
 * }}
 *
 * @description
 * This hook simplifies making authenticated or unauthenticated HTTP requests using Axios.
 * It supports all common HTTP methods and automatically includes a Bearer token from the Redux store (if available).
 * The hook maintains local state for loading, response data, and errors.
 *
 * @function
 * @name useFetch
 *
 * @example <caption>Perform a simple GET request</caption>
 * const { sendRequest, resData, isLoading, error } = useFetch();
 * useEffect(() => {
 *   sendRequest('/posts');
 * }, []);
 *
 * @example <caption>Perform a PATCH request with a body</caption>
 * const { sendRequest, resData } = useFetch();
 * const updatePost = () => {
 *   sendRequest('/posts/1', { title: 'Updated Title' }, 'patch');
 * };
 *
 * @author
 * Philippe Giavarini
 */

const useFetch = () => {
    const token = useSelector((state) => state.user.accessToken);

    const [resData, setResData] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Executes an HTTP request to the specified endpoint.
     *
     * @param {string} urlEnding - The relative URL path to append to the API base.
     * @param {*} [payload] - Optional request body for methods like POST, PUT, PATCH.
     * @param {'get' | 'post' | 'put' | 'patch' | 'delete'} [method='get'] - The HTTP method to use.
     */
    const sendRequest = async (urlEnding, payload, method = 'get') => {
        setIsLoading(true);
        console.log(token);
        const config = token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : {};
        try {
            let response;
            if (method === 'get' || method === 'delete') {
                response = await axios[method](
                    `https://motion.propulsion-home.ch/backend/api${urlEnding}`,
                    config
                );
            } else {
                response = await axios[method](
                    `https://motion.propulsion-home.ch/backend/api${urlEnding}`,
                    payload,
                    config
                );
            }
            setResData({ ...resData, [urlEnding]: response.data });
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { sendRequest, resData, isLoading, error };
};

export default useFetch;
