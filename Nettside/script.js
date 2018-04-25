window.onload = function(){
document.getElementById("søkeknapp").addEventListener("click", sok);
document.getElementById("fjernChecked").addEventListener("click", fjernValgteSjekkbokser);
console.log("onload");
}

function sok(){
  var prefix = "PREFIX ww:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX mr:<http://www.semanticweb.org/marte/ontologies/2018/2/gjesdalontology.owl#>";
  var navnlatlon = "SELECT ?Latitude ?Longitude ?Name WHERE {?subject mr:hasLatitude ?Latitude . ?subject mr:hasLongitude ?Longitude . ?subject mr:hasName ?Name .";
  var slutt = "}";

  var Q = new sgvizler.Query();

  var spørring = "";

  if(document.getElementById("skjenkested").checked) spørring += " {?subject a mr:Bar}";
  if(document.getElementById("overnatting").checked) spørring += " {?subject a mr:Accommodation}";
  if(document.getElementById("grillplass").checked) spørring += " {?subject a mr:BarbequeArea}";
  if(document.getElementById("badeplass").checked) spørring += " {?subject a mr:Beach}";
  if(document.getElementById("kirke").checked) spørring += " {?subject a mr:Church}";
  if(document.getElementById("fiskeplass").checked) spørring += " {?subject a mr:FishingSpot}";
  if(document.getElementById("barnehage").checked) spørring += " {?subject a mr:Preschool}";
  if(document.getElementById("avfallspunkt").checked) spørring += " {?subject a mr:RecyclingPoint}";
  if(document.getElementById("utleielokale").checked) spørring += " {?subject a mr:RentalProperty}";
  if(document.getElementById("skole").checked) spørring += " {?subject a mr:School}";



  Q.query(prefix + navnlatlon + spørring + slutt)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("sgvizler.visualization.Map")
          .draw("map");

  console.log(navnlatlon + "SPØRRING: "+ spørring + " slutt: "+  slutt);
  }

  function fjernValgteSjekkbokser(){
    document.getElementById("skjenkested").checked = false;
    document.getElementById("overnatting").checked = false;
    document.getElementById("grillplass").checked = false;
    document.getElementById("badeplass").checked = false;
    document.getElementById("kirke").checked = false;
    document.getElementById("fiskeplass").checked = false;
    document.getElementById("barnehage").checked = false;
    document.getElementById("avfallspunkt").checked = false;
    document.getElementById("utleielokale").checked = false;
    document.getElementById("skole").checked = false;
  }
