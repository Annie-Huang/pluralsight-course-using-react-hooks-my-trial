import React, {useState, useReducer} from 'react';
import useInterval from "./useInterval";

const useEmailValidation = (secondsFormValidFor) => {
    const validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    // 1. Then we declare with useState a Boolean that defaults our emailValid state to false.
    // That's because we will start with an empty text ring, which is not a valid email.
    const [emailValid, setEmailValid] = useState(false);

    // 2. Then we create our email state, but instead of using useState, we create a simple reducer using useReducer.
    // Remember, useState is exactly this reducer, but without the on-the-fly updating of validating email.
    //
    // !!! A side note, I find the more I use Hooks, the more I use useReducer instead of useState.
    //     In this example, where instead of creating state with useState, we use useReducer.
    //     This is a perfect example of how convenient it is to combine the email validation
    //     with the setting of an email into one useReducer call.
    //
    //     If we didn't do this, we would need to inline in the onChange event of our input element a validation check for email.
    //     It's much better to encapsulate the check in the setEmail method, which is what our useReducer call gives us.
    //
    //     A quick side note, you may have noticed that I'm using reducers but no actions. This is completely valid,
    //     and what I'm doing is making my action pass to the reducer the content itself.
    //     More complex reducers are better served by using action types. There's a good example of this on the
    //     React website at this URL.
    //     https://reactjs.org/docs/hooks-reference.html
    //     https://reactjs.org/docs/hooks-reference.html#usereducer
    const reducer = (state, action) => {
        state = action;
        setEmailValid(validateEmail(state));
        return action;
    };
    const [email, setEmail] = useReducer(reducer, "");

    // const secondsFormValidFor = 30;
    const [count, setCount] = useState(secondsFormValidFor);
    useInterval(
        () => {
            setCount(count - 1);
        },
        count > 0 ? 1000 : null
    );

    return {count, email, setEmail, emailValid};
};

export default useEmailValidation;
