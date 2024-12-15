import PropTypes from "prop-types"; // Import PropTypes for validation

const Suggestion = ({ suggestions, onSelect }) => {
  return (
    <ul className="suggestion-list">
      {suggestions.length > 0 ? (
        suggestions.map((item, index) => (
          <li
            key={index}
            className="suggestion-item"
            onClick={() => onSelect(item)}
          >
            {item}
          </li>
        ))
      ) : (
        <li className="suggestion-item">No suggestions available</li>
      )}
    </ul>
  );
};
Suggestion.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of strings is expected
  onSelect: PropTypes.func.isRequired, // onSelect must be a function
};
export default Suggestion;
