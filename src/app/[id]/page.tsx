"use client";

import { ICategory } from '@/components/Category';
import { IProduct } from '@/components/Product';
import { notFound } from "@/commonVars";
import Image from 'next/image';
import styles from './page.module.css';
import { useTheme } from '@/components/ThemeProvider';
import { useState, useEffect } from 'react';
import { getMenuData } from '@/data/getMenuData';

interface Menu {
  name: string;
  categories: ICategory[];
}

interface Params {
  id: string;
}

export default function MenuPage({ params }: { params: Promise<Params> }) {
  const { theme } = useTheme();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvedId, setResolvedId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setResolvedId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    async function loadMenuData() {
      if (resolvedId) {
        const data = await getMenuData(resolvedId, false);
        if (data) {
          setMenu(data);
          setLoading(false);
        } else {
          setError('Failed to load menu data.');
          setLoading(false);
        }
      }
    }

    loadMenuData();
  }, [resolvedId]);

  function header(title: string) {
    return (
      <header className={`${styles.header} ${theme === 'dark' ? styles.darkModeHeader : ''}`}>
        <h1 className={`${styles.menuTitle} ${theme === 'dark' ? styles.darkModeMenuTitle : ''}`}>{title}</h1>
      </header>
    );
  }


  if (loading) {
    return (
      <div className={`${styles.container} ${theme === 'dark' ? styles.darkModeContainer : ''}`}>
        {header('Loading...')}
        <div className={styles.loadingContainer}>
          <Image
            src="/loading.gif"
            alt="Loading..."
            width={80}
            height={80}
          />
        </div>
      </div>
    );
  }

  if (error || !menu) {
    return (
      <div className={`${styles.container} ${theme === 'dark' ? styles.darkModeContainer : ''}`}>
        {header(notFound)}
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.darkModeContainer : ''}`}>
      {header(menu.name)}
      {menu.categories.map((category: ICategory) => (
        <div key={category.name} className={`${styles.category} ${theme === 'dark' ? styles.darkModeCategory : ''}`}>
          <h2 className={`${styles.categoryTitle} ${theme === 'dark' ? styles.darkModeCategoryTitle : ''}`}>{category.name}</h2>
          {category.description && <p className={`${styles.categoryDescription} ${theme === 'dark' ? styles.darkModeCategoryDescription : ''}`}>{category.description}</p>}
          {category.products.map((product: IProduct) => (
            <div key={product.name} className={`${styles.product} ${theme === 'dark' ? styles.darkModeProduct : ''}`}>
              {product.hasImage && (
                <div className={styles.productImage}>
                  <Image
                    src={`/data/${resolvedId}/products/${product.id}.png`}
                    alt={product.name}
                    width={80}
                    height={80}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <div className={styles.productDetails}>
                <h3 className={`${styles.productName} ${theme === 'dark' ? styles.darkModeProductName : ''}`}>{product.name}</h3>
                {product.description && <p className={`${styles.productDescription} ${theme === 'dark' ? styles.darkModeProductDescription : ''}`}>{product.description}</p>}
                <p className={`${styles.productPrice} ${theme === 'dark' ? styles.darkModeProductPrice : ''}`}>{product.price.toFixed(2)}€</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}