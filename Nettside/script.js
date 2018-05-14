window.onload = function(){
  document.getElementById("checkBoxSøk").addEventListener("click", sok);
  document.getElementById("fjernChecked").addEventListener("click", fjernValgteSjekkbokser);
  document.getElementById("søkeknapp").addEventListener("click",finnNaermeste);
  document.getElementById("egenSpørringKnapp").addEventListener("click", egenSpørring);
  document.getElementById("finnAlleKnapp").addEventListener("click", finnAlleFunk);
  document.getElementById("finnNaermesteKnapp").addEventListener("click", finnNaermesteFunk);
  document.getElementById("egendefSpørringKnapp").addEventListener("click", egendefSpørringFunk);
}

function finnAlleFunk(){
  document.getElementById("finnAlleKnapp").classList.add("active");
  document.getElementById("finnNaermesteKnapp").classList.remove("active");
  document.getElementById("egendefSpørringKnapp").classList.remove("active");
  visEllerSkjul();
  fjernValgteSjekkbokser();
}

function finnNaermesteFunk(){
  document.getElementById("finnAlleKnapp").classList.remove("active");
  document.getElementById("finnNaermesteKnapp").classList.add("active");
  document.getElementById("egendefSpørringKnapp").classList.remove("active");
  visEllerSkjul();
  fjernValgteSjekkbokser();
}

function egendefSpørringFunk(){
  document.getElementById("finnAlleKnapp").classList.remove("active");
  document.getElementById("finnNaermesteKnapp").classList.remove("active");
  document.getElementById("egendefSpørringKnapp").classList.add("active");
  visEllerSkjul();
  fjernValgteSjekkbokser();
}

function visEllerSkjul(){
    document.getElementById("finnAlle").style.display = "none";
    document.getElementById("finnNaermeste").style.display = "none";
    document.getElementById("egendefSpørring").style.display = "none";
    var skalSynes = document.getElementsByClassName("active");
    if(skalSynes[0].id == "finnAlleKnapp"){
      document.getElementById("finnAlle").style.display = "flex";
    }
    else if(skalSynes[0].id=="finnNaermesteKnapp"){
      document.getElementById("finnNaermeste").style.display = "flex";
    }
    else if(skalSynes[0].id == "egendefSpørringKnapp"){
      document.getElementById("egendefSpørring").style.display = "flex";
    }

}

var prefix = "PREFIX ww:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX mr:<http://www.semanticweb.org/marte/ontologies/2018/2/gjesdalontology.owl#> PREFIX schema: <http://schema.org/> PREFIX f:<http://www.w3.org/2005/xpath-functions/math#>";
var slutt = "}";
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


  var navn = "SELECT DISTINCT ?Name WHERE {{?subject mr:hasName ?Name} ";
  var navnlatlon = "SELECT DISTINCT ?Latitude ?Longitude ?Name ?Description WHERE {?subject mr:hasLatitude ?Latitude . ?subject mr:hasLongitude ?Longitude . ?subject mr:hasName ?Name . OPTIONAL {?subject mr:hasDescription ?Description }.";


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
  gjørResSynlig(true);
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
  gjørResSynlig(false);
}

function sjekkBokser(obj){
  var operator = "UNION";


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


function finnNaermeste(){
  var skrevetNavn = document.getElementById("skrevetNavn").value;
  var dd = document.getElementById("dropDown");
  var ddValg = dd.options[dd.selectedIndex].value;
  if(ddValg == "BarbequeArea" || ddValg == "RecyclingPoint"){
    ddValg = "mr:" + ddValg;
  }
  else {
    ddValg = "schema:" + ddValg;
  }

  var where = "WHERE { "
   + "?førsteSted mr:hasLatitude ?lat1; "
   +              "mr:hasLongitude ?long1; "
   +		          "mr:hasName '" + skrevetNavn + "'. "
   +  "?nærtSted a " + ddValg + ". "
   +  "?nærtSted mr:hasLatitude ?lat2; "
   +      	     "mr:hasLongitude ?long2; "
   +  	         "mr:hasName ?Navn. "
   +  "OPTIONAL{?nærtSted mr:hasDescription ?Beskrivelse}"
   +  "BIND (f:pi() AS ?pi)."
   +  "BIND (?pi/180 AS ?p)."
   +  "BIND(0.5 - f:cos((?lat2-?lat1)*?p)/2 + f:cos(?lat1*?p)*f:cos(?lat2*?p)*(1-f:cos((?long2-?long1)*?p))/2 AS ?a)."
   + "BIND(12742 * f:asin(f:sqrt(?a)) as ?Avstand)"
  + "} ORDER BY ASC(?distance)";

  var selectKart = "SELECT DISTINCT ?lat2 ?long2 ?Navn ?Beskrivelse ";
  var selectListe = "SELECT DISTINCT ?Navn ?Avstand ?Beskrivelse ";

  var Q = new sgvizler.Query();
  var X = new sgvizler.Query();
  var Z = new sgvizler.Query();

  Q.query(prefix + selectKart + where)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("sgvizler.visualization.Map")
          .draw("map");

  X.query(prefix + selectListe + where)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("google.visualization.Table")
          .draw("list");

  document.getElementById("ekstraInformasjon").innerHTML = "";

  var informasjon = "PREFIX ww: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX mr: <http://www.semanticweb.org/marte/ontologies/2018/2/gjesdalontology.owl#> PREFIX dbo: <http://dbpedia.org/ontology/#> PREFIX schema: <http://schema.org/> SELECT ?Navn ?Informasjon WHERE{ ?subject dbo:Abstract ?Informasjon; mr:hasName ?Navn; a " + ddValg + " . }";
  console.log(informasjon);
  Z.query(informasjon)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("google.visualization.Table")
          .draw("ekstraInformasjon");

  gjørResSynlig(true);
}

function egenSpørring(){
  var spørring = document.getElementById("egenSpørring").value;
  console.log(spørring);
  var Q = new sgvizler.Query();
  var X = new sgvizler.Query();
  Q.query(spørring)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("sgvizler.visualization.Map")
          .draw("map");

  X.query(spørring)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("google.visualization.Table")
          .draw("list");
  gjørResSynlig(true);
}

function gjørResSynlig(tf){
  if(tf){
    document.getElementById("resultatPresentasjon").style.display = "initial";
    console.log("gjør synlig");
  }
  else{
    document.getElementById("resultatPresentasjon").style.display = "none";
  }
}
