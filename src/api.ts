export interface BackendStatus {
  status: string;
  port: number | string;
  message: string;
  timestamp: string;
  environment: string;
}

export interface EchoResponse {
  received: boolean;
  echo: string;
  timestamp: string;
}

export const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:2000';

export async function checkBackendStatus(): Promise<BackendStatus> {
  const response = await fetch(`${BACKEND_URL}/api/status`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function sendBackendMessage(message: string): Promise<EchoResponse> {
  const response = await fetch(`${BACKEND_URL}/api/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
