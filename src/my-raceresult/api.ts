/**
 * Client for my.raceresult.com public portal API
 */

import axios, { AxiosInstance } from 'axios';
import {
  GetListParams,
  ListResponse,
  MyRaceResultConfig,
  MyRaceResultError,
  PageConfig,
  PortalTab,
  PublishedListEntry,
  TabConfig,
} from './types';

type RawPageConfig = Record<string, unknown>;

function normalizeTabConfig(raw: unknown): TabConfig {
  const config = (raw ?? {}) as Record<string, unknown>;
  const result: TabConfig = {
    Lists: (config.Lists as PublishedListEntry[]) ?? [],
  };
  if (config.InfoText !== undefined) result.InfoText = String(config.InfoText);
  if (config.Subtype !== undefined) result.Subtype = String(config.Subtype);
  if (config.StandardDetails !== undefined) result.StandardDetails = String(config.StandardDetails);
  if (config.LeaderboardHideCount !== undefined) {
    result.LeaderboardHideCount = Boolean(config.LeaderboardHideCount);
  }
  if (config.ShowCommentIcon !== undefined) {
    result.ShowCommentIcon = Boolean(config.ShowCommentIcon);
  }
  return result;
}

function normalizePageConfig(raw: RawPageConfig): PageConfig {
  const tab = (raw.Tab ?? {}) as unknown as PortalTab;
  const tabConfig = normalizeTabConfig(raw.TabConfig ?? tab.Config);

  const result: PageConfig = {
    key: String(raw.key ?? ''),
    server: String(raw.server ?? ''),
    eventName: String(raw.eventname ?? ''),
    contests: (raw.contests as Record<string, string>) ?? {},
    splits: (raw.splits as Record<string, unknown>[]) ?? [],
    tab,
    tabConfig,
    raw,
  };

  if (raw.EventOver !== undefined) result.eventOver = Boolean(raw.EventOver);
  if (raw.Time !== undefined) result.time = Number(raw.Time);
  if (raw.TimerLogo !== undefined) result.timerLogo = String(raw.TimerLogo);
  if (raw.TimerURL !== undefined) result.timerURL = String(raw.TimerURL);
  if (raw.BrandColorDark !== undefined) result.brandColorDark = String(raw.BrandColorDark);
  if (raw.ListCommentsEnabled !== undefined) {
    result.listCommentsEnabled = raw.ListCommentsEnabled as Record<string, boolean>;
  }
  if (raw.ContestColors !== undefined) result.contestColors = raw.ContestColors;

  return result;
}

export class MyRaceResultApi {
  private readonly config: Required<MyRaceResultConfig>;
  private readonly httpClient: AxiosInstance;

  constructor(config: MyRaceResultConfig = {}) {
    this.config = {
      defaultServer: config.defaultServer ?? 'my.raceresult.com',
      https: config.https ?? true,
      timeout: config.timeout ?? 30000,
      userAgent: config.userAgent ?? 'nodejs-myraceresult/1.0',
    };

    this.httpClient = axios.create({
      timeout: this.config.timeout,
      headers: {
        'User-Agent': this.config.userAgent,
      },
    });
  }

  private buildUrl(server: string, path: string): string {
    const protocol = this.config.https ? 'https' : 'http';
    return `${protocol}://${server}/${path.replace(/^\/+/, '')}`;
  }

  private async request<T>(url: string): Promise<T> {
    try {
      const response = await this.httpClient.get<T>(url);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          typeof error.response?.data === 'string'
            ? error.response.data
            : error.message || 'Request failed';
        throw new MyRaceResultError(message, status, error.response?.data);
      }
      throw error;
    }
  }

  /**
   * Fetch page configuration (tab setup, published lists, session key, server shard).
   */
  async getPageConfig(portalId: string, page: string): Promise<PageConfig> {
    const url = this.buildUrl(this.config.defaultServer, `${portalId}/${page}/config`);
    const raw = await this.request<RawPageConfig>(url);
    return normalizePageConfig(raw);
  }

  /**
   * Fetch published list entries for a page.
   */
  async getPublishedLists(portalId: string, page: string): Promise<PublishedListEntry[]> {
    const config = await this.getPageConfig(portalId, page);
    return config.tabConfig.Lists;
  }

  /**
   * Fetch list data as rendered on the portal.
   */
  async getList(params: GetListParams): Promise<ListResponse> {
    let { key, server } = params;

    if (!key || !server) {
      const config = await this.getPageConfig(params.portalId, params.page);
      key = key ?? config.key;
      server = server ?? config.server ?? this.config.defaultServer;
    }

    const query = new URLSearchParams({
      key,
      listname: params.listName,
      page: params.page,
      contest: String(params.contest),
      r: params.rankFilter ?? 'all',
      l: String(params.leader ?? 0),
      fav: params.fav ?? '',
      openedGroups: params.openedGroups ?? '{}',
      term: params.term ?? '',
    });

    const url = `${this.buildUrl(server, `${params.portalId}/${params.page}/list`)}?${query.toString()}`;
    return this.request<ListResponse>(url);
  }

  /**
   * Fetch config and list data for a published list selected by ID, ShowAs, or Name.
   */
  async fetchList(
    portalId: string,
    page: string,
    listSelector: string
  ): Promise<{ config: PageConfig; entry: PublishedListEntry; list: ListResponse }> {
    const config = await this.getPageConfig(portalId, page);
    const lists = config.tabConfig.Lists;
    const selector = listSelector.trim().toLowerCase();

    const entry = lists.find(
      (item) =>
        item.ID.toLowerCase() === selector ||
        item.ShowAs.toLowerCase() === selector ||
        item.Name.toLowerCase() === selector
    );

    if (!entry) {
      const available = lists.map((item) => `${item.ShowAs || item.Name} (${item.ID})`).join(', ');
      throw new MyRaceResultError(
        `List not found: "${listSelector}". Available: ${available || 'none'}`
      );
    }

    const list = await this.getList({
      portalId,
      page,
      listName: entry.Name,
      contest: entry.Contest,
      key: config.key,
      server: config.server,
      leader: entry.Leader,
    });

    return { config, entry, list };
  }
}
