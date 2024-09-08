import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState('online')

  // Get the initial status from Chrome storage
  useEffect(() => {
    chrome.storage.local.get(['status'], (result) => {
      if (result.status) {
        setStatus(result.status)
      }
    })
  }, [])

  // Toggle the online/offline status
  const toggleStatus = () => {
    const newStatus = status === 'online' ? 'offline' : 'online'
    chrome.storage.local.set({ status: newStatus }, () => {
      setStatus(newStatus)
    })
  }

  return (
    <div className='App'>
      <h2>User Status</h2>
      <div id='status'>{status.charAt(0).toUpperCase() + status.slice(1)}</div>
      {status === 'offline' && (
        <button onClick={toggleStatus}>
          {status === 'online' ? 'Go Offline' : 'Go Online'}
        </button>
      )}
    </div>
  )
}

export default App
