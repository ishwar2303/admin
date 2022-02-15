import React from 'react'
import { useState, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import LoaderHeading from './util/LoaderHeading';
import { EDITOR_JS_TOOLS } from './util/Tool';

function ReactEditor() {

    useEffect(() => {
        const reactEditor = new EditorJS({
            holder: 'react-editor-js',
            tools: EDITOR_JS_TOOLS,
            onChange: () => {
                reactEditor.save().then((d) => {
                    console.log(d);
                })
            }
        });
        
    }, []);
    return (
        <>
            <LoaderHeading 
                description='React Editor'
            />
            <div className='content-loaded'>
                <div>
                    <div>
                        <button className="btn btn-primary btn-medium">Save</button>
                    </div>
                    <div id='react-editor-js'></div>
                </div>
            </div>
        </>
    );
}

export default ReactEditor