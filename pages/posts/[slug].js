import { Fragment } from "react";
import PostContetn from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../helpers/posts-util";
import Head from "next/head";

function PostDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.posts.title}</title>
        <meta name="description" content={props.posts.excerpt} />
      </Head>
      <PostContetn post={props.posts} />;
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      posts: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
