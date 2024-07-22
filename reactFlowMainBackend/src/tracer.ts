"use strict";

import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import * as opentelemetry from "@opentelemetry/sdk-node";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import * as dotenv from 'dotenv';

dotenv.config();

const otelExporterOtlpHeaders = process.env.OTEL_EXPORTER_OTLP_HEADERS;
console.log('env',otelExporterOtlpHeaders);

const exporterOptions = {
  url: 'https://ingest.in.signoz.cloud:443/v1/traces', 
};

const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  resource: new Resource({   
    [SemanticResourceAttributes.SERVICE_NAME]: "otel-nestjs-app",  
  }),
});

sdk.start();
console.log('OTEL started');


process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => console.log("Tracing terminated"))
    .catch((error) => console.log("Error terminating tracing", error))
    .finally(() => process.exit(0));
});

export default sdk;
