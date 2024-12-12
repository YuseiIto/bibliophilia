export const subjectTypes = {
	"http://id.ndl.go.jp/class/ndlc": "国立国会図書館表 (NDLC)",
	"http://ndl.go.jp/dcndl/terms/NDC8": "日本十進分類法第8版 (NDC8)",
	"http://id.ndl.go.jp/class/ndc9": "日本十進分類法第9版 (NDC9)",
	"http://id.ndl.go.jp/class/ndc10": "日本十進分類法第10版 (NDC10)",
	"http://ndl.go.jp/dcndl/terms/NDC": "日本十進分類法 (NDC)",
	"http://ndl.go.jp/dcndl/terms/LCC": "米国国会図書館分類法 (LCC)",
	"http://ndl.go.jp/dcndl/terms/UDC": "国際十進分類法 (UDC)",
	"http://ndl.go.jp/dcndl/terms/GHQSCAP": "GHQ/SCAP資料分類",
	"http://ndl.go.jp/dcndl/terms/USCAR": "USCAR資料分類",
	"http://ndl.go.jp/dcndl/terms/MCJ": "米海兵隊太平洋戦争(MCJ)文書分類番号",
	"http://dewey.info/class/": "デューイ十進分類法",
	other: "その他",
};

export type SubjectType = keyof typeof subjectTypes;

export interface SubjectDraft {
	subject_type: SubjectType;
	preferred_label: string;
	preferred_label_transcription?: string;
}
