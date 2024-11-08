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
import TextField from "@mui/material/TextField";
import Stack from "@mui/system/Stack";
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
      <TextField
        required
        fullWidth
        margin="normal"
        id="title"
        label="Title"
        error={!title}
        helperText={!title ? "Title can't be blank" : " "}
        value={title}
        onChange={(newTitle) => setTitle(newTitle.target.value)}
      />

      <TextField
        fullWidth
        multiline
        rows={10}
        margin="normal"
        id="contents"
        label="Contents"
        value={content}
        onChange={(newContent) => setContent(newContent.target.value)}
      />

      <Stack spacing={2} direction="row">
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
      </Stack>
    </div>
  );
}

Editor.propTypes = {
  currentArticle: ArticleShape,
  complete: PropTypes.func.isRequired,
};
