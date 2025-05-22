"use client";

import { IProduct, ICategory, IMenu } from '@/data/models';
import Image from 'next/image';
import styles from '@/styles/page.module.css';
import { useState, useEffect } from 'react';
import { getMenuData } from '@/data/getMenuData';
import { defaultLocale, Constants, getConstantsByLocale } from '@/locale';
import { useTheme } from '@/components/ThemeLayout';
import { themedClassName } from '@/auxFuncs';

export default function MenuPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { theme } = useTheme();
  const [menu, setMenu] = useState<IMenu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [resolvedId, setResolvedId] = useState<string | null>(null);
  const [resolvedLocale, setResolvedLocale] = useState<string | null>(null);
  const [visits, setVisits] = useState<number | null>(null);
  const [constants, setConstants] = useState<Constants>(getConstantsByLocale('', defaultLocale));

  useEffect(() => {
    params.then((resolvedParams) => {
      setResolvedId(resolvedParams.id);
      setResolvedLocale(resolvedParams.locale);
      setConstants(getConstantsByLocale(resolvedParams.id, resolvedParams.locale));
    });
  }, [params]);

  useEffect(() => {
    async function loadMenuData() {
      if (resolvedId && resolvedLocale) {
        const data = await getMenuData(resolvedId, resolvedLocale, false);
        if (data) {
          setMenu(data);
        } else {
          setError(true);
        }
        setLoading(false);
      }
    }

    loadMenuData();
  }, [resolvedId]);

  useEffect(() => {
    if (!resolvedId) return;
    
    fetch(`/api/visits?id=${resolvedId}`)
      .then(res => {
        if (!res.ok) {
          return;
        }
        return res.json()
      })
      .then((data: { visits: number }) => {
        setVisits(data.visits);
      })
  }, [resolvedId]);

  const renderPage = (title: string, children: React.ReactNode = null) => {
    const header = (
      <header className={themedClassName('header', theme, styles)}>
        <h1 className={themedClassName('menuTitle', theme, styles)}>{title}</h1>
      </header>
    );

    let visitsText: React.ReactNode = null;
    if (visits !== null) {
      visitsText = <p className={themedClassName('visitsInfo', theme, styles)}>{constants.visitedText} {visits} {visits == 1 ? constants.timeText : constants.timesText} {constants.todayText}.</p>;
    }    

    const main = (
      <main className={styles.main}>
        {children}
      </main>
    )

    const footer = (
      <footer className={themedClassName('footer', theme, styles)}>
        <p>© {new Date().getFullYear()} MenuApp</p>
      </footer>
    )

    return (
      <div className={themedClassName('container', theme, styles)}>
        {header}
        {visitsText}
        {main}
        {footer}
      </div>
    );
  };

  if (loading) {
    const loadingAnimation = (
      <div className={styles.loadingContainer}>
        <Image
          src="/loading.gif"
          alt={constants.loadingText}
          width={80}
          height={80}
          unoptimized
        />
      </div>
    );

    return renderPage(constants.loadingText, loadingAnimation);
  }

  if (error || !menu) {
    return renderPage(constants.menuNotFound);
  }

  const productPicSize = 80;
  const menuRender = menu.categories.map((category: ICategory) => (
    <div key={category.name} className={themedClassName('category', theme, styles)}>
      <h2 className={themedClassName('categoryTitle', theme, styles)}>{category.name}</h2>
      {category.description && <p className={themedClassName('categoryDescription', theme, styles)}>{category.description}</p>}
      {category.products.map((product: IProduct) => (
        <div key={product.name} className={themedClassName('product', theme, styles)}>
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
            <h3 className={themedClassName('productName', theme, styles)}>{product.name}</h3>
            {product.description && <p className={themedClassName('productDescription', theme, styles)}>{product.description}</p>}
            <p className={styles.productPrice}>{product.price.toFixed(2)}€</p>
          </div>
        </div>
      ))}
    </div>
  ));

  return renderPage(menu.name, menuRender);
}