import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { prismadb } from "@/lib/prismadb";

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        const server = await prismadb.server.update({
            where: {
                id: params.serverId,
                profileId: {
                    not: profile.id // apenas atualize(update) para sair do servidor(leave) se nao for quem criou o servidor no caso o "admin"
                },
                members: { // confirmando se a pessoa que está tentando sair do servidor (leave) faz parte dos membros ou seja "moderator" e "guest"
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: { // entao deleta o membro
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[LEAVE_SERVER_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}