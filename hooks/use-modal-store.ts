// para controlar todos os modals do aplicativo, quando ele deve fechar(false) ou abrir(true)
import { create } from "zustand";

import { Channel, ChannelType, Server } from "@prisma/client";

// Modals
export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage";

interface ModalData {
    server?: Server;
    channel?: Channel;
    channelType?: ChannelType;
    apiUrl?: string; // chat
    query?: Record<string, any> // chat
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData; // data para os Modals tem informações do banco de dados de "Server", "Channel", "ChannelType" etc
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false })
}));