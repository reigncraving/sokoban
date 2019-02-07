//load level
var level = document.getElementById('levelPreview').innerHTML.split("<br>");
var levelLength = level.length;

for(var i = 0; i < levelLength; i++){
    level[i] =level[i].replace(/(\r\n\t|\n|\r\t)/gm,"");
}

levelLength = level.length;

//board: width and height
var w = level[0].length;
var h = levelLength;

var sokoBoard = buildBoard();
printBoard();

var moves = 0;

//coordinates
var heroX = 0;
var heroY = 0;
var dx = 0;
var dy = 0;
var currentPossition = null;
var nextPossition = null;
var beyond = null;

var isLeft = false;
var isRight = false;
var isUp = false;
var isDown = false;
var isSolved = false;

//timer
window.onload = function (){
	var seconds = 0;
	var func = setInterval(function(){
		seconds++;
		document.getElementById("timer").innerHTML = seconds;
	}, 1000 );
	
}

//key codes for the game
/* 
    left = 37
    up = 38
    right = 39
    down = 40
*/

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler)
	
function keyDownHandler(e){
	var e = e || window.event;
	var keyCode = e.keyCode;
	
	//disable page scrolling
	e.preventDefault();
	
	if(keyCode == "38"){
		isUp = true;
		move();
	}
	else if(keyCode == "40"){
		isDown = true;
		move();
	}
	else if(keyCode == "37"){
		isLeft = true;
		move();
	}
	else if(keyCode == "39"){
		isRight = true;
		move();
	}
}

function keyUpHandler(e){
	var e = e || window.event;
	var keyCode = e.keyCode;
	
	if(keyCode == "38"){
		isUp = false;
	}
	else if(keyCode == "40"){
		isDown = false;
	}
	else if(keyCode == "37"){
		isLeft = false;
	}
	else if(keyCode == "39"){
		isRight = false;
	}
}

function move(){
	var canMove = false;
	dx = 0;
	dy = 0;
	if(isLeft){ dy = -1;}
	else if(isRight){ dy = 1; }
	else if(isUp){ dx = -1; }
	else if(isDown){ dx = 1; }
	
	findHero();
	currentPossition = sokoBoard[heroX][heroY];
	nextPossition = sokoBoard[heroX + dx][heroY + dy];
	beyond = null;
	
	if(nextPossition != "wall"){
		canMove = true;
		//push
		if(nextPossition == "box"){
			beyond = sokoBoard[heroX + dx + dx][heroY + dy + dy];
			console.log(beyond);
			
			if(currentPossition == "hero" && beyond =="floor"){
				sokoBoard[heroX][heroY] = "floor";
				sokoBoard[heroX + dx][heroY + dy] = "hero";
				sokoBoard[heroX + dx + dx][heroY + dy + dy] = "box";
			}
			if(currentPossition == "hero" && beyond =="goal"){
				sokoBoard[heroX][heroY] = "floor";
				sokoBoard[heroX + dx][heroY + dy] = "hero";
				sokoBoard[heroX + dx + dx][heroY + dy + dy] = "boxOnGoal";
			}
			if(currentPossition == "heroOnGoal" && beyond =="goal"){
				sokoBoard[heroX][heroY] = "goal";
				sokoBoard[heroX + dx][heroY + dy] = "hero";
				sokoBoard[heroX + dx + dx][heroY + dy + dy] = "boxOnGoal";
			}
			if(currentPossition == "heroOnGoal" && beyond =="floor"){
				sokoBoard[heroX][heroY] = "goal";
				sokoBoard[heroX + dx][heroY + dy] = "hero";
				sokoBoard[heroX + dx + dx][heroY + dy + dy] = "box";
			}
		}
		
		if(nextPossition == "boxOnGoal"){
			beyond = sokoBoard[heroX + dx + dx][heroY + dy + dy];
			console.log(beyond);
			
			if(currentPossition == "hero" && beyond =="floor"){
				sokoBoard[heroX][heroY] = "floor";
				sokoBoard[heroX + dx][heroY + dy] = "heroOnGoal";
				sokoBoard[heroX + dx + dx][heroY + dy + dy] = "box";
			}
			if(currentPossition == "hero" && beyond =="goal"){
				sokoBoard[heroX][heroY] = "floor";
				sokoBoard[heroX + dx][heroY + dy] = "heroOnGoal";
				sokoBoard[heroX + dx + dx][heroY + dy + dy] = "boxOnGoal";
			}
			if(currentPossition == "heroOnGoal" && beyond =="floor"){
				sokoBoard[heroX][heroY] = "goal";
				sokoBoard[heroX + dx][heroY + dy] = "heroOnGoal";
				sokoBoard[heroX + dx + dx][heroY + dy + dy] = "box";
			}
			if(currentPossition == "heroOnGoal" && beyond =="goal"){
				sokoBoard[heroX][heroY] = "goal";
				sokoBoard[heroX + dx][heroY + dy] = "heroOnGoal";
				sokoBoard[heroX + dx + dx][heroY + dy + dy] = "boxOnGoal";
			}
		}
		
		//move
		if(nextPossition == "floor"){
			sokoBoard[heroX][heroY] = "floor";
			sokoBoard[heroX + dx][heroY + dy] = "hero";
		}
		if(currentPossition == "hero" && nextPossition == "goal"){
			sokoBoard[heroX][heroY] = "floor";
			sokoBoard[heroX + dx][heroY + dy] = "heroOnGoal";
		}
		if(currentPossition == "heroOnGoal" && nextPossition == "floor"){
			sokoBoard[heroX][heroY] = "goal";
			sokoBoard[heroX + dx][heroY + dy] = "hero";
		}
		if(currentPossition == "heroOnGoal" && nextPossition == "goal"){
			sokoBoard[heroX][heroY] = "goal";
			sokoBoard[heroX + dx][heroY + dy] = "heroOnGoal";
		}
	}
	else{
		canMove = false;
	}
	
    if(canMove){
    	moves++;
    	document.getElementById("moves").innerHTML = moves;
    	
    	checkSolution();
    	printBoard();
    	if(isSolved){
    		document.getElementById("solved").innerHTML = "Level solved!";
    	}
    }
}

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
            output += "<td witdh='35' height='35'><img class='resources' id='wall' src='textures/wall40x40.png' width='35' height='35' alt='#'>";
        }
        else if(sokoBoard[i][j] === "hero"){
            output += "<td witdh='35' height='35'><img class='resources' id='hero' src='textures/hero40x40.png' width='35' height='35' alt='@'>";
        }
        else if(sokoBoard[i][j] === "box"){
            output += "<td witdh='35' height='35'><img class='resources' id='box' src='textures/box40x40.png' width='35' height='35' alt='$'>";
        }
        else if(sokoBoard[i][j] === "goal"){
            output += "<td><img class='resources' id='goal' src='textures/goal40x40.png' width='35' height='35' alt='.'>";
        }
        else if(sokoBoard[i][j] === "boxOnGoal"){
            output += "<td><img class='resources' id='boxOnGoal' src='textures/boxOnGoal.png' width='35' height='35' alt='$'>";
        }
        else if(sokoBoard[i][j] === "heroOnGoal"){
            output += "<td><img class='resources' id='heroOnGoal' src='textures/heroOnGoal40x40.png' width='35' height='35' alt='+'>";
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
       
function findHero(){
    for(var k=0; k < h; k++){
        for(var j = 0; j < w; j++){
            if(sokoBoard[k][j] === "hero" || sokoBoard[k][j] ==="heroOnGoal"){
                heroX = k;
                heroY = j;
                break;
            }
        }
    }
}

function checkSolution(){
	var boxes = 0;
	var boxesOnGoal = 0;
    for(var k=0; k < h; k++){
        for(var j = 0; j < w; j++){
            if(sokoBoard[k][j] == "box"){
            	boxes++;
            }
        }
    }
    if(boxes == 0){
    	isSolved =  true;
    }
    else isSolved = false;
}


