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
	
	$('.port_desc').each(function(i, obj) {
		$(obj).html(port_data.desc);
	});
};