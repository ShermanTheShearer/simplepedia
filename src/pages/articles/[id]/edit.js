import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Editor from "../../../components/Editor";
import ArticleShape from "../../../components/ArticleShape";

export default function SimplepediaEditor({
  collection,
  setCollection,
  setCurrentArticle,
  currentArticle,
}) {
  const router = useRouter();
  const complete = (article) => {
    if (article) {
      const updatedCollection = collection.map((original) =>
        original.id === article.id ? article : original,
      );

      setCollection(updatedCollection);
      setCurrentArticle(article);
    } else {
      router.back();
    }
  };

  return (
    <Editor
      currentArticle={currentArticle}
      complete={complete}
      key={currentArticle?.id}
    />
  );
}

SimplepediaEditor.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCollection: PropTypes.func.isRequired,
  currentArticle: ArticleShape.isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
};
