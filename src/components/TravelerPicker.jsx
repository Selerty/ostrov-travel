export function TravelerPicker({ adults, childAges, onChange, errors }) {
  const count = childAges.length;
  return <fieldset className="travelers-fieldset">
    <legend>Кто едет</legend>
    <div className="traveler-counter"><div><strong>Взрослые</strong><span>От 18 лет</span></div><div className="counter-controls">
      <button type="button" aria-label="Уменьшить число взрослых" disabled={adults <= 1} onClick={() => onChange({ adults: adults - 1 })}>−</button>
      <output aria-live="polite" aria-label="Количество взрослых">{adults}</output>
      <button type="button" aria-label="Увеличить число взрослых" disabled={adults >= 8} onClick={() => onChange({ adults: adults + 1 })}>+</button>
    </div></div>
    <div className="traveler-counter"><div><strong>Дети</strong><span>До 18 лет</span></div><div className="counter-controls">
      <button type="button" aria-label="Уменьшить число детей" disabled={count === 0} onClick={() => onChange({ childAges: childAges.slice(0, -1) })}>−</button>
      <output aria-live="polite" aria-label="Количество детей">{count}</output>
      <button type="button" aria-label="Увеличить число детей" disabled={count >= 4} onClick={() => onChange({ childAges: [...childAges, ''] })}>+</button>
    </div></div>
    {count > 0 && <div className="children-ages">{childAges.map((age, i) => <label className="finder-field" key={i}><span>Возраст ребёнка {i + 1}</span><select aria-label={`Возраст ребёнка ${i + 1}`} id={`child-${i}`} value={age} onChange={e => onChange({ childAges: childAges.map((v, j) => j === i ? e.target.value : v) })} aria-invalid={!!errors[`child-${i}`]} aria-describedby={errors[`child-${i}`] ? `child-error-${i}` : undefined}><option value="">Выберите возраст</option>{Array.from({ length: 18 }, (_, value) => <option key={value} value={String(value)}>{value === 0 ? 'До 1 года' : `${value} лет`}</option>)}</select>{errors[`child-${i}`] && <span className="field-error" id={`child-error-${i}`}>{errors[`child-${i}`]}</span>}</label>)}</div>}
  </fieldset>;
}
