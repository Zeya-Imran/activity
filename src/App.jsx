import Autocomplete from "./autocomplete";

const mockApiCall = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const suggestions = [
        "apple",
        "banana",
        "orange",
        "grape",
        "cherry",
        "pineapple",
        "mango",
        "pear",
      ];
      resolve(
        suggestions.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 500);
  });
};

const App = () => {
  const fetchSuggestions = async (query) => {
    try {
      return await mockApiCall(query);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return [];
    }
  };

  return (
    <div>
      <h1>Autocomplete with Suggestion Component</h1>
      <Autocomplete fetchSuggestions={fetchSuggestions} debounceDelay={300} />
    </div>
  );
};

export default App;
