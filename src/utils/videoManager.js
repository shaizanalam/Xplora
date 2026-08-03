import { useEffect, useRef, useState } from 'react';

// Single-video playback manager event
const EVENT_VIDEO_PLAY = 'xplora-video-play';

export function notifyVideoPlaying(activeId) {
  window.dispatchEvent(new CustomEvent(EVENT_VIDEO_PLAY, { detail: { activeId } }));
}

/**
 * Hook for managing interactive video elements:
 * - Lazy loads video when in viewport (IntersectionObserver)
 * - Single video playback: pauses all other videos when one plays
 * - Desktop hover play / leave pause
 * - Mobile tap play with play/pause state
 * - Automatic pause on prefers-reduced-motion: reduce
 */
export function useManagedVideo(videoId, { autoPlayOnMobile = false, isHero = false } = {}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check touch device & reduced motion preference
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      if (mediaQuery.removeEventListener) mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // IntersectionObserver for lazy loading
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (!entry.isIntersecting && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }, { rootMargin: '200px' });

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Listen for other videos starting to play
  useEffect(() => {
    const handleOtherPlay = (e) => {
      if (e.detail?.activeId !== videoId && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener(EVENT_VIDEO_PLAY, handleOtherPlay);
    return () => window.removeEventListener(EVENT_VIDEO_PLAY, handleOtherPlay);
  }, [videoId]);

  // Video playback trigger
  const playVideo = async () => {
    if (!videoRef.current || prefersReducedMotion) return;
    try {
      notifyVideoPlaying(videoId);
      await videoRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const pauseVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    if (!isHero) videoRef.current.currentTime = 0; // Reset for preview cards
    setIsPlaying(false);
  };

  // Hover handlers for Desktop
  const handleMouseEnter = () => {
    if (!isTouchDevice && !isHero && inView && !prefersReducedMotion) {
      playVideo();
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice && !isHero) {
      pauseVideo();
    }
  };

  // Tap handler for Mobile
  const handleTogglePlay = (e) => {
    if (e) e.stopPropagation();
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  return {
    containerRef,
    videoRef,
    inView,
    isPlaying,
    isTouchDevice,
    prefersReducedMotion,
    playVideo,
    pauseVideo,
    handleMouseEnter,
    handleMouseLeave,
    handleTogglePlay,
  };
}
