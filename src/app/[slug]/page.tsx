import { connectDB } from '@/lib/mongodb';
import Menu from '@/components/Menu';
import { ICategory } from '@/components/Category';
import { IProduct } from '@/components/Product';
import { Metadata } from 'next';

const notFound = 'Menu não encontrado.';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const menu = await Menu.findOne({ slug });

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

export default async function MenuPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const menu = await Menu.findOne({ slug });

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
