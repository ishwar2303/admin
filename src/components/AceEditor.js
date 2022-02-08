import React from 'react';
import { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-eclipse';
import Request from './services/Request';
import Flash from './services/Flash';
import Button from './services/Button';
import LoaderHeading from './util/LoaderHeading';
import './css/ProgramEditor.css';

function ProgramEditor() {

    const [program, setProgram] = useState('');
    const [theme, setTheme] = useState('eclipse');
    const [mode, setMode] = useState('c_cpp');

    const changeTheme = () => {
        let theme = document.getElementById('editor-theme').value;
        setTheme(theme);
    }
    
    const changeMode = () => {
        let mode = document.getElementById('editor-mode').value;
        setMode(mode);
    }
    
    const onChange = (code) => {
        setProgram(code);
    }

    const runProgram = () => {
        Button.processing('run-pgm-btn', 'Running');
        let language = 'cpp17';
        let version = 1;
        let script = program;
        let stdin = document.getElementById('stdin').value;
        let data = {
            language,
            version,
            script,
            stdin
        };

        let url = 'http://localhost:8080/QuizWit/Jdoodle';
        Request.post(url, data)
        .then((res) => {
            console.log(res);
            if(res.statusCode == 200) {
                let resposne = document.getElementById('pgm-response');
                let execTime = document.getElementById('exec-time');
                let memoryUsed = document.getElementById('memory-used');
                resposne.innerText = res.output;
                execTime.innerText = res.cpuTime ? res.cpuTime : 'null';
                memoryUsed.innerText = res.memory ? res.memory : 'null';
                Flash.message('Program executed successfully', 'bg-success');
            }
            else {
                Flash.message('Something went wrong!', 'bg-danger');
            }
            Button.reset('run-pgm-btn', 'Run');
        });

    }

    return (
    <>
        <LoaderHeading
            description='Program Editor'
        />
        <div className='content-loaded'>
            <div>
                <div className='flex-row jc-sb mb-5'>
                    <div>
                        <button id='run-pgm-btn' className='btn btn-success btn-small' onClick={runProgram}>Run</button>
                    </div>
                    <div>
                        <select onChange={changeTheme} id='editor-theme' className='mr-10'>
                            <option value='github'>Github</option>
                            <option value='monokai'>Monokai</option>
                            <option value='dracula'>Dracula</option>
                            <option value='twilight'>Twilight</option>
                            <option value='eclipse'>Eclipse</option>
                        </select>
                        <select onChange={changeMode} id='editor-mode' className='mr-10'>
                            <option value='c_cpp'>C/C++</option>
                            <option value='java'>JAVA</option>
                            <option value='python'>Python</option>
                            <option value='php'>PHP</option>
                            <option value='javascript'>JavaScript</option>
                        </select>
                    </div>
                </div>
                <div className='pgm-editor-container'>
                    <AceEditor
                        placeholder='Write your code here...'
                        mode={mode}
                        theme={theme}
                        onChange={onChange}
                        name='editor'
                        editorProps={{ $blockScrolling: true }}
                        fontSize={16}
                        setReadOnly={false}
                        style={{height: '300px'}}
                    />
                </div>
                <div className='flex-row mt-10 mb-5'>
                    <div id='exec-time' className='btn btn-primary btn-small mr-5'>Execution Time</div>
                    <div id='memory-used' className='btn btn-danger btn-small'>Memory Used</div>
                </div>
                <div id='pgm-response' className='mb-5'>Output</div>
                <div>
                    <textarea id='stdin' placeholder='stdin'></textarea>
                </div>
            </div>
        </div>
    </>
    );
}

export default ProgramEditor;




