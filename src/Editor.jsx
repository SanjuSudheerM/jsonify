import Editor, {useMonaco} from "@monaco-editor/react";
import {useRef} from "react";
export function JSONEditor() {
    const monaco = useMonaco()
    const editorRef = useRef(null);

    const options = {
        lineHeight: 25,
        fontSize: 16,
        minimap: {
            enabled: false
        },
        autoIndent: 'advanced',
        formatOnPaste: true
    }

    return (
        <div className="editor">
            <Editor
                height="80vh"
                defaultLanguage="json"
                defaultValue=""
                options={options}
            />
        </div>
    );
}