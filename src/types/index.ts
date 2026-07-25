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

export interface Identifier {
  [key: string]: number;
}

export function bib(value: number): Identifier {
  return { bib: value };
}

export function pid(value: number): Identifier {
  return { pid: value };
}

export interface Result {
  ID: number;
  Name: string;
  Formula?: string;
  TimeFormat?: string;
  Location?: string;
  TimeRounding?: number;
}

export interface SaveValueArrayItem {
  Bib?: number;
  PID?: number;
  FieldName: string;
  Value: unknown;
}

export interface ParticipantNewResponse {
  ID: number;
  Bib: number;
  PID?: number;
  [key: string]: unknown;
}

export interface EntryFeeItem {
  ID: number;
  Name: string;
  Fee: unknown;
  Field: string;
  Tax: unknown;
  Multiplication: unknown;
}

export interface ImportResult {
  Added: number;
  Updated: number;
  PIDs: number[];
}

export interface SimpleAPIItem {
  Disabled: boolean;
  Key: string;
  URL: string;
  Label: string;
}

/** 0=ParticipantNew, 1=ParticipantUpdated, 2=RawDataNew, 3=ModJobID, 4=ModJobIDSettings */
export type WebHookType = 0 | 1 | 2 | 3 | 4;

export interface WebHook {
  ID: number;
  Disabled: boolean;
  Name: string;
  Type: WebHookType | number;
  URL: string;
  Fields: string[];
  Filter: string;
  OrderPos: number;
}

export interface Ranking {
  ID: number;
  Name: string;
  Group: string[];
  Sort: string[];
  SortDesc: boolean[];
  UseTies: boolean;
  ContestSort: boolean;
  Filter: string;
  GroupName: string;
}
