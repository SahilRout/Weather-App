const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3 = document.querySelector('#message-3');
const message4 = document.querySelector('#message-4');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value

    message1.textContent = 'Loading...';
    message2.textContent = ''
    message3.textContent = ''
    message4.textContent = ''
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                message1.textContent = data.error
            }
            else {
                message1.textContent = data.location
                message2.textContent = `Weather : ${data.weather}`
                message3.textContent = `Currently : ${data.currently}°C`
                message4.textContent = `Feels Like : ${data.feelsLike}°C`
            }
        })
    })
})