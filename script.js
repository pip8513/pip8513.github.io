


document.title = "Phil's First Wednesday Game Night"

var headerLinks = document.getElementById("headerLinks")
var linkList = [["Home","index.html"],
				["Game Library","library.html"],
				["Add to Library","newItem.html"],
				["History","history.html"]
			]
for (i=0; i < linkList.length; i++) {
	// create sub div of class "nav"
	var newDiv = document.createElement("div")
	newDiv.className = "nav"
	// create new link
	var a = document.createElement("a")
	var aText = document.createTextNode(linkList[i][0])
	a.appendChild(aText)
	a.title = linkList[i][0]
	a.href = linkList[i][1]
	a.className = "navLinks"
	newDiv.appendChild(a)
	headerLinks.appendChild(newDiv)
}

// check if libraryDiv exists and add it in if so. 
if (document.getElementById("libraryDiv")){
	
	//create new table for the library
	var library = document.createElement("table")
	library.id = "gameLibaryTable"
	// establish list of table headers and their associated dictionary key from games above
	var tableHeaders = [["","imageLocal"],
						["Game","game"],
						["Players","players"],
						["Duration","playTime"],
						["Style","style"],
						// ["More Info","moreInfo"],
						["Even More Info!","bgg"]]
	
	// create new row and add headers to this row
	var newRow = document.createElement("tr")
	for (i in tableHeaders){
		var newCell = document.createElement("th")
		newCell.textContent = tableHeaders[i][0]
		newRow.appendChild(newCell)
	}
	// add header row to the library
	library.appendChild(newRow)

	// add games to the library table
	for (i in games){
		newRow = document.createElement("tr")
		// loop through same tableHeaders except referecing the dictionay element instead. 
		for (j in tableHeaders){
			var newCell = document.createElement("td")
			var game = games[i]
			var element = tableHeaders[j][1]

			if (element === "bgg"){
				var bggLink = document.createElement('a')
				bggLink.textContent = "More at BGG" 
				bggLink.href = game[element] 
				bggLink.target = "_blank" // open in new window/tab
				newCell.appendChild(bggLink)
			}

			// else if (element === "moreInfo"){
			// 	var moreInfo = document.createElement("BUTTON"); 
			// 	moreInfo.name = "More info:" 
			// 	moreInfo.value = game["game"]
			// 	moreInfo.textContent = "More Info:"
			// 	newCell.appendChild(moreInfo)
			// }

			else if (element === "imageLocal"){
				var imageDiv = document.createElement("div")
				imageDiv.className = "libraryImageDiv"

				var newImage = document.createElement("img")
				newImage.src = game[element]
				newImage.alt = game["game"]  // alt tag should be the name of the game.
				newImage.hover = "hello"
				newImage.className = "libraryImage"

				var copyright = document.createElement("a")

				copyright.textContent = "\u00A9:" + game["imageCopryrightShort"]
				copyright.href = game["imageCopyright"]
				copyright.target = "_blank"
				copyright.className = "copyrightLink"

				imageDiv.appendChild(newImage)
				imageDiv.appendChild(document.createElement("br"))
				imageDiv.appendChild(copyright)
				newCell.appendChild(imageDiv)
			}
			else {
				newCell.textContent = game[element]
			}
			newRow.appendChild(newCell)	
		}
		library.appendChild(newRow)


		console.log(games[i])
	}
	//append the library to the Div to display. 
	document.getElementById("libraryDiv").appendChild(library)
}

// define my game group and player attributes
var gameGroup = {}
class Player{
	constructor(name){
		this.name = name
		this.gameCount = 0
		this.winCount = 0
	}

	addGame(){
		this.gameCount += 1
	}

	addWin(){
		this.winCount += 1
	}

}

function updateGameCounts(hist){

	for (i in hist){
		
		var players = hist[i]["players"].split(',')
		var winners = hist[i]["winner"].split(',')

		for (let j in players){
			var name = players[j]
			if (gameGroup[name] === undefined) {
				gameGroup[name] = new Player(name)
				// console.log(gameGroup[name])
			}
			gameGroup[name].addGame()

		}
		for (let k in winners){
			var name = winners[k]
			gameGroup[name].addWin()
			
		}

	}
	for (let player in gameGroup){
	}
	updateLeaderboardArray(winsComparator)
	console.log(leaderBoard)

}

// sortable leaderBoard for the sake of display on history page. 
var leaderBoard = []
function updateLeaderboardArray(comparator){
	leaderBoard = []
	for (var i in gameGroup){
		leaderBoard.push(gameGroup[i])
		console.log(gameGroup[i])
	}
	sortArr(comparator, leaderBoard)
}

function sortArr(comparator, array) {
  // doing a basic bubble sort
  for (i=0; i < array.length - 1; i++){  // outer loop to 2nd to last element
    for (j=0; j < array.length - 1; j++){  // inner loop to 2nd to last element
      if (comparator(array[j],array[j+1])){  // user provided comparator for true/false
        // swap values
        temp = array[j+1]
        array[j+1] = array[j]
        array[j] = temp
      }
    }
  }
}

// sort by the most loyal players that keep coming back!
function playsComparator(player1, player2) {
  // your code here
  if (player1.gameCount < player2.gameCount){
    return true;
  } else {
    return false;
  }
}

// sort by raw number of wins
function winsComparator(player1, player2) {
  // your code here
  if (player1.winCount < player2.winCount){
    return true;
  } else {
    return false;
  }
}

//to be used another day to maybe sort by win ratio
function winRatioComparator(player1, player2) {
  // your code here
  if (player1.winCount / player1.gameCount < player2.winCount / player2.gameCount){
    return true;
  } else {
    return false;
  }
}

function generateHisotryTables(){
	updateGameCounts(gameHistory)

	// generate 3 distinct tables to create and append. will only display 1 at a time. 
	var histTableWins = document.createElement("table")
	var histTableGames = document.createElement("table")
	var histTableWinRatio = document.createElement("table")
	var tables = [[histTableWins,winsComparator,"leaderboardTableWins"],
				[histTableGames,playsComparator,"leaderboardTableGames"],
				[histTableWinRatio,winRatioComparator,"leaderboardTableWinRatio"]
	]

	// create the content for the 3 tables, only difference is sorting. 
	for (table in tables){
		
		var histTable = tables[table][0]
		var sortMethod = tables[table][1]
		var tableID = tables[table][2]

		updateLeaderboardArray(sortMethod)

		histTable.id = tableID
		histTable.className = "leaderboardTable"
		histTable.style.display = "none"
		// establish list of table headers and their associated dictionary key from games above
		var tableHeaders = ["Player","Wins","Games Played","Win Ratio"]
		
		// create new row and add headers to this row
		var newRow = document.createElement("tr")
		for (i in tableHeaders){
			var newCell = document.createElement("th")
			newCell.textContent = tableHeaders[i]
			newRow.appendChild(newCell)
		}
		// add header row to the library
		histTable.appendChild(newRow)

		// add games to the library table
		for (i in leaderBoard){
			newRow = document.createElement("tr")
			
			// add name
			var newCell = document.createElement("td")
			newCell.textContent = leaderBoard[i]["name"]
			newRow.appendChild(newCell)

			// add wins
			var newCell = document.createElement("td")
			newCell.textContent = leaderBoard[i]["winCount"]
			newRow.appendChild(newCell)

			// add games played
			var newCell = document.createElement("td")
			newCell.textContent = leaderBoard[i]["gameCount"]
			newRow.appendChild(newCell)

			// add win ratio
			var newCell = document.createElement("td")
			winRatio = ((leaderBoard[i]["winCount"] / leaderBoard[i]["gameCount"]) * 100).toFixed(2)
			
			newCell.textContent = winRatio + "%"
			newRow.appendChild(newCell)

			histTable.appendChild(newRow)
		}	

		//append the library to the Div to display. 
		document.getElementById("historyDiv").appendChild(histTable)
	}
}



// check if historyDiv exists and add it in if so. 
if (document.getElementById("historyDiv")){
	// generate the 3 tables 
	generateHisotryTables()
	// toggle win sorting by default
	document.getElementById("leaderboardTableWins").style.display = "table"

}

// buttons for random actions
document.addEventListener("DOMContentLoaded", bindButtons)

function bindButtons(){

	// update history sorting to be by wins
	if (document.getElementById("historySortWins")){
		document.getElementById("historySortWins").addEventListener("click", function(event){
			document.getElementById("leaderboardTableWins").style.display = "table"
			document.getElementById("leaderboardTableGames").style.display = "none"
			document.getElementById("leaderboardTableWinRatio").style.display = "none"

		})
	}

	// update history sorting to be by number of games played
	if (document.getElementById("historySortGames")){
		document.getElementById("historySortGames").addEventListener("click", function(event){
			document.getElementById("leaderboardTableWins").style.display = "none"
			document.getElementById("leaderboardTableGames").style.display = "table"
			document.getElementById("leaderboardTableWinRatio").style.display = "none"
		})
	}

	// update history sorting to be by win ratio
	if (document.getElementById("historySortWinRatio")){
		document.getElementById("historySortWinRatio").addEventListener("click", function(event){
			document.getElementById("leaderboardTableWins").style.display = "none"
			document.getElementById("leaderboardTableGames").style.display = "none"
			document.getElementById("leaderboardTableWinRatio").style.display = "table"
		})
	}

	
}
