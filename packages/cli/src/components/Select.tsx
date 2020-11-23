/* eslint-disable no-nested-ternary */

import React, { useCallback, useMemo, useState } from 'react';
import { Box, useFocus } from 'ink';
import { isObject, toArray } from '@boost/common';
import { figures } from '@boost/terminal';
import { Prompt, PromptProps } from './internal/Prompt';
import { Style } from './Style';
import { applyStyle } from '../helpers';
import { ScrollableList, ScrollableListProps } from './internal/ScrollableList';

export interface SelectOption<T> {
  divider: boolean;
  index: number;
  label: string;
  value: T;
}

export interface SelectProps<T> extends PromptProps<T[]>, ScrollableListProps {
  defaultSelected?: T | T[];
  multiple?: boolean;
  options: (T | Pick<SelectOption<T>, 'label' | 'value'> | { divider: true })[];
}

function normalizeOptions<T>(options: SelectProps<T>['options']): SelectOption<T>[] {
  return options
    .map((option) => {
      if (isObject(option)) {
        return {
          divider: false,
          index: 0,
          label: '────',
          value: (null as unknown) as T,
          ...option,
        };
      }

      return {
        divider: false,
        index: 0,
        label: String(option),
        value: option,
      };
    })
    .filter((option) => option.value !== null)
    .map((option, index) => {
      // eslint-disable-next-line no-param-reassign
      option.index = index;

      return option;
    });
}

export function Select<T = string>({
  defaultSelected,
  limit,
  multiple,
  onSubmit,
  options: baseOptions,
  scrollType,
  ...props
}: SelectProps<T>) {
  const options = useMemo(() => normalizeOptions(baseOptions), [baseOptions]);
  const optionsLength = useMemo(() => options.length, [options]);
  const [selectedValues, setSelectedValues] = useState(new Set(toArray(defaultSelected)));
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const { isFocused } = useFocus({ autoFocus: true });

  // Selection
  const handleInput = (input: string) => {
    if (multiple && input === ' ') {
      const { value } = options[highlightedIndex];

      if (selectedValues.has(value)) {
        selectedValues.delete(value);
      } else {
        selectedValues.add(value);
      }

      setSelectedValues(new Set(selectedValues));
    }
  };

  const handleReturn = () => {
    let result: Set<T> = selectedValues;

    if (!multiple) {
      result = selectedValues.add(options[highlightedIndex].value);
      setSelectedValues(new Set(selectedValues));
    }

    onSubmit?.(Array.from(result));

    return true;
  };

  // Navigation
  const handleKeyDown = useCallback(() => {
    setHighlightedIndex((index) => {
      const nextIndex = index + 1;

      return nextIndex === optionsLength ? 0 : nextIndex;
    });
  }, [optionsLength]);

  const handleKeyUp = useCallback(() => {
    setHighlightedIndex((index) => {
      const nextIndex = index - 1;

      return nextIndex < 0 ? optionsLength - 1 : nextIndex;
    });
  }, [optionsLength]);

  const handleKeyLeft = useCallback(() => {
    setHighlightedIndex(0);
  }, []);

  const handleKeyRight = useCallback(() => {
    setHighlightedIndex(optionsLength - 1);
  }, [optionsLength]);

  return (
    <Prompt<T[]>
      {...props}
      afterLabel={
        selectedValues.size > 0 && (
          <Style type="notice">{Array.from(selectedValues).join(applyStyle(', ', 'muted'))}</Style>
        )
      }
      focused={isFocused}
      value={Array.from(selectedValues)}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onKeyLeft={handleKeyLeft}
      onKeyRight={handleKeyRight}
      onReturn={handleReturn}
    >
      <ScrollableList currentIndex={highlightedIndex} limit={limit} scrollType={scrollType}>
        {options.map((option) => {
          if (option.divider) {
            return (
              <Box>
                <Style type="muted">────</Style>
              </Box>
            );
          }

          const selected = selectedValues.has(option.value);
          const highlighted = highlightedIndex === option.index;
          const { label, value } = option;

          return (
            <Box key={String(value)} flexDirection="row">
              <Box flexGrow={0} marginRight={1}>
                <Style type={highlighted ? 'info' : selected ? 'notice' : 'muted'}>
                  {highlighted || selected ? figures.pointer : figures.pointerSmall}
                </Style>
              </Box>

              <Box>
                <Style type={highlighted ? 'info' : selected ? 'notice' : 'none'}>{label}</Style>
              </Box>
            </Box>
          );
        })}
      </ScrollableList>
    </Prompt>
  );
}
