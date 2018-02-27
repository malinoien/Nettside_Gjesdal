package prosjekt;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;

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
		
		
		URL url;
		try {
			url = new URL("https://opencom.no/dataset/d1a3a50b-0566-48c1-acc0-15049da971b3/resource/fd6dc8bc-5df7-469f-81ec-9df61b67179e/download/grillplasser-i-gjesdal-kommune.csv");
			try {
				Scanner s = new Scanner(url.openStream());
				while(s.hasNext()) {
				System.out.println(s.next());
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
