package prosjekt;
import java.lang.reflect.Array;

import org.apache.jena.query.Dataset;
import org.apache.jena.query.DatasetFactory;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.ResultSet;
import org.apache.jena.vocabulary.RDFS;

public class DBpedia {
	/*
	 * Denne funskjonen tar inn et parameter String resource som må være en 
	 * link til en DBpedia-ressurs. Funkjsonen returnerer resursens dbo:abstract
	 * som en string. 
	 */
	public static String getAbstract(String resource) {
		Dataset dataset = DatasetFactory.create();
		ResultSet table = QueryExecutionFactory.create(""
				+ "SELECT ?comment WHERE {"
				+ "    VALUES ?gjesdal {"
				+ 	       resource
				+ "    }"
				+ "    SERVICE <http://dbpedia.org/sparql> {"
				+ "		   ?gjesdal <" + "http://dbpedia.org/ontology/abstract" + "> ?comment ."
				+ "        FILTER( lang(?comment) = 'en' )"
				+ "    }"
				+ "}", dataset).execSelect();
		String abstractString = table.next().toString();
		String[] absStrSplit = abstractString.split("\"", 0);
		abstractString = absStrSplit[1];
		return abstractString;
	
	}
	
}




	
	


	
	
