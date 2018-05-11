package prosjekt;

import java.io.FileInputStream;
import java.io.FileOutputStream;

import org.apache.jena.ontology.OntModel;
import org.apache.jena.ontology.OntModelSpec;
import org.apache.jena.rdf.model.ModelFactory;

public class Model {

	public static void main(String[] args) {
		OntModel model = ModelFactory.createOntologyModel(OntModelSpec.OWL_MEM);
		String base = "../Gjesdalkommune/src/prosjekt/Ontologi.owl";

		try {
			FileInputStream input = new FileInputStream(base);
			model.read(input, "turtle");
			input.close();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		model.write(System.out, "TURTLE");

		try {
			model.write(new FileOutputStream("Gjesdal.ttl"), "TURTLE");
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
}
