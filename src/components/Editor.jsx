import Editor from "@monaco-editor/react";
import {useContext, useEffect} from "react";
import {TabContext} from "../contexts/tabContext";

export function JSONEditor() {
//    const monaco = useMonaco()
//    const editorRef = useRef(null);

    const {currentTab} = useContext(TabContext);

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
        console.log('tab changed', currentTab)
    }, [currentTab])

    return (
        <div className="editor">
            <Editor
                height="70vh"
                defaultLanguage="json"
                defaultValue=""
                options={options}
            />
        </div>
    );
}