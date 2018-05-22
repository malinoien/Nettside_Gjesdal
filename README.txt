Hvordan kjøre programmet:

1. Åpne Javaprosjeketet Gjesdalkommune i Eclipse
2. Kjør javaprogrammet Model.java fra Gjesdalkommune/src/prosjekt/Model.java
	- For å kjøre Java-programmet trenger man Jena på datamaskinen
	- Denne genererer en ttl-fil kalt 'Gjesdal.ttl' og legger den i Gjesdalkommune-mappen
3. Start Fuseki server lokalt på maskinen og åpne nettsiden localhost:3030
4. Legg til et nytt datasett i Fuseki, kall det 'Gjesdal' og last opp ttl-filen fra Gjesdalkommune/Gjesdal.ttl
5. Åpne HTML-siden index.html fra Nettside/index.html i Firefox eller Chrome