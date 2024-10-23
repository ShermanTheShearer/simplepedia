import PropTypes from "prop-types";
import { useRouter } from "next/router";
import IndexBar from "../../components/IndexBar";
import ArticleShape from "../../components/ArticleShape";
import Article from "../../components/Article";
import ButtonBar from "../../components/ButtonBar";

export default function Simplepedia({
  collection,
  currentArticle,
  setCurrentArticle,
}) {
  const router = useRouter();

  const handleClick = (command) => {
    if (command === "add") {
      router.push("/edit");
    } else if (command === "edit") {
      router.push(`/articles/${currentArticle.id}/edit`);
    }
  };

  return (
    <>
      <IndexBar
        collection={collection}
        setCurrentArticle={setCurrentArticle}
        currentArticle={currentArticle}
      />
      {currentArticle ? <Article currentArticle={currentArticle} /> : <p />}
      <ButtonBar allowEdit={!!currentArticle} handleClick={handleClick} />
    </>
  );
}

Simplepedia.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  currentArticle: ArticleShape,
  setCurrentArticle: PropTypes.func.isRequired,
};
