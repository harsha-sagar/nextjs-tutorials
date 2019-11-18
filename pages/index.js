import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
/*
   isomorphic-unfetch library is a simple implementation of the browser fetch API.
   Works both in client and server environments.
*/

import Layout from '../components/MyLayout';

const Index = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link href="/p/[id]" as={`/p/${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);
  /*
    just refresh the page, observe that this message is printed only in the server console, not on the browser console,
    indicating page rendered on the server end & no reason to fetch it again in the client.
  */

  return {
    shows: data.map(entry => entry.show)
  };
};
/*
  getInitialProps works only for component exported by page (Index component in this example),
  won't work for regular components (Layout component in this example)
*/

export default Index;
