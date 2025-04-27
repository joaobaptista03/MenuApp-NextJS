"use client";

import { IProduct, ICategory, IMenu } from '@/data/models';
import Image from 'next/image';
import styles from '@/styles/page.module.css';
import { useState, useEffect } from 'react';
import { getMenuData } from '@/data/getMenuData';
import { menuNotFound } from '@/constants';
import { useTheme } from '@/components/ThemeLayout';

export default function MenuPage({ params }: { params: Promise<{ id: string }> }) {
  const { theme } = useTheme();
  const [menu, setMenu] = useState<IMenu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvedId, setResolvedId] = useState<string | null>(null);
  const [visits, setVisits] = useState<number | null>(null);

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
        } else {
          setError('Failed to load menu data.');
        }
        setLoading(false);
      }
    }

    loadMenuData();
  }, [resolvedId]);

  useEffect(() => {
    if (!resolvedId) return;
    
    fetch(`/api/visits?id=${resolvedId}`)
      .then(res => res.json())
      .then((data: { visits: number }) => {
        setVisits(data.visits);
      });
  }, [resolvedId]);

  const themedClassName = (baseClass: string) => {
    if (theme === 'light') {
      return styles[baseClass];
    }

    return styles[baseClass] + " " + styles[`darkMode${baseClass.charAt(0).toUpperCase()}${baseClass.slice(1)}`];
  };

  const renderPage = (title: string, children: React.ReactNode = null) => {
    const header = (
      <header className={themedClassName('header')}>
        <h1 className={themedClassName('menuTitle')}>{title}</h1>
      </header>
    );

    const visitasText = <p className={themedClassName('visitasInfo')}>{visits} visitas</p>;

    const main = (
      <main className={styles.main}>
        {children}
      </main>
    )

    const footer = (
      <footer className={themedClassName('footer')}>
        <p>© {new Date().getFullYear()} MenuApp</p>
      </footer>
    )

    return (
      <div className={themedClassName('container')}>
        {header}
        {visitasText}
        {main}
        {footer}
      </div>
    );
  };

  if (loading) {
    const loadingText = "Loading...";
    const loadingAnimation = (
      <div className={styles.loadingContainer}>
        <Image
          src="/loading.gif"
          alt={loadingText}
          width={80}
          height={80}
          unoptimized
        />
      </div>
    );

    return renderPage(loadingText, loadingAnimation);
  }

  if (error || !menu) {
    return renderPage(menuNotFound);
  }

  const productPicSize = 80;
  const menuRender = menu.categories.map((category: ICategory) => (
    <div key={category.name} className={themedClassName('category')}>
      <h2 className={themedClassName('categoryTitle')}>{category.name}</h2>
      {category.description && <p className={themedClassName('categoryDescription')}>{category.description}</p>}
      {category.products.map((product: IProduct) => (
        <div key={product.name} className={themedClassName('product')}>
          <div className={styles.productImage}>
            <Image
              src={`/data/${resolvedId}/products/${product.id}.png`}
              alt={product.name}
              width={productPicSize}
              height={productPicSize}
              style={{ objectFit: 'cover' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.style.display = 'none';
              }}
            />
          </div>
          <div className={styles.productDetails}>
            <h3 className={themedClassName('productName')}>{product.name}</h3>
            {product.description && <p className={themedClassName('productDescription')}>{product.description}</p>}
            <p className={styles.productPrice}>{product.price.toFixed(2)}€</p>
          </div>
        </div>
      ))}
    </div>
  ));

  return renderPage(menu.name, menuRender);
}