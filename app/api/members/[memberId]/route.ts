import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { prismadb } from "@/lib/prismadb";

// Role (PATCH)
export async function PATCH(req: Request, { params }: { params: { memberId: string } }) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url); // query
        const { role } = await req.json(); // regras "moderador" ou "admin"

        const serverId = searchParams.get("serverId"); // query

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if (!params.memberId) {
            return new NextResponse("Member ID missing", { status: 400 });
        }

        // [PrismaDB] atualizando(update) role usuario do server para mudar(change) para "moderator" ou "admin"
        const server = await prismadb.server.update({
            where: {
                id: serverId,
                profileId: profile.id // apenas o administrador pode modificar os membros(members)
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId,
                            profileId: {
                                not: profile.id
                            }
                        },
                        data: { // atualiza a regra para a que foi passada "moderator" ou "admin"
                            role
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[MEMBER_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// Kick (DELETE)
export async function DELETE(req: Request, { params }: { params: { memberId: string } }) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url); // query

        const serverId = searchParams.get("serverId"); // query

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if (!params.memberId) {
            return new NextResponse("Member ID missing", { status: 400 });
        }

        // [PrismaDB] atualizando(update) kick para kikar usuario do server
        const server = await prismadb.server.update({
            where: {
                id: serverId,
                profileId: profile.id // apenas o administrador pode modificar os membros(members)
            },
            data: {
                members: {
                    deleteMany: {
                        id: params.memberId,
                        profileId: {
                            not: profile.id // impede que o admin kick ele mesmo
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[MEMBER_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}