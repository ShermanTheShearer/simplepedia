/*
  SectionsView.js

  This module displays the sections and reports when a user clicks on one.

  props:
    sections - an array of section names
    setCurrentSection - a callback that expects a section as an argument

*/
import PropTypes from "prop-types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function SectionsView({
  sections,
  setCurrentSection,
  currentSection,
}) {
  const handleChange = (event, newSection) => {
    setCurrentSection(newSection);
  };

  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        exclusive
        onChange={handleChange}
        size="small"
        value={currentSection}
      >
        {[...sections].sort().map((section) => (
          <ToggleButton key={section} data-testid="section" value={section}>
            {section}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

SectionsView.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrentSection: PropTypes.func.isRequired,
  currentSection: PropTypes.string,
};
