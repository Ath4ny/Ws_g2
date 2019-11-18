'use strict';

let ctx, controller, loop;
let i; //counters

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

//BGgrass
let grass = new Image();
grass.src = "http://WSgame/Pack/Background/Grass2.png";
let grass1 = new Image();
grass1.src = "http://WSgame/Pack/Background/Grass1.png";

//character img
//idle
let character_idle = new Image();
character_idle.src = "http://WSgame/Pack/adventurer-idle-00.png";
let character_idle_left = new Image();
character_idle_left.src = "http://WSgame/Pack/adventurer-idle-L-00.png";

// //fall 
// let character_fall = new Image();
// character_fall.src = "http://WSgame/Pack/adventurer-fall-00.png";

//big-bottom
let big_bottom = new Image();
big_bottom.src = "http://WSgame/Pack/big_bottom_ind.png";

//small-bottom
let small_bottom = new Image();
small_bottom.src = "http://WSgame/Pack/small_bottom.png";

//food_pic
let food_pic = new Image();
food_pic.src = "http://WSgame/Pack/apple.png";

//*****************************************


//character
let character
character = {
    x: 50,
    y: 360,
    x_velocity: 0,
    y_velocity: 0,
    jumping: false,
    hide: false,
    hp: 100,
    alive: true,
    anim: 0,
    run: false,
}

//platform
let platform = {
    x: (Math.random(0, 1) + 2) * 100,
    y: 240,
}

//floor
let floor = {
    x: 210,
    y: 500,
}

//food
let food = {
    x: (Math.random(0, 1) + 5) * 100,
    y: 190,
    restore: 5,
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
//unhide if inactive
document.addEventListener('keyup', function (event) {
    if (event.keyCode == '40') {
        character.y = 360;
        character.hide = false;
    }
});

function death() {
    alert("You are dead, lol. PRESS F5 TO RESTART");
    //results output
}

//anims
function right_look() {
    ctx.drawImage(character_idle, character.x, character.y, 50 * 4, 37 * 4);
}
function left_look() {
    ctx.drawImage(character_idle_left, character.x, character.y, 50 * 4, 37 * 4);
}
// function fall_r() {
//     ctx.drawImage(character_fall, character.x, character.y, 50 * 4, 37 * 4);
// }

//starvation
let starvation = setInterval(() => {
    if (character.hp > 0) {
        character.hp -= 1;
    }
    else {
        death();
        clearInterval(starvation);
    }
}, 1000);

loop = function () {

    if (controller.up && character.jumping == false) {

        character.y_velocity -= 50;
        character.jumping = true;
    }


    if (controller.left) {

        character.anim = 1;
        character.x_velocity -= 0.5;

    }

    if (controller.right && character.x != 750) {

        character.anim = 0;
        character.x_velocity += 0.5;

    }
    if (controller.right && character.x >= 750) {

        //platform.x -= character.x_velocity;       //DO NOT WORKS
        //floor.x -= character.x_velocity;          //DO NOT WORKS

    }

    if (controller.down) {
        character.y += 2;
        character.hide = true;
    }

    character.y_velocity += 1.5;// gravity
    character.x += character.x_velocity;
    character.y += character.y_velocity;
    character.x_velocity *= 0.9;// slide
    character.y_velocity *= 0.9;// slide

    // if character is falling below floor line or platform
    if (character.y > 360) {

        character.jumping = false;
        character.y = 360;
        character.y_velocity = 0;

    }

    //"invisible" wall
    if (character.x < -5) {

        character.x = -5;

    }


    //background draw
    ctx.drawImage(background, 0, 0, 1500, 700);
    ctx.drawImage(background1, 0, 0, 1500, 700);
    ctx.drawImage(clouds, 0, 0, 1500, 700);
    ctx.drawImage(grass, 0, -150, 1500, 700);
    ctx.drawImage(grass1, 0, -150, 1500, 700);

    //healtbar
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(10, 10, 450, 50);
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.fillRect(15, 15, 4.4 * character.hp, 40);
    ctx.font = "25px Arial";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("Hp: " + character.hp, 200, 42);

    if ((character.x == food.x) && (character.y == food.y)) {
        if (character.hp < 100) {
            character.hp += food.restore;
        }
    }

    //food draw
    for (i = 0; i < 20; i++) {
        ctx.drawImage(food_pic, food.x * i, food.y);
    }

    //floor draw
    for (i = 0; i < 20; i++) {
        ctx.drawImage(big_bottom, floor.x * i, floor.y);
    }
    //platform draw
    for (i = 0; i < 20; i += 2) {
        ctx.drawImage(small_bottom, platform.x * i, platform.y, 150, 74);
    }

    switch (character.anim) {   //view direction
        case 0:
            right_look();
            break;

        case 1:
            left_look();
            break;

    }
    // call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);
    // console.log(character.x+" : "+character.y);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
