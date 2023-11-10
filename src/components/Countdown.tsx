import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextProps } from 'react-native';

export interface CountdownProps extends TextProps {
  targetDate: Date;
}

export function Countdown({ targetDate, ...textProps }: CountdownProps) {
  const [countdown, setCountdown] = useState('');

  const calculateCountdown = useCallback(() => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setCountdown(
      `${days > 0 ? `${days}d : ` : ''}${hours}h : ${minutes}m : ${seconds}s`
    );
  }, [targetDate]);

  useEffect(() => {
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return <Text {...textProps}>{countdown}</Text>;
}
