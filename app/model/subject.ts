export type SubjectType =
	| "http://ndl.go.jp/dcndl/terms/NDC8"
	| "http://ndl.go.jp/dcndl/terms/NDC"
	| "http://ndl.go.jp/dcndl/terms/LCC"
	| "http://ndl.go.jp/dcndl/terms/UDC"
	| "http://ndl.go.jp/dcndl/terms/GHQSCAP"
	| "http://ndl.go.jp/dcndl/terms/USCAR"
	| "http://ndl.go.jp/dcndl/terms/MCJ"
	| "http://purl.org/dc/terms/DDC"
	| "other";

export const subjectTypes: { [K in SubjectType]: string } = {
	"http://ndl.go.jp/dcndl/terms/NDC8": "日本十進分類法第8版 (NDC8)",
	"http://ndl.go.jp/dcndl/terms/NDC": "日本十進分類法 (NDC)",
	"http://ndl.go.jp/dcndl/terms/LCC": "米国国会図書館分類法 (LCC)",
	"http://ndl.go.jp/dcndl/terms/UDC": "国際十進分類法 (UDC)",
	"http://ndl.go.jp/dcndl/terms/GHQSCAP": "GHQ/SCAP資料分類",
	"http://ndl.go.jp/dcndl/terms/USCAR": "USCAR資料分類",
	"http://ndl.go.jp/dcndl/terms/MCJ": "米海兵隊太平洋戦争(MCJ)文書分類番号",
	"http://purl.org/dc/terms/DDC": "ディーイ十進分類法",
	other: "その他",
};

export interface SubjectDraft {
	subject_type: SubjectType;
	preferred_label: string;
	preferred_label_transcription?: string;
}
