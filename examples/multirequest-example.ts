/**
 * MultiRequest Example - RaceResult API Node.js/TypeScript
 * 
 * This example demonstrates the server-side multirequest functionality
 * that matches the Go and Python libraries.
 */

import { RaceResultApi } from '../src';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../../../.env' });

async function demonstrateMultiRequest(eventId?: string): Promise<boolean> {
  console.log('MultiRequest Example - RaceResult API Node.js/TypeScript');
  console.log('='.repeat(60));

  try {
    // Get configuration from environment variables
    const apiUrl = process.env.RACERESULT_API_URL || 'events.raceresult.com';
    const apiKey = process.env.RACERESULT_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
      console.log('⚠️  Please set RACERESULT_API_KEY in your .env file');
      return false;
    }

    // Create API instance
    console.log('Creating API instance...');
    const api = new RaceResultApi({
      server: apiUrl,
      https: true,
      userAgent: 'nodejs-multirequest-example/1.0',
    });
    console.log('✓ API instance created successfully');

    // Attempt login
    console.log('Attempting login with API key...');
    await api.public().login({ apiKey });
    console.log('✓ Login successful');

    // Use provided event ID or default to example event
    let targetEventId = eventId;
    if (!targetEventId) {
      console.log('Getting your events...');
      const events = await api.public().eventList();
      if (events.length > 0) {
        targetEventId = events[0].id;
        console.log(`✓ Using your event: ${events[0].event_name} (ID: ${targetEventId})`);
      } else {
        targetEventId = '348764'; // Example event ID
        console.log(`✓ Using example event ID: ${targetEventId}`);
      }
    } else {
      console.log(`✓ Using provided event ID: ${targetEventId}`);
    }

    // Open the event
    console.log(`\n--- MultiRequest Demo with Event ${targetEventId} ---`);
    const eventApi = api.eventApi(targetEventId);

    // Example 1: Basic multirequest with different endpoints
    console.log('\n📋 Example 1: Basic MultiRequest');
    console.log('Executing multiple requests in a single call...');
    
    const basicRequests = [
      'contests/get',
      'data/count',
      'file/modjobid'
    ];
    
    console.log('Requests:', basicRequests);
    const basicResults = await eventApi.multiRequest(basicRequests);
    
    console.log('\n✓ Results received:');
    console.log('Full results structure:', JSON.stringify(basicResults, null, 2));
    
    Object.entries(basicResults).forEach(([request, result]) => {
      if (request === 'contests/get') {
        const contests = Array.isArray(result) ? result : [];
        console.log(`  ${request}: ${contests.length} contests`);
        if (contests.length > 0) {
          console.log(`    First contest: ${contests[0].Name || 'Unknown'}`);
        }
      } else if (request === 'data/count') {
        console.log(`  ${request}: ${result} participants`);
      } else if (request === 'file/modjobid') {
        console.log(`  ${request}: ModJobID ${result}`);
      } else {
        console.log(`  ${request}: ${JSON.stringify(result).substring(0, 100)}...`);
      }
    });

    // Example 2: Complex multirequest with parameters
    console.log('\n📋 Example 2: MultiRequest with Parameters');
    console.log('Executing requests with URL parameters...');
    
    const complexRequests = [
      'contests/get',
      'data/count?filter=',
      'part/getfields?bib=1&fields=["FirstName","LastName","Contest.Name"]',
      'rawdata/get?bib=1&filter=&rdFilter={}&addFields=[]&firstRow=0&maxRows=5&sortBy='
    ];
    
    console.log('Requests:', complexRequests);
    const complexResults = await eventApi.multiRequest(complexRequests);
    
    console.log('\n✓ Complex results received:');
    console.log('Complex results structure:', JSON.stringify(complexResults, null, 2).substring(0, 500) + '...');
    
    Object.entries(complexResults).forEach(([request, result]) => {
      if (request.startsWith('contests/get')) {
        const contests = Array.isArray(result) ? result : [];
        console.log(`  ${request}: ${contests.length} contests`);
      } else if (request.startsWith('data/count')) {
        console.log(`  ${request}: ${result} participants`);
      } else if (request.startsWith('part/getfields')) {
        if (result && typeof result === 'object') {
          console.log(`  ${request}: ${JSON.stringify(result)}`);
        } else {
          console.log(`  ${request}: ${result}`);
        }
      } else if (request.startsWith('rawdata/get')) {
        const rawData = Array.isArray(result) ? result : [];
        console.log(`  ${request}: ${rawData.length} raw data entries`);
      } else {
        console.log(`  ${request}: ${JSON.stringify(result).substring(0, 100)}...`);
      }
    });

    // Example 3: Performance comparison
    console.log('\n📋 Example 3: Performance Comparison');
    console.log('Comparing multirequest vs individual requests...');
    
    const testRequests = [
      'contests/get',
      'data/count',
      'file/modjobid'
    ];
    
    // Measure multirequest performance
    const multiStart = Date.now();
    const multiResults = await eventApi.multiRequest(testRequests);
    const multiTime = Date.now() - multiStart;
    
    // Measure individual requests performance
    const individualStart = Date.now();
    const individualResults = await Promise.all([
      eventApi.contests().list(),
      eventApi.data().count(),
      eventApi.get('file/modjobid')
    ]);
    const individualTime = Date.now() - individualStart;
    
    console.log(`\n⚡ Performance Results:`);
    console.log(`  MultiRequest:      ${multiTime}ms`);
    console.log(`  Individual calls:  ${individualTime}ms`);
    console.log(`  Performance gain:  ${((individualTime - multiTime) / individualTime * 100).toFixed(1)}%`);
    
    // Verify results are equivalent
    const multiContests = Array.isArray(multiResults['contests/get']) ? multiResults['contests/get'] : [];
    const individualContests = Array.isArray(individualResults[0]) ? individualResults[0] : [];
    
    console.log(`\n✓ Results verification:`);
    console.log(`  Multi contests:      ${multiContests.length}`);
    console.log(`  Individual contests: ${individualContests.length}`);
    console.log(`  Results match:       ${multiContests.length === individualContests.length ? '✓' : '✗'}`);

    return true;

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.status) {
      console.error(`   Status: ${error.status}`);
    }
    return false;
  } finally {
    console.log('\n🔐 Logging out...');
    try {
      // Note: We don't have access to the api instance in the finally block
      // In a real application, you would handle logout differently
    } catch (logoutError) {
      console.error('Error during logout:', logoutError);
    }
  }
}

// Run the example
if (require.main === module) {
  demonstrateMultiRequest()
    .then(success => {
      if (success) {
        console.log('\n🎉 MultiRequest example completed successfully!');
      } else {
        console.log('\n❌ MultiRequest example failed');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('❌ Unhandled error:', error);
      process.exit(1);
    });
}

export { demonstrateMultiRequest }; 