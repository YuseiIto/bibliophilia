export type AgentKind = "person" | "collective_agent";

export type AgentRole =
	| "著者"
	| "作者"
	| "編者"
	| "絵"
	| "写真"
	| "監修者"
	| "解説者"
	| "訳者"
	| "貢献者"
	| "その他"
	| "出版者"
	| "編集者"
	| "監訳者"
	| "原著者"
	| "版著者"
	| "シリーズ著者";

export interface Agent {
	id: string;
	agentKind: AgentKind;
	preferredName: string;
	preferredNameTranscription: string;
}

export interface AgentDraft {
	agentKind: AgentKind;
	preferredName: string;
	preferredNameTranscription: string;
	role: AgentRole;
	raw: string;
}
