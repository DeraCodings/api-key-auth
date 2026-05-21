import { ZuploRequest, ZuploContext, environment } from "@zuplo/runtime";

export async function injectUpstreamHeaders(
  request: ZuploRequest,
  context: ZuploContext,
) {
  const consumer = request.user;
  const headers = new Headers(request.headers);

  // context.custom.backendUrl = environment.BACKEND_URL

  // Set on `headers`, not request.headers
  // headers.set("x-gateway-secret", environment.GATEWAY_SECRET);

  // Inject account ID from consumer metadata
  const accountId = consumer?.data?.account_id;
  if (accountId) {
    headers.set("x-account-id", accountId);
  }

  context.log.info(`Injecting headers for account: ${accountId}`);

  return new Request(request.url, { method: request.method, headers, body: request.body });
}