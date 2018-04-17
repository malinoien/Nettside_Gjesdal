window.onload = function(){
document.getElementById("søkeknapp").addEventListener("click", sok);
console.log("onload");
}

function sok(){
  var prefix = "PREFIX ww:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX mr:<http://www.semanticweb.org/marte/ontologies/2018/2/gjesdalontology.owl#>";
  var navnlatlon = "SELECT ?Latitude ?Longitude ?Name WHERE {?subject mr:hasLatitude ?Latitude . ?subject mr:hasLongitude ?Longitude . ?subject mr:hasName ?Name .";

  var Q = new sgvizler.Query();

  var spørring = "";

  if(document.getElementById("skjenkested").checked) spørring += " ?subject a mr:Bar}";

  Q.query(prefix + navnlatlon + spørring)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("sgvizler.visualization.Map")
          .draw("example");
  }
