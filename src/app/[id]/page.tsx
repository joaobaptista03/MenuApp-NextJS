import { ICategory } from '@/components/Category';
import { IProduct } from '@/components/Product';
import { notFound } from "@/commonVars";
import Image from 'next/image';
import { getMenuData } from '@/data/getMenuData';
import styles from './menu.module.css'; // Import the CSS module

export default async function MenuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const menu = await getMenuData(id);

  if (!menu) {
    return <h1 className={styles.notFound}>{notFound}</h1>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.menuTitle}>{menu.name}</h1>
      </header>
      {menu.categories.map((category: ICategory) => (
        <div key={category.name} className={styles.category}>
          <h2 className={styles.categoryTitle}>{category.name}</h2>
          {category.description && <p className={styles.categoryDescription}>{category.description}</p>}
          {category.products.map((product: IProduct) => {
            return (
              <div key={product.name} className={styles.product}>
                {product.hasImage && (
                  <div className={styles.productImage}>
                    <Image
                      src={`/data/${id}/products/${product.id}.png`}
                      alt={product.name}
                      width={80}
                      height={80}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className={styles.productDetails}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  {product.description && <p className={styles.productDescription}>{product.description}</p>}
                  <p className={styles.productPrice}>{product.price.toFixed(2)}€</p>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}