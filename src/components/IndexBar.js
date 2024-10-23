/*
  IndexBar.js

  This component provides the section and title display that allows the user to 
  browse the available articles and select one for display. 

   props:
    collection - Array of articles in encyclopedia
    setCurrentArticle - Function to call set current article displayed
    currentArticle - The article to render
*/
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SectionsView from "./SectionsView";
import TitlesView from "./TitlesView";
import ArticleShape from "./ArticleShape";

export default function IndexBar({
  collection,
  setCurrentArticle,
  currentArticle,
}) {
  const [currentSection, setCurrentSection] = useState(null);

  // populate sections
  const sections = Array.from(
    new Set(
      Object.values(collection).map((article) =>
        article.title[0].toUpperCase(),
      ),
    ),
  );

  const sectionSelection = (section) => {
    setCurrentSection(section);
    setCurrentArticle();
  };

  useEffect(() => {
    if (currentArticle) {
      setCurrentSection(currentArticle.title[0].toUpperCase());
    }
  }, [currentArticle]);

  const filteredArticles = currentSection
    ? Object.values(collection).filter(
        (article) => article.title[0].toUpperCase() === currentSection,
      )
    : [];

  return (
    <div>
      <SectionsView sections={sections} setCurrentSection={sectionSelection} />
      {currentSection ? (
        <TitlesView
          articles={filteredArticles}
          setCurrentArticle={setCurrentArticle}
        />
      ) : (
        <p>Select a section</p>
      )}
    </div>
  );
}

IndexBar.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
  currentArticle: ArticleShape,
};
