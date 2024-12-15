import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import Suggestion from "./Suggestion";
import PropTypes from "prop-types"; // Import PropTypes for validation

const Autocomplete = ({ fetchSuggestions, debounceDelay = 300 }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFetchSuggestions = useCallback(
    debounce(async (input) => {
      if (!input.trim()) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const results = await fetchSuggestions(input);
      setSuggestions(results);
      setIsLoading(false);
    }, debounceDelay),
    [fetchSuggestions, debounceDelay]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchSuggestions(value);
  };

  const handleSelect = (selectedItem) => {
    setQuery(selectedItem); // Update input with the selected value
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Type to search..."
        className="suggestion-input"
      />
      {isLoading && <p className="loading-text">Loading...</p>}
      <Suggestion suggestions={suggestions} onSelect={handleSelect} />
    </div>
  );
};

// Add PropTypes validation
Autocomplete.propTypes = {
  fetchSuggestions: PropTypes.func.isRequired, // Function to fetch suggestions
  debounceDelay: PropTypes.number, // Number for debounce delay (optional)
};

// Default props
Autocomplete.defaultProps = {
  debounceDelay: 300, // Default debounce delay is 300ms
};

export default Autocomplete;
