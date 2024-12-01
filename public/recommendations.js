document.getElementById('fetchRecommendations').addEventListener('click', async function() {
  const workoutType = document.getElementById('workoutType').value.trim(); // Get the value from the input field

  if (!workoutType) {
    alert('Please enter a workout type.');
    return;
  }

  try {
    // Make the request to the correct endpoint
    const response = await fetch(`/api/recommendations?type=${workoutType}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recommendations.');
    }

    const data = await response.json();
    
    // Clear previous recommendations
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';

    // Display the new recommendations
    if (data.length === 0) {
      recommendationsList.innerHTML = '<li>No recommendations found.</li>';
    } else {
      data.forEach(recommendation => {
        const listItem = document.createElement('li');
        listItem.textContent = recommendation.name;  // Assuming `name` is the field you're sending in the response
        recommendationsList.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    alert('Something went wrong. Please try again later.');
  }
});
