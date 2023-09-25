import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { prismadb } from "@/lib/prismadb";

interface ServerIdPageProps {
    params: {
        serverId: string;
    }
}

const ServerIdPage = async ({
    params
}: ServerIdPageProps) => {
    const profile = await currentProfile();

    // se não tiver um perfil faça isso
    if (!profile) {
        return redirectToSignIn(); // redireciona para login page clerk
    }

    // [PrismaDB]
    const server = await prismadb.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        },
        include: {
            channels: {
                where: {
                    name: "general"
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    });

    // primeiro dado canal do servidor pego do banco de dados
    const initialChannel = server?.channels[0];

    if (initialChannel?.name !== "general") { // se o primeiro dado do banco de dados for diferente de "general" então retorna um valor nulo(null);
        return null;
    }

    return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
}

export default ServerIdPage;