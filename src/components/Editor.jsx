import Editor from "@monaco-editor/react";
import {useContext, useEffect, useState} from "react";
import {TabContext} from "../contexts/tabContext";
import {useIndexedDB} from 'react-indexed-db';

export function JSONEditor() {


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
            if (currentTab) {
                jsonDb.getByID(currentTab?.id).then(res => {
                    const finalEditorData = res ? res?.data : currentTab?.data;

                    setCurrentEditorData('{{}}');
                    setTimeout(() => {
                        setCurrentEditorData(finalEditorData);
                    }, 0)
                }, err => {
                    console.error(err)
                })
            }
        },
        [currentTab]
    )

    function updateData(value) {
        if (currentTab) {
            const data = {...currentTab, data: value, updatedAt: new Date().getTime()};
            console.log('update data on editor ==>', data)
            jsonDb.update(data).then(res => {
                console.log(res)
            }, err => {
                console.error(err)
            })
        }
    }

    return (
        <div className="editor">
            <Editor
                height="80vh"
                defaultLanguage="json"
                value={currentEditorData}
                options={options}
                onChange={updateData}
            />
        </div>
    );
}