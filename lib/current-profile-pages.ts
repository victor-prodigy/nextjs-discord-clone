// para folder(pasta) "pages" em vez de "app"
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

import { prismadb } from "@/lib/prismadb";

export const currentProfilePages = async (req: NextApiRequest) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return null;
    }

    const profile = await prismadb.profile.findUnique({
        where: {
            userId
        }
    });

    return profile;
}