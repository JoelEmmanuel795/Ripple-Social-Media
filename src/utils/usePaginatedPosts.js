import { useEffect, useState, useCallback } from 'react';
import useFetch from './useFetch';

const getEndpoint = (filter, offset, limit) => {
    switch (filter) {
        case 'liked':
            return `/social/posts/likes/?limit=${limit}&offset=${offset}`;
        case 'friends':
            return `/social/posts/friends/?limit=${limit}&offset=${offset}`;
        case 'following':
            return `/social/posts/following/?limit=${limit}&offset=${offset}`;
        default:
            return `/social/posts/?limit=${limit}&offset=${offset}`;
    }
};

export const usePaginatedPosts = (filter, limit) => {
    const [offset, setOffset] = useState(0);
    const [posts, setPosts] = useState([]);
    const { resData, sendRequest, isLoading } = useFetch();

    const endpoint = getEndpoint(filter, offset, limit);

    const loadPosts = useCallback(() => {
        sendRequest(endpoint, 'get');
    }, [endpoint]);

    useEffect(() => {
        setOffset(0);
        setPosts([]);
    }, [filter]);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    useEffect(() => {
        const data = resData[endpoint];
        if (data && Array.isArray(data.results)) {
            setPosts((prev) =>
                offset === 0 ? data.results : [...prev, ...data.results]
            );
        }
    }, [resData, endpoint]);

    const loadMore = () => {
        setOffset((prev) => prev + limit);
    };

    return { posts, isLoading, loadMore };
};
