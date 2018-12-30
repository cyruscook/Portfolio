// Thank you https://blog.hellojs.org/create-a-very-basic-loading-screen-using-only-javascript-css-3cf099c48b19
var pageloaded = false;

$(document).ready(function() {
	var loadingtimeout = setTimeout(function(){
		var div = $('#loading');
		if(!pageloaded){
			switch(div.text()){
				case "Loading":
					div.text("Loading.");
					break;
				case "Loading.":
					div.text("Loading..");
					break;
				case "Loading..":
					div.text("Loading...");
					break;
				case "Loading...":
					div.text("Loading");
					break;
				default:
					div.text("Loading");
					break;
			}
		} else{
			div.remove();
			clearTimeout(loadingtimeout);
		}
	},10);
});

// Thanks https://stackoverflow.com/a/34579496/7641587
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

// Declare Global port_data variable
var port_data;

// Get Json contents
readTextFile("port_data.json", function(text){
	// On Json loaded put in variable
    port_data = JSON.parse(text);
    console.log(port_data);
	
	// Write Json variables to the page
	writeVars();
	
	// Remove loading screen
	pageloaded = true;
});

function writeVars(){
	
	// Write Port_Title
	$('.port_title').each(function(i, obj) {
		$(obj).html(port_data.title);
	});
	
	// Write Port_Desc
	$('.port_desc').each(function(i, obj) {
		$(obj).html(port_data.desc);
	});
	
	// Write Cards (If there are any to write)
	if(port_data.cards.length > 0){
		// Create deck to contain cards
		$('#body').append($('<div class="container" id="card-container"></div>'));
		$('#card-container').append($('<div class="card-deck" id="deck"></div>'));
		
		// For each card add it to the deck
		port_data.cards.forEach(function(card){
			
			// Construct card
			var imagecode = "";
			if(card.img.url){
				imagecode = `<center><img src="${card.img.url}" style="margin-top: calc(( ${card.img.height} / 2) * -1); background-color: #666; width: ${card.img.width}; height: ${card.img.width}; border-radius: ${card.img["border-radius"]};"></img></center>`;
			}
			
			var thiscard = `
				<div class="card my-3" style="margin-top: calc( ${card.img.height} * 0.75 ) !important;">
					${imagecode}
					<div class="card-body">
						<h5 class="card-title">` + card.title + `</h5>
						<h6 class="card-subtitle mb-2 text-muted">` + card.sub + `</h6>
						<p class="card-text">` + card.desc + `</p>
					</div>
				</div>
			`;
			
			// Add the card into the page
			$('#deck').append($(thiscard));
		});
	}
}