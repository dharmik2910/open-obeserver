import { opentelemetry } from '@elysia/opentelemetry'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'

const otlpHeaders: Record<string, string> = {}
const rawHeader = process.env.OTEL_EXPORTER_OTLP_TRACES_HEADERS
if (rawHeader) {
	const separatorIndex = rawHeader.indexOf('=')
	const key = rawHeader.slice(0, separatorIndex)
	const value = rawHeader.slice(separatorIndex + 1)
	otlpHeaders[key] = value
}

export const instrumentation = opentelemetry({
	serviceName: process.env.OTEL_SERVICE_NAME ?? 'elysia-app',
	spanProcessors: [
		new BatchSpanProcessor(
			new OTLPTraceExporter({
				url: process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
				headers: otlpHeaders
			})
		)
	]
})