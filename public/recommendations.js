document.getElementById('fetchRecommendations').addEventListener('click', async function() {
  const workoutType = document.getElementById('workoutType').value.trim();

  if (!workoutType) {
    alert('Please enter a workout type.');
    return;
  }

  try {
    const response = await fetch(`/api/recommendations?type=${workoutType}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recommendations.');
    }

    const data = await response.json();

    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';

    if (data.length === 0) {
      recommendationsList.innerHTML = '<li>No recommendations found.</li>';
    } else {
      data.forEach(recommendation => {
        const listItem = document.createElement('li');
        listItem.textContent = recommendation.name; 
        recommendationsList.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    alert('Something went wrong. Please try again later.');
  }
});
