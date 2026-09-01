import { useState, useEffect, useCallback } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { checkBackendStatus, sendBackendMessage, BACKEND_URL, type BackendStatus, type EchoResponse } from './api'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  // Backend Connection State
  const [loading, setLoading] = useState(false)
  const [statusData, setStatusData] = useState<BackendStatus | null>(null)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [latency, setLatency] = useState<number | null>(null)
  
  // Message Sending State
  const [customMessage, setCustomMessage] = useState('Kamusta Backend! Connected na ba tayo?')
  const [sendingMessage, setSendingMessage] = useState(false)
  const [echoResponse, setEchoResponse] = useState<EchoResponse | null>(null)

  const testConnection = useCallback(async () => {
    setLoading(true)
    setConnectionError(null)
    const startTime = performance.now()
    try {
      const data = await checkBackendStatus()
      const endTime = performance.now()
      setStatusData(data)
      setLatency(Math.round(endTime - startTime))
      setConnectionError(null)
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to connect to backend'
      setConnectionError(errorMsg)
      setStatusData(null)
      setLatency(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    testConnection()
  }, [testConnection])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customMessage.trim()) return

    setSendingMessage(true)
    try {
      const res = await sendBackendMessage(customMessage)
      setEchoResponse(res)
    } catch (err: unknown) {
      alert(`Error sending message: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setSendingMessage(false)
    }
  }

  const isConnected = !!statusData && !connectionError

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <div>
          <h1 className="title">Fullstack Connection Hub</h1>
          <p className="subtitle">
            Frontend (Vite + React) ⇄ Backend (NestJS) via Localhost Ports
          </p>
        </div>

        {/* Ports & Status Bar */}
        <div className="connection-card">
          <div className="port-badges-container">
            <div className="port-badge frontend-badge">
              <span className="badge-label">Frontend Port</span>
              <span className="badge-url">http://localhost:5173</span>
            </div>
            <div className="connection-arrow">
              <span className={`pulse-dot ${isConnected ? 'dot-green' : loading ? 'dot-yellow' : 'dot-red'}`}></span>
              ⇄
            </div>
            <div className="port-badge backend-badge">
              <span className="badge-label">Backend Port</span>
              <span className="badge-url">{BACKEND_URL}</span>
            </div>
          </div>

          <div className="status-header">
            <div className="status-pill-wrapper">
              <span className="status-label">Status:</span>
              {loading ? (
                <span className="status-tag status-connecting">🟡 Connecting...</span>
              ) : isConnected ? (
                <span className="status-tag status-connected">
                  🟢 Connected ({latency}ms)
                </span>
              ) : (
                <span className="status-tag status-disconnected">
                  🔴 Disconnected
                </span>
              )}
            </div>

            <button
              type="button"
              className="action-btn btn-refresh"
              onClick={testConnection}
              disabled={loading}
            >
              {loading ? 'Testing...' : '🔄 Test Connection'}
            </button>
          </div>

          {/* Connection Details or Error message */}
          {isConnected && statusData && (
            <div className="status-details">
              <div className="detail-row">
                <strong>Backend Message:</strong> <span>{statusData.message}</span>
              </div>
              <div className="detail-row">
                <strong>Port:</strong> <code>{statusData.port}</code> | <strong>Env:</strong> <code>{statusData.environment}</code>
              </div>
              <div className="detail-row">
                <strong>Timestamp:</strong> <span>{new Date(statusData.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          )}

          {connectionError && (
            <div className="error-box">
              <p className="error-title">⚠️ Backend is not reachable at <code>{BACKEND_URL}</code></p>
              <p className="error-desc">
                Make sure your NestJS backend is running! Open a terminal and run:
              </p>
              <pre className="error-command">npm run backend:dev</pre>
              <small>Error details: {connectionError}</small>
            </div>
          )}

          {/* Interactive POST Test */}
          <div className="message-tester">
            <h3>Test Sending Data (POST <code>/api/message</code>)</h3>
            <form onSubmit={handleSendMessage} className="message-form">
              <input
                type="text"
                className="message-input"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type a message to send to NestJS backend..."
                disabled={!isConnected && !loading}
              />
              <button
                type="submit"
                className="action-btn btn-send"
                disabled={sendingMessage || (!isConnected && !loading)}
              >
                {sendingMessage ? 'Sending...' : 'Send to Backend'}
              </button>
            </form>

            {echoResponse && (
              <div className="echo-result">
                <span className="echo-label">Backend Response:</span>
                <p className="echo-text">"{echoResponse.echo}"</p>
                <small>Received at: {new Date(echoResponse.timestamp).toLocaleTimeString()}</small>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          React State Counter is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Quick links & documentation</p>
          <ul>
            <li>
              <a href="https://nestjs.com" target="_blank" rel="noreferrer">
                NestJS Docs
              </a>
            </li>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                <img className="logo" src={viteLogo} alt="" />
                Vite Docs
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                <img className="button-icon" src={reactLogo} alt="" />
                React Docs
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Development Commands</h2>
          <p>Commands to run locally</p>
          <ul className="commands-list">
            <li><code>npm run dev</code> (Frontend on :5173)</li>
            <li><code>npm run backend:dev</code> (Backend on :2000)</li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

