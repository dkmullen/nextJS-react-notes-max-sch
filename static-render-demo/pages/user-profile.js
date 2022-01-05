// Example page for using getServerSideProps

export default function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

// As with getStaticProps, this code runs first, and then makes props available to
// the above. This executes on the server, after deployment, not statically generated.
export async function getServerSideProps(context) {
  console.log('Context:', context);
  const { params, req, res } = context;
  return {
    // can also have notFound and redirect, like getStaticProps
    props: {
      username: 'Doc',
    },
  };
}
