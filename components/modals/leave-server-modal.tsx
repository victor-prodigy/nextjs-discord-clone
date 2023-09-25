"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal-store"; // modal

export const LeaveServerModal = () => {
    const { isOpen, onClose, type, data } = useModal(); // modal
    const router = useRouter();

    const isModalOpen = isOpen && type === "leaveServer"; // saber se o modal do tipo leaveServer está aberto ou não // modal
    const { server } = data;

    const [isLoading, setIsLoading] = useState(false);

    // Confirm Leave Server
    const onConfirm = async () => {
        try {
            setIsLoading(true);

            await axios.patch(`/api/servers/${server?.id}/leave`);

            router.refresh();
            router.push("/");
            onClose();
        } catch (error) {
            console.log("[LEAVE_SERVERS_SUBMIT]", error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Leave Server
                    </DialogTitle>

                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to leave <span className="font-semibold text-indigo-500">{server?.name}</span>?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                        >
                            Cancel
                        </Button>

                        <Button
                            disabled={isLoading}
                            onClick={onConfirm}
                            variant="primary"
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
