import { ICategory } from '@/components/Category';
import { IProduct } from '@/components/Product';
import { Metadata } from 'next';
import { getMenu } from '@/lib/getMenu';

const notFound = 'Menu não encontrado.';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const menu = await getMenu(slug);

  if (!menu) {
    return {
      title: notFound,
      description: notFound,
    };
  }

  return {
    title: menu.name,
    description: `Menu do ${menu.name}`,
  };
}

export default async function MenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const menu = await getMenu(slug);

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
          {category.products.map((product: IProduct) => (
            <div key={product.name}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price.toFixed(2)}€</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
