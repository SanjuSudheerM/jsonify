import Editor from "@monaco-editor/react";
import {useContext, useEffect, useState} from "react";
import {TabContext} from "../contexts/tabContext";
import {useIndexedDB} from 'react-indexed-db';

export function JSONEditor() {
//    const monaco = useMonaco()
//    const editorRef = useRef(null);

    const {currentTab} = useContext(TabContext);
    const jsonDb = useIndexedDB('json')
    const [currentEditorData, setCurrentEditorData] = useState(null)

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
        console.log('editor data has been changed', currentEditorData)
    }, [currentEditorData])

    useEffect(() => {
            if (currentTab) {
                jsonDb.getByID(currentTab?.id).then(res => {
                    const finalEditorData = res ? res?.data : currentTab?.data;
                    setCurrentEditorData('')
                    setCurrentEditorData(finalEditorData);
                }, err => {
                    console.error(err)
                })
            }
        },
        [currentTab]
    )

    function updateData(value) {
        if (currentTab && value !== currentEditorData) {
            const data = {...currentTab, data: value};
            console.log('update data on editor ==>', data)
            jsonDb.update(data).then(res => {
                console.log(res)
                setCurrentEditorData(value)
            }, err => {
                console.error(err)
            })
        }
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