/**
 * Basic usage example for @sptiming/rr-webapi
 */

import { RaceResultApi } from '../src';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../../../.env' });

async function main() {
  console.log('🚀 RaceResult API TypeScript Example');
  console.log('=====================================');

  try {
    // Create API instance
    const api = new RaceResultApi({
      server: process.env.RACERESULT_API_URL || 'events.raceresult.com',
      https: true,
      userAgent: 'typescript-example/1.0',
    });

    const apiKey = process.env.RACERESULT_API_KEY;
    if (!apiKey || apiKey === 'your_api_key_here') {
      console.log('⚠️  Please set RACERESULT_API_KEY in your .env file');
      return;
    }

    // Login
    console.log('🔐 Logging in...');
    await api.public().login({ apiKey });
    console.log('✅ Login successful');
    console.log(`📋 Session ID: ${api.getSessionId()}`);

    try {
      // Get user info
      console.log('\n👤 Getting user info...');
      const userInfo = await api.public().userInfo();
      console.log(`✅ User: ${userInfo.UserName} (Customer: ${userInfo.CustNo})`);

      // Get events
      console.log('\n📅 Getting event list...');
      const events = await api.public().eventList();
      console.log(`✅ Found ${events.length} events`);

      if (events.length > 0) {
        console.log('\nFirst 5 events:');
        events.slice(0, 5).forEach((event, i) => {
          const date = event.event_date ? event.event_date.toISOString().split('T')[0] : 'No date';
          console.log(`  ${i + 1}. ${event.event_name} (ID: ${event.id}) - ${date}`);
        });
      }

      // Open specific event
      const eventId = '348764';
      console.log(`\n📂 Opening event ${eventId}...`);
      const eventApi = api.eventApi(eventId);

      // Get participant count
      console.log('📊 Getting participant count...');
      const count = await eventApi.data().count();
      console.log(`✅ Event has ${count} participants`);

      // Get participant with bib 1
      console.log('\n🏃 Getting participant with bib 1...');
      const participant = await eventApi.data().getParticipantByBib(1);

      if (participant) {
        const [pid, bib, firstName, lastName, contest] = participant;
        console.log(`✅ Found: ${firstName} ${lastName}`);
        console.log(`   📊 Bib: ${bib}, PID: ${pid}, Contest: ${contest}`);

        // Get raw data
        console.log(`\n⏱️  Getting raw data for PID ${pid}...`);
        const rawData = await eventApi.rawData().getByPid(pid);
        console.log(`✅ Found ${rawData.length} raw data entries`);

        if (rawData.length > 0) {
          console.log('\n📋 Raw data entries:');
          rawData.slice(0, 5).forEach((entry, i) => {
            console.log(`   ${i + 1}. ${entry.TimingPoint}: ${entry.Time}`);
          });
          if (rawData.length > 5) {
            console.log(`   ... and ${rawData.length - 5} more entries`);
          }
        }
      } else {
        console.log('❌ No participant found with bib 1');
      }

    } finally {
      // Always logout
      console.log('\n🔐 Logging out...');
      await api.public().logout();
      console.log('✅ Logout successful');
    }

    console.log('\n🎉 Example completed successfully!');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.status) {
      console.error(`   Status: ${error.status}`);
    }
    process.exit(1);
  }
}

// Run the example
if (require.main === module) {
  main();
} 