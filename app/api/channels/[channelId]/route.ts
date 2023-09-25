import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { prismadb } from "@/lib/prismadb";

import { MemberRole } from "@prisma/client";

// Deletar Channel ID (DELETE)
export async function DELETE(req: Request, { params }: { params: { channelId: string } }) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if (!params.channelId) {
            return new NextResponse("Channel ID missing", { status: 400 });
        }

        const server = await prismadb.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general", // não deixa deletar o canal com nome general que é o canal padrão
                        }
                    }
                }
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[CHANNEL_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// Editar Channel ID (PATCH)
export async function PATCH(req: Request, { params }: { params: { channelId: string } }) {
    try {
        const profile = await currentProfile();
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if (!params.channelId) {
            return new NextResponse("Channel ID missing", { status: 400 });
        }

        // se o nome do canal(channel) for "general" entao nao pode ser editado
        if (name === "general") {
            return new NextResponse("Name cannot be 'general'", { status: 400 });
        }

        const server = await prismadb.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id: params.channelId,
                            NOT: { // onde o nome do canal(channel) nao pode ser "general"
                                name: "general",
                            },
                        },
                        data: {
                            name,
                            type
                        }
                    }
                }
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[CHANNEL_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}