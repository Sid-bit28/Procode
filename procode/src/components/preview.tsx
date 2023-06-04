import { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
    code: string;
}

const html = `
    <html>
        <head>
            <style> html{background-color:white; }
        </head>
        <body>
            <div id="root"></div>
            <script>
                window.addEventListener('message', (event) => {
                    try{
                        eval(event.data);
                    } catch (err) {
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div style="color: red;"><h4> RunTime Error </h4>' + err + '</div>'  
                        console.error(err); 
                    }
                }, false);
            </script>
        </body>
    </html>`;



function Preview({ code }: PreviewProps) {
    const iframe = useRef<any>();

    // har baar jb jb "code" change hoga ek baar render hona chahiye
    useEffect(() => {
        iframe.current.srdoc = html;
        iframe.current.contentWindow.postMessage(code, '*');
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe title='mdkd' ref={iframe} sandbox="allow-scripts" srcDoc={html} />
        </div>
    );
}

export default Preview;