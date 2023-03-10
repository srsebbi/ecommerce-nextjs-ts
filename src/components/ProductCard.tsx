import imageLoader from '@/utils/imageLoader';
import { Button, ButtonGroup } from '@mui/material';
import styles from '../styles/Product.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@prisma/client';
import { ProductWithReviews } from '@/pages/shop/[category]/[productId]';
import { useShopStore } from '@/lib/store';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductCard = ({ product }: { product: ProductWithReviews }) => {
  const { id, name, url, photographerUrl, photographerName, price, stars } =
    product;
  const [size, setSize] = useState<string>('');
  const updateCart = useShopStore((state) => state.updateCart);
  const updatePrice = useShopStore((state) => state.setTotalPrice);
  const increaseProduct = useShopStore((state) => state.increaseProduct);
  const decreaseProduct = useShopStore((state) => state.decreaseProduct);
  const currentProduct = useShopStore((state) =>
    state.cart.find((p) => p.id === product.id)
  );
  const handleAddToCart = () => {
    // const handleAddToCart = (e: any) => {
    //   e.stopPropagation();
    // setAddedToCart(true);
    updateCart(product);
    updatePrice(product.price!, 'add');
    // };
  };
  const handleIncreaseProduct = () => {
    increaseProduct(product.id);
    updatePrice(product.price!, 'add');
  };
  const handleDecreaseProduct = () => {
    decreaseProduct(product.id);
    updatePrice(product.price!, 'substract');
    // if (currentProduct?.quantity! <= 0) {
    //   setAddedToCart(false);
    // }
  };

  return (
    <div className={styles.productCard}>
      <section className={styles.productContent}>
        <Image
          className={styles.productImage}
          src={url}
          alt={name}
          width={800}
          height={800}
          loader={imageLoader}
          priority
          unoptimized // ver esto  has a "loader" property that does not implement width.
          // Please implement it or use the "unoptimized" property instead.
        />
        <span className={styles.photoCredit}>
          <Link href={photographerUrl}>{photographerName}</Link>
          <span> on </span>
          <Link href={'https://unsplash.com/'}> Unsplash</Link>
        </span>
      </section>
      <section className={styles.productDetails}>
        <ButtonGroup
          color="secondary"
          variant="text"
          aria-label="text button group"
          size="small"
          className={styles.sizes}
        >
          <span>Size:</span>
          <Button
            sx={{
              fontFamily: 'var(--primary-font)',
              fontSize: 20,
              backgroundColor:
                size === 'XS' ? 'rgba(128, 128, 128, 0.288)' : '',
            }}
            onClick={() => setSize('XS')}
          >
            XS
          </Button>
          <Button
            sx={{
              fontFamily: 'var(--primary-font)',
              fontSize: 20,
              backgroundColor: size === 'S' ? 'rgba(128, 128, 128, 0.288)' : '',
            }}
            onClick={() => setSize('S')}
          >
            S
          </Button>
          <Button
            sx={{
              fontFamily: 'var(--primary-font)',
              fontSize: 20,
              backgroundColor: size === 'M' ? 'rgba(128, 128, 128, 0.288)' : '',
            }}
            onClick={() => setSize('M')}
          >
            M
          </Button>
          <Button
            sx={{
              fontFamily: 'var(--primary-font)',
              fontSize: 20,
              backgroundColor: size === 'L' ? 'rgba(128, 128, 128, 0.288)' : '',
            }}
            onClick={() => setSize('L')}
          >
            L
          </Button>
          <Button
            sx={{
              fontFamily: 'var(--primary-font)',
              fontSize: 20,
              backgroundColor:
                size === 'XL' ? 'rgba(128, 128, 128, 0.288)' : '',
            }}
            onClick={() => setSize('XL')}
          >
            XL
          </Button>
          <Button
            sx={{
              fontFamily: 'var(--primary-font)',
              fontSize: 20,
              backgroundColor:
                size === 'XXL' ? 'rgba(128, 128, 128, 0.288)' : '',
            }}
            onClick={() => setSize('XXL')}
          >
            XXL
          </Button>
        </ButtonGroup>
        <div className={styles.productDescription}>
          <h4
            style={{
              textDecoration: 'underline',
              textDecorationColor: 'rgba(0, 0, 0, 0.253)',
            }}
          >
            Description
          </h4>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
          maiores in cumque sequi quam expedita nulla. Ipsum velit rerum, hic
          illo officiis beatae? Quam quidem, esse suscipit quae ab distinctio.
        </div>
        <p className={styles.productStock}>Status: In Stock</p>
        <p className={styles.productPrice}>Price: ${product.price}</p>
        {currentProduct?.quantity ? (
          <div className={styles.updateProductButtons}>
            <button
              onClick={handleDecreaseProduct}
              className={styles.decreaseButton}
            >
              <RemoveIcon />
            </button>
            {currentProduct?.quantity!}
            <button
              onClick={handleIncreaseProduct}
              className={styles.increaseButton}
            >
              <AddIcon />
            </button>
          </div>
        ) : (
          <button onClick={handleAddToCart} className={styles.addToCartButton}>
            ADD TO CART
          </button>
        )}
        {/* <button className={styles.addToCartButton} onClick={handleAddToCart}>

        </button> */}
      </section>
    </div>
  );
};

export default ProductCard;
