import React,{useState} from "react"
import styles from "./css/productDetail.module.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import WhatsappLogo from '../../assets/logo-whatsapp.svg';
import FavouritesIcon from '../../assets/heart-outline.svg';

const ProductDetail = () => {

    return ( <div className={styles.container}>
        <Carousel className={styles.image_slider} infiniteLoop dynamicHeight showThumbs={false} showStatus={false}>
                <div style={{height : 300, backgroundColor : `white`}}>
                    <img src="https://media.thieve.co/products%2FYfh8gPnQoU3pTMoqW5DG.jpg?fm=jpg&dpr=1&q=70&w=354&h=354" 
                        style={{borderRadius : 20, objectFit : `none`, objectPosition : `center` , height : 300,}}
                     />
                </div>
                <div style={{height : 300}}>
                    <img src="https://media.thieve.co/products%2FYfh8gPnQoU3pTMoqW5DG.jpg?fm=jpg&dpr=1&q=70&w=354&h=354" />
                </div >
                <div style={{height : 300}}>
                    <img src="https://media.thieve.co/products%2FEJRVE8xNp9IhyXoM9kF9.jpg?fm=jpg&dpr=1&q=70&w=354&h=354" />
                </div>
                <div style={{height : 300}}>
                    <img src="https://media.thieve.co/products%2FEJRVE8xNp9IhyXoM9kF9.jpg?fm=jpg&dpr=1&q=70&w=354&h=354" />
                </div>    
        </Carousel>
        <div className={styles.product_details}>
            <h1 className={styles.product_name}>Succulent</h1>
            <h1 className={styles.product_price}>Rs 399</h1>
            <h1 className={styles.desc_heading}>Description</h1>
            <h1 className={styles.description}>generates awesome professional/creative profile pics from any photo. It uses background removal AI, beautifies yout photo and generates dozens of profile pic </h1>
        </div>
        <button className={styles.btn_whatsapp}><img src={WhatsappLogo} alt="w" className={styles.whatsappicon} />Buy on whatsapp</button>
        <button className={styles.btn_favourites}><img src={FavouritesIcon} alt="w" className={styles.favouritesicon} />Add to favourites</button>
    </div> );
}
 
export default ProductDetail;