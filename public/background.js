chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.scripting.executeScript({
    target: { tabId: activeInfo.tabId },
    func: () => {
      let activityTimeout
      const inactivityPeriod = 10 * 1000
      function resetInactivityTimeout() {
        clearTimeout(activityTimeout)
        setStatus('online')
        activityTimeout = setTimeout(() => {
          setStatus('offline')
        }, inactivityPeriod)
      }

      function setStatus(status) {
        chrome.storage.local.set({ status }, function () {
          console.log(`User is now ${status}`)
        })
      }

      document.addEventListener('mousemove', resetInactivityTimeout)
      document.addEventListener('keydown', resetInactivityTimeout)
      // resetInactivityTimeout()
    }
  })
})

chrome.tabs.onUpdated.addListener((activeInfo) => {
  console.log('tabs updated')
})

chrome.tabs.onCreated.addListener((activeInfo) => {
  console.log('tabs created')
})

chrome.tabs.onHighlighted.addListener((activeInfo) => {
  console.log('tabs onHighlighted')
})
