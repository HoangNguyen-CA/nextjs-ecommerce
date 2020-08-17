import router from 'next/router';
import { Card, CardImg } from 'reactstrap';

import styles from '../styles/productCard.module.css';
import utilStyles from '../styles/util.module.css';

const Product = (props) => {
  const handleRedirect = () => {
    router.push(`/product/${props.id}`);
  };
  return (
    <Card className={utilStyles.pointer} onClick={handleRedirect}>
      <CardImg top width='10em' src={props.image} />
      <div className={styles.body}>
        <p className={styles.brand}>{props.brand}</p>
        <p className={styles.name}>{props.name}</p>
        <p className={styles.price}>${props.price}</p>
      </div>
    </Card>
  );
};

export default Product;
