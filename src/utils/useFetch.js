import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * Custom React hook to perform HTTP requests using Axios, with optional Bearer token authentication.
 *
 * @returns {{
 *   fetchData: (
 *     urlEnding: string,
 *     payload?: any,
 *     method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
 *   ) => Promise<void>,
 *   resData: any,
 *   isLoading: boolean,
 *   error: any
 * }} Object containing:
 *   - `fetchData`: Function to initiate the HTTP request.
 *   - `resData`: The response data from the API.
 *   - `isLoading`: Boolean indicating whether the request is in progress.
 *   - `error`: Any error that occurred during the request.
 *
 * @example
 * // Simple GET request
 * const { fetchData, resData, isLoading, error } = useFetch();
 * useEffect(() => {
 *   fetchData('/posts');
 * }, []);
 *
 * @example
 * // PATCH request with payload
 * const { fetchData, resData, isLoading, error } = useFetch();
 * const updatePost = () => {
 *   fetchData('/posts/1', { title: 'Updated Title' }, 'patch');
 * };
 *
 * @author Philippe Giavarini
 */
const useFetch = () => {
    const token = useSelector((state) => state.user.accessToken);

    const [resData, setResData] = useState(undefined);
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
            setResData(response.data);
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
