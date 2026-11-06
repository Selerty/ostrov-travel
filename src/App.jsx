import { useState } from 'react';
import { TourResults } from './components/TourResults';
import { Hero } from './components/Hero';
import { Journeys } from './components/Journeys';
import { Approach } from './components/Approach';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { IconLibrary } from './components/Icon';
import { initialTrip } from './data/trip';

export default function App() {
  const [trip, setTrip] = useState(initialTrip);
  const [selection, setSelection] = useState(null);
  const [search, setSearch] = useState(null);
  const updateTrip = patch => setTrip(current => ({ ...current, ...patch }));
  function submitTrip(value) {
    setSearch({ ...value, childAges: [...value.childAges] });
    setSelection(null);
    requestAnimationFrame(() => {
      document.getElementById('tour-results').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      document.getElementById('tour-results').focus({ preventScroll: true });
    });
  }
  function chooseTour(tour) {
    setSelection({ ...search, tour });
    requestAnimationFrame(() => {
      document.getElementById('contact').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      document.getElementById('name')?.focus({ preventScroll: true });
    });
  }
  function selectDestination(destination) {
    updateTrip({ destination });
    requestAnimationFrame(() => document.getElementById('trip-finder').scrollIntoView({ behavior: 'smooth' }));
  }
  return <><IconLibrary /><a className="skip-link" href="#main">К содержимому</a><main id="main">
    <Hero trip={trip} onChange={updateTrip} onSubmit={submitTrip} />
    <TourResults search={search} onSelect={chooseTour} />
    <Journeys onSelect={selectDestination} />
    <Approach />
    <ContactSection selection={selection} />
  </main><Footer /></>;
}
