window.onload = function(){
  document.getElementById("søkeknapp").addEventListener("click", sok);
  document.getElementById("fjernChecked").addEventListener("click", fjernValgteSjekkbokser);
}

function sok(){
  var object = [
    skjenkested = {
      verdi: false,
      string: " {?subject a schema:BarOrPub} "
    },
    overnatting = {
      verdi: false,
      string: " {?subject a schema:Accommodation} "
    },
    grillplass = {
      verdi: false,
      string: " {?subject a mr:BarbequeArea} "
    },
    badeplass = {
      verdi:  false,
      string: " {?subject a schema:Beach} "
    },
    kirke = {
      verdi: false,
      string: " {?subject a schema:Church} "
    },
    fiskeplass = {
      verdi: false,
      string: " {?subject a schema:BodyOfWater} "
    },
    barnehage = {
      verdi: false,
      string: " {?subject a schema:Preschool} "
    },
    avfallspunkt = {
      verdi: false,
      string: " {?subject a mr:RecyclingPoint} "
    },
    utleielokale = {
      verdi: false,
      string: " {?subject a schema:EventVenue} "
    },
    skole = {
      verdi: false,
      string: " {?subject a schema:School} "
    }
  ];

  var prefix = "PREFIX ww:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX mr:<http://www.semanticweb.org/marte/ontologies/2018/2/gjesdalontology.owl#> PREFIX schema: <http://schema.org/>";
  var navn = "SELECT DISTINCT ?Name WHERE {{?subject mr:hasName ?Name} ";
  var navnlatlon = "SELECT DISTINCT ?Latitude ?Longitude ?Name WHERE {?subject mr:hasLatitude ?Latitude . ?subject mr:hasLongitude ?Longitude . ?subject mr:hasName ?Name .";
  var slutt = "}";

  var Q = new sgvizler.Query();
  var X = new sgvizler.Query();

  settVerdier(object);
  var spørring = ozone(object);

  Q.query(prefix + navnlatlon + spørring + slutt)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("sgvizler.visualization.Map")
          .draw("map");

  X.query(prefix + navn + spørring + slutt)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("sgvizler.visualization.List")
          .draw("list");
}

function ozone(object){
  var temp = [];
  temp = sjekkBokser(object);
  var tempSpørring = "";
  for(var j = 0; j < temp.length; j++){
    tempSpørring += temp[j];
  }
  console.log("Spørring: ", tempSpørring);
  return tempSpørring;
}

function settVerdier(object){
  if(document.getElementById("skjenkested").checked) Object.values(object)[0].verdi = true;
  if(document.getElementById("overnatting").checked) Object.values(object)[1].verdi = true;
  if(document.getElementById("grillplass").checked) Object.values(object)[2].verdi = true;
  if(document.getElementById("badeplass").checked) Object.values(object)[3].verdi = true;
  if(document.getElementById("kirke").checked) Object.values(object)[4].verdi = true;
  if(document.getElementById("fiskeplass").checked) Object.values(object)[5].verdi = true;
  if(document.getElementById("barnehage").checked) Object.values(object)[6].verdi = true;
  if(document.getElementById("avfallspunkt").checked) Object.values(object)[7].verdi = true;
  if(document.getElementById("utleielokale").checked) Object.values(object)[8].verdi = true;
  if(document.getElementById("skole").checked) Object.values(object)[9].verdi = true;
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
  document.getElementById("list").innerHTML = "";
  spørring = "";
  var Q = new sgvizler.Query();
  var X = new sgvizler.Query();
  Q.query("PREFIX ww:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX mr:<http://www.semanticweb.org/marte/ontologies/2018/2/gjesdalontology.owl#> SELECT ?Latitude ?Longitude ?Name WHERE { ?subject mr:hasLatitude ?Latitude . ?subject mr:hasLongitude ?Longitude . ?subject mr:hasName ?Name .}")
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("sgvizler.visualization.Map")
          .draw("map");
//  X.query("PREFIX ww:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX mr:<http://www.semanticweb.org/marte/ontologies/2018/2/gjesdalontology.owl#> SELECT ?Name WHERE { ?subject mr:hasName ?Name .}")
//          .endpointURL("http://localhost:3030/Gjesdal/query")
//          .chartFunction("sgvizler.visualization.List")
//          .draw("list");
}

function sjekkBokser(obj){
  var operator = "";
  if(document.getElementById("union").checked == true){
    operator = "UNION";
  }
  else {
    operator = "";
  }

  var stringTabell = [];
  for(var i = 0; i < obj.length; i++){
    if (obj[i].verdi == true){
      stringTabell.push(obj[i].string);
      stringTabell.push(operator);
    }
  }
  stringTabell.pop();
  console.log(stringTabell);
  return stringTabell;
}

//TELLE CHECKBOXER
// var bokser = document.getElementsByClassName("checkbox");
// var antallBokserChecked = 0;
// for(var i = 0; i < bokser.length; i++){
//   if(bokser[i].checked){
//   antallBokserChecked ++;
//   }
// }
