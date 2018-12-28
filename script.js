// Thanks https://stackoverflow.com/a/34579496/7641587
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
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
	
	// Write Cards
	function writeCard(card){
		var elem = document.createElement('div');
		elem.setAttribute("class", "card");
		elem.setAttribute("style", "width: 18rem;");
		elem.innerHTML(`
			<div class="card-body">
				<h5 class="card-title">` + card.title + `</h5>
				<h6 class="card-subtitle mb-2 text-muted">` + card.sub + `</h6>
				<p class="card-text">` + card.desc + `</p>
			</div>
		`);
	}
	
	port_data.cards.forEach(writeCard(value));
};