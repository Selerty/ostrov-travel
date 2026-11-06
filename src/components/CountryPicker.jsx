import { CountryFlag } from "./CountryFlag";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandItem,
} from "./ui/command";
import { countries, countryName } from "../data/destinations";
export function CountryPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const options = [{ id: "any", name: "Любая страна" }, ...countries];
  return (
    <div className="finder-field">
      <Label htmlFor="country">Страна</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="country"
            variant="outline"
            role="combobox"
            aria-label="Страна"
            aria-expanded={open}
            className="country-trigger"
          >
            <CountryFlag country={value} />
            <span>{countryName(value)}</span>
            <ChevronsUpDown size={14} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="country-popover p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Найти страну…"
              aria-label="Поиск страны"
            />
            <CommandList>
              <CommandEmpty>
                Страна не найдена. Попробуйте другое название.
              </CommandEmpty>
              <CommandGroup heading="Страны отдыха">
                {options.map((country) => (
                  <CommandItem
                    key={country.id}
                    value={country.name}
                    onSelect={() => {
                      onChange(country.id);
                      setOpen(false);
                    }}
                  >
                    <CountryFlag country={country.id} />
                  <span>{country.name}</span>
                    {value === country.id && (
                      <Check className="ml-auto" size={16} />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
