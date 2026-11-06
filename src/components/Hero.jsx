import { Header } from './Header';
import { Icon } from './Icon';
import { TripFinder } from './TripFinder';
import { useOceanVideo } from '../hooks/useOceanVideo';
export function Hero({ trip, onChange, onSubmit }) {
  const ocean = useOceanVideo();
  return <section ref={ocean.heroRef} className={`hero ${ocean.playing ? 'is-playing' : ''} ${ocean.hasPlayed ? 'has-played' : ''}`} id="top" aria-labelledby="hero-title">
    <div className="hero-media" aria-hidden="true">
      <img className="hero-poster" src="/assets/surf.jpg" alt="" fetchPriority="high" />
      <video ref={ocean.videoRef} className="hero-video" muted loop playsInline preload="none" poster="/assets/surf.jpg" tabIndex={-1} />
      <div className="hero-shade" />
    </div>
    <div className="hero-inner container">
      <Header />
      <div className="hero-copy">
        <h1 id="hero-title">Меньше «когда-нибудь».<br />Больше океана.</h1>
        <p>Бали в вашем ритме. От первой волны<br className="desktop-break" /> до последнего заката — всё уже продумано.</p>
        <div className="hero-actions"><a className="button button-lime" href="#trip-finder">Подобрать путешествие<Icon name="arrow" /></a></div>
      </div>
      <div className="hero-bottom">
        <TripFinder trip={trip} onChange={onChange} onSubmit={onSubmit} />
        <div className="video-caption"><span>Вдохновлено океаном.</span><button className="video-toggle" type="button" onClick={ocean.toggle} disabled={ocean.failed} aria-label={ocean.playing ? 'Приостановить фоновое видео' : 'Воспроизвести фоновое видео'}><Icon name={ocean.playing ? 'pause' : 'play'} /><span>{ocean.failed ? 'Видео недоступно' : ocean.playing ? 'Пауза видео' : 'Включить видео'}</span></button></div>
      </div>
    </div>
  </section>;
}
