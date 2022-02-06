import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import LoaderHeading from './util/LoaderHeading';
function Contact() {
  return (
    <>
        <LoaderHeading 
            description='Contact Us'
        />
        <div className='content-loaded'>
            <div>
                <SyntaxHighlighter language="javascript" style={dracula}>
                import React from 'react';
                </SyntaxHighlighter>
            </div>
        </div>
    </>);
}

export default Contact;
