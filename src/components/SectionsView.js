/*
  SectionsView.js

  This module displays the sections and reports when a user clicks on one.

  props:
    sections - an array of section names
    setCurrentSection - a callback that expects a section as an argument

*/
import PropTypes from "prop-types";
import styles from "../styles/SectionsView.module.css";

export default function SectionsView({ sections, setCurrentSection }) {
  return (
    <div className={styles.sectionList}>
      <ul>
        {[...sections].sort().map((section) => (
          <li
            key={section}
            onClick={() => setCurrentSection(section)}
            data-testid="section"
          >
            {section}
          </li>
        ))}
      </ul>
    </div>
  );
}

SectionsView.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrentSection: PropTypes.func.isRequired,
};
