window.onload = function(){
  lastInnOnto;
};
var ontoArray=[];
function getURL(url) {
  return new Promise(function(resolve, reject){
	   var xhr = new XMLHttpRequest();
	   xhr.open("GET", url);
	   xhr.onreadystatechange = function() {
	      if (xhr.readyState === 4) {
		         if (xhr.status === 200) {
		             resolve(xhr.response);
		         } else {
		             reject(xhr.statusText);
		         }
	        }
	    };
	    xhr.send();
  });
}
function lastInnOnto() {
  var url = "../Gjesdalkommune/Gjesdal.ttl";
  promise = getURL(url);
  promise.then(
	    function(response) {
        ontoArray = JSON.parse(response).entries;
        skrivUt();
	    }
  ).catch(
	    function(reason) {
        alert("FEIL: " + reason);
      }
  );
}
function skrivUt(){
  console.log(ontoArray);
  for(var i = 0; i < ontoArray.lenght; i++){
    document.getElementById("HerSkalOnto").innerHTML += "<br>" +  ontoArray[i];
  }
}
