export interface RdfDatatype { _: string, $: { "rdf:datatype": string } }

export const mapRdfDatatype = (x: RdfDatatype) => {
  return { datatype: x.$["rdf:datatype"], value: x._ }
}


export interface RdfDescription {
  'rdf:Description': [
    {
      "rdf:value": [string],
      "dcndl:transcription"?: [string],
      "dcterms:title"?: [string],
      "dc:creator"?: [string],
    }
  ]
}

export const mapRdfDescription = (x: RdfDescription) => {

  const transcription = x["rdf:Description"][0]["dcndl:transcription"];
  const title = x["rdf:Description"][0]["dcterms:title"];
  const creator = x["rdf:Description"][0]["dc:creator"];

  return {
    value: x["rdf:Description"][0]["rdf:value"][0],
    transcription: transcription ? transcription[0] : undefined,
    title: title ? title[0] : undefined,
    creator: creator ? creator[0] : undefined
  }
};

export interface FoafAgent {
  "foaf:Agent": [
    {
      $: { "rdf:about"?: string },
      "foaf:name": [string],
      "dcndl:transcription"?: [string],
      "dcndl:description"?: [string],
      "dcndl:location"?: [string]
    }
  ]
}

export const mapFoafAgent = (x: FoafAgent) => {
  const about = x["foaf:Agent"][0]["$"];
  const transcription = x["foaf:Agent"][0]["dcndl:transcription"];
  const description = x["foaf:Agent"][0]["dcndl:description"];
  const location = x["foaf:Agent"][0]["dcndl:location"];

  return {
    name: x["foaf:Agent"][0]["foaf:name"][0],
    about: about ? about["rdf:about"] : undefined,
    transcription: transcription ? transcription[0] : undefined,
    description: description ? description[0] : undefined,
    location: location ? location[0] : undefined
  }
}
