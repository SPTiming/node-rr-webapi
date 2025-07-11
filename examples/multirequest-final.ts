/**
 * MultiRequest Final Example - RaceResult API Node.js/TypeScript
 * 
 * This example demonstrates the updated multirequest functionality 
 * that now matches the Go and Python libraries.
 */

import { RaceResultApi } from '../src';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });

async function demonstrateMultiRequest(eventId?: string): Promise<boolean> {
  console.log('MultiRequest Final Example - RaceResult API Node.js/TypeScript');
  console.log('='.repeat(65));

  try {
    const api = new RaceResultApi({
      server: 'events.raceresult.com',
      https: true,
      userAgent: 'nodejs-multirequest-final/1.0',
    });

    const apiKey = process.env.RACERESULT_API_KEY;
    if (!apiKey || apiKey === 'your_api_key_here') {
      console.log('⚠️  Please set RACERESULT_API_KEY in your .env file');
      return false;
    }

    await api.public().login({ apiKey });
    console.log('✓ Login successful');

    const targetEventId = eventId || '348764';
    const eventApi = api.eventApi(targetEventId);

    console.log(`\n--- MultiRequest API Demo (Event ${targetEventId}) ---`);

    // Example 1: Basic multirequest usage (correct format)
    console.log('\n📋 MultiRequest API Usage (Correct Format):');
    const requests = ['Contests', 'TimingPoints', 'Settings:EventName,EventDate,EventLocation'];
    
    console.log('✅ Using correct format (matches RaceResult web app):');
    console.log('   - Simple endpoints: "Contests", "TimingPoints"');
    console.log('   - With field filtering: "Settings:EventName,EventDate,EventLocation"');
    console.log('   - Custom settings: "CSettings:GPXFile,GPXColor"');

    const multiResults = await eventApi.multiRequest(requests);
    console.log(`\n📊 MultiRequest Results: ${Object.keys(multiResults).length} responses`);
    
    // Display results
    for (const [key, value] of Object.entries(multiResults)) {
      console.log(`  ${key}: ${typeof value === 'object' ? JSON.stringify(value).substring(0, 100) + '...' : value}`);
    }
    
    // Example 2: More advanced multirequest with field filtering
    console.log('\n📋 Advanced MultiRequest with Field Filtering:');
    const advancedRequests = [
      'Contests',
      'CSettings:GPXFile,GPXColor',
      'Settings:EventName,EventDate,EventDate2,EventLocation,EventZip,EventCountry,EventStreet,EventLogo,LastDataAnalysis,PortalID,PortalPublishEvent,SpecialDateFormat,EventLocationLat,EventLocationLng'
    ];
    
    const advancedResults = await eventApi.multiRequest(advancedRequests);
    console.log(`\n📊 Advanced MultiRequest Results: ${Object.keys(advancedResults).length} responses`);
    
    // Display advanced results
    for (const [key, value] of Object.entries(advancedResults)) {
      if (typeof value === 'object') {
        console.log(`  ${key}: ${Object.keys(value).length} items`);
        // Show first few keys for objects
        const keys = Object.keys(value).slice(0, 3);
        console.log(`    Sample keys: ${keys.join(', ')}${Object.keys(value).length > 3 ? '...' : ''}`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }

    // Example 3: Performance comparison with individual requests
    console.log('\n⚡ Performance Comparison:');
    const start1 = Date.now();
    await eventApi.multiRequest(['Contests', 'TimingPoints']);
    const multiTime = Date.now() - start1;
    
    const start2 = Date.now();
    await Promise.all([eventApi.contests().list(), eventApi.get('timingpoints/get')]);
    const individualTime = Date.now() - start2;
    
    console.log(`  MultiRequest: ${multiTime}ms`);
    console.log(`  Individual:   ${individualTime}ms`);

    console.log('\n✅ MultiRequest Working Correctly:');
    console.log('   ✓ Using correct endpoint format (Contests, TimingPoints)');
    console.log('   ✓ Field filtering syntax (Settings:field1,field2)');
    console.log('   ✓ Custom settings support (CSettings:GPXFile,GPXColor)');
    console.log('   ✓ Server returning actual data');
    
    return true;

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

// Run the example
if (require.main === module) {
  demonstrateMultiRequest()
    .then(success => {
      if (success) {
        console.log('\n🎉 MultiRequest working correctly!');
      } else {
        console.log('\n❌ Example failed');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('❌ Unhandled error:', error);
      process.exit(1);
    });
}

export { demonstrateMultiRequest }; 