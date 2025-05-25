import Session from "@src/helpers/session";
import { useEffect, useState } from "react";

const useCounter = () => {
    const [count, setCount] = useState(Session.getSession('word-count', 0));

    const increase = () => setCount((prev) => prev + 1);
    const decrease = () => setCount((prev) => prev - 1);

    useEffect(() => {
        Session.setSession('word-count', count);
    }, [count])

    return { count, increase, decrease };
};

export default useCounter;
