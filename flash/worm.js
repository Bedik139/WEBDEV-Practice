$(document).ready(function() {

    var canvas = $("#canvas")[0];

    var ctx = canvas.getContext("2d");
    var scoreText = $("#score")[0];
    var w = $("#canvas").width();
    var h = $("#canvas").height();
    var cw = 10;
    var worm_array;
    var food;
    var dir;
    var game_loop;
    var score;

    //draws the canvas
    ctx.fillStyle="white";
    ctx.fillRect(0,0,w,h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0,0,w,h);

    function initialize(){
        dir = "right";
        score = 0;
        create_Worm();
        create_food();
        if(typeof game_loop != "undefined")
            clearInterval(game_loop);
        game_loop = setInterval(paint, 45);
    }

    function create_Worm(){
        var length = 5;

        worm_array = [];

        for(var i = length - 1; i >= 0; i--){
            worm_array.push({
                x: i,
                y: 0
            });
        }
    }
 
    function create_food(){
        food = {
            x: Math.round(Math.random()*(w-cw) / cw),
            y: Math.round(Math.random()*(h-cw) / cw)
        }
    }

    function paint(){
        ctx.fillStyle="white";
        ctx.fillRect(0,0,w,h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0,0,w,h);    

        var headX = worm_array[0].x;
        var headY = worm_array[0].y;

        if(dir == "right") headX++;
        else if(dir == "left") headX--;
        else if(dir == "up") headY--;
        else if(dir == "down") headY++;

        if(headX == -1 || headX == w/cw || headY == -1 || headY == h/cw || checkBody(headX, headY, worm_array)){
            initialize();
            return;
        }

        if(headX==food.x && headY==food.y){
            var tail = {
                x : headX,
                y : headY
            };
            create_food();
            score++;
            scoreText.innerHTML = "Score: " + score;
        }
        else {
            var tail = worm_array.pop();
            tail.x = headX;
            tail.y = headY;
        }

        worm_array.unshift(tail);

        for(var i=0;i<worm_array.length;i++){
            var c = worm_array[i];
            paint_cell(c.x,c.y, "black");
        }
        paint_cell(food.x,food.y, "green");
    }

    function paint_cell(x, y, color){
        ctx.fillStyle = color;
        ctx.fillRect(x*cw,y*cw, cw, cw);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x*cw,y*cw, cw, cw);
    }

    function checkBody(x, y, array){
        for(var i=0; i<array.length;i++){
            if(array[i].x == x && array[i].y == y){
                return true;
            }
        }
    }

    $(document).keydown(function(e){
        var key = e.which;

        if(key == "37" && dir != "right") dir = "left";
        else if(key == "38" && dir != "down") dir = "up";
        else if(key == "39" && dir != "left") dir = "right";
        else if(key == "40" && dir != "up") dir = "down";
    }) 
    
    initialize();

}) ;