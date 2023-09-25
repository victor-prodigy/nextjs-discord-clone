"use client";

import { useEffect, useState } from "react";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import { LeaveServerModal } from "@/components/modals/leave-server-modal";
import { DeleteServerModal } from "@/components/modals/delete-server-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
import { EditChannelModal } from "@/components/modals/edit-channel-modal";
import { MessageFileModal } from "@/components/modals/message-file-modal";
import { DeleteMessageModal } from "@/components/modals/delete-message-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            {/* Modal Criar servidor */}
            <CreateServerModal />

            {/* Modal Convidar */}
            <InviteModal />

            {/* Modal Editar servidor */}
            <EditServerModal />

            {/* Modal Gerenciar membros do servidor */}
            <MembersModal />

            {/* Modal Criar canal do servidor */}
            <CreateChannelModal />

            {/* Modal Sair do servidor */}
            <LeaveServerModal />

            {/* Modal Deletar o servidor */}
            <DeleteServerModal />

            {/* Modal Deletar o canal */}
            <DeleteChannelModal />

            {/* Modal Editar o canal */}
            <EditChannelModal />

            {/* Modal Mensagem */}
            <MessageFileModal />

            {/* Modal Deletar uma mensagem */}
            <DeleteMessageModal />
        </>
    )
}
