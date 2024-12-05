/* 
 * DC-NDL (国立国会図書館ダブリンコアメタデータ記述) に対応するための型定義。
 * 仕様書 (https://ndlsearch.ndl.go.jp/file/renkei/dcndl/dcndl_rdf_format_ver.2.11_20240401.pdf) を参考に実装。
 */
import { parseStringPromise } from "xml2js";
import { mapRdfDatatype, mapRdfDescription, mapFoafAgent, isRdfDescription, mapRdfResource, RdfDescription, RdfResource } from "./rdf"


export class DcNdlParser {

  private _xml: string;
  private _obj: any;

  public constructor() {
    this._xml = "";
    this._obj = {};
  }

  async parseXml(xml: string) {
    this._xml = xml;
    this._obj = await parseStringPromise(xml);
  }

  get rdf() {
    return this._obj["rdf:RDF"];
  }

  get bibResource() {
    return this.rdf["dcndl:BibResource"][0];
  }

  get bibAdminResource() {
    return this.rdf["dcndl:BibAdminResource"][0];
  }

  get catalogingStatus() {
    return this.bibAdminResource["dcndl:catalogingStatus"][0];
  }

  get catalogingRule() {
    return this.bibAdminResource["dcndl:catalogingRule"][0];
  }

  get dctermsDescription() {
    return this.bibAdminResource["dcterms:description"];
  }

  get dctermsIdentifier() {
    return this.bibResource["dcterms:identifier"].map(mapRdfDatatype);
  }

  get sourceIdentifier() {
    return (this.bibResource["dcndl:sourceIdentifier"] ?? []).map(mapRdfDatatype);
  }

  get dctermsTitle() {
    return this.bibResource["dcterms:title"][0];
  }

  get dcTitle() {
    return this.bibResource["dc:title"].map(mapRdfDescription);
  }


  get volume() {
    return (this.bibResource["dcndl:volume"] ?? []).map(mapRdfDescription);
  }

  get volumeTitle() {
    return (this.bibResource["dcndl:volumeTitle"] ?? []).map(mapRdfDescription);
  }

  get alternative() {
    return (this.bibResource["dcndl:alternative"] ?? []).map(mapRdfDescription);
  }

  get alternativeVolume() {
    return (this.bibResource["dcndl:alternativeVolume"] ?? []).map(mapRdfDescription);
  }

  get alternativeVolumeTitle() {
    return (this.bibResource["dcndl:alternativeVolumeTitle"] ?? []).map(mapRdfDescription);
  }

  get seriesTitle() {
    return (this.bibResource["dcndl:seriesTitle"] ?? []).map(mapRdfDescription);
  }

  get edition() {
    return this.bibResource["dcndl:edition"] ?? [];
  }

  get dctermsCreator() {
    return (this.bibResource["dcterms:creator"] ?? []).map(mapFoafAgent);
  }

  get dcCreator() {
    return this.bibResource["dc:creator"] ?? [];
  }

  get creatorAlternative() {
    return this.bibResource["dcndl:creatorAlternative"] ?? [];
  }

  get seriesCreator() {
    return this.bibResource["dcndl:seriesCreator"] ?? [];
  }

  get editionCreator() {
    return this.bibResource["dcndl:editionCreator"] ?? [];
  }

  get contributor() {
    return this.bibResource["dc:contributor"] ?? [];
  }

  get dctermsPublisher() {
    return (this.bibResource["dcterms:publisher"] ?? []).map(mapFoafAgent);
  }

  get publicationPlace() {
    return (this.bibResource["dcndl:publicationPlace"] ?? []).map(mapRdfDatatype);
  }

  get dctermsDate() {
    return this.bibResource["dcterms:date"] ?? []
  }

  get dctermsIssued() {
    return (this.bibResource["dcterms:issued"] ?? []).map(mapRdfDatatype)
  }

  get dcndlPartInformation() {
    return (this.bibResource["dcndl:partInformation"] ?? []).map(mapRdfDescription)
  }

  get dctermsAbstract() {
    return this.bibResource["dcterms:abstract"] ?? []
  }

  get dctermsSubject() {
    return (this.bibResource["dcterms:subject"] ?? []).map((x: RdfDescription | RdfResource) => { return isRdfDescription(x) ? mapRdfDescription(x) : mapRdfResource(x) })
  }

  get dcSubject() {
    return (this.bibResource["dc:subject"] ?? []).map(mapRdfDatatype)
  }

  get dctermsLanguage() {
    return (this.bibResource["dcterms:language"] ?? []).map(mapRdfDatatype)
  }

  get originalLanguage() {
    return (this.bibResource["dcndl:originalLanguage"] ?? []).map(mapRdfDatatype)
  }

  get price() {
    return this.bibResource["dcndl:price"] ?? []
  }

  get dctermsExtent() {
    return this.bibResource["dcterms:extent"] ?? []
  }

  get dctermsFormat() {
    return (this.bibResource["dcterms:format"] ?? []).map(mapRdfDatatype)
  }

  get foafThumbnail() {
    return this.bibResource["foaf:thumbnail"] ?? []
  }


}



