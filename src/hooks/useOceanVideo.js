import { useEffect, useRef, useState } from 'react';

export function useOceanVideo() {
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    let disposed = false;
    const play = async () => {
      if (!video.getAttribute('src')) { video.src = '/assets/ocean-loop.mp4'; video.load(); }
      try { await video.play(); if (disposed) video.pause(); } catch { /* Poster remains visible. */ }
    };
    const onPlaying = () => { setPlaying(true); setHasPlayed(true); };
    const onPause = () => setPlaying(false);
    const onError = () => { setFailed(true); setPlaying(false); setHasPlayed(false); };
    const sync = () => {
      if (document.hidden || !visible || reduced.matches || navigator.connection?.saveData || manuallyPaused.current) video.pause();
      else play();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .05 });
    observer.observe(heroRef.current);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);
    video.addEventListener('error', onError);
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    return () => {
      disposed = true; observer.disconnect(); video.pause();
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('error', onError);
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', sync);
    };
  }, []);

  async function toggle() {
    const video = videoRef.current;
    if (!video.paused) { manuallyPaused.current = true; video.pause(); return; }
    manuallyPaused.current = false;
    if (!video.getAttribute('src')) { video.src = '/assets/ocean-loop.mp4'; video.load(); }
    try { await video.play(); } catch { /* Native playback may be unavailable. */ }
  }
  return { videoRef, heroRef, playing, hasPlayed, failed, toggle };
}
