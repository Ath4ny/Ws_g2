'use strict';

let ctx, controller, loop;
let i;

ctx = document.getElementById("canvas").getContext("2d");

//size of canvas
ctx.canvas.height = 700;
ctx.canvas.width = 1500;


//img**************************************

//background
let background = new Image();
background.src = "http://WSgame/Pack/Background/Sky_BG_1.png";
let background1 = new Image();
background1.src = "http://WSgame/Pack/Background/Sky_BG_2.png";

//clouds
let clouds = new Image();
clouds.src = "http://WSgame/Pack/Background/Clouds.png";

//grass
let grass = new Image();
grass.src = "http://WSgame/Pack/Background/Grass2.png";
let grass1 = new Image();
grass1.src = "http://WSgame/Pack/Background/Grass1.png";

//character img
let character_idle = new Image();
character_idle.src = "http://WSgame/Pack/adventurer-idle-00.png";
let character_fall = new Image();
character_fall = "http://WSgame/Pack/adventurer-fall-00.png";

//big-bottom
let big_bottom = new Image();
big_bottom.src = "http://WSgame/Pack/big_bottom_ind.png";

//small-bottom
let small_bottom = new Image();
small_bottom.src = "http://WSgame/Pack/small_bottom_ind.png";

//*****************************************


//character
let character
character = {
    x: 50,
    y: 360,
    x_velocity: 0,
    y_velocity: 0,
    jump: false, 
    hide: false,
}

//character control
controller = {

    left: false,
    right: false,
    up: false,
    keyListener: function (event) {

        var key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 37:// left key
                controller.left = key_state;
                break;
            case 38:// up key
                controller.up = key_state;
                break;
            case 39:// right key
                controller.right = key_state;
                break;
            case 40://down key
                controller.down = key_state;
                break;


        }

    }

};
document.addEventListener('keyup', function (event) {
    if (event.keyCode == '40') {
        character.y = 360;
        character.hide = false;
    }
});


loop = function () {

    if (controller.up && character.jumping == false) {

        character.y_velocity -= 50;
        character.jumping = true;
    }

    if (controller.left) {

        character.x_velocity -= 0.5;

    }

    if (controller.right) {

        character.x_velocity += 0.5;

    }

    if (controller.down) {
        character.y += 2;
        character.hide = true;
    }

    character.y_velocity += 1.5;// gravity
    character.x += character.x_velocity;
    character.y += character.y_velocity;
    character.x_velocity *= 0.9;// friction
    character.y_velocity *= 0.9;// friction

    // if character is falling below floor line
    if (character.y > 360) {

        character.jumping = false;
        character.y = 360;
        character.y_velocity = 0;

    }

    if (character.x < -50) {

        character.x = -50;

    }

    ctx.drawImage(background, 0, 0, 1500, 700);
    ctx.drawImage(background1, 0, 0, 1500, 700);
    ctx.drawImage(clouds, 0, 0, 1500, 700);
    ctx.drawImage(grass, 0, -150, 1500, 700);
    ctx.drawImage(grass1, 0, -150, 1500, 700);

    for (i = 0; i < 20; i++) {
        ctx.drawImage(big_bottom, 210 * i, 500);
    }

    ctx.drawImage(character_idle, character.x, character.y, 50 * 4, 37 * 4)

    // call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
