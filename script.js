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

var port_data;

readTextFile("port_data.json", function(text){
    port_data = JSON.parse(text);
    console.log(port_data);
});


$('.port_title').each(function(i, obj) {
    $(obj).html(port_data.title);
});