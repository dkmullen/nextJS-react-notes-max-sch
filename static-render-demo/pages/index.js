import path from 'path'; // from node.js
import fs from 'fs/promises'; // fs is a core node.js module, server-side
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // Since this func runs server-side, we can use node.js code
  // cwd is current working dir which at build is root, not pages
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  // fs/promises causes readFile to return a promise
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  if (data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    // Set a time (in seconds) when page will be revalidated (incremental static
    // regeneration - ISR)
    revalidate: 10,
    // Two other values, which can be used conditionally to handle errors - see above
    // notFound: true, // renders the 404
    // redirect: {
    //   destination: '/no-data'
    // }
  };
}

export default HomePage;
