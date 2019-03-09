<!DOCTYPE html>
<html>
    <head>
        <?php 
            include 'lvlReader.php';
         ?>
        <meta name="author" content="Teodor Raychev">
        <meta charset="UTF-8">
        <meta name="description" content="Sokoban game">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shorcut icon" href="textures/box.png">
        <link rel="stylesheet" type="text/css" href="style/main.css">
        <title>Sokoban</title>
    </head>
    <body>
        <div class="container" id="contentContainer">
            <div id="titleContainer">
                <img id="sokobanIcon" src="textures/box.png" alt="box" height="32px" width="32px">
                <h1 class="title" id="sokobanTitle">Sokoban</h1>
                <p id ="timer"></p>
                <p class="title" id="timeTitle">Time:</p>
                <br>
                <p id ="moves" class="title">0</p>
                <p class = "title" id="movesTitle">Moves:</p>
                <p id = lvlTitleID><?php echo $_GET['levelID'];?></p>
                <p id = lvlTitle>Level: </p>
            </div>
            <br>
            <nav id="nav">
            	<form method="get">
            		<div id="levelSelectContainer">
            			<div>
            				<p class="title" id="titleLevel">Select level:</p>
            			</div>
                    		<select id="levelID" name="levelID">
                            <optgroup label="demo:">
                                <option value="1" selected>level 1</option>
                                <option value="2">level 2</option>
                            </optgroup>
                        	<optgroup label = "original:">
                                <option value="3">Level 3</option>
                                <option value="4">Level 4</option>
                                <option value="5">Level 5</option>
                                <option value="6">Level 6</option>
                                <option value="7">Level 7</option>
                                <option value="8">Level 8</option>
                                <option value="9">Level 9</option>
                                <option value="10">Level 10</option>
                                <option value="11">Level 11</option>
                                <option value="12">Level 12</option>
                                <option value="13">Level 13</option>
                                <option value="14">Level 14</option>
                                <option value="15">Level 15</option>
                                <option value="16">Level 16</option>
                                <option value="17">Level 17</option>
                                <option value="18">Level 18</option>
                                <option value="19">Level 19</option>
                                <option value="20">Level 20</option>
                                <option value="21">Level 21</option>
                                <option value="22">Level 22</option>
                                <option value="23">Level 23</option>
                                <option value="24">Level 24</option>
                                <option value="25">Level 25</option>
                                <option value="26">Level 26</option>
                                <option value="27">Level 27</option>
                            </optgroup>
                    	</select>
                			<input type="submit" id="btnLoad" class = "btn" value="load">
                            <input type="button" class ="btn" id="btnReset" value ="restart" onclick="window.location.reload()">
                		<div>
                    		<pre id="levelPreview"><?php lvlReader("levels/lvl".$_GET['levelID'].".txt");?></pre>
                		</div>
            		</div>
            	</form>
            </nav>
            <div id="canvas">
                <table id="tableBoard">
                <!-- sokoBoard: -->
                </table>
            </div>
             <br>
             <p id="solved"></p>
        </div>
        <script src="script/sokoban.js"></script>
    </body>
</html>