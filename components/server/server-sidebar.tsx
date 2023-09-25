import { redirect } from "next/navigation";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import { currentProfile } from "@/lib/current-profile";
import { prismadb } from "@/lib/prismadb";

import { ChannelType, MemberRole } from "@prisma/client";

import { ServerHeader } from "./server-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerSearch } from "./server-search";
import { Separator } from "@/components/ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSidebarProps {
    serverId: string;
}

// se o tipo do canal for
const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 w-4 h-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 w-4 h-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 w-4 h-4" />
}

// se member role for
const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="w-4 h-4 mr-2 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 mr-2 text-rose-500" />
}

export const ServerSidebar = async ({
    serverId
}: ServerSidebarProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }

    const server = await prismadb.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                }
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                }
            }
        }
    });

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
    const members = server?.members.filter((member) => member.profileId !== profile.id)

    if (!server) {
        return redirect("/");
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader
                server={server}
                role={role}
            />

            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                    <ServerSearch
                        data={[
                            {
                                label: "Text Channels",
                                type: "channel",
                                data: textChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type],
                                }))
                            },
                            {
                                label: "Voice Channels",
                                type: "channel",
                                data: audioChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type],
                                }))
                            },
                            {
                                label: "Video Channels",
                                type: "channel",
                                data: videoChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type],
                                }))
                            },
                            {
                                label: "Members",
                                type: "member",
                                data: members?.map((member) => ({
                                    id: member.id,
                                    name: member.profile.name,
                                    icon: roleIconMap[member.role],
                                }))
                            },
                        ]}
                    />
                </div>

                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

                {/* Cria o canal text */}
                {/* o trecho de código trata de valores booleanos, que podem ser true ou false */}
                {!!textChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            label="Text Channels"
                            role={role}
                            sectionType="channels"
                            channelType={ChannelType.TEXT}
                        />

                        <div className="space-y-[2px]">
                            {textChannels.map((channel) => (
                                <ServerChannel
                                    key={channel.id}
                                    channel={channel}
                                    server={server}
                                    role={role}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Cria o canal audio */}
                {/* o trecho de código trata de valores booleanos, que podem ser true ou false */}
                {!!audioChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            label="Voice Channels"
                            role={role}
                            sectionType="channels"
                            channelType={ChannelType.AUDIO}
                        />

                        <div className="space-y-[2px]">
                            {audioChannels.map((channel) => (
                                <ServerChannel
                                    key={channel.id}
                                    channel={channel}
                                    server={server}
                                    role={role}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Cria o canal voice */}
                {/* o trecho de código trata de valores booleanos, que podem ser true ou false */}
                {!!videoChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            label="Voice Channels"
                            role={role}
                            sectionType="channels"
                            channelType={ChannelType.VIDEO}
                        />

                        <div className="space-y-[2px]">
                            {videoChannels.map((channel) => (
                                <ServerChannel
                                    key={channel.id}
                                    channel={channel}
                                    server={server}
                                    role={role}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* o trecho de código trata de valores booleanos, que podem ser true ou false */}
                {!!members?.length && (
                    <div className="mb-2">
                        <ServerSection // component criado
                            label="Members"
                            role={role}
                            sectionType="members"
                            server={server}
                        />

                        <div className="space-y-[2px]">
                            {members.map((member) => (
                                <ServerMember // component criado
                                    key={member.id}
                                    member={member}
                                    server={server}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}
