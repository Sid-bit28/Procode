import { useState } from 'react';

function App() {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const handleClick = () => {
        console.log("click");
    };


    return (
        <div>
            <textarea onChange={e => setInput(e.target.value)} value={input}></textarea>
            <div>
                <button onClick={handleClick}>Submit</button>
            </div>
            <pre>{code}</pre>
        </div>
    );
}

export default App;