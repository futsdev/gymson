import type { UserInfo, UserStore } from "@/types/store.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState: UserInfo = {
    id: '',
    name: '',
    email: '',
    role: '',
    gymName: '',
    gymId: '',
    token: '',
}

export const useUserStore = create<UserStore>()(
    persist((set) => ({
        ...initialState,
        setUserInfo: (userData: UserInfo) => set(() => ({ ...userData })),
        clearUserInfo: () => set((state) => ({
            ...initialState,
            //  preserve gymId and gymName
            gymId: state.gymId,
            gymName: state.gymName,
        })),
    }),
        { name: "gym-user-store" })
)