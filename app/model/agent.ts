export type AgentKind = "person" | "collective_agent";

// as const で literal union を維持する。これが無いと AgentRole が string に広がり、
// PUBLISHER_ROLE をはじめ role の型が無検査になる (詳細ページの出版者/寄与者の
// 振り分けがこの定数に依存している)。
export const agentRoles = [
	"著者",
	"作者",
	"編者",
	"絵",
	"写真",
	"監修者",
	"解説者",
	"訳者",
	"貢献者",
	"その他",
	"出版者",
	"編集者",
	"監訳者",
	"原著者",
	"版著者",
	"シリーズ著者",
] as const;

export type AgentRole = (typeof agentRoles)[number];

export const PUBLISHER_ROLE: AgentRole = "出版者";

export interface Agent {
	id: string;
	agentKind: AgentKind;
	preferredName: string;
	preferredNameTranscription: string;
}

export interface AgentDraft {
	id: string | null;
	agentKind: AgentKind;
	preferredName: string;
	preferredNameTranscription: string;
	role: AgentRole;
	raw: string;
}
