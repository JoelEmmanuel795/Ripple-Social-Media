import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * Custom hook for performing HTTP requests with optional authentication.
 *
 * @param {string} urlEnding - The endpoint path appended to the base API URL.
 * @param {*} [payload] - The data to send in the request body (used for POST, PUT, PATCH).
 * @param {'get' | 'post' | 'put' | 'patch' | 'delete'} [method='get'] - The HTTP method to use.
 * @returns {{
 *   resData: any,
 *   isLoading: boolean,
 *   error: any
 * }} An object containing the response data, loading state, and any error encountered.
 *
 * @example
 * const { resData, isLoading, error } = useFetch('/posts', null, 'get');
 *
 * @example
 * const { resData, isLoading, error } = useFetch('/posts/1', { title: 'New Title' }, 'patch');
 * @author Philippe Giavarini
 */
const useFetch = (urlEnding, payload, method = 'get') => {
    const token = useSelector((state) => state.user.accessToken);

    const [resData, setResData] = useState(undefined);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
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
                } else if (
                    method === 'post' ||
                    method === 'put' ||
                    method === 'patch'
                ) {
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

        fetchData();
    }, [urlEnding]);

    return { resData, isLoading, error };
};

export default useFetch;
