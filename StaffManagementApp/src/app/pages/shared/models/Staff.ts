export interface ApiResponse<T>{
    message?: string;
    data: T;
}

export interface IStaff {
    id: number;
    staffId: string;
    fullName: string;
    birthDay: string;
    gender: number;
}
