import React, { useState, useEffect } from 'react';

const App = () => {
  // State variables to hold the dog image URL and loading status
  const [dogImage, setDogImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch the random dog image from the API
  const fetchDogImage = async () => {
    try {
      // Send a fetch request to the API
      const response = await fetch('https://dog.ceo/api/breeds/image/random');

      // Check if the response is not ok (e.g., HTTP error)
      if (!response.ok) {
        throw new Error('Failed to fetch the data');
      }

      // Convert the response data to JSON format
      const data = await response.json();

      // Update the dogImage state with the fetched URL
      setDogImage(data.message);

      // Set loading to false since the data has been received
      setLoading(false);
    } catch (error) {
      // Log any errors that occurred during the fetch
      console.error(error);

      // Set loading to false even if there's an error
      setLoading(false);
    }
  };

  // useEffect with an empty dependency array runs the callback only once on component mount
  useEffect(() => {
    // Fetch the dog image when the component is mounted
    fetchDogImage();
  }, []);

  // Conditional rendering based on the loading status
  return (
    <div>
      {loading ? (
        // Display "Loading..." when the data is being fetched
        <p>Loading...</p>
      ) : (
        // Display the dog image in an <img> tag with the alt attribute set to "A Random Dog"
        <img src={dogImage} alt="A Random Dog" />
      )}
    </div>
  );
};

export default App;
