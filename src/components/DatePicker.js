import React, { useEffect, useState, useRef } from 'react';
import TetherComponent from 'react-tether';
import moment from 'moment-jalali';
import classnames from 'classnames';
import Calendar from './Calendar';

const DatePicker = props => {
  const {
    defaultValue,
    inputFormat,
    value,
    className,
    timePickerComponent: TimePicker,
    onChange,
    onBlur,
    min,
    max,
    defaultMonth,
    calendarStyles,
    calendarContainerProps,
    disabled,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [momentValue, setMomentValue] = useState(defaultValue || null);
  const [inputValue, setInputValue] = useState(
    defaultValue ? defaultValue.format(inputFormat) : '',
  );

  const outsideClickIgnoreClass = 'ignore--click--outside';
  const newClassName = classnames(className, {
    [outsideClickIgnoreClass]: isOpen,
  });
  const ref = useRef(null);

  useEffect(() => {
    if (momentValue) {
      setInputValue(momentValue.format(inputFormat));
      if (onChange) {
        onChange(momentValue);
      }
    }
  }, [value, momentValue]);

  const bringBackFocus = () => {
    ref.focus();
    setIsOpen(false);
  };

  const handleNewMomentValue = newMomentValue => {
    if (onChange) {
      onChange(momentValue);
    }
    setInputValue(momentValue ? momentValue.format(inputFormat) : '');
    setMomentValue(newMomentValue);
  };

  const handleFocus = () => {
    if (!isOpen) setIsOpen(true);
  };

  const handleBlur = event => {
    if (onBlur) {
      onBlur(event);
    }

    if (momentValue) {
      setInputValue(momentValue.format(inputFormat));
    }
  };

  const handleClickOutsideCalendar = () => {
    setIsOpen(false);
  };

  const handleSelectDay = selectedDay => {
    let newMomentValue = selectedDay.clone();
    if (momentValue) {
      newMomentValue = newMomentValue.set({
        hour: momentValue.hours(),
        minute: momentValue.minutes(),
        second: momentValue.seconds(),
      });
    }
    setMomentValue(newMomentValue);
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
    const newMomentValue = moment(event.target.value, inputFormat);

    if (newMomentValue.isValid()) {
      setMomentValue(newMomentValue);
    }
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleOnKeyDown = event => {
    if (event.key === 'Tab') {
      setIsOpen(false);
    }
  };

  return (
    <TetherComponent attachment="top center">
      <div>
        <input
          className={newClassName}
          type="text"
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          onClick={handleInputClick}
          value={inputValue}
          onKeyDown={handleOnKeyDown}
        />
      </div>
      {isOpen && (
        <div>
          <Calendar
            min={min}
            max={max}
            selectedDay={momentValue}
            defaultMonth={defaultMonth}
            onSelect={handleSelectDay}
            onClickOutside={handleClickOutsideCalendar}
            outsideClickIgnoreClass={outsideClickIgnoreClass}
            styles={calendarStyles}
            containerProps={calendarContainerProps}
            bringBackFocus={bringBackFocus}
          >
            {TimePicker ? (
              <TimePicker
                min={min}
                max={max}
                momentValue={momentValue}
                setMomentValue={handleNewMomentValue}
              />
            ) : null}
          </Calendar>
        </div>
      )}
    </TetherComponent>
  );
};

export default DatePicker;
