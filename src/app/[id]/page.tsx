import { ICategory } from '@/components/Category';
import { IProduct } from '@/components/Product';
import { notFound } from "@/commonVars";
import Image from 'next/image';
import { getMenuData } from '@/data/getMenu';

export default async function MenuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const menu = await getMenuData(id);

  if (!menu) {
    return <h1>{notFound}</h1>;
  }

  return (
    <div>
      <h1>{menu.name}</h1>
      {menu.categories.map((category: ICategory) => (
        <div key={category.name}>
          <h2>{category.name}</h2>
          <p>{category.description}</p>
          {category.products.map((product: IProduct) => {
            return (
              <div key={product.name}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price.toFixed(2)}€</p>
                {product.hasImage && (
                  <Image
                    src={`/data/${id}/products/${product.id}.png`}
                    alt={product.name}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}