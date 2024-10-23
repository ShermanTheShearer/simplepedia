import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Editor from "../components/Editor";
import ArticleShape from "../components/ArticleShape";

export default function SimplepediaCreator({
  collection,
  setCollection,
  setCurrentArticle,
}) {
  const router = useRouter();
  const complete = (article) => {
    if (article) {
      const maxId =
        collection.length > 0
          ? Math.max(
              ...collection.map((a) => (a.id !== undefined ? a.id : -Infinity)),
            )
          : -Infinity;

      const newId = maxId + 1;
      const newArticle = { ...article, id: newId };
      const updatedCollection = [...collection, newArticle];
      setCollection(updatedCollection);
      setCurrentArticle(newArticle);

      router.push(`/articles/${newArticle.id}`);
    } else {
      router.back();
    }
  };
  return <Editor currentArticle={null} complete={complete} />;
}

SimplepediaCreator.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCollection: PropTypes.func.isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
};
