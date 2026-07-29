import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate?: string;
  labels?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, labels = true }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    // Standard target or default 18 hours from now
    const target = targetDate
      ? new Date(targetDate).getTime()
      : Date.now() + (18 * 3600 + 42 * 60 + 15) * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });

      if (diff <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <div className="flex flex-col items-center">
        <div className="bg-orange-500 text-white font-bold text-sm sm:text-base px-2.5 py-1 rounded-lg shadow-sm min-w-[36px] text-center">
          {pad(timeLeft.hours)}
        </div>
        {labels && <span className="text-[10px] uppercase text-gray-500 font-semibold mt-0.5">Hours</span>}
      </div>

      <span className="font-bold text-orange-500 text-base mb-3 sm:mb-4">:</span>

      <div className="flex flex-col items-center">
        <div className="bg-orange-500 text-white font-bold text-sm sm:text-base px-2.5 py-1 rounded-lg shadow-sm min-w-[36px] text-center">
          {pad(timeLeft.minutes)}
        </div>
        {labels && <span className="text-[10px] uppercase text-gray-500 font-semibold mt-0.5">Mins</span>}
      </div>

      <span className="font-bold text-orange-500 text-base mb-3 sm:mb-4">:</span>

      <div className="flex flex-col items-center">
        <div className="bg-orange-500 text-white font-bold text-sm sm:text-base px-2.5 py-1 rounded-lg shadow-sm min-w-[36px] text-center">
          {pad(timeLeft.seconds)}
        </div>
        {labels && <span className="text-[10px] uppercase text-gray-500 font-semibold mt-0.5">Secs</span>}
      </div>
    </div>
  );
};
