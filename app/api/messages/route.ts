// para general messages (mensagens dos canais/channels)
import { NextResponse } from "next/server";
import { Message } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { prismadb } from "@/lib/prismadb";

// LOTE DE MENSAGENS
const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        const cursor = searchParams.get("cursor");
        const channelId = searchParams.get("channelId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!channelId) {
            return new NextResponse("Channel ID missing", { status: 400 });
        }

        let messages: Message[] = [];

        if (cursor) {
            // Busca as mensagens no banco de dados usando o cliente Prisma

            // - `take`: limita o número de mensagens retornadas

            // - `skip`: pula a primeira mensagem (para evitar busca duplicada)

            // - `cursor`: define o cursor para a busca, usando o ID da mensagem anterior

            // - `where`: filtra as mensagens pelo ID do canal

            // - `include`: inclui o perfil do membro associado a cada mensagem

            // - `orderBy`: ordena as mensagens pela data de criação em ordem decrescente
            messages = await prismadb.message.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            });
        } else {
            messages = await prismadb.message.findMany({
                take: MESSAGES_BATCH,
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            });
        }

        let nextCursor = null;

        if (messages.length === MESSAGES_BATCH) {
            nextCursor = messages[MESSAGES_BATCH - 1].id;
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        });
    } catch (error) {
        console.log("[MESSAGES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}