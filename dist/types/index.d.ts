/**
 * Type definitions for RaceResult Web API
 */
export interface ApiConfig {
    server: string;
    https?: boolean;
    userAgent?: string;
    timeout?: number;
}
export interface LoginCredentials {
    apiKey?: string;
    username?: string;
    password?: string;
}
export interface EventListItem {
    id: string;
    event_name: string;
    event_date: Date | null;
    participants?: number;
    [key: string]: any;
}
export interface UserInfo {
    CustNo: number;
    UserName: string;
    UserPic?: string;
    [key: string]: any;
}
export interface ParticipantData {
    ID: number;
    BIB: number;
    FIRSTNAME: string;
    LASTNAME: string;
    'CONTEST.NAME': string;
    [key: string]: any;
}
export interface RawDataEntry {
    Time: string;
    TimingPoint: string;
    [key: string]: any;
}
export interface DataListParams {
    fields: string[];
    filter?: string;
    sortFields?: string[];
    offset?: number;
    limit?: number;
    groupBy?: string[];
    having?: string;
    distinct?: string;
}
export interface ApiResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
}
export interface ApiError extends Error {
    status?: number;
    response?: any;
}
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export interface RequestConfig {
    method: HttpMethod;
    eventId?: string;
    endpoint: string;
    params?: Record<string, any> | undefined;
    data?: any;
    contentType?: string | undefined;
}
//# sourceMappingURL=index.d.ts.map