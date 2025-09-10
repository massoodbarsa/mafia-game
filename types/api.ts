// Generic API response type
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
