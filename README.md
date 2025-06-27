# @sptiming/rr-webapi

TypeScript/Node.js client library for RaceResult Web API

## Installation

```bash
npm install @sptiming/rr-webapi
```

## Quick Start

```typescript
import { RaceResultApi } from '@sptiming/rr-webapi';

const api = new RaceResultApi({
  server: 'events.raceresult.com',
  https: true
});

// Login with API key
await api.public().login({ apiKey: 'your-api-key' });

// Get events
const events = await api.public().eventList();
console.log(`Found ${events.length} events`);

// Access specific event
const eventApi = api.eventApi('event-id');
const participants = await eventApi.data().list(['ID', 'BIB', 'FIRSTNAME', 'LASTNAME']);
```

## Features

- 🚀 **Full TypeScript support** with comprehensive type definitions
- 🔄 **Promise-based API** using async/await
- 📦 **Modular design** with organized endpoints
- 🛡️ **Type-safe** request and response handling
- 🔧 **Configurable** HTTP client with custom options

## API Coverage

- **Authentication**: Login/logout with API keys or username/password
- **Events**: List and access event data
- **Participants**: Manage participant information
- **Raw Data**: Access timing data and splits
- **Contests**: Handle contest management
- **General**: Utility functions and helpers

## Documentation

For detailed documentation and examples, visit the [examples](./examples/) directory.

## License

GPL-3.0 © SPTiming

## Support

For issues and questions, please visit our [GitHub Issues](https://github.com/SPTiming/node-rr-webapi/issues).
