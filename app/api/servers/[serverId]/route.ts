import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { prismadb } from "@/lib/prismadb";

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const profile = await currentProfile();
        const { name, imageUrl } = await req.json();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // [PrismaDB] atualizando(update) server
        const server = await prismadb.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id // apenas o administrador pode modificar as configuracoes(settings)
            },
            data: {
                name,
                imageUrl
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[SERVER_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // [PrismaDB] deletando(delete) server
        const server = await prismadb.server.delete({
            where: {
                id: params.serverId,
                profileId: profile.id // apenas o administrador pode deletar o servidor
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[SERVER_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}