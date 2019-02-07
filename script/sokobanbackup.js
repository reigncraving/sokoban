//change level

function changeLvl(){
    var lvl_ID = document.getElementById('levelID').value;
 }

//load level

var level = document.getElementById('levelPreview').innerHTML.split("<br>");
var levelLength = level.length;

    for(var i = 0; i < levelLength; i++){
        level[i] =level[i].replace(/(\r\n\t|\n|\r\t)/gm,"");
    }
    //last element is empty
level.pop();
levelLength = level.length;


//board: width and height
var w = level[0].length;
var h = levelLength;


//solver global variables:
var isDeadlock = false;
var testBoard = level;
console.log(testBoard);
var heroX = 0;
var heroY = 0;
var dx = 0;
var dy = 0;
var direction = {up: "u", down: "d", left: "l", right: "r"};

var nextPossition = "";
var beyond = "";

var goodToGo = true;
var isSolved = false;

var path = "";


var sokoBoard = buildBoard();
printBoard();

function buildBoard(){
        var board = new Array(h);

        for(var i = 0; i < h; i++){
            board[i] = new Array(h);
            for(var j = 0; j < w; j++){

                if(level[i].charAt(j) === "#"){
                    board[i][j] = "wall";
                }
                else if(level[i].charAt(j) === "@"){
                    board[i][j] = "hero";
                }
                else if(level[i].charAt(j) === "$"){
                    board[i][j] = "box";
                }
                else if(level[i].charAt(j) === " "){
                    board[i][j] = "floor";
                }
                else if(level[i].charAt(j) === "."){
                    board[i][j] = "goal";
                }
                else if(level[i].charAt(j) === "*"){
                    board[i][j] = "boxOnGoal";
                }
                else if(level[i].charAt(j) === "+"){
                    board[i][j] = "heroOnGoal";
                }
            }
        }
            return board;
    }


function printBoard(){
    var tableBoard = document.getElementById("tableBoard");
    var output = "";

    for(var i = 0; i < h; i++){
        output += "<tr>";
        for(var j = 0; j < w; j++){
            if(sokoBoard[i][j] === "wall"){
                output += "<td witdh='40' height='40'><img class='resources' id='wall' src='textures/wall40x40.png' width='40' height='40' alt='#'>";
            }
            else if(sokoBoard[i][j] === "hero"){
                output += "<td witdh='40' height='40'><img class='resources' id='hero' src='textures/hero40x40.png' width='40' height='40' alt='@'>";
            }
            else if(sokoBoard[i][j] === "box"){
                output += "<td witdh='40' height='40'><img class='resources' id='box' src='textures/box40x40.png' width='40' height='40' alt='$'>";
            }
            else if(sokoBoard[i][j] === "goal"){
                output += "<td><img class='resources' id='goal' src='textures/goal40x40.png' width='40' height='40' alt='.'>";
            }
            else if(sokoBoard[i][j] === "boxOnGoal"){
                output += "<td><img class='resources' id='boxOnGoal' src='textures/boxOnGoal.png' width='40' height='40' alt='$'>";
            }
            else if(sokoBoard[i][j] === "heroOnGoal"){
                output += "<td><img class='resources' id='heroOnGoal' src='textures/heroOnGoal40x40.png' width='40' height='40' alt='+'>";
            }
            else if(sokoBoard[i][j] === "floor"){
                output += "<td> ";
            }
            output += "</td>";
        }
        output += "</tr>";
    }
    
    tableBoard.innerHTML = output;
}

//Controls for the test game
/* 
    left = 37
    up = 38
    right = 39
    down = 40
*/
/*
var isLeft = false;
var isRight = false;
var isUp = false;
var isDown = false;
var hX = 0;
var hY = 0;
var dx = 0;
var dy = 0;

document.onkeypress = function(e) {
    var e = e || window.event;
    var charCode = e.keyCode || e.which;
    if(e.keyCode === "37" || e.which === "37"){
        isLeft = true;
        console.log("Left");
        move();
    }
    else if(e.keyCode === "38"|| e.which === "38"){
        isUp = true;
        console.log("up");
        move();
    }
    else if(e.keyCode === "39" || e.which === "39"){
        isRight = true;
        console.log("Right");
        move();
    }
    else if(e.keyCode === "40" || e.which === "40"){
        isDown = true;
        console.log("Down");
        move();
    }
}
document.onkeyup = function(e) {
    var e = e || window.event;
    var charCode = e.keyCode || e.which;
    if(e.keyCode ==="37" || e.which === "37"){
        isLeft = false;
        console.log("Left is " + isLeft);

    }
    else if(e.keyCode === "38"|| e.which === "38"){
        isUp = false;
        console.log("up is " + isUp);
    }
    else if(e.keyCode === "39" || e.which === "39"){
        isRight = false;
        console.log("Right is " + isRight);
    }
    else if(e.keyCode === "40" || e.which === "40"){
        isDown = false;
        console.log("Down is " + isDown);
    }
}
//move - testing and understanding move logic
function move(){
    var currentPossition = null;
    var beyond = null;
    for(var i = 0; i <= h; i++){
        for(var j = 0; j <= w; j++){
              //find hero:
            if(sokoBoard[i][j] === "hero" || sokoBoard[i][j] ==="heroOnGoal"){
                heroX = i;
                heroY = j;
                currentPossition = sokoBoard[hX][hY];
             }

            dx = 0;
            dy = 0;
            if(isLeft){ dy = -1;}
            else if(isRight){ dy = 1; }
            else if(isUp){ dx = -1; }
            else if(isDown){ dx = 1; }

            var nextPossition = sokoBoard[hX + dx][hY + dy];
            // beyond = sokoBoard[hX + dx + dx][hY + dy + dy];

            //move to floor
            if(currentPossition === "hero" && nextPossition === "floor"){
                sokoBoard[hX][hY] = "floor";
                sokoBoard[hX + dx][hY + dy] = "hero";
            }

             //push
             
        }
    printBoard();
  }
}
*/
//Solver: 


//validate loaded level
var isLevelValid = true;

function validate(){
    var boxes = 0;
    var goals = 0;
    var player = 0;

    for(var i = 0; i < h; i++){ 
        for(var j = 0; j < w; j++){
            switch(sokoBoard[i][j]){
                case "hero":
                player++;
                break;
                case "box":
                boxes++;
                break;
                case "goal":
                goals++;
                break;
            }
        }
    }

    if(boxes === goals && player === 1){
        document.getElementById("validateOut").innerHTML = "(Level is Valid)";
        isLevelValid = true;
     }
     else {
        document.getElementById("validateOut").innerHTML = "Level is unvalid!";
        isLevelValid = false;
     }
}


//up: -1, down: 1, left: -1, right: 1
function solve(){
    //timer:
    var seconds = 0;
    setInterval(function() { seconds++;}, 1000);

    if(isLevelValid){
    // is there box near by?
    // is the box pushable ?
    //is the level solved?
    //else change direction
    lookAt(direction.right); 
    if(!goodToGo){ checkSolution();}
    if(isSolved){ console.log("solved");}


    }else{
        document.getElementById("solveOut").innerHTML = "can't solve the level :(";
    }


    function lookAt(direction){
        var dr = direction;
        switch(dr){
            case "r": dx = 0; dy = 1; break;
            case "l": dx = 0; dy = -1; break;
            case "u": dx = -1; dy = 0; break;
            case "d": dx = 1; dy = 0; break;         
        }
        console.log("direction: " + dr);
 
        findHero();
        console.log("hx = " + heroX + "hy = "+ heroY);
        nextPossition = testBoard[heroX + dx].charAt(heroY + dy);
        console.log("next " + nextPossition);
        console.log("dx: " + dx);
        console.log("dy: " + dy);
        if(testBoard[heroX + dx + dx].charAt(heroY + dy + dy) === null){
            goodToGo = false; 
        }else { 
            beyond = testBoard[heroX + dx + dx].charAt(heroY + dy + dy);
            goodToGo = true;
            console.log("beyond = " + beyond);
        }
            if(goodToGo){
                    //box
                if(nextPossition == "$" && beyond == " "){
                    // push(dr); 
                    goodToGo = false;
                }
                else if(nextPossition == "$" && beyond == "."){
                    //push(dr);
                }
                else if(nextPossition == "$" && beyond == "*"){
                    goodToGo = false;
                }
                else if(nextPossition == "$" && beyond == "#"){
                    goodToGo = false;
                }
                else if(nextPossition == " " && beyond == " "){
                    // move(dr);
                }
                else if(nextPossition == " " && beyond == "#"){
                    goodToGo = false;
                }
            }
        }    


        function findHero(){
            for(var k=0; k < h; k++){
                for(var j = 0; j < w; j++){
                    if(testBoard[k].charAt(j) === "@"){
                        heroX = k;
                        heroY = j;
                    }
                }
            }
        }


        function checkSolution(){
            for(var i = 0; i < w; i++){
                for(var j = 0; i < h; j++){
                    if(testBoard[i].charAt(j) === "$"){
                        isSolved = false;
                        break;
                    }
                    else{ 
                        isSolved = true; 
                        document.getElementById("solveOut").innerHTML = "Solution: " + path + " in " + seconds + "s.";
                        break;
                    }
                }
            }
        }

}

    /*
    function lookAt(direction){
        var dr = direction;
        switch(dr){
            case "r": dx = 0; dy = 1; break;
            case "l": dx = 0; dy = -1; break;
            case "u": dx = -1; dy = 0; break;
            case "d": dx = 1; dy = 0; break;         
        }
        console.log("direction: " + dr);
 
        findHero();
        console.log("hx = " + heroX + "hy = "+ heroY);
        nextPossition = testBoard[heroX + dx].charAt(heroY + dy);
        console.log("next " + nextPossition);
        console.log("dx: " + dx);
        console.log("dy: " + dy);
        if(testBoard[heroX + dx + dx].charAt(heroY + dy + dy) === null){
            goodToGo = false; 
        }else { 
            beyond = testBoard[heroX + dx + dx].charAt(heroY + dy + dy);
            console.log("beyond = " + beyond);
        }
            //box
            if(nextPossition == "$" && beyond == " "){
                push(dr);
            }
            else if(nextPossition == "$" && beyond == "."){
                push(dr);
            }
            else if(nextPossition == "$" && beyond == "*"){
                goodToGo = false;
            }
            else if(nextPossition == "$" && beyond == "#"){
                goodToGo = false;
            }
            else if(nextPossition == " " && beyond == " "){
                move(dr);
            }
            else if(nextPossition == " " && beyond == "#"){
                goodToGo = false;
            }
    }    
//turns move or push:
    function move(direction){

        var dr = direction;
            switch(dr){
                case "r": dx = 0; dy = 1; break;
                case "l": dx = 0; dy = -1; break;
                case "u": dx = -1; dy = 0; break;
                case "d": dx = 1; dy = 0; break;           
            }

        findHero();
        nextPossition = testBoard[heroX + dx].charAt(heroY + dy);

        if(nextPossition === " "){
            testBoard[heroX].charAt(heroY) = " ";
            testBoard[heroX + dx].charAt(heroY + dy) = "@";
            recordMove(dr)
        }
        else if(nextPossition == "#"){
            goodToGo = false;
        }
        else if(nextPossition == "*"){
            goodToGo = false;
        }
        //on goal
        else if(nextPossition == "."){
            testBoard[heroX].charAt(heroY) = " ";
            testBoard[heroX + dx].charAt(heroY + dy) = "+";
            recordMove(dr)
        }
        //off goal
        else if(testBoard[heroX].charAt(heroY) === "+"){
            testBoard[heroX].charAt(heroY) = ".";
            testBoard[heroX + dx].charAt(heroY + dy) = "@";
            recordMove(dr)
        }
    }

    function push(direction){
        var dr = direction;
            switch(dr){
                case "r": dx = 0; dy = 1; break;
                case "l": dx = 0; dy = -1; break;
                case "u": dx = -1; dy = 0; break;
                case "d": dx = 1; dy = 0; break;    
            }

            findHero();
            nextPossition = testBoard[heroX + dx].charAt(heroY + dy);

            if(testBoard[heroX + dx + dx].charAt(heroY + dy + dy)){
               beyond = testBoard[heroX + dx + dx].charAt(heroY + dy + dy);
            } else {
                goodToGo = false; 
            }

            if(goodToGo){
                if(nextPossition === "$" && beyond === " "){
                    testBoard[heroX].charAt(heroY) = " ";
                    testBoard[heroX + dx].charAt(heroY + dy) = "@";
                    testBoard[heroX + dx + dx].charAt(heroY + dy + dy) = "$";
                    recordPush(dr);
                }
                else if(nextPossition === "$" && beyond === "#"){
                    goodToGo = false;
                }
                else if(nextPossition === "$" && beyond === "."){
                    testBoard[heroX].charAt(heroY) = " ";
                    testBoard[heroX + dx].charAt(heroY + dy) = "@";
                    testBoard[heroX + dx + dx].charAt(heroY + dy + dy) = "*";
                    recordPush(dr)
                }
                else if(nextPossition === "$" && beyond === "*"){
                    goodToGo = false;
                }
            }
    }
//current possition on board
    function findHero(){
        for(var k=0; k < h; k++){
            for(var j = 0; j < w; j++){
                if(testBoard[k].charAt(j) === "@"){
                    heroX = k;
                    heroY = j;
                }
            }
        }
    }

    function recordPush(direction){
        var dr = direction;
            switch(dr){
                case "r": path += "R"; break;
                case "l": path += "L"; break;
                case "u": path += "U"; break;
                case "d": path += "D"; break;         
            }
            console.log("push: " + path);
    }

    function recordMove(direction){
        var dr = direction;
        switch(dr){
            case "r": path += "r"; break;
            case "l": path += "l"; break;
            case "u": path += "u"; break;
            case "d": path += "d"; break;         
        }
        console.log("move: " + path);
    }
    function deadlock(){
        //no possible moves
        isDeadlock = true;
        document.getElementById("solveOut").innerHTML = path + "->Deadlock X_X";
    }

    function checkSolution(){
        for(var i = 0; i < w; i++){
            for(var j = 0; i < h; j++){
                if(testBoard[i].charAt(j) === "$"){
                    isSolved = false;
                }
                else{ 
                    isSolved = true; 
                    document.getElementById("solveOut").innerHTML = "Solution: " + path + " in " + seconds + "s.";
                }
            }
        }
    }
*/
