import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { prismadb } from "@/lib/prismadb";

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    }
}

const InviteCodePage = async ({
    params
}: InviteCodePageProps) => {
    const profile = await currentProfile(); // encontrando o perfil do usuario

    // se o perfil nao existir redireciona para pagina de autenticacao clerk
    if (!profile) {
        return redirectToSignIn();
    }

    // verificar quando tem invite code ou não
    if (!params.inviteCode) {
        return redirect("/");
    }

    // verificar se o usuario faz parte desse servidor
    const existingServer = await prismadb.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    // se o usuario faz parte do servidor redireciona ele para isso
    if (existingServer) {
        return redirect(`/servers/${existingServer.id}`);
    }

    // senao atualizar o servidor usando unique inviteCode
    const server = await prismadb.server.update({
        where: {
            inviteCode: params.inviteCode,
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id
                    }
                ]
            }
        }
    });

    if (server) {
        return redirect(`/servers/${server.id}`)
    }

    return null;
}

export default InviteCodePage;