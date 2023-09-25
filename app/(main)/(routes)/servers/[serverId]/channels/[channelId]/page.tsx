import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { prismadb } from "@/lib/prismadb";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";

import { ChannelType } from "@prisma/client";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelIdPage = async ({
    params
}: ChannelIdPageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const channel = await prismadb.channel.findUnique({
        where: {
            id: params.channelId,
        },
    });

    const member = await prismadb.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        }
    });

    if (!channel || !member) {
        redirect("/");
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            {/* Cabeçalho do Chat */}
            <ChatHeader
                serverId={channel.serverId}
                name={channel.name}
                type="channel"
            />

            {/* Se o tipo do canal for TEXT */}
            {channel.type === ChannelType.TEXT && (
                <>
                    {/* Mensagens do Chat */}
                    <ChatMessages
                        member={member}
                        name={channel.name}
                        chatId={channel.id}
                        type="channel"
                        apiUrl="/api/messages"
                        socketUrl="/api/socket/messages"
                        socketQuery={{
                            channelId: channel.id,
                            serverId: channel.serverId,
                        }}
                        paramKey="channelId"
                        paramValue={channel.id}
                    />

                    {/* Input do Chat */}
                    <ChatInput
                        name={channel.name}
                        type="channel"
                        apiUrl="/api/socket/messages"
                        query={{
                            channelId: channel.id,
                            serverId: channel.serverId
                        }}
                    />
                </>
            )}

            {/* Se o tipo do canal for AUDIO */}
            {channel.type === ChannelType.AUDIO && (
                <MediaRoom
                    chatId={channel.id}
                    video={false}
                    audio={true}
                />
            )}

            {/* Se o tipo do canal for VIDEO */}
            {channel.type === ChannelType.VIDEO && (
                <MediaRoom
                    chatId={channel.id}
                    video={true}
                    audio={true}
                />
            )}
        </div>
    )
}

export default ChannelIdPage;