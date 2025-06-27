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
export { ContestsApi } from './endpoints/contests';
export { RawDataApi } from './endpoints/rawdata';

// Default export for convenience
import { RaceResultApi } from './api';
export default RaceResultApi; 