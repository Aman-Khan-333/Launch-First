"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "./icons";

type Option = { value: string; label: string };

/** Custom listbox styled to match the form inputs. Submits its value through a hidden input. */
export function Select({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: Option[];
  defaultValue?: string;
}) {
  const id = useId();
  const [value, setValue] = useState(defaultValue ?? options[0].value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selected = options.find((o) => o.value === value) ?? options[0];

  // Close when clicking anywhere outside.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const openMenu = () => {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const choose = (i: number) => {
    setValue(options[i].value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(options.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div className="field" ref={rootRef}>
      <span className="field__label" id={`${id}-label`}>
        {label}
      </span>
      <div className={open ? "select is-open" : "select"}>
        <button
          ref={buttonRef}
          type="button"
          className="field__control select__button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${id}-label ${id}-value`}
          aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
          aria-controls={`${id}-list`}
          onClick={() => (open ? setOpen(false) : openMenu())}
          onKeyDown={onKeyDown}
        >
          <span id={`${id}-value`}>{selected.label}</span>
          <ChevronDown className="select__chevron" />
        </button>
        <ul className="select__menu" id={`${id}-list`} role="listbox" aria-labelledby={`${id}-label`} hidden={!open}>
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={o.value === value}
              className={i === active ? "select__option is-active" : "select__option"}
              onPointerEnter={() => setActive(i)}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => choose(i)}
            >
              {o.label}
              {o.value === value && <Check className="select__tick" />}
            </li>
          ))}
        </ul>
      </div>
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
