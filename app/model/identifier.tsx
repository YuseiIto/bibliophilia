export type IdentifierType =
	| "http://ndl.go.jp/dcndl/terms/JPNO"
	| "http://ndl.go.jp/dcndl/terms/USMARC"
	| "http://ndl.go.jp/dcndl/terms/UKMARC"
	| "http://ndl.go.jp/dcndl/terms/TRCMARC"
	| "http://ndl.go.jp/dcndl/terms/OCLC"
	| "http://ndl.go.jp/dcndl/terms/GPOBibNO"
	| "http://ndl.go.jp/dcndl/terms/BRNO"
	| "http://ndl.go.jp/dcndl/terms/RLINNO"
	| "http://ndl.go.jp/dcndl/terms/NSMARCNO"
	| "http://ndl.go.jp/dcndl/terms/OPLMARCNO"
	| "http://ndl.go.jp/dcndl/terms/KNMARCNO"
	| "http://ndl.go.jp/dcndl/terms/NIIBibID"
	| "http://ndl.go.jp/dcndl/terms/NDLBibID"
	| "http://ndl.go.jp/dcndl/terms/TOHANMARCNO"
	| "http://ndl.go.jp/dcndl/terms/ISBN"
	| "http://ndl.go.jp/dcndl/terms/setISBN"
	| "http://ndl.go.jp/dcndl/terms/ISSN"
	| "http://ndl.go.jp/dcndl/terms/CODEN"
	| "http://ndl.go.jp/dcndl/terms/ISRN"
	| "http://ndl.go.jp/dcndl/terms/ISMN"
	| "http://ndl.go.jp/dcndl/terms/PBNO"
	| "http://ndl.go.jp/dcndl/terms/PLNO"
	| "http://ndl.go.jp/dcndl/terms/RIS502"
	| "http://ndl.go.jp/dcndl/terms/GPOCN"
	| "http://ndl.go.jp/dcndl/terms/SUPTDOC"
	| "http://ndl.go.jp/dcndl/terms/KAKENHINO"
	| "http://ndl.go.jp/dcndl/terms/UNDS"
	| "http://ndl.go.jp/dcndl/terms/UNSN"
	| "http://ndl.go.jp/dcndl/terms/StandardNO"
	| "http://ndl.go.jp/dcndl/terms/TRNO"
	| "http://ndl.go.jp/dcndl/terms/ISSNL"
	| "http://ndl.go.jp/dcndl/terms/ErrorISBN"
	| "http://ndl.go.jp/dcndl/terms/ErrorISSN"
	| "http://ndl.go.jp/dcndl/terms/ErrorISSNL"
	| "http://ndl.go.jp/dcndl/terms/SICI"
	| "http://ndl.go.jp/dcndl/terms/DOI"
	| "http://ndl.go.jp/dcndl/terms/NDLJP";

export interface WorkIdentifier {
	id: string;
	work_id: string;
	identifier: string;
	identifier_type: IdentifierType;
}

export interface Identifier {
	identifierType: IdentifierType;
	identifier: string;
}
