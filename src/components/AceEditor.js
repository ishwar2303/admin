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

import './css/ProgramEditor.css';

function ProgramEditor() {
    const [runControl, setRunControl] = useState(1);
    const [program, setProgram] = useState('');
    const [theme, setTheme] = useState('dracula');
    const [mode, setMode] = useState('java');
    const [supportedLanguages, setSupportedLanguages] = useState([]);
    const changeTheme = () => {
        let theme = document.getElementById('editor-theme').value;
        setTheme(theme);
    }
    
    const changeMode = () => {
        let mode = document.getElementById('editor-mode').value.split(',')[0];
        console.log(mode)
        if(mode.match(/[c|c99|cpp14|cpp17]/)) {
            mode = 'c_cpp';
            console.log(mode);
        }
        else if(mode.match(/[python2|python3]/))
            mode = 'python';
        setMode(mode);
        console.log('Mode: ', mode);
    }
    
    const onChange = (code) => {
        setProgram(code);
    }

    const runProgram = () => {
        Button.processing('run-pgm-btn', 'Running');
        let str = document.getElementById('editor-mode').value;
        let arr = str.split(',');
        let language = arr[0];
        let version = arr[1];
        let script = program;
        let stdin = document.getElementById('stdin').value;
        let data = {
            language,
            version,
            script,
            stdin
        };
        console.log('compiler: ', language);
        let url = 'http://localhost:8080/QuizWit/Jdoodle';
        if(runControl) {
            setRunControl(0);
            Request.post(url, data)
            .then((res) => {
                console.log(res);
                if(res.statusCode == 200) {
                    let resposne = document.getElementById('pgm-response');
                    let execTime = document.getElementById('exec-time');
                    let memoryUsed = document.getElementById('memory-used');
                    resposne.innerText = res.output ? res.output.trim(): res.output;
                    execTime.innerText = res.cpuTime ? res.cpuTime : 'null';
                    memoryUsed.innerText = res.memory ? res.memory : 'null';
                    Flash.message('Program executed successfully', 'bg-success');
                }
                else {
                    Flash.message('Something went wrong!', 'bg-danger');
                }
                Button.reset('run-pgm-btn', '<i class="fas fa-play mr-5"></i> Run');
                setRunControl(1);
            });
        }

    }
    const fetchSupportedProgrammingLanguages = () => {
        let url = 'http://localhost:8080/QuizWit/ProgrammingLanguageController';
        Request.get(url)
        .then((res) => {setSupportedLanguages(res);})
    }
    useEffect(() => {
        fetchSupportedProgrammingLanguages();
    }, []);

    return (
    <>
        <div className='content-loaded'>
            <div>
                <div  className='editor-header'>
                    <div>
                        <button id='run-pgm-btn' className='bg-success' onClick={runProgram}><i className='fas fa-play mr-5'></i> Run</button>
                    </div>
                    <div>
                        <div className='select-container'>
                            <select onChange={changeTheme} id='editor-theme'>
                                <option value='github'>Github</option>
                                <option value='monokai'>Monokai</option>
                                <option value='dracula'>Dracula</option>
                                <option value='twilight'>Twilight</option>
                                <option value='eclipse'>Eclipse</option>
                            </select>
                            <label>Theme</label>
                        </div>
                        <div className="select-container">
                            <select onChange={changeMode} id='editor-mode'>
                                {
                                    supportedLanguages.map((d, key) => {
                                        return <option key={key} value={d.code + ',' + d.version}>{d.code.toUpperCase() + ' ' + d.description}</option>
                                    })
                                }
                            </select>
                            <label>Compiler</label>
                        </div>
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
                        style={{minHeight: '400px'}}
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




