import path from 'path'; // from node.js
import fs from 'fs/promises'; // fs is a core node.js module, server-side
import { Fragment } from 'react';

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <h2>Loading...</h2>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  // fs/promises causes readFile to return a promise
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  console.log('Static context:', context);
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true, // see more on notFound in pafes/index.js
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// Lets next know how many dynamic pages it needs
export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true, // retrieve paths not listed in paths, above, in the normal
    // React way (not prgenerated). Problem with true is that page errors out
    // when url is entered in address bar. Fix by either adding a wait condition
    // or by using the string 'blocking' for fallback which waits until ready.
  };
}

export default ProductDetailPage;
