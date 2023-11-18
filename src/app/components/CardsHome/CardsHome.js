import styles from './CardsHome.module.css'

import { Poppins } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: '300'
  })

import { FaUserPlus, FaUserMinus, FaUsers  } from "react-icons/fa6";

import * as ReactIcons from 'react-icons/fa';

const IconComponent = ({ iconName }) => {
    const Icon = ReactIcons[iconName];
    return Icon ? <Icon /> : null;
};


export default function CardsHome({icon, name, value}){
    return(
       <div className={`${styles.Card} ${poppins.className}`}>    
           <IconComponent iconName={icon} />
           <h1>{value}</h1>
           <h3>{name}</h3>
       </div>
    )
}