// NOTE: [Hook] para controlar todos os modals do aplicativo, quando ele deve fechar(false) ou abrir(true)
import { create } from "zustand";

import { Channel, ChannelType, Server } from "@prisma/client";

// NOTE: definindo tipos de modals
export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage";

// NOTE: dados que poderam ser obtidos do modal
interface ModalData {
    server?: Server;
    channel?: Channel;
    channelType?: ChannelType;
    apiUrl?: string; // NOTE: para saber qual é o chat/conversation
    query?: Record<string, any> // NOTE: para saber qual é o chat/conversation
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData; // NOTE: data para os `models` tem informações do banco de dados
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