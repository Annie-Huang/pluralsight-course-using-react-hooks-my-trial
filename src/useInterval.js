// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import {useEffect, useRef} from "react";

// I'm going to cheat a little and include a custom React Hook, useInterval, created by the React team
// to replace setInterval for timer-type events like this.
//
// what it does in a nutshell is it sets and clears a timer on every component mount and dismount.
// We shouldn't use the setInterval call directly in our component because of its dynamic nature.
// It can interfere with React's lifecycle processing. Dan Abramov has a lengthy explanation about this, and you can read about it.
const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
export default useInterval;
