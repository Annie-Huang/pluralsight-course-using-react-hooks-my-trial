import React, {useState} from 'react';

const InputElement = () => {
    const [inputText, setInputText] = useState("");
    const [historyList, setHistoryList] = useState([]);

    return <div>
        <input
            onChange={(e) => {
                setInputText(e.target.value);
                setHistoryList([...historyList, e.target.value]);
            }}
            placeholder="Enter Some Text"/><br/>
        {inputText}<br/>
        <ul>
            {historyList.map(item => <div>{item}</div>)}
        </ul>
    </div>;
};

export default InputElement;
