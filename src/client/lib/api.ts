import { supabase } from './supabase';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) return {};
  return { Authorization: `Bearer ${session.access_token}` };
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = await getAuthHeaders();

  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error ?? `API error: ${res.status}`);
  }

  return res.json();
}

// SSE streaming helper for chat
export function apiStream(
  path: string,
  body: unknown,
  onDelta: (text: string) => void,
  onDone: (messageId: string) => void,
  onError: (error: string) => void
): AbortController {
  const controller = new AbortController();

  (async () => {
    const headers = await getAuthHeaders();

    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({ error: res.statusText }));
      onError(errorBody.error ?? `API error: ${res.status}`);
      return;
    }

    const reader = res.body?.getReader();
    if (!reader) {
      onError('No response body');
      return;
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const event = JSON.parse(line.slice(6));
            if (event.type === 'delta' && event.text) {
              onDelta(event.text);
            } else if (event.type === 'done') {
              onDone(event.message_id);
            } else if (event.type === 'error') {
              onError(event.error);
            }
          } catch {
            // Skip malformed events
          }
        }
      }
    }
  })().catch(err => {
    if (err.name !== 'AbortError') {
      onError(err.message);
    }
  });

  return controller;
}
