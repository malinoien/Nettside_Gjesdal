package prosjekt;
import java.lang.reflect.Array;

import org.apache.jena.query.Dataset;
import org.apache.jena.query.DatasetFactory;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.ResultSet;
import org.apache.jena.vocabulary.RDFS;

public class DBpedia {
	public static void main (String args[]) {
		String gjesdal = "<http://dbpedia.org/resource/Oltedal_Church>";
		String gjesdalAbstract = getAbstract(gjesdal);
		System.out.println(gjesdalAbstract);
	}

	
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




	
	


	
	
