import { useState } from "react"
export const useFetching = (callback) => {

    const fetching = async (...args) => {
        await callback(...args);
    }

    return fetching;
}

export const useInitialFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const initialFetching = async (...args) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (e) {
            setError(e.message);
        } finally {
            setTimeout(() => setIsLoading(false), 1500);
        }
    }

    return [initialFetching, isLoading, error];
}