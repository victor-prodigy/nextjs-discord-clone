import { prismadb } from "@/lib/prismadb";

// Pegar Conversa Criada
export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) => {
    let conversation = await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId, memberOneId);

    if (!conversation) {
        conversation = await createNewConversation(memberOneId, memberTwoId);
    }

    return conversation;
}

// Encontrar Conversa
const findConversation = async (memberOneId: string, memberTwoId: string) => {
    try {
        return await prismadb.conversation.findFirst({
            where: {
                AND: [
                    { memberOneId: memberOneId },
                    { memberTwoId: memberTwoId },
                ]
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
                    }
                },
                memberTwo: {
                    include: {
                        profile: true,
                    }
                }
            }
        });
    } catch {
        return null; // usando null em vez de usar error que iria bloquear toda a aplicacao
    }
}

// Criar Nova Conversa
const createNewConversation = async (memberOneId: string, memberTwoId: string) => {
    try {
        return await prismadb.conversation.create({
            data: {
                memberOneId,
                memberTwoId: memberTwoId,
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
                    }
                },
                memberTwo: {
                    include: {
                        profile: true,
                    }
                }
            }
        });
    } catch {
        return null; // usando null em vez de usar error que iria bloquear toda a aplicacao
    }
}