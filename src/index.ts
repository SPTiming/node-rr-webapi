/**
 * @sptiming/rr-webapi - TypeScript/Node.js client for RaceResult Web API
 */

// Main API class
export { RaceResultApi } from './api';

// Types
export * from './types';

// Endpoint classes (for advanced usage)
export { PublicApi } from './endpoints/public';
export { EventApi } from './endpoints/event';
export { GeneralApi } from './endpoints/general';
export { DataApi } from './endpoints/data';
export { ParticipantsApi } from './endpoints/participants';
export { ResultsApi } from './endpoints/results';
export { SimpleApi, generateSimpleApiKey } from './endpoints/simpleapi';
export { WebHooksApi } from './endpoints/webhooks';
export { RankingsApi } from './endpoints/rankings';
export { ContestsApi } from './endpoints/contests';
export { RawDataApi } from './endpoints/rawdata';
export { AgeGroupsApi, type AgeGroup } from './endpoints/agegroups';
export { MyRaceResultApi, flattenListRows, MyRaceResultError } from './my-raceresult';
export type {
  FlatListRow,
  GetListParams,
  ListResponse,
  MyRaceResultConfig,
  PageConfig,
  PortalTab,
  PublishedListEntry,
  TabConfig,
} from './my-raceresult';

// Default export for convenience
import { RaceResultApi } from './api';
export default RaceResultApi; 