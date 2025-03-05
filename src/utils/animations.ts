
import { useEffect, useState } from 'react';

// Hook to control staggered animation entries
export const useStaggeredAnimation = (
  itemCount: number, 
  staggerDelay: number = 100
) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);

  useEffect(() => {
    const newVisibleItems: boolean[] = [];
    
    // Set all items initially invisible
    for (let i = 0; i < itemCount; i++) {
      newVisibleItems.push(false);
    }
    setVisibleItems(newVisibleItems);

    // Gradually make items visible with staggered delay
    const timeouts: NodeJS.Timeout[] = [];
    
    for (let i = 0; i < itemCount; i++) {
      const timeout = setTimeout(() => {
        setVisibleItems(prev => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });
      }, i * staggerDelay);
      
      timeouts.push(timeout);
    }

    // Cleanup function
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [itemCount, staggerDelay]);

  return visibleItems;
};

// Hook for creating smooth value transitions
export const useSmoothValue = (
  targetValue: number, 
  duration: number = 500
) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  
  useEffect(() => {
    let startValue = displayValue;
    const range = targetValue - startValue;
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const updateValue = () => {
      const now = Date.now();
      if (now >= endTime) {
        setDisplayValue(targetValue);
        return;
      }
      
      const elapsed = now - startTime;
      const progress = elapsed / duration;
      const easedProgress = easeOutCubic(progress);
      const currentValue = startValue + range * easedProgress;
      
      setDisplayValue(currentValue);
      requestAnimationFrame(updateValue);
    };
    
    requestAnimationFrame(updateValue);
    
    return () => {
      // No explicit cleanup needed for requestAnimationFrame
    };
  }, [targetValue, duration]);
  
  return displayValue;
};

// Easing function for smooth animations
const easeOutCubic = (x: number): number => {
  return 1 - Math.pow(1 - x, 3);
};

// Hook to add entrance animation with delay
export const useEntranceAnimation = (delay: number = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [delay]);
  
  return isVisible;
};
