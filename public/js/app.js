const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const msgOne = document.getElementById('msg-1');
const msgTwo = document.getElementById('msg-2'); // Fixed: removed '#' prefix

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = input.value;

  if (!location) {
    msgOne.textContent = 'Please enter a location';
    msgTwo.textContent = '';
    return;
  }

  msgOne.textContent = 'Loading...';
  msgTwo.textContent = '';

  fetch(`/weather?address=${encodeURIComponent(location)}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
        msgTwo.textContent = '';
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast;
      }
    })
    .catch((error) => {
      msgOne.textContent = 'Failed to fetch weather data';
      msgTwo.textContent = '';
      console.error('Error:', error);
    });
});
