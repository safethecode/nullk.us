'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EXAM_INFO = {
  examDate: new Date('2026-03-15'), // 2026년 3월 15일 시험
  retakeWaitDays: 90, // 재시험 대기 기간 90일
};

export const CountdownTimer = memo(function CountdownTimer({
  targetDate,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // targetDate를 timestamp로 메모이제이션
  const targetTimestamp = useMemo(() => {
    return new Date(targetDate).getTime();
  }, [targetDate]);

  // 시간 계산 함수를 useCallback으로 메모이제이션
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = Date.now();
    const difference = targetTimestamp - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [targetTimestamp]);

  useEffect(() => {
    // 초기값 설정
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="rounded-2xl p-4 sm:p-6">
        <div className="text-center">
          <h4 className="mb-3 font-semibold text-neutral-800 text-sm sm:text-base">
            공개 예정
          </h4>
          <div className="mb-4 flex flex-wrap justify-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1">
              <div className="font-bold text-lg text-neutral-800 sm:text-2xl">
                {timeLeft.days}
              </div>
              <div className="text-neutral-600 text-xs">일</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="font-bold text-lg text-neutral-800 sm:text-2xl">
                {timeLeft.hours}
              </div>
              <div className="text-neutral-600 text-xs">시간</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="font-bold text-lg text-neutral-800 sm:text-2xl">
                {timeLeft.minutes}
              </div>
              <div className="text-neutral-600 text-xs">분</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="font-bold text-lg text-neutral-800 sm:text-2xl">
                {timeLeft.seconds}
              </div>
              <div className="text-neutral-600 text-xs">초</div>
            </div>
          </div>
          <div className="px-2 text-neutral-600 text-xs leading-relaxed sm:text-sm">
            <p className="mb-1">
              2026년 {EXAM_INFO.examDate.getMonth() + 1}월{' '}
              {EXAM_INFO.examDate.getDate()}일에
            </p>
            <p>
              통과하지 못 하면{' '}
              <span className="font-semibold text-orange-600">
                {EXAM_INFO.retakeWaitDays}일
              </span>
              을 기다려야 해요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
