// Event listeners. Execute js only after all the html has loaded
document.addEventListener('DOMContentLoaded', () => {
    // this grabs the bird class and stores it into a const

    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 1;
    let isGameOver = false;





    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }


    // This invokes the function every 20ms
    let gameTimerId = setInterval(startGame, 20);

    // clearInterval(timerId) 




    function control(e) {
        // 32 is the keycode for the spacebar. More info on keycode.info
        if(e.keyCode === 32) {
            jump();
        }
    }
    









    function jump() {

        if(birdBottom < 490) {
            birdBottom +=50;
        }

        bird.style.bottom = bird.bottom + 'px';
    }





    function generateObstacle() {


        let obstacleLeft = 500;

        let randomHeight = Math.random() * 60;

        // this makes sure that every time the obstacle function is called, a different obstacle is generated
        let obstacleBottom = randomHeight;

        // creating an html element via js and adding a classname to a div
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');

        // this puts the obstacle div into the game-container div which is referenced as gameDisplay variable in js
        gameDisplay.appendChild(obstacle);

        obstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';


        function moveObstacle() {
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';

            if(obstacleLeft === -50) {
                clearInterval();
                gameDisplay.removeChild(obstacle);
            }

            if(birdBottom === 0) {
                gameOver();
            }

        }

        // the other timer id is outside the scope of this function which is why we are able to use the same name

        // this is so that the obstacles can move
        let timerId = setInterval(moveObstacle, 20);

        setTimeout(generateObstacle, 3000);





    }

    generateObstacle();   



    function gameOver() {
        clearInterval(gameTimerId);
        isGameOver = true;
        
        // this is how you remove event listeners
        document.removeEventListener('keyup', control);
    }





    document.addEventListener('keyup', control);







});
