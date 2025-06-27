/**
 * Test script for @sptiming/rr-webapi - mirrors Python test functionality
 */

import { RaceResultApi } from '../src';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../../.env' });

async function testApi() {
  console.log('🧪 Testing RaceResult API Node.js Library');
  console.log('==========================================');

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
      userAgent: 'nodejs-test/1.0',
    });
    console.log('✓ API instance created successfully');

    // Test session ID before login
    console.log(`Session ID before login: ${api.getSessionId() || '(empty)'}`);

    // Attempt login
    console.log('Attempting login with API key...');
    await api.public().login({ apiKey });
    console.log('✓ Login successful');

    // Check session ID after login
    console.log(`Session ID after login: ${api.getSessionId()}`);

    try {
      // Test getting user info
      console.log('Getting user info...');
      const userInfo = await api.public().userInfo();
      console.log(`✓ User info: ${JSON.stringify(userInfo)}`);

      // Test getting event list
      console.log('Getting event list...');
      const events = await api.public().eventList();
      console.log(`✓ Found ${events.length} events`);

      // Show some event details
      if (events.length > 0) {
        console.log('\nFirst 5 events:');
        events.slice(0, 5).forEach((event, i) => {
          const date = event.event_date
            ? event.event_date.toISOString().split('T')[0]
            : 'No date';
          console.log(`  ${i + 1}. ${event.event_name} (ID: ${event.id}) - ${date}`);
        });
        if (events.length > 5) {
          console.log(`  ... and ${events.length - 5} more events`);
        }
      }

      // Open specific event (like in Python test)
      console.log(`\n--- Opening Event 348764 ---`);
      const eventApi = api.eventApi('348764');

      // Get number of participants
      console.log('Getting participant count...');
      const count = await eventApi.data().count('');
      console.log(`✓ This event has ${count} participants.`);

      // Get participant data to find PID for bib 1
      console.log(`\n--- Getting Participant Data for Bib 1 ---`);
      try {
        // Get participant data using data list (with correct field names from web app)
        const participants = await eventApi.data().list(
          ['ID', 'BIB', 'FIRSTNAME', 'LASTNAME', 'CONTEST.NAME'],
          '[BIB]=1',
          ['BIB'],
          0,
          1
        );

        if (participants && participants.length > 0) {
          const participant = participants[0];
          // Data format: [ID, BIB, FIRSTNAME, LASTNAME, CONTEST.NAME]
          const pid = participant[0];
          const bib = participant[1];
          const firstName = participant[2] || '';
          const lastName = participant[3] || '';
          const contest = participant[4] || '';

          console.log(`✓ Found participant: ${firstName} ${lastName} (Bib ${bib}, Contest: ${contest})`);
          console.log(`✓ Participant ID (PID): ${pid}`);

          if (pid) {
            // Get raw data by PID
            console.log(`\n--- Retrieving Raw Data by PID ${pid} ---`);
            const rawData = await eventApi.rawData().getByPid(pid);
            console.log(`✓ Found ${rawData.length} raw data entries for PID ${pid}`);

            if (rawData.length > 0) {
              console.log('Raw data entries:');
              rawData.slice(0, 5).forEach((entry, i) => {
                const time = entry.Time || 'No time';
                const timingPoint = entry.TimingPoint || 'No timing point';
                console.log(`  ${i + 1}. ${timingPoint}: ${time}`);
              });
              if (rawData.length > 5) {
                console.log(`  ... and ${rawData.length - 5} more entries`);
              }
            } else {
              console.log('  No raw data found for this PID');
            }
          } else {
            console.log('❌ Could not find PID for bib 1');
          }
        } else {
          console.log('❌ No participant found with bib 1');
        }
      } catch (error: any) {
        console.log(`❌ Error getting participant/raw data: ${error.message}`);
      }

      // Test some additional API functionality
      console.log('\n--- Testing Additional API Features ---');

      // Test URL building
      const testUrl = api.buildUrl('123', 'test', { param: 'value' });
      console.log(`✓ URL building works: ${testUrl}`);

      // Test event API methods
      console.log(`✓ Event API methods available:`);
      console.log(`   - data(): ${typeof eventApi.data()}`);
      console.log(`   - participants(): ${typeof eventApi.participants()}`);
      console.log(`   - contests(): ${typeof eventApi.contests()}`);
      console.log(`   - rawData(): ${typeof eventApi.rawData()}`);

      // Test configuration access
      const config = api.getConfig();
      console.log(`✓ API configuration: ${JSON.stringify(config, null, 2)}`);

    } finally {
      // Logout
      console.log('\nLogging out...');
      await api.public().logout();
      console.log('✓ Logout successful');
    }

    console.log('\n🎉 All tests passed!');
    return true;

  } catch (error: any) {
    console.error(`❌ Error: ${error.message}`);
    if (error.status) {
      console.error(`   Status: ${error.status}`);
    }
    if (error.response) {
      console.error(`   Response: ${JSON.stringify(error.response, null, 2)}`);
    }
    return false;
  }
}

// Run the test
if (require.main === module) {
  testApi()
    .then(success => {
      if (!success) {
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('💥 Test crashed:', error);
      process.exit(1);
    });
} 