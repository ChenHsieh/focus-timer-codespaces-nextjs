import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import styles from '../styles/home.module.css'

function Home() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkSession, setIsWorkSession] = useState(true) // true for work, false for break
  const [completedSessions, setCompletedSessions] = useState(0)
  const [totalSessions, setTotalSessions] = useState(0)
  const [todaySessions, setTodaySessions] = useState(0)

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedTotalSessions = localStorage.getItem('timerTotalSessions')
    const savedDate = localStorage.getItem('timerLastDate')
    const savedTodaySessions = localStorage.getItem('timerTodaySessions')
    const today = new Date().toDateString()

    if (savedTotalSessions) {
      setTotalSessions(parseInt(savedTotalSessions, 10))
    }

    // Reset today's count if it's a new day
    if (savedDate === today && savedTodaySessions) {
      setTodaySessions(parseInt(savedTodaySessions, 10))
    } else {
      setTodaySessions(0)
      localStorage.setItem('timerLastDate', today)
      localStorage.setItem('timerTodaySessions', '0')
    }
  }, [])

  // Save to localStorage whenever sessions change
  const saveSessionData = useCallback((newTotal, newToday) => {
    localStorage.setItem('timerTotalSessions', newTotal.toString())
    localStorage.setItem('timerTodaySessions', newToday.toString())
    localStorage.setItem('timerLastDate', new Date().toDateString())
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTimer = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pauseTimer = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(isWorkSession ? 25 * 60 : 5 * 60)
  }, [isWorkSession])

  const switchSession = useCallback(() => {
    const newIsWorkSession = !isWorkSession
    setIsWorkSession(newIsWorkSession)
    setTimeLeft(newIsWorkSession ? 25 * 60 : 5 * 60)
    setIsRunning(false)
    if (!newIsWorkSession) {
      const newCompletedSessions = completedSessions + 1
      const newTotalSessions = totalSessions + 1
      const newTodaySessions = todaySessions + 1
      
      setCompletedSessions(newCompletedSessions)
      setTotalSessions(newTotalSessions)
      setTodaySessions(newTodaySessions)
      
      saveSessionData(newTotalSessions, newTodaySessions)
    }
  }, [isWorkSession, completedSessions, totalSessions, todaySessions, saveSessionData])

  useEffect(() => {
    let interval = null
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Auto-switch when timer reaches 0
      setIsRunning(false)
      const newIsWorkSession = !isWorkSession
      setIsWorkSession(newIsWorkSession)
      setTimeLeft(newIsWorkSession ? 25 * 60 : 5 * 60)
      if (!newIsWorkSession) {
        const newCompletedSessions = completedSessions + 1
        const newTotalSessions = totalSessions + 1
        const newTodaySessions = todaySessions + 1
        
        setCompletedSessions(newCompletedSessions)
        setTotalSessions(newTotalSessions)
        setTodaySessions(newTodaySessions)
        
        saveSessionData(newTotalSessions, newTodaySessions)
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, isWorkSession, completedSessions, totalSessions, todaySessions, saveSessionData])

  const resetAllStats = useCallback(() => {
    setCompletedSessions(0)
    setTotalSessions(0)
    setTodaySessions(0)
    localStorage.removeItem('timerTotalSessions')
    localStorage.removeItem('timerTodaySessions')
    localStorage.removeItem('timerLastDate')
  }, [])

  return (
    <main className={styles.main}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>
        ⏱️ Focus Timer
      </h1>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          color: isWorkSession ? '#e74c3c' : '#27ae60',
          marginBottom: '1rem'
        }}>
          {isWorkSession ? '🔥 Work Session' : '☕ Break Time'}
        </h2>
        
        <div style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          color: isWorkSession ? '#e74c3c' : '#27ae60',
          marginBottom: '2rem',
          padding: '1rem',
          border: `3px solid ${isWorkSession ? '#e74c3c' : '#27ae60'}`,
          borderRadius: '10px',
          backgroundColor: '#f8f9fa'
        }}>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '2rem'
      }}>
        <Button 
          onClick={isRunning ? pauseTimer : startTimer}
          style={{ 
            backgroundColor: isRunning ? '#f39c12' : '#27ae60',
            color: 'white',
            padding: '12px 24px',
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {isRunning ? '⏸️ Pause' : '▶️ Start'}
        </Button>
        
        <Button 
          onClick={resetTimer}
          style={{ 
            backgroundColor: '#95a5a6',
            color: 'white',
            padding: '12px 24px',
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 Reset
        </Button>
        
        <Button 
          onClick={switchSession}
          style={{ 
            backgroundColor: '#9b59b6',
            color: 'white',
            padding: '12px 24px',
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 Switch to {isWorkSession ? 'Break' : 'Work'}
        </Button>
      </div>

      <hr className={styles.hr} />
      
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem' }}>📊 Session Stats</h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem', 
          maxWidth: '600px', 
          margin: '0 auto 1rem' 
        }}>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px',
            border: '2px solid #e74c3c'
          }}>
            <h4 style={{ margin: '0 0 0.5rem', color: '#e74c3c' }}>Current Session</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              {completedSessions}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#7f8c8d', margin: 0 }}>
              Work sessions completed
            </p>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px',
            border: '2px solid #3498db'
          }}>
            <h4 style={{ margin: '0 0 0.5rem', color: '#3498db' }}>Today</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              {todaySessions}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#7f8c8d', margin: 0 }}>
              Sessions today
            </p>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px',
            border: '2px solid #27ae60'
          }}>
            <h4 style={{ margin: '0 0 0.5rem', color: '#27ae60' }}>All Time</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              {totalSessions}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#7f8c8d', margin: 0 }}>
              Total sessions
            </p>
          </div>
        </div>
        
        <p style={{ color: '#7f8c8d', marginBottom: '1rem' }}>
          Current: {isWorkSession ? '25 min work session' : '5 min break'}
        </p>
        
        <Button 
          onClick={resetAllStats}
          style={{ 
            backgroundColor: '#e74c3c',
            color: 'white',
            padding: '8px 16px',
            fontSize: '0.9rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🗑️ Reset All Stats
        </Button>
      </div>

      <hr className={styles.hr} />
      
      <div style={{ textAlign: 'center', color: '#7f8c8d' }}>
        <h4>⏱️ How to use Focus Timer:</h4>
        <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
          <li>Work for 25 minutes with full focus</li>
          <li>Take a 5-minute break</li>
          <li>Repeat the cycle</li>
          <li>After 4 work sessions, take a longer break (15-30 min)</li>
        </ul>
      </div>
    </main>
  )
}

export default Home
