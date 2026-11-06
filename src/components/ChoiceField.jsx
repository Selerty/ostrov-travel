import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
export function ChoiceField({ id, label, value, onChange, options, error }) {
  return (
    <div className="finder-field">
      <Label htmlFor={id}>{label}</Label>
      <Select value={String(value)} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full min-h-11 bg-white"
        >
          <SelectValue placeholder="Выберите" />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem
              key={typeof o === "string" ? o : o.value}
              value={typeof o === "string" ? o : String(o.value)}
            >
              {typeof o === "string" ? o : o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
