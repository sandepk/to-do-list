import { useState, useEffect } from "react";

export const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);
    useEffect (() => {
        let timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(timer)
        }
    },[value,delay])
       
    return debouncedValue
}