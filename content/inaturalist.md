---
title: My observations
desc: See here my latest iNaturalist observations
---
  <h1>My Inaturalist Observations</h1>
  <div id="observations"></div>

  <script>
    async function fetchInaturalistObservations(username) {
      const url = `https://api.inaturalist.org/v1/observations?user_login=${username}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error('Error fetching observations:', error);
        return [];
      }
    }

    // Replace 'your_inaturalist_username' with the desired username
    fetchInaturalistObservations('samuel44461')
      .then(observations => {
        const observationsDiv = document.getElementById('observations');

        observations.forEach(observation => {
          const observationDiv = document.createElement('div');
          observationDiv.innerHTML = `<div> <img src=${observation.observation_photos[0].photo.url} /><br />${observation.observed_on_string}<br />${observation.taxon.name}<br />${observation.place_guess}</div><br />`;
          observationsDiv.appendChild(observationDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching observations:', error);
        const observationsDiv = document.getElementById('observations');
        observationsDiv.textContent = 'Error fetching observations.';
      });
  </script>
