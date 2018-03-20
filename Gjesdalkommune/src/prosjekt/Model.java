package prosjekt;

import java.io.FileInputStream;

import org.apache.jena.ontology.Individual;
import org.apache.jena.ontology.OntClass;
import org.apache.jena.ontology.OntModel;
import org.apache.jena.ontology.OntModelSpec;
import org.apache.jena.ontology.Ontology;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.util.iterator.ExtendedIterator;
import org.omg.CORBA.portable.InputStream;

public class Model {

	public static void main(String[] args) {
		OntModel model = ModelFactory.createOntologyModel(OntModelSpec.OWL_MEM);
		String base = "..\\Gjesdalkommune\\src\\prosjekt\\onto.owl";

		try {
			FileInputStream input = new FileInputStream(base);
			model.read(input, "RDF/XML-ABBREV");
			input.close();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		ExtendedIterator<Individual> itI = model.listIndividuals();
		ExtendedIterator<OntClass> itL = model.listClasses();
		while (itL.hasNext()) {
			OntClass i = itL.next();
			System.out.println(i.getLocalName());
		}

	}
}
