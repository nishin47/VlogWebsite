import React, { useState } from 'react';
import { Checkbox } from 'semantic-ui-react';

interface PrivacyPolicyCheckboxProps {
    handleCheckboxChange: (isChecked: boolean) => void;
}


export default function PrivacyPolicyCheckbox({ handleCheckboxChange }: PrivacyPolicyCheckboxProps) {

    const [isChecked, setIsChecked] = useState(false);

    const onCheckboxChange = () => {
        const updatedValue = !isChecked;
        setIsChecked(updatedValue);
        handleCheckboxChange(updatedValue);
    };

    return (
        <Checkbox
            // label="I agree to BalticMallus.com the Privacy Policy and terms of use"

            label={
                <label>
                  I agree to {' BalticMallus.com '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer">
                     Privacy Policy
                  </a>{' '}
                  
                </label>
              }
            checked={isChecked}
            onChange={onCheckboxChange}
            toggle
            className="teal"
        />
    );
};

