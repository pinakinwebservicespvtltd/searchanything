import { useState, useEffect, useCallback } from 'react';

export function useDateTime() {
  const formatDateTime = useCallback(() => {
    const now = new Date();
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(now);
  }, []);

  const [dateTime, setDateTime] = useState(formatDateTime());

  useEffect(() => {
    // Update immediately to sync with system clock
    setDateTime(formatDateTime());
    
    // Update every second
    const timer = setInterval(() => {
      setDateTime(formatDateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [formatDateTime]);

  return { dateTime };
}