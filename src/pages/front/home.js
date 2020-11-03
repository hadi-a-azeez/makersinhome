import React from 'react';
import styles from './css/home.module.css';
/* import ProductsBg from '../../assets/productsbg.png'; */
import ProductsBg2 from '../../assets/productbg2.png';
import LabelHeader from "../../components/labelHeader";

const Home = () => {
    return ( 
    <div className={styles.container}>
        <LabelHeader label={"Makersinhome"} />
        <img src={ProductsBg2} alt="img" className={styles.products_bg} />
        <h1 className={styles.heading_main}>India's largest <br/> online marketplace <br/> for handicrafts </h1>
        <input type="text" placeholder="Search products" className={styles.searchbox} />
        <button className={styles.btn}>Search</button>
    </div>
     );
}
 
export default Home;