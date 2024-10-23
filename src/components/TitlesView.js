/*
  TitleList.js

  This module displays a list of titles and reports when a user clicks on one.

  props:
    articles - an array of objects with title and id properties
    setCurrentArticle - a callback that expects an article as an argument

*/
import PropTypes from "prop-types";
import ArticleShape from "./ArticleShape";

export default function TitlesView({ articles, setCurrentArticle }) {
  return (
    <div>
      <ul>
        {[...articles]
          .sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
              return -1;
            }
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
              return 1;
            }
            return 0;
          })
          .map((article) => (
            <li
              key={article.title}
              onClick={() => setCurrentArticle(article)}
              data-testid="title"
            >
              {article.title}
            </li>
          ))}
      </ul>
    </div>
  );
}

TitlesView.propTypes = {
  articles: PropTypes.arrayOf(ArticleShape).isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
};
