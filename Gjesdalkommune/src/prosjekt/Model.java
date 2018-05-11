package prosjekt;

import java.io.FileInputStream;
import java.io.FileOutputStream;

import org.apache.jena.ontology.OntModel;
import org.apache.jena.ontology.OntModelSpec;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.update.UpdateAction;

public class Model {
	static OntModel model = ModelFactory.createOntologyModel(OntModelSpec.OWL_MEM);
	static String base = "../Gjesdalkommune/src/prosjekt/Ontologi.owl";

	public static void main(String[] args) {
		
		getOntology();
		upDateModelWithDBpediaAbstract();
		model.write(System.out, "TURTLE");
		
		//writeOntToFile();
	
	}
	
	private static void getOntology() {
		try {
			FileInputStream input = new FileInputStream(base);
			model.read(input, "turtle");
			input.close();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
	}
	
	private static void upDateModelWithDBpediaAbstract() {
		String gjesdal = "<http://dbpedia.org/resource/Gjesdal>";
		String oltedalKirke ="<http://dbpedia.org/resource/Oltedal_Church>";

		
		String gjesdalAbstract = DBpedia.getAbstract(gjesdal);
		String oltKirkAbstract = DBpedia.getAbstract(oltedalKirke);
		
		//System.out.println(gjesdalAbstract);
		//System.out.println(oltKirkAbstract);
		
		String base = "http://ex.org/info216#";
	    String prefixes = ""
	          + "PREFIX mr: <" + base + "> "
	          + "PREFIX db: <http://dbpedia.org/>";
	      
	    UpdateAction.parseExecute(prefixes
	          + "INSERT DATA {"
	         // + "    mr:gjesdal db:Abstract"+ gjesdalAbstract+" . "
	          + "    mr:OltedalKyrkje db:Abstract " + oltKirkAbstract +". "
	          + "}", model);

	     model.getWriter("TURTLE").write(model, System.out, "base");
		
	}
	
	private static void writeOntToFile() {
		try {
			model.write(new FileOutputStream("Gjesdal.ttl"), "TURTLE");
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
}
