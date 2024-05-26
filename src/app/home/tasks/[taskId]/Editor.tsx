"use client";
import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote
} from "@blocknote/react";
import "@blocknote/react/style.css";


interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  newTask?:boolean
};

const Editor = ({
  onChange,
  initialContent,
  editable
}: EditorProps) => {

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: 
      initialContent 
      ? JSON.parse(initialContent) as any[] 
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks,null,2));
    },
    // uploadFile: handleUpload
  })

  return (
    <div className={`w-full my-[6px] mb-[15px] bl:px-[10px] bbl:px-[0px] mt-[10px]`}>
      <BlockNoteView
        editor={editor}
        theme={"light"}
      />
    </div>
  )
}

export default Editor;