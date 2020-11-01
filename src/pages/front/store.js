import React from 'react';
import styles from "./css/store.module.css"
import SearchIcon from '@material-ui/icons/Search';
import {withRouter} from 'react-router-dom';
import { useHistory } from "react-router-dom";

const Store = () => {
    let history = useHistory();

    const handleClick = ()=>{
        history.push('/product_detail')
    }

    return ( 
    <div className={styles.container}>
        <div className={styles.store_card}>
            <h1 className={styles.store_name}>Fliq shop</h1>
            <h1 className={styles.store_location}>koduvally, kozhikode, 673572</h1>
        </div>
        <div className={styles.search_block}>
            <input type="text" className={styles.search} placeholder="search in this store" />
            <SearchIcon fontSize="small" className={styles.search_icon} />
        </div>
        <div className={styles.categories}>
            <div className={styles.margin_left}></div>
            <div className={styles.category_item_selected}>All</div>
            <div className={styles.category_item}>Sandals</div>
            <div className={styles.category_item}>Formals</div>
            <div className={styles.category_item}>Cloths</div>
            <div className={styles.category_item}>Cakes</div>
        </div>
        <div className={styles.products}>
            {/* product item starts here */}
            <div className={styles.product_item} onClick={handleClick}>
                <img src="https://media.thieve.co/products%2F44Qbo6o94pLq4kSQOqz4.jpg?fm=jpg&dpr=1&q=70&w=354&h=354" alt="img"
                className={styles.product_image} />
                <div className={styles.product_details}>
                    <h1 className={styles.product_name}>Pearl Clamshell</h1>
                    <h1 className={styles.product_price}>Rs 299</h1>
                </div>    
            </div>
            {/* product item ends here */}
            {/* product item starts here */}
            <div className={styles.product_item}>
                <img src="https://media.thieve.co/products%2FMQOIJBKhSoCsNuJl6H70.jpg?fm=jpg&dpr=1&q=70&w=354&h=354" alt="img"
                className={styles.product_image} />
                <div className={styles.product_details}>
                    <h1 className={styles.product_name}>Wood Handled Cutlery Set</h1>
                    <h1 className={styles.product_price}>Rs 299</h1>
                </div>    
            </div>
            {/* product item ends here */}
            {/* product item starts here */}
            <div className={styles.product_item}>
                <img src="https://media.thieve.co/products%2FxRXMhrhL6DH1no9pcFmF.jpg?fm=jpg&dpr=1&q=70&w=354&h=354" alt="img"
                className={styles.product_image} />
                <div className={styles.product_details}>
                    <h1 className={styles.product_name}>Glass Tea Infuser</h1>
                    <h1 className={styles.product_price}>Rs 799</h1>
                </div>    
            </div>
            {/* product item ends here */}
            {/* product item starts here */}
            <div className={styles.product_item}>
                <img src="https://media.thieve.co/products%2F9CaqvpFHHEu1ZDTz9Bni.jpg?fm=jpg&dpr=1&q=70&w=354&h=354" alt="img"
                className={styles.product_image} />
                <div className={styles.product_details}>
                    <h1 className={styles.product_name}>Glass Floating Shelf</h1>
                    <h1 className={styles.product_price}>Rs 299</h1>
                </div>    
            </div>
            {/* product item ends here */}
            {/* product item starts here */}
            <div className={styles.product_item}>
                <img src="https://media.thieve.co/products%2F44Qbo6o94pLq4kSQOqz4.jpg?fm=jpg&dpr=1&q=70&w=354&h=354" alt="img"
                className={styles.product_image} />
                <div className={styles.product_details}>
                    <h1 className={styles.product_name}>Pearl Clamshell</h1>
                    <h1 className={styles.product_price}>Rs 299</h1>
                </div>    
            </div>
            {/* product item ends here */}
            {/* product item starts here */}
            <div className={styles.product_item}>
                <img src="https://media.thieve.co/products%2FMQOIJBKhSoCsNuJl6H70.jpg?fm=jpg&dpr=1&q=70&w=354&h=354" alt="img"
                className={styles.product_image} />
                <div className={styles.product_details}>
                    <h1 className={styles.product_name}>Wood Handled Cutlery Set</h1>
                    <h1 className={styles.product_price}>Rs 299</h1>
                </div>    
            </div>
            {/* product item ends here */}
        </div>
    </div> 
    );
}
 
export default withRouter(Store);
