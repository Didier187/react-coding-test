import { useEffect,  RefObject } from 'react';

interface Props {
    ref: RefObject<HTMLDivElement>;
    callback: () => void;
}

const useClickOutside = ({
    ref,
    callback,
}: Props
) => {
    const handleClick = (event : MouseEvent) => {
        const {current} = ref!;
        if (current && !current.contains(event.target as Node)) {
        callback();
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [ref, callback]);
}

export default useClickOutside;