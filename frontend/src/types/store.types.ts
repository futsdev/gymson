export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: string;
    gymName: string;
    gymId: string;
    token: string;
}

export interface UserStore extends UserInfo {
    setUserInfo: (userInfo: UserInfo) => void;
    clearUserInfo: () => void;
}