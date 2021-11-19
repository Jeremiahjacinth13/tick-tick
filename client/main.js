"use strict"
const hours = document.getElementById('hours')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
let interval

function runTime(timeInSeconds) {
    const startTime = Date.now() / 1000
    const endTime = startTime + timeInSeconds

    clearInterval(interval)

    interval = setInterval(timerFunction, 1000)

    function timerFunction() {
        const timeDifference = endTime - (Date.now() / 1000)

        if (timeDifference > 0) {
            hours.innerHTML = Math.floor(timeDifference / 3600).toString().padStart(2, '0');

            minutes.innerHTML = (Math.floor(timeDifference / 60) % 60).toString().padStart(2, '0');;

            seconds.innerHTML = Math.floor(timeDifference % 60).toString().padStart(2, '0');
        } else {
            hours.innerHTML = Math.floor(0).toString().padStart(2, '0');

            minutes.innerHTML = Math.floor(0).toString().padStart(2, '0');;

            seconds.innerHTML = Math.floor(0).toString().padStart(2, '0');

            clearInterval(interval)
        }
    }
    
}

window.addEventListener('DOMContentLoaded', () => {

    const socket = io()

    socket.on('runTimer', timeInSeconds => runTime(timeInSeconds + 1))
})
