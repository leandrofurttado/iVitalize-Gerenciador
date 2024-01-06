'use client'

import { useState } from 'react';


import styles from './Input.module.css'

import * as ReactIcons from 'react-icons/fa';


const IconComponent = ({ iconName }) => {
    const Icon = ReactIcons[iconName];
    return Icon ? <Icon /> : null;
};


export default function Input({ type, name, placeholder, icon, BackgroundInput, showPass, onChange, handleEnterKey }) {

    const [showPassword, setShowPassword] = useState(false)

    function ToggleShowPassword() {
        setShowPassword(!showPassword);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleEnterKey()
        }  
      };

    return (
        <div className={`${styles.Input_Content} ${styles[`${BackgroundInput}`]}`}>
            <label> <IconComponent iconName={icon} /></label>
            {type === 'email' && (
                <input required onChange={onChange} type={type} placeholder={placeholder} className={styles.InputDefault} onKeyDown={handleKeyPress} />
            )}

            {showPass && (
                <>
                    <label className={styles.LabelPassword} onClick={ToggleShowPassword} ><IconComponent iconName={!showPassword ? 'FaEye' : 'FaEyeSlash'} /> </label>
                    <input required onChange={onChange} type={!showPassword ? type : 'text'} placeholder={placeholder} className={styles.InputDefault} onKeyDown={handleKeyPress} />
                </>
            )}
        </div>
    );
}

