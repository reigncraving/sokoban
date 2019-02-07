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
                <img src = "textures/time.png" width = "30" height = "30">
                <p id ="timer"></p>
                <br>
                <p id ="moves" class="title">0</p>
            </div>
            <br>
            <nav id="nav">
            	<form method="get">
            		<div id="levelSelectContainer">
            			<div>
            				<p class="title" id="titleLevel">Select level:</p>
            			</div>
                    		<select id="levelID" name="levelID">
                        	<option value="1">Level 1</option>
                        	<option value="2">Level 2</option>
                        	<option value="3">Level 3</option>
                        	<option value="4">Level 4</option>
                       	 	<option value="5">Level 5</option>
                    	</select>
                			<input type="submit" id="btnLoad" class = "btn" value="load">
                		<div>
                    		<pre id="levelPreview"><?php lvlReader("levels/lvl".$_GET['levelID'].".txt");?></pre>
                		</div>
                			<input type="button" class ="btn" id="btnReset" value ="restart" onclick="window.location.reload()">
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