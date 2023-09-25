"use client";

import { Plus, Settings } from "lucide-react";

import { ChannelType, MemberRole } from "@prisma/client";
import { ServerWithMembersWithProfiles } from "@/types";

import { ActionTooltip } from "@/components/action-tooltip";

import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
    label: string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: ChannelType;
    server?: ServerWithMembersWithProfiles;
}

export const ServerSection = ({
    label,
    role,
    sectionType,
    channelType,
    server
}: ServerSectionProps) => {
    const { onOpen } = useModal();

    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                {label}
            </p>

            {/* se role(regra) for diferente de GUEST entao aparece Create Channel nos channels(canais) criados */}
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionTooltip label="Create Channel" side="top">
                    <button
                        onClick={() => onOpen("createChannel", { channelType })} // onClick abre o modal de create-channel-modal.tsx
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}

            {/* se role(regra) for ADMIN entao */}
            {role === MemberRole.ADMIN && sectionType === "members" && (
                <ActionTooltip label="Manage Members" side="top">
                    <button
                        onClick={() => onOpen("members", { server })} // onClick abre o modal de create-channel-modal.tsx
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                    >
                        <Settings className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}
