import React, { useRef, useState } from "react";
// import 'tinymce/tinymce';
import { Editor } from "@tinymce/tinymce-react";

export default function ({ dat, pop }) {
  // console.log(pop)
  const editorRef = useRef(null);
  const [content, setContent] =
    useState();
    // "This is the initial content of the editor."

  const [text, setText] = useState();
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const onEditorChange = function (a, editor) {
    // console.log(a);
    setContent(a);
    setText(editor.getContent({ format: "text" }));
    dat(editorRef.current.getContent());
  };
  return (
    <>
      {/* <div style={{ height: "80px", overflow: "auto" }}>{text}</div> */}
      <Editor
        onEditorChange={onEditorChange}
        //initialValue={content}
        outputFormat="text"
        value={content}
        
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={`${pop|| ''}`}
        init={{
          height: 700,
          width: "100%",
          menubar: false,
          

          placeholder: "Content",

          plugins: [
            "mentions advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media paste code help wordcount",
          ] ,
          toolbar:
            "undo redo forecolor blocks | lineheight strikethrough underline  | " +
            "bold italic backcolor | formatselect | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | emoticons| help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:20px }",
          emoticons_append: {
            custom_mind_explode: {
              keywords: ["brain", "mind", "explode", "blown"],
              char: "🤯",
            },
          },
        }}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}
