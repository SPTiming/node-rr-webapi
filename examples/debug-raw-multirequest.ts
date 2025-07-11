/**
 * Debug Raw MultiRequest - Check raw response
 */

import { RaceResultApi } from '../src';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });

async function debugRawMultiRequest() {
  try {
    const api = new RaceResultApi({
      server: 'events.raceresult.com',
      https: true,
      userAgent: 'debug-raw-multirequest/1.0',
    });

    const apiKey = process.env.RACERESULT_API_KEY;
    if (!apiKey) {
      console.log('❌ No API key found');
      return;
    }

    await api.public().login({ apiKey });
    console.log('✓ Login successful');

    const eventApi = api.eventApi('348764');

    // Test with raw axios request to see the actual response
    console.log('\n--- Testing raw HTTP request ---');
    
    const url = api.buildUrl('348764', 'multirequest');
    const requests = ['contests/get'];
    
    console.log('URL:', url);
    console.log('Payload:', JSON.stringify(requests));
    
    // Make raw request using the internal HTTP client
    const response = await api.makeRequest({
      method: 'POST',
      eventId: '348764',
      endpoint: 'multirequest',
      data: requests,
      contentType: 'application/json'
    });
    
    console.log('Raw response type:', typeof response);
    console.log('Raw response:', JSON.stringify(response, null, 2));
    
    // Test different request formats
    console.log('\n--- Testing different formats ---');
    
    // Test 1: Single contest request
    const result1 = await eventApi.multiRequest(['contests/get']);
    console.log('Single contest result:', result1);
    
    // Test 2: Multiple simple requests
    const result2 = await eventApi.multiRequest(['contests/get', 'data/count']);
    console.log('Multiple simple results:', result2);
    
    // Test 3: Check if the issue is with the endpoint
    console.log('\n--- Testing individual endpoints ---');
    const contestsDirect = await eventApi.contests().list();
    console.log('Direct contests count:', contestsDirect.length);
    
    const countDirect = await eventApi.data().count();
    console.log('Direct count:', countDirect);
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.error('Status:', error.status);
    console.error('Response:', error.response);
  }
}

debugRawMultiRequest(); 