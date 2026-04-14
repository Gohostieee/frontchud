"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  CaretDownIcon,
  CheckIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type SearchOption = {
  value: string;
  label: string;
  description?: string;
  group?: string;
  keywords?: string[];
  disabled?: boolean;
  meta?: ReactNode;
};

type SearchListProps = {
  options: SearchOption[];
  selectedValues: Set<string>;
  onSelect: (value: string) => void;
  emptyText: string;
  closeOnSelect?: boolean;
};

function groupOptions(options: SearchOption[]) {
  const grouped = new Map<string, SearchOption[]>();

  for (const option of options) {
    const group = option.group ?? "";
    const current = grouped.get(group) ?? [];
    current.push(option);
    grouped.set(group, current);
  }

  return [...grouped.entries()];
}

function SearchList({
  options,
  selectedValues,
  onSelect,
  emptyText,
}: SearchListProps) {
  const groupedOptions = useMemo(() => groupOptions(options), [options]);

  return (
    <Command shouldFilter>
      <CommandInput placeholder="Search options" />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        {groupedOptions.map(([group, grouped], groupIndex) => (
          <div key={group || `group-${groupIndex}`}>
            <CommandGroup heading={group || undefined}>
              {grouped.map((option) => {
                const selected = selectedValues.has(option.value);
                const searchableValue = [
                  option.label,
                  option.description,
                  option.value,
                  ...(option.keywords ?? []),
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <CommandItem
                    key={option.value}
                    value={searchableValue}
                    data-checked={selected ? "true" : "false"}
                    disabled={option.disabled}
                    onSelect={() => {
                      if (!option.disabled) {
                        onSelect(option.value);
                      }
                    }}
                    className="items-start gap-3"
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium uppercase tracking-[0.18em] text-accent">
                          {option.label}
                        </span>
                        {option.meta ? option.meta : null}
                      </div>
                      {option.description ? (
                        <span className="text-[0.72rem] leading-5 text-muted-foreground">
                          {option.description}
                        </span>
                      ) : null}
                    </div>
                    <CheckIcon
                      className={cn(
                        "mt-0.5 size-4 shrink-0 text-primary opacity-0",
                        selected && "opacity-100",
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {groupIndex < groupedOptions.length - 1 ? <CommandSeparator /> : null}
          </div>
        ))}
      </CommandList>
    </Command>
  );
}

function SelectionBadges({
  options,
  values,
  onRemove,
}: {
  options: SearchOption[];
  values: string[];
  onRemove?: (value: string) => void;
}) {
  if (!values.length) {
    return (
      <p className="text-[0.72rem] leading-5 text-muted-foreground">
        No selections yet.
      </p>
    );
  }

  const byValue = new Map(options.map((option) => [option.value, option]));

  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => {
        const option = byValue.get(value);
        const label = option?.label ?? value;
        return (
          <Badge key={value} variant="outline" className="h-auto gap-1 px-2 py-1">
            <span className="uppercase tracking-[0.16em]">{label}</span>
            {onRemove ? (
              <button
                type="button"
                onClick={() => onRemove(value)}
                className="inline-flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`Remove ${label}`}
              >
                <XIcon className="size-3" />
              </button>
            ) : null}
          </Badge>
        );
      })}
    </div>
  );
}

export function CompactTextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  description,
  badge,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  description?: string;
  badge?: ReactNode;
  type?: React.ComponentProps<typeof Input>["type"];
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>
        {label}
        {badge ? badge : null}
      </FieldLabel>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
      {description ? <FieldDescription>{description}</FieldDescription> : null}
    </Field>
  );
}

export function CompactTextareaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  description,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  description?: string;
  error?: string | null;
}) {
  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        className="min-h-32"
      />
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      {error ? (
        <p className="text-[0.72rem] leading-5 text-destructive">{error}</p>
      ) : null}
    </Field>
  );
}

export function SearchableSingleSelect({
  label,
  description,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  emptyText = "No options found.",
  disabled = false,
}: {
  label: string;
  description?: string;
  options: SearchOption[];
  value?: string;
  onChange: (value?: string) => void;
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <Field data-disabled={disabled ? true : undefined}>
      <FieldLabel>{label}</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="h-auto min-h-8 w-full justify-between px-3 py-2 font-normal"
            disabled={disabled}
          >
            <span
              className={cn(
                "truncate text-left text-xs uppercase tracking-[0.16em]",
                selected ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {selected?.label ?? placeholder}
            </span>
            <CaretDownIcon data-icon="inline-end" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[min(32rem,calc(100vw-2rem))] p-0" align="start">
          <SearchList
            options={options}
            selectedValues={new Set(value ? [value] : [])}
            onSelect={(nextValue) => {
              onChange(nextValue === value ? undefined : nextValue);
              setOpen(false);
            }}
            emptyText={emptyText}
          />
        </PopoverContent>
      </Popover>
      {selected?.description ? (
        <FieldDescription>{selected.description}</FieldDescription>
      ) : description ? (
        <FieldDescription>{description}</FieldDescription>
      ) : null}
      {value ? (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => onChange(undefined)}
            disabled={disabled}
          >
            <XIcon data-icon="inline-start" />
            Clear
          </Button>
        </div>
      ) : null}
    </Field>
  );
}

export function SearchableMultiSelect({
  label,
  description,
  options,
  values,
  onChange,
  placeholder = "Search and add",
  emptyText = "No options found.",
  maxHeightClassName = "max-h-72",
}: {
  label: string;
  description?: string;
  options: SearchOption[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  emptyText?: string;
  maxHeightClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const selectedValues = new Set(values);
  const selectedCount = values.length;

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="h-auto min-h-8 w-full justify-between px-3 py-2 font-normal"
          >
            <span
              className={cn(
                "truncate text-left text-xs uppercase tracking-[0.16em]",
                selectedCount ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {selectedCount ? `${selectedCount} selected` : placeholder}
            </span>
            <CaretDownIcon data-icon="inline-end" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[min(34rem,calc(100vw-2rem))] p-0"
          align="start"
        >
          <ScrollArea className={cn("w-full", maxHeightClassName)}>
            <SearchList
              options={options}
              selectedValues={selectedValues}
              onSelect={(targetValue) => {
                if (selectedValues.has(targetValue)) {
                  onChange(values.filter((value) => value !== targetValue));
                  return;
                }
                onChange([...values, targetValue]);
              }}
              emptyText={emptyText}
            />
          </ScrollArea>
        </PopoverContent>
      </Popover>
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      <SelectionBadges
        options={options}
        values={values}
        onRemove={(targetValue) =>
          onChange(values.filter((value) => value !== targetValue))
        }
      />
    </Field>
  );
}
