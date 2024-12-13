export const identifierTypes = {
	"http://ndl.go.jp/dcndl/terms/JPNO": "JP番号(日本全国書誌番号)",
	"http://ndl.go.jp/dcndl/terms/USMARC": "USMARC番号",
	"http://ndl.go.jp/dcndl/terms/UKMARC": "UKMARC番号",
	"http://ndl.go.jp/dcndl/terms/TRCMARC": "TRCMARC番号",
	"http://ndl.go.jp/dcndl/terms/OCLC": "OCLC番号",
	"http://ndl.go.jp/dcndl/terms/GPOBibNO": "GPO番号",
	"http://ndl.go.jp/dcndl/terms/BRNO": "障害者向け資料総合目録番号",
	"http://ndl.go.jp/dcndl/terms/RLINNO": "RLIN番号",
	"http://ndl.go.jp/dcndl/terms/NSMARCNO": "NS-MARC番号",
	"http://ndl.go.jp/dcndl/terms/OPLMARCNO": "OPL-MARC番号",
	"http://ndl.go.jp/dcndl/terms/KNMARCNO": "紀伊國屋MARC番号",
	"http://ndl.go.jp/dcndl/terms/NIIBibID": "NACSIS-CATレコードID",
	"http://ndl.go.jp/dcndl/terms/NDLBibID": "国立国会図書館書誌ID",
	"http://ndl.go.jp/dcndl/terms/TOHANMARCNO": "トーハンMARC番号",
	"http://ndl.go.jp/dcndl/terms/ISBN": "ISBN",
	"http://ndl.go.jp/dcndl/terms/setISBN": "セットISBN",
	"http://ndl.go.jp/dcndl/terms/ISSN": "ISSN",
	"http://ndl.go.jp/dcndl/terms/CODEN": "CODEN",
	"http://ndl.go.jp/dcndl/terms/ISRN": "ISRN",
	"http://ndl.go.jp/dcndl/terms/ISMN": "ISMN",
	"http://ndl.go.jp/dcndl/terms/PBNO": "出版者番号",
	"http://ndl.go.jp/dcndl/terms/PLNO": "プレート番号（楽譜）",
	"http://ndl.go.jp/dcndl/terms/RIS502": "発売番号（録音・映像番号）",
	"http://ndl.go.jp/dcndl/terms/GPOCN": "GPO管理番号",
	"http://ndl.go.jp/dcndl/terms/SUPTDOC": "SUPTDOC番号",
	"http://ndl.go.jp/dcndl/terms/KAKENHINO": "科研費課題番号",
	"http://ndl.go.jp/dcndl/terms/UNDS": "国連ドキュメント番号",
	"http://ndl.go.jp/dcndl/terms/UNSN": "国連セールス番号",
	"http://ndl.go.jp/dcndl/terms/StandardNO": "規格番号",
	"http://ndl.go.jp/dcndl/terms/TRNO": "テクニカルリポート番号",
	"http://ndl.go.jp/dcndl/terms/ISSNL": "ISSN-L",
	"http://ndl.go.jp/dcndl/terms/ErrorISBN": "ISBN（エラーコード）",
	"http://ndl.go.jp/dcndl/terms/ErrorISSN": "ISSN（エラーコード）",
	"http://ndl.go.jp/dcndl/terms/ErrorISSNL": "ISSN-L（エラーコード）",
	"http://ndl.go.jp/dcndl/terms/SICI": "SICI",
	"http://ndl.go.jp/dcndl/terms/DOI": "DOI",
	"http://ndl.go.jp/dcndl/terms/NDLJP": "国立国会図書館が付与する永続的識別子",
};

export type IdentifierType = keyof typeof identifierTypes;

export interface IdentifierDraft {
	id: string | null;
	work_id: string | null;
	identifier: string;
	identifier_type: IdentifierType;
}

export interface Identifier {
	id: string;
	work_id: string;
	identifier: string;
	identifier_type: IdentifierType;
}
