package prosjekt;
import org.apache.jena.rdf.model.InfModel;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;

public class LifterClass {
	/*
	 * Denne klassen skal gå gjennom datasettene, og løfte de.
	 */
	public static void main(String args[]) {

		Model rdfModel = ModelFactory.createDefaultModel();
		InfModel rdfsModel = ModelFactory.createRDFSModel(rdfModel);

		System.out.println("ehi");
	}

}
