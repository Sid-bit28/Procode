import { useEffect, useRef } from 'react';
import './preview.css';

const html = `
    <html>
        <head>
        </head>
        <body>
            <div id="root"></div>
            <script>
                const handleError=(err)=>{
                    const root = document.querySelector('#root');
                    root.innerHTML = '<div style="color: red;"><h4> RunTime Error </h4>' + err + '</div>'  
                    console.error(err); 
                };
                
                window.addEventListener('error', (event)=>{
                    event.preventDefault();
                    handleError(event.error);
                });
                
                window.addEventListener('message', (event) => {
                    try{
                        eval(event.data);
                    } catch (err) {
                        handleError(err);
                    }
                }, false);
            </script>
        </body>
    </html>`;



function Preview({ code, status }) {
    const iframe = useRef();

    // har baar jb jb "code" change hoga ek baar render hona chahiye
    useEffect(() => {
        iframe.current.srdoc = html;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*');
        }, 50);
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe title='preview' ref={iframe} sandbox="allow-scripts" srcDoc={html} />
            {status && <div className="preview-error">{status}</div>}
        </div>
    );
}

export default Preview;