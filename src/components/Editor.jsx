import Editor from "@monaco-editor/react";
import {useContext, useEffect, useState} from "react";
import {TabContext} from "../contexts/tabContext";
import {useIndexedDB} from 'react-indexed-db';

export function JSONEditor() {
//    const monaco = useMonaco()
//    const editorRef = useRef(null);

    const {currentTab} = useContext(TabContext);
    const jsonDb = useIndexedDB('json')
    const [currentEditorData, setCurrentEditorData] = useState('')

    const options = {
        lineHeight: 25,
        fontSize: 16,
        minimap: {
            enabled: false
        },
        autoIndent: 'advanced',
        formatOnPaste: true
    }

    useEffect(() => {
            console.log('tab changed', currentTab);
            if (currentTab?.id) {
                jsonDb.getByID(currentTab?.id).then(res => {
                    setCurrentEditorData(res.data);
                }, err => {
                    console.error(err)
                })
            } else {
                setCurrentEditorData(currentTab?.data)
            }
        },
        [currentTab]
    )

    function updateData(value) {
        const data = {...currentTab, data: value};
        jsonDb.update(data).then(res => {
            console.log(res)
        }, err => {
            console.error(err)
        })
    }

    return (
        <div className="editor">
            <Editor
                height="70vh"
                defaultLanguage="json"
                value={currentEditorData}
                options={options}
                onChange={updateData}
            />
        </div>
    );
}