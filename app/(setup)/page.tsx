import { redirect } from "next/navigation";

import { initialProfile } from "@/lib/initial-profile";
import { prismadb } from "@/lib/prismadb";

import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async () => {
    const profile = await initialProfile();

    const server = await prismadb.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    // se existir um servidor rediciona para o servidor
    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    // se existir um servidor aparece isso
    return (
        <InitialModal />
    )
}

export default SetupPage;