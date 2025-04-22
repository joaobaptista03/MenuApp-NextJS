import { ICategory } from '@/components/Category';
import { IProduct } from '@/components/Product';

export const notFound = 'Menu não encontrado.';

async function getMenu(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/menu/${id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (response.status === 404) {
      return null;
    }
    
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Error fetching menu:', error);
    return null;
  }
}

export default async function MenuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const menu = await getMenu(id);

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
                  <img
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