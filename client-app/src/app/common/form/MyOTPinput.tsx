import { useMemo } from 'react';
import { RE_DIGIT } from '../../../../src/app/models/constants';

interface Props {
    value: string;
    valueLength: number;
    onChange: (value: string) => void;
}

export default function MyOTPinput(props: Props) {

    const valueItems = useMemo(() => {
        const valueArray = props.value.split('');
        const items: Array<string> = [];

        for (let i = 0; i < props.valueLength; i++) {
            const char = valueArray[i];

            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }

        return items;
    }, [props.value, props.valueLength]);


    const focusToNextInput = (target: HTMLElement) => {
        const nextElementSibling =
            target.nextElementSibling as HTMLInputElement | null;

        if (nextElementSibling) {
            nextElementSibling.focus();
        }
    };
    const focusToPrevInput = (target: HTMLElement) => {
        const previousElementSibling =
            target.previousElementSibling as HTMLInputElement | null;

        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };

    const inputOnChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        idx: number
    ) => {
        const target = e.target;
        let targetValue = target.value;
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }

        targetValue = isTargetValueDigit ? targetValue : ' ';

        const targetValueLength = targetValue.length;

        if (targetValueLength === 1) {
            const newValue =
                props.value.substring(0, idx) + targetValue + props.value.substring(idx + 1);

            props.onChange(newValue);

            if (!isTargetValueDigit) {
                return;
            }

            focusToNextInput(target);

            const nextElementSibling =
                target.nextElementSibling as HTMLInputElement | null;

            if (nextElementSibling) {
                nextElementSibling.focus();
            }
        } else if (targetValueLength === props.valueLength) {
            props.onChange(targetValue);

            target.blur();
        }
    };

    const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const target = e.target as HTMLInputElement;
        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault();
            return focusToPrevInput(target);
        }

        const targetValue = target.value;



        // keep the selection range position
        // if the same digit was typed
        target.setSelectionRange(0, targetValue.length);

        if (e.key !== 'Backspace' || target.value !== '') {
            return;
        }
        focusToPrevInput(target);
        const previousElementSibling =
            target.previousElementSibling as HTMLInputElement | null;

        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };

    const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { target } = e;

        target.setSelectionRange(0, target.value.length);
    };


    return (

        <div className="otp-group">
            {valueItems.map((digit, idx) => (
                <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{1}"
                    maxLength={props.valueLength}
                    onChange={(e) => inputOnChange(e, idx)}
                    onFocus={inputOnFocus}
                    onKeyDown={inputOnKeyDown}
                    className="otp-input"
                    value={digit}
                />
            ))}
        </div>
    )


}