import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Combobox, ComboboxOption } from "~/components/combobox";
import { Button } from "~/components/ui/button";
import { Plus, Edit, Trash } from "@mynaui/icons-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuTrigger,
	ContextMenuItem,
} from "~/components/ui/context-menu";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { UsersGroup, User } from "@mynaui/icons-react";
import type { AgentDraft, AgentKind, AgentRole } from "~/model/agent";

const agentRoleOptions: ComboboxOption<AgentRole>[] = [
	{ value: "著者", label: "著者" },
	{ value: "作者", label: "作者" },
	{ value: "出版者", label: "出版者" },
	{ value: "監修者", label: "編集者" },
	{ value: "監訳者", label: "監訳者" },
	{ value: "原著者", label: "原著者" },
	{ value: "貢献者", label: "貢献者" },
	{ value: "編者", label: "編者" },
	{ value: "絵", label: "絵" },
	{ value: "解説者", label: "解説者" },
	{ value: "写真", label: "写真" },
	{ value: "その他", label: "その他" },
];

interface AgentDialogProps {
	defaultValue?: AgentDraft;
	onOpenChange?: (isOpen: boolean) => void;
	onSubmit?: (agent: AgentDraft) => void;
	clearOnSubmit?: boolean;
}

export function AgentDialog({
	onOpenChange,
	onSubmit,
	defaultValue,
	clearOnSubmit,
}: AgentDialogProps) {
	const [agentKind, setAgentKind] = useState<AgentKind>(
		defaultValue?.agentKind ?? "person",
	);

	const [agentRole, setAgentRole] = useState<AgentRole | null>(
		defaultValue?.role ?? null,
	);
	const [preferredName, setPreferredName] = useState(
		defaultValue?.preferredName ?? "",
	);

	const [preferredNameTranscription, setPreferredNameTranscription] = useState(
		defaultValue?.preferredNameTranscription ?? "",
	);

	const [rawDescription, setRawDescription] = useState(defaultValue?.raw ?? "");

	const onSubmitWrapper = (event: React.FormEvent) => {
		if (!agentRole) return; // このケースではボタンが	disabledになっているはずなので通常はunreachable
		event.preventDefault();
		if (onSubmit) {
			onSubmit({
				agentKind,
				preferredName,
				preferredNameTranscription,
				role: agentRole,
				raw: rawDescription,
			});
		}

		if (onOpenChange) onOpenChange(false);
		if (clearOnSubmit) {
			setAgentRole(defaultValue?.role ?? null);
			setPreferredName(defaultValue?.preferredName ?? "");
			setPreferredNameTranscription(
				defaultValue?.preferredNameTranscription ?? "",
			);
		}
	};

	return (
		<DialogContent className="flex flex-col p-3">
			<DialogHeader>
				<DialogTitle> 個人・組織を追加 </DialogTitle>
				<DialogDescription>
					著者, 編者, 訳者等、資料に関わる個人・組織を追加します。
				</DialogDescription>
			</DialogHeader>

			<Tabs
				defaultValue="person"
				className="w-full"
				value={agentKind}
				onValueChange={(x) => setAgentKind(x as AgentKind)}
			>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="person">
						<div className="flex flex-row gap-3">
							<User size={18} /> 個人
						</div>
					</TabsTrigger>
					<TabsTrigger value="collective_agent">
						<div className="flex flex-row gap-3">
							<UsersGroup size={18} /> 集団・組織
						</div>
					</TabsTrigger>
				</TabsList>
			</Tabs>

			<div className="flex flex-row">
				<Input
					placeholder="根拠となる記述"
					value={rawDescription}
					onChange={(e) => setRawDescription(e.target.value)}
				/>
			</div>
			<div className="flex flex-row">
				<Input
					placeholder="優先名称"
					value={preferredName}
					onChange={(e) => setPreferredName(e.target.value)}
				/>
			</div>
			<div className="flex flex-row">
				<Input
					placeholder="優先名称の読み"
					value={preferredNameTranscription}
					onChange={(e) => setPreferredNameTranscription(e.target.value)}
				/>
			</div>
			<div className="flex flex-row">
				<Combobox
					label={`資料と${agentKind == "person" ? "個人" : "集団・組織"}の関係`}
					options={agentRoleOptions}
					value={agentRole}
					onChange={setAgentRole}
				/>
			</div>
			<Button
				type="button"
				onClick={onSubmitWrapper}
				disabled={preferredName === "" || !agentRole}
			>
				<Plus /> {agentKind == "person" ? "個人" : "集団・組織"}を追加
			</Button>
		</DialogContent>
	);
}

interface AgentRowProps {
	onUpdate?: (agent: AgentDraft) => void;
	onDelete?: () => void;
	value: AgentDraft;
}

function AgentRow({ value, onUpdate, onDelete }: AgentRowProps) {
	const [isOpen, setIsOpen] = useState(false);

	const onUpdateWrapper = (agent: AgentDraft) => {
		if (onUpdate) onUpdate(agent);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<TableRow>
						<TableCell>
							{value.agentKind == "person" ? "個人" : "集団・組織"}
						</TableCell>
						<TableCell> {value.preferredName} </TableCell>
						<TableCell> {value.role} </TableCell>
					</TableRow>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<DialogTrigger asChild>
						<ContextMenuItem>
							<span className="flex flex-row items-center gap-3">
								<Edit size={15} />
								編集
							</span>
						</ContextMenuItem>
					</DialogTrigger>
					<ContextMenuItem onClick={onDelete}>
						<span className="flex flex-row items-center gap-3 text-destructive">
							<Trash size={15} />
							削除
						</span>
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			<AgentDialog defaultValue={value} onSubmit={onUpdateWrapper} />
		</Dialog>
	);
}

export function AgentInput() {
	const [isOpen, setIsOpen] = useState(false);
	const [agents, setAgents] = useState<AgentDraft[]>([]);

	const onSubmit = (agent: AgentDraft) => {
		setAgents([...agents, agent]);
	};

	const onUpdateRow = (agent: AgentDraft, index: number) => {
		const newAgents = [...agents];
		newAgents[index] = agent;
		setAgents(newAgents);
	};

	const onDeleteRow = (index: number) => {
		const newAgents = [...agents];
		newAgents.splice(index, 1);
		setAgents(newAgents);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-xs font-bold">種類</TableHead>
						<TableHead className="text-xs font-bold">優先名称</TableHead>
						<TableHead className="text-xs font-bold">資料との関係</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{agents.map((agent, index) => (
						<AgentRow
							key={index}
							value={agent}
							onUpdate={(x) => onUpdateRow(x, index)}
							onDelete={() => onDeleteRow(index)}
						/>
					))}
				</TableBody>
			</Table>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline" className="w-full">
					<Plus /> 個人・組織を追加
				</Button>
			</DialogTrigger>
			<AgentDialog onOpenChange={setIsOpen} onSubmit={onSubmit} clearOnSubmit />
		</Dialog>
	);
}