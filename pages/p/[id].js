import fetch from 'isomorphic-unfetch';

import Layout from '../../components/MyLayout';

const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?[pb]>/g, '')}</p>
    <img src={props.show.image.medium} />
  </Layout>
);

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);
  /*
    on clicking the show listed in Index page, this [id] page gets rendered.
    observe that this console message is printed on browser end, not on the server end,
    indicating page is already rendered on the browser, react already running & took control on the browser.
    This also demonstrates the example for splitting the code.
  */

  return { show };
};

export default Post;
