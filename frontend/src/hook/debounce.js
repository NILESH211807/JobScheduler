import { useRef } from "react";

export const useDebounce = (func, delay) => {
    const timerRef = useRef(null);

    return (...args) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
