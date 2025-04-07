'use client';
import { useState } from 'react';
import style from '../style/dropdownSelect.module.css'
interface DropdownSelectProps {
  options: { name: string; description: string }[];
}

const DropdownSelect = ({ options }: DropdownSelectProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null); 
    } else {
      setOpenIndex(index); 
    }
  };

  return (
    <div className={style.wrapperDropdownSelect}>
      {options.map((option, index) => (
        <div key={index} className={style.dropdown}>
          <div onClick={() => toggleDropdown(index)} className={style.dropdownButton}>
            {option.name}
          </div>

          {openIndex === index && (
            <div className={style.dropDownDescription}>
              <p>{option.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DropdownSelect;
