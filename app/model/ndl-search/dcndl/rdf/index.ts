export interface RdfDatatype {
	"#text": string;
	"@_rdf:datatype": string;
}

export const mapRdfDatatype = (x: RdfDatatype) => {
	return { datatype: x["@_rdf:datatype"], value: x["#text"] };
};

export interface RdfDescription {
	"rdf:Description": {
		"rdf:value": string;
		"@_rdf:about"?: string;
		"dcndl:transcription"?: string;
		"dcterms:title"?: string;
		"dc:creator"?: string;
	};
}

export const isRdfDescription = (x: any): x is RdfDescription => {
	return x["rdf:Description"] !== undefined;
};

export const mapRdfDescription = (x: RdfDescription) => {
	return {
		value: x["rdf:Description"]["rdf:value"],
		about: x["rdf:Description"]["@_rdf:about"],
		transcription: x["rdf:Description"]["dcndl:transcription"],
		title: x["rdf:Description"]["dcterms:title"],
		creator: x["rdf:Description"]["dc:creator"],
	};
};

export interface FoafAgent {
	"foaf:Agent": {
		"@_rdf:about"?: string;
		"foaf:name": string;
		"dcndl:transcription"?: string;
		"dcndl:description"?: string;
		"dcndl:location"?: string;
	};
}

export const mapFoafAgent = (x: FoafAgent) => {
	return {
		name: x["foaf:Agent"]["foaf:name"],
		about: x["foaf:Agent"]["@_rdf:about"],
		transcription: x["foaf:Agent"]["dcndl:transcription"],
		description: x["foaf:Agent"]["dcndl:description"],
		location: x["foaf:Agent"]["dcndl:location"],
	};
};

export interface RdfResource {
	"@_rdf:resource": string;
}

export const mapRdfResource = (x: RdfResource) => {
	return { resource: x["@_rdf:resource"] };
};
