/**
 * Type definitions for my.raceresult.com portal API
 */

export interface MyRaceResultConfig {
  defaultServer?: string;
  https?: boolean;
  timeout?: number;
  userAgent?: string;
}

export interface PublishedListEntry {
  Name: string;
  Mode: string;
  Contest: string;
  ShowAs: string;
  Format: string;
  Live: number;
  Sortable: number;
  Leader: number;
  Details: string;
  ID: string;
}

export interface TabConfig {
  InfoText?: string | undefined;
  Subtype?: string | undefined;
  StandardDetails?: string | undefined;
  LeaderboardHideCount?: boolean | undefined;
  ShowCommentIcon?: boolean | undefined;
  Lists: PublishedListEntry[];
}

export interface PortalTab {
  Label: string;
  URLName: string;
  Enabled: boolean;
  ShowInMenu: boolean;
  ShowInMenu2: string;
  ActiveFrom: string;
  ActiveUntil: string;
  Type: string;
  Config?: TabConfig;
}

export interface PageConfig {
  key: string;
  server: string;
  eventName: string;
  contests: Record<string, string>;
  splits: Record<string, unknown>[];
  eventOver?: boolean | undefined;
  time?: number | undefined;
  timerLogo?: string | undefined;
  timerURL?: string | undefined;
  brandColorDark?: string | undefined;
  listCommentsEnabled?: Record<string, boolean> | undefined;
  tab: PortalTab;
  tabConfig: TabConfig;
  contestColors?: unknown;
  raw: Record<string, unknown>;
}

export interface GetListParams {
  portalId: string;
  page: string;
  listName: string;
  contest: string | number;
  key?: string;
  server?: string;
  leader?: number;
  rankFilter?: string;
  term?: string;
  fav?: string;
  openedGroups?: string;
}

export interface ListResponse {
  list: Record<string, unknown>;
  data: Record<string, unknown>;
  DataFields: string[];
  mid?: number;
  groupFilters?: Record<string, unknown>[];
  comments?: Record<string, unknown>;
  LiveUpdateInterval?: number;
  Favorites?: unknown;
}

export interface FlatListRow {
  _group: string;
  [field: string]: string | number | boolean | null | undefined;
}

export class MyRaceResultError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly response?: unknown
  ) {
    super(message);
    this.name = 'MyRaceResultError';
  }
}
