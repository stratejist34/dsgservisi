"use client";

import React, { useEffect, useMemo, useState } from "react";

export interface AnimatedListProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedList = React.memo(
  ({ className, children, delay = 1000 }: AnimatedListProps) => {
    // Başlangıçta en az 1 item görünsün
    const [index, setIndex] = useState(1);
    const [isMounted, setIsMounted] = useState(false);
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    useEffect(() => {
      if (!isMounted || childrenArray.length === 0) return;
      
      const interval = setInterval(() => {
        setIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          // Tüm item'lar gösterildiyse baştan başla
          if (nextIndex >= childrenArray.length) {
            return 1; // En az 1 item göster
          }
          return nextIndex;
        });
      }, delay);

      return () => clearInterval(interval);
    }, [childrenArray.length, delay, isMounted]);

    const itemsToShow = useMemo(() => {
      if (!isMounted || childrenArray.length === 0) {
        return [];
      }
      // index kadar item göster (en az 1)
      const maxIndex = Math.max(1, Math.min(index, childrenArray.length));
      return childrenArray.slice(0, maxIndex).reverse();
    }, [index, childrenArray, isMounted]);

    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        {itemsToShow.map((item, idx) => (
          <AnimatedListItem key={idx}>{item}</AnimatedListItem>
        ))}
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        animation: 'slideInFromBottom 0.5s ease-out',
        animationFillMode: 'backwards',
      }}
    >
      {children}
    </div>
  );
}

