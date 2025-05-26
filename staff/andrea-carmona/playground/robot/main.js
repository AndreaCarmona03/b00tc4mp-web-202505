var robot = document.querySelector('.robot-head')
var step = 10
var x = 100
var y = 200

robot.style.left = x + 'px'
robot.style.top = y + 'px'


document.addEventListener('keydown', function (event) {
    var key = event.key

    console.log(key)

    if (key === 'ArrowDown') {
        y = y + step
    } else if (key === 'ArrowUp') {
        y = y - step
    } else if (key === 'ArrowLeft') {
        x = x - step
    } else if (key === 'ArrowRight') {
        x = x + step
    }

    robot.style.left = x + 'px'
    robot.style.top = y + 'px'
})