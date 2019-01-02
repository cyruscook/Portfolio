var pageloaded = false;

// Thanks https://stackoverflow.com/a/41532415/7641587
function get_if_exist(str) {
    try { return eval(str); }
    catch(e) { return undefined; }
}

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
	
	function findBiggestMargin(){
		var biggestMargin = 0;
		if(port_data.cards.length > 0){
			port_data.cards.forEach(function(card){
				if(get_if_exist(card.img) != undefined){
					if(card.img.height > biggestMargin){
						biggestMargin = card.img.height;
					}
				}
			});
		}
	}
	
	// Write Cards (If there are any to write)
	if(port_data.cards.length > 0){
		// Create deck to contain cards
		$('#body').append($('<div class="container" id="card-container"></div>'));
		$('#card-container').append($('<div class="card-deck" id="deck"></div>'));
		
		var biggestMargin = findBiggestMargin();
		
		// For each card add it to the deck
		port_data.cards.forEach(function(card){
			
			// Construct card
			var imagecode = "";
			var margintop = "";
			
			// If this card has an image, set up the card to accommodate that image
			if(get_if_exist(card.img) != undefined){
				imagecode = `<center><img src="${card.img.url}" style="margin-top: ${biggestMargin * -1}; background-color: #666; width: ${card.img.width}; height: ${card.img.width}; border-radius: ${card.img["border-radius"]};"></img></center>`;
				margintop = biggestMargin * 0.75;
			}
			
			var thiscard = `
				<div class="card my-3" style="margin-top: ${margintop}px !important;">
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