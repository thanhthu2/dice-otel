import { NodeSDK } from '@opentelemetry/sdk-node';
import {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} from '@opentelemetry/sdk-trace-node';
import { UndiciInstrumentation } from '@opentelemetry/instrumentation-undici';

const sdk = new NodeSDK({
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
  instrumentations: [new UndiciInstrumentation()],
});
sdk.start();

import { request } from 'undici';

async function fetchDiceRoll() {
    try {
      const { body } = await request('http://localhost:8080/rolldice?rolls=12');
      const text = await body.text();
  
      console.log('Response Body:', text);
  
      try {
        const json = JSON.parse(text);
        console.log('Parsed JSON:', json);
      } catch (jsonError) {
        console.error('JSON Parsing Error:', jsonError);
      }
    } catch (error) {
      console.error('Request Error:', error);
    }
  }
  
  fetchDiceRoll();