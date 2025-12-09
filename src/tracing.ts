// src/tracing.ts
import { WebTracerProvider, BatchSpanProcessor } from '@opentelemetry/sdk-trace-web';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';

try {
  // Create a tracer provider
  const provider = new WebTracerProvider({
    // @ts-ignore - Resource compatibility issue between SDK versions
    resource: {
      attributes: {
        [ATTR_SERVICE_NAME]: 'ecommerce-store-frontend',
        [ATTR_SERVICE_VERSION]: '1.0.0',
      },
    },
  });

  // Configure the OTLP exporter to send traces to AI Toolkit
  const exporter = new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces', // AI Toolkit OTLP HTTP endpoint
  });

  // Add a span processor to batch and export traces
  // @ts-ignore - addSpanProcessor type mismatch between SDK versions
  provider.addSpanProcessor(new BatchSpanProcessor(exporter));

  // Register the provider
  provider.register();

  // Auto-instrument fetch and XHR requests
  registerInstrumentations({
    instrumentations: [
      new FetchInstrumentation({
        propagateTraceHeaderCorsUrls: [
          /https:\/\/fakestoreapi\.com\/.*/,
          /localhost/,
        ],
        clearTimingResources: true,
      }),
      new XMLHttpRequestInstrumentation({
        propagateTraceHeaderCorsUrls: [
          /https:\/\/fakestoreapi\.com\/.*/,
          /localhost/,
        ],
      }),
    ],
  });

  console.log('✅ OpenTelemetry tracing initialized');
} catch (error) {
  console.warn('⚠️ Tracing initialization failed (app will continue):', error);
}

export default {};
