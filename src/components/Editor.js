/*
  Editor.js

  This provides a basic editor with space for entering a title and a body.

  The interface has two buttons. If "Cancel" is clicked, the `complete` callback
  is called with no arguments. If the "Save" button is clicked, the `complete` callback
  is called with a new article object with `title`, `contents`, and `date`. 

  If the optional `article` prop is set, the `title` and `contents` fields of the component
  are pre-loaded with the values. In addition, all other properties of the object are 
  included in the returned article object. 

  props:
    currentArticle - object with `title` and `contents` properties at minimum
    complete - function to call on completion (required)
*/

import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/Editor.module.css";
import ArticleShape from "./ArticleShape";

export default function Editor({ currentArticle, complete }) {
  const [title, setTitle] = useState(
    currentArticle ? currentArticle.title : "",
  );
  const [content, setContent] = useState(
    currentArticle ? currentArticle.contents : "",
  );

  return (
    <div className={styles.editor}>
      <input
        type="text"
        id="title"
        placeholder="Title must be set"
        value={title}
        onChange={(newTitle) => setTitle(newTitle.target.value)}
      />

      <textarea
        type="text"
        id="content"
        className={styles.textarea}
        placeholder="Contents"
        value={content}
        onChange={(newContent) => setContent(newContent.target.value)}
      />

      <button
        type="button"
        id="save"
        disabled={!title.trim()}
        onClick={() => {
          const now = new Date().toISOString();
          const newArticle = {
            ...currentArticle,
            title,
            contents: content,
            edited: now,
          };
          complete(newArticle);
        }}
      >
        Save
      </button>

      <button type="button" id="cancel" onClick={() => complete()}>
        Cancel
      </button>
    </div>
  );
}

Editor.propTypes = {
  currentArticle: ArticleShape,
  complete: PropTypes.func.isRequired,
};
