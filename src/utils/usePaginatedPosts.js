import { useEffect, useState, useCallback } from 'react';
import useFetch from './useFetch';

const LIMIT = 10;

const getEndpoint = (filter, offset) => {
    switch (filter) {
        case 'liked':
            return `/social/posts/likes/?limit=${LIMIT}&offset=${offset}`;
        case 'friends':
            return `/social/posts/friends/?limit=${LIMIT}&offset=${offset}`;
        case 'following':
            return `/social/posts/following/?limit=${LIMIT}&offset=${offset}`;
        default:
            return `/social/posts/?limit=${LIMIT}&offset=${offset}`;
    }
};

export const usePaginatedPosts = (filter) => {
    const [offset, setOffset] = useState(0);
    const [posts, setPosts] = useState([]);
    const { resData, sendRequest, isLoading } = useFetch();

    const endpoint = getEndpoint(filter, offset);

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
        setOffset((prev) => prev + LIMIT);
    };

    return { posts, isLoading, loadMore };
};
