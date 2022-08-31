import "./styles.css";
import React from "react";
import { marked } from "marked";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArchive,
  faStickyNote,
  faWindowMaximize,
  faWindowMinimize
} from "@fortawesome/free-solid-svg-icons";

export default function App() {
  marked.setOptions({
    breaks: true
  });

  const [markedDown, setMarkedDown] = useState(text);
  const [editorMax, setEditorMax] = useState(false);
  const [previewerMax, setPreviewerMax] = useState(false);

  const markedText = marked.parse(markedDown);

  const handleChange = (event) => {
    setMarkedDown(event.target.value);
  };

  const handleEditor = () => {
    setEditorMax(!editorMax);
  };

  const handlePreviewer = () => {
    setPreviewerMax(!previewerMax);
  };

  // react re-rendered whole app when typing letters in editor, so I put textarea in render()

  // function Editor(props) {
  //   return (
  //     <div className={props.className}>
  //       <textarea cols="102" rows="21" onChange={props.onChange} value={markedDown} className={props.className} ></textarea>
  //     </div>
  //   )
  // }

  function Previewer(props) {
    return (
      <div className={props.className}>
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: markedText }}
        ></div>
      </div>
    );
  }

  function Topbar(props) {
    return (
      <div className="topbar">
        <div>
          <FontAwesomeIcon icon={props.icon1} />
          {props.displayText}
        </div>
        <FontAwesomeIcon
          icon={props.icon}
          onClick={props.onClick}
          className="cursor"
        />
      </div>
    );
  }

  const classes = editorMax
    ? [
        "previewer hide",
        "editor maximize",
        faWindowMinimize,
        "containerPreview hide",
        "containerEditor maximize",
        faStickyNote,
        faFileArchive
      ]
    : previewerMax
    ? [
        "previewer maximize",
        "editor hide",
        faWindowMinimize,
        "containerPreview maximize",
        "containerEditor hide",
        faStickyNote,
        faFileArchive
      ]
    : [
        "previewer",
        "editor",
        faWindowMaximize,
        "containerPreview",
        "containerEditor",
        faStickyNote,
        faFileArchive
      ];

  return (
    <body className="body">
      <div className={classes[4]}>
        <Topbar
          displayText={<b> Editor</b>}
          onClick={handleEditor}
          icon={classes[2]}
          icon1={classes[5]}
        />

        <div className={classes[1]}>
          <textarea
            id="editor"
            cols="102"
            rows="21"
            onChange={handleChange}
            value={markedDown}
            className={classes[1]}
          ></textarea>
        </div>

        {/* <Editor className={classes[1]} onChange={handleChange}/> */}
      </div>

      <div className={classes[3]}>
        <Topbar
          displayText={<b> Previewer</b>}
          onClick={handlePreviewer}
          icon={classes[2]}
          icon1={classes[6]}
        />

        <Previewer className={classes[0]} />
      </div>
    </body>
  );
}

const text = `# This is a react markdown previewer
---
## This is a smaller headline. 
---
### This is a way smaller headline than before.
#### You kinda get it...
---
#### Here is some \`<code></code>\` for you by just passing 3 backticks at the start and end:

\`\`\`
// this is a function for checking primes.

  const isPrime = (num) =>{
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
      if (num % i === 0)
        return false;
    return num > 1;
  };
\`\`\`

You can make your text **bold**!
And some _italic_.
Or you can have **_both_**.
Sometimes you just want to ~~cross things out~~.

You can also have some [links](https://github.com/pengpongpong/ "It\`s just github :)") with a description, when you hover over the link.

Or maybe you want to quote

>some text.

Or maybe indent it

>>further...
>>>>way further.


Do you need some tables for organizing things?
Data | more data |a lot of data
------------|------------|------------|
content |more content |a lot of content

Or maybe you want to organize your thing with lists?

1. Apple
1. Watermelon
1. Pineapple
1. Just start with a number, doesn't matter if it's 1, 1 ,1 ,1

You can also have some unordered lists like these ones: 

* Just type a asterisk
- Or hyphen
+ Plus symbol is also okay

Or maybe a nested list?

1. Before
    * Now
        * Later
1. Yesterday
    1. Tomorrow
        1. Someday


You can also put some images.

![Planet](https://res.cloudinary.com/pengpengong/image/upload/v1661886171/planet_afvbcu.png)
Have a nice day! ![Happy]

By pengpengpong

[Happy]: https://res.cloudinary.com/pengpengong/image/upload/v1661886171/smiley_eeb7tm.png ("Smiley face")
`;
