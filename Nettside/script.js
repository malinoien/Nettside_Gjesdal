/*
  Kjøres når siden lastes inn. Gir knappene funksjoner.
*/
window.onload = function(){
  document.getElementById("checkBoxSøk").addEventListener("click", sok);
  document.getElementById("fjernChecked").addEventListener("click", fjernValgteSjekkbokser);
  document.getElementById("søkeknapp").addEventListener("click",finnNaermeste);
  document.getElementById("egenSpørringKnapp").addEventListener("click", egenSpørring);
  document.getElementById("finnAlleKnapp").addEventListener("click", finnAlleFunk);
  document.getElementById("finnNaermesteKnapp").addEventListener("click", finnNaermesteFunk);
  document.getElementById("egendefSpørringKnapp").addEventListener("click", egendefSpørringFunk);
  document.getElementById("reset").addEventListener("click", fjernValgteSjekkbokser);
}

/*
  Legger til en klasse til den delen av siden hvor brukeren kan finne alle
  plassene i Gjesdal under de forskjellige kategoriene. Denne klassen
  har en egenskap i CSS-dokumentet som gjør at den delen av siden som skal
  være synlig vises. På de sidene som ikke skal vises, fjernes klassen.
  Gjelder også får finnNaermesteFunk() og egendefSpørringFunk().
*/
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

/*
  Skjuler alle "boksene" med for forskjellige spørringsfunksjonene. Finner
  så hvilken boks som skal vises ved å se hvilken boks som har klassen "active".
*/
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

//Prefix og sluttparantes vi bruker i de fleste spørringsfunksjonene
var prefix = "PREFIX ww:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX mr:<http://www.semanticweb.org/marte/ontologies/2018/2/gjesdalontology.owl#> PREFIX schema: <http://schema.org/> PREFIX f:<http://www.w3.org/2005/xpath-functions/math#>";
var slutt = "}";

/*
  Lager en tabell med ett objekt for hvert datasett. Gir initielt alle objektene
  en string med en spørring som (satt sammen med prefix og select) vil returnere
  alle stedene i det datasettet. Gir også alle en verdi usann. Brukeren kan
  få ut alle stedene i ett eller flere datasett.
*/
function sok(){
  var steder = [
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

  //Spørring for å finne plasser som har et navn
  var navn = "SELECT DISTINCT ?Name WHERE {{?subject mr:hasName ?Name} ";
  //Spørring for å finne plasser som har latitude, longitide og navn
  var navnlatlon = "SELECT DISTINCT ?Latitude ?Longitude ?Name ?Description WHERE {?subject mr:hasLatitude ?Latitude . ?subject mr:hasLongitude ?Longitude . ?subject mr:hasName ?Name . OPTIONAL {?subject mr:hasDescription ?Description }.";

  var Q = new sgvizler.Query();
  var X = new sgvizler.Query();

  settVerdier(steder);

  var spørring = lagTempSpørring(steder);

  //Pusler sammen prefix og spørring slik at resultatet vil vises på kartet
  Q.query(prefix + navnlatlon + spørring + slutt)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("sgvizler.visualization.Map")
          .draw("map");

//Viser resultatet i en liste
  X.query(prefix + navn + spørring + slutt)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("sgvizler.visualization.List")
          .draw("list");

  /*
    Sjekker om noen av datasettene vi har ekstra informasjon (fra DBpedia) om
    er krysset av, og hvis de er det legger vi det til i en String, som vi
    sender inn i funksjonen extraInfo
  */
  var ekstraInfoOm = "";
  var abstractFinnes = false;
  if(document.getElementById("skjenkested").checked){
    ekstraInfoOm +="schema:BarOrPub ";
    abstractFinnes = true;
  }
  if(document.getElementById("kirke").checked){
    ekstraInfoOm +="schema:Church ";
    abstractFinnes = true;
  }
  if(document.getElementById("fiskeplass").checked){
    ekstraInfoOm +="schema:BodyOfWater ";
    abstractFinnes = true;
  }

  if(abstractFinnes){
    ekstraInfo(ekstraInfoOm);
  }
  gjørElementSynlig(document.getElementById("resultatPresentasjon"));
  gjørElementSynlig(document.getElementById("ekstraInformasjon"));
}

/*
  Lager en tom tabell. Kjører sjekkBokser på steder og lagrer resultatet
  i den nye tabellen. Gjør tabellen om til en string og returnerer stringen.
*/
function lagTempSpørring(steder){
  var temp = [];
  temp = sjekkBokser(steder);
  var tempSpørring = "";
  for(var j = 0; j < temp.length; j++){
    tempSpørring += temp[j];
  }
  return tempSpørring;
}

/*
  Sjekker hvilke checkbokser som er krysset av, og setter verdien på objektet
  i tabellen til å være sann om boksen er krysset av.
*/
function settVerdier(steder){
  if(document.getElementById("skjenkested").checked) Object.values(steder)[0].verdi = true;
  if(document.getElementById("overnatting").checked) Object.values(steder)[1].verdi = true;
  if(document.getElementById("grillplass").checked) Object.values(steder)[2].verdi = true;
  if(document.getElementById("badeplass").checked) Object.values(steder)[3].verdi = true;
  if(document.getElementById("kirke").checked) Object.values(steder)[4].verdi = true;
  if(document.getElementById("fiskeplass").checked) Object.values(steder)[5].verdi = true;
  if(document.getElementById("barnehage").checked) Object.values(steder)[6].verdi = true;
  if(document.getElementById("avfallspunkt").checked) Object.values(steder)[7].verdi = true;
  if(document.getElementById("utleielokale").checked) Object.values(steder)[8].verdi = true;
  if(document.getElementById("skole").checked) Object.values(steder)[9].verdi = true;
}

/*
  Resetter søk. Setter alle veridene til objektene i tabellen til å være usann.
*/
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
  document.getElementById("velgTabell").checked = false;
  document.getElementById("list").innerHTML = "";
  spørring = "";
  var Q = new sgvizler.Query();
  var X = new sgvizler.Query();
  Q.query("PREFIX ww:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX mr:<http://www.semanticweb.org/marte/ontologies/2018/2/gjesdalontology.owl#> SELECT ?Latitude ?Longitude ?Name WHERE { ?subject mr:hasLatitude ?Latitude . ?subject mr:hasLongitude ?Longitude . ?subject mr:hasName ?Name .}")
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("sgvizler.visualization.Map")
          .draw("map");
  X.query("")
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("sgvizler.visualization.Table")
          .draw("table");
  gjørElementSynlig(document.getElementById("map"));
  gjørElementUsynlig(document.getElementById("resultatPresentasjon"));
  gjørElementUsynlig(document.getElementById("ekstraInformasjon"));
}

/*
  Tar inn tabellen med objekter. Ser hvilke som har verdien "sann". Legger til
  spørringsattributten til de objektene med verdi "sann" i en ny tabell i tillegg
  til "UNION" etter alle. Fjerner det siste objektet i tabellen ("UNION"), slik
  at tabellen inneholder en gyldig spørring.
  Returnerer en tabell som inneholder en spørring
*/
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

/*
  Funksjon for å finne avtanden fra et brukervalgt sted til alle steder av en
  klasse (grillplass, fiskeplass osv.). Sjekker om klassen brukeren har valgt
  er en Grillplass eller et Returpunkt for å legge til riktig prefix.
  Oppdaterer spørringene til div-elementene som kjører Sqvizler slik at brukeren
  får se resultatet av søket.
*/
function finnNaermeste(){
  var skrevetNavn = document.getElementById("skrevetNavn").value;
  var dd = document.getElementById("dropDown");
  var ddValg = dd.options[dd.selectedIndex].value;
  if(ddValg == "BarbequeArea" || ddValg == "RecyclingPoint"){
    ddValg = "mr:" + ddValg +" ";
  }
  else {
    ddValg = "schema:" + ddValg +" ";
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
   + "BIND(12742 * f:asin(f:sqrt(?a)) as ?b)"
   + "BIND (xsd:string(?b) AS ?ab) . "
   + "BIND (substr(?ab, 0, 6) AS ?abc). "
   + "BIND (xsd:double(?abc) AS ?Avstand). "
  + "} ORDER BY ASC(?Avstand)";


  var selectKart = "SELECT DISTINCT ?lat2 ?long2 ?Navn ?Beskrivelse ";
  var selectListe = "SELECT DISTINCT ?Navn (?Avstand AS ?Avstand_i_km) ?Beskrivelse ";

  var Q = new sgvizler.Query();
  var X = new sgvizler.Query();


  Q.query(prefix + selectKart + where)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("sgvizler.visualization.Map")
          .draw("map");

  X.query(prefix + selectListe + where)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("google.visualization.Table")
          .draw("list");

  document.getElementById("ekstraInformasjon").innerHTML = "";
  ekstraInfo(ddValg);
  gjørElementSynlig(document.getElementById("resultatPresentasjon"));
  gjørElementSynlig(document.getElementById("ekstraInformasjon"));
}

/*
  Tar en input fra HTML-siden og legger spørringen til i div-elementet som
  kjører Sgvizler. Brukeren får se resultatet av spørringen sin på kart og/eller
  i tabell.
*/
function egenSpørring(){
  var spørring = document.getElementById("egenSpørring").value;
  var kart = document.getElementById("map");
  var tabell = document.getElementById("resultatPresentasjon");

  gjørElementUsynlig(kart);
  gjørElementUsynlig(tabell);

  if(document.getElementById("velgKart").checked){
    var Q = new sgvizler.Query();
    Q.query(spørring)
            .endpointURL("http://localhost:3030/Gjesdal/query")
            .chartFunction("sgvizler.visualization.Map")
            .draw("map");
    gjørElementSynlig(document.getElementById("map"));
  }

  if(document.getElementById("velgTabell").checked){
    var X = new sgvizler.Query();
    X.query(spørring)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("google.visualization.Table")
          .draw("list");
    gjørElementSynlig(document.getElementById("resultatPresentasjon"));
  }
}

function gjørElementSynlig(element){
  element.style.display = "initial";
}
function gjørElementUsynlig(element){
  element.style.display = "none";
}


/*
  Sjekker om parameteret består av flere enn én plass ved å splitte det
  ved hvert mellomrom. For hver ekstra plass legger man til UNION mellom de,
  slik at spørringen henter ut informasjon om alle stedene vi har krysset av.
*/
function ekstraInfo(Datasett){
  var stederTab = Datasett.split(" ");
  var SubjectADatasett = "";
  for(var i = 0; i < stederTab.length - 1; i++){
    SubjectADatasett += " ?subject a " + stederTab[i];
    if(stederTab[i + 2] != undefined ) SubjectADatasett += "} UNION {";
  }
  var informasjon = "PREFIX ww: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX mr: <http://www.semanticweb.org/marte/ontologies/2018/2/gjesdalontology.owl#> PREFIX dbo: <http://dbpedia.org/ontology/#> PREFIX schema: <http://schema.org/> SELECT ?Navn ?Informasjon WHERE{ ?subject dbo:Abstract ?Informasjon. ?subject mr:hasName ?Navn. {" + SubjectADatasett + "} . }";
  console.log(informasjon);
  var Z = new sgvizler.Query();
  Z.query(informasjon)
          .endpointURL("http://localhost:3030/Gjesdal/query")
          .chartFunction("sgvizler.visualization.Text")
          .draw("ekstraInformasjon");
}
