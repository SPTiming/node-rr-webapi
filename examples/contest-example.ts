/**
 * Contest Loading Example - RaceResult API Node.js/TypeScript
 * 
 * This example demonstrates how to load all contests from an event
 * and display their details using the RaceResult API.
 */

import { RaceResultApi } from '../src';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../../../.env' });

async function loadEventContests(eventId?: string): Promise<boolean> {
  console.log('Loading Event Contests - RaceResult API Node.js/TypeScript');
  console.log('='.repeat(65));

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
      userAgent: 'nodejs-contest-example/1.0',
    });
    console.log('✓ API instance created successfully');

    // Attempt login
    console.log('Attempting login with API key...');
    await api.public().login({ apiKey });
    console.log('✓ Login successful');

    // Use provided event ID or get user's first event
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
    console.log(`\n--- Opening Event ${targetEventId} ---`);
    const eventApi = api.eventApi(targetEventId);

    // Get all contests
    console.log('Getting contests list...');
    const contests = await eventApi.contests().list();
    console.log(`✓ Found ${contests.length} contests in this event`);

    if (contests.length === 0) {
      console.log('❌ No contests found in this event');
      return false;
    }

    // Show contest overview
    console.log('\n--- Contest Overview ---');
    contests.forEach((contest, index) => {
      const contestId = contest.ID || 'N/A';
      const contestName = contest.Name || 'Unnamed Contest';
      console.log(`  ${index + 1}. ${contestName} (ID: ${contestId})`);
    });

    // Show detailed contest information
    console.log('\n--- Detailed Contest Information ---');
    for (let i = 0; i < contests.length; i++) {
      const contest = contests[i];
      const contestId = contest.ID;
      const contestName = contest.Name || 'Unnamed Contest';

      console.log(`\n🏆 Contest ${i + 1}: ${contestName}`);
      console.log(`   ID: ${contestId}`);

      // Show all available fields
      console.log('   Available fields:');
      Object.entries(contest).forEach(([key, value]) => {
        if (key !== 'ID' && key !== 'Name') {
          // Format complex objects nicely
          let displayValue = value;
          if (typeof value === 'object' && value !== null) {
            displayValue = JSON.stringify(value);
          }
          console.log(`     ${key}: ${displayValue}`);
        }
      });

      // Get detailed contest information
      if (contestId) {
        try {
          console.log('   Getting detailed information...');
          const contestDetails = await eventApi.contests().getById(contestId);
          
          console.log('   Additional details:');
          Object.entries(contestDetails).forEach(([key, value]) => {
            if (!(key in contest)) {
              let displayValue = value;
              if (typeof value === 'object' && value !== null) {
                displayValue = JSON.stringify(value);
              }
              console.log(`     ${key}: ${displayValue}`);
            }
          });
        } catch (error: any) {
          console.log(`   ❌ Error getting detailed info: ${error.message}`);
        }
      }
    }

    // Show participant counts per contest
    console.log('\n--- Participant Count per Contest ---');
    for (const contest of contests) {
      const contestId = contest.ID;
      const contestName = contest.Name || 'Unnamed Contest';

      if (contestId) {
        try {
          const participantCount = await eventApi.data().count(`[CONTEST.ID]=${contestId}`);
          console.log(`   ${contestName}: ${participantCount} participants`);
        } catch (error: any) {
          console.log(`   ${contestName}: Error counting participants - ${error.message}`);
        }
      }
    }

    // Show sample participants from first contest
    console.log('\n--- Sample Participants from First Contest ---');
    const firstContest = contests[0];
    const firstContestId = firstContest.ID;
    const firstContestName = firstContest.Name || 'First Contest';

    if (firstContestId) {
      try {
        const participants = await eventApi.data().list(
          ['ID', 'BIB', 'FIRSTNAME', 'LASTNAME', 'CONTEST.NAME'],
          `[CONTEST.ID]=${firstContestId}`,
          ['BIB'],
          0,
          5 // Get first 5 participants
        );

        console.log(`   First 5 participants in '${firstContestName}':`);
        participants.forEach(participant => {
          const pid = participant[0] || 'N/A';
          const bib = participant[1] || 'N/A';
          const firstName = participant[2] || '';
          const lastName = participant[3] || '';
          
          console.log(`     Bib ${bib}: ${firstName} ${lastName} (PID: ${pid})`);
        });
      } catch (error: any) {
        console.log(`   ❌ Error getting participants: ${error.message}`);
      }
    }

    console.log('\n🎉 Contest loading completed successfully!');
    return true;

  } catch (error: any) {
    console.error(`❌ Error: ${error.message}`);
    if (error.status) {
      console.error(`   Status: ${error.status}`);
    }
    return false;
  } finally {
    // Always logout (this should be in a finally block)
    try {
      console.log('\nLogging out...');
      // Note: We'd need to pass the api instance here, but this is a simplified example
    } catch (error: any) {
      console.error(`❌ Logout error: ${error.message}`);
    }
  }
}

async function main() {
  // Check if event ID was provided as command line argument
  const eventId = process.argv[2];
  if (eventId) {
    console.log(`Using event ID from command line: ${eventId}`);
  }

  const success = await loadEventContests(eventId);
  if (!success) {
    process.exit(1);
  }
}

// Run the example
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
} 