'use client';

import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import PhoneInput2, { Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "./scroll-area";
import { cn } from "@/lib/utils";

import 'react-phone-number-input/style.css';

// Define the E164Number type as a string that follows the E.164 format
type E164Number = string;

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: E164Number | undefined;
  onChange: (value: E164Number | undefined) => void;
  defaultCountry?: Country;
  disabled?: boolean;
}

export function PhoneInput({
  value,
  onChange,
  defaultCountry = "GB",
  disabled,
  className,
  ...props
}: PhoneInputProps) {
  return (
    <PhoneInput2
      international
      defaultCountry={defaultCountry}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={cn("flex", className)}
      flags={flags}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      {...props}
    />
  );
}

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <Input
    className={cn("rounded-e-lg rounded-s-none", className)}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

interface CountrySelectOption {
  label: string;
  value: Country;
}

interface CountrySelectProps {
  value: Country;
  onChange: (value: Country) => void;
  options: CountrySelectOption[];
  disabled?: boolean;
}

const CountrySelect = ({
  value,
  onChange,
  options,
  disabled,
}: CountrySelectProps) => {
  const handleSelect = React.useCallback(
    (country: Country) => {
      onChange(country);
    },
    [onChange]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn("flex gap-1 rounded-e-none rounded-s-lg px-3")}
          disabled={disabled}
        >
          <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20">
            {value && flags[value]?.({
              title: options.find((option) => option.value === value)?.label,
            })}
          </span>
          <ChevronsUpDown
            className={cn(
              "-mr-2 h-4 w-4 opacity-50",
              disabled ? "hidden" : "opacity-100"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <ScrollArea className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((x) => x.value)
                  .map((option) => (
                    <CommandItem
                      key={option.value}
                      className="gap-2"
                      onSelect={() => handleSelect(option.value)}
                    >
                      <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20">
                        {flags[option.value]?.({ title: option.label })}
                      </span>
                      <span className="flex-1 text-sm">{option.label}</span>
                      {option.value && (
                        <span className="text-foreground/50 text-sm">
                          +{PhoneInput2.getCountryCallingCode(option.value)}
                        </span>
                      )}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          option.value === value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { type PhoneInputProps };