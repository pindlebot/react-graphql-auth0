import { graphql, gql, compose } from 'react-apollo';
import CreatePost from './CreatePost';

const createPost = gql`
  mutation($description: String!, $title: String!) {
    createPost(description: $description, title: $title) {
      description
      title
      id
    }
  }
`;

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`;

export default compose(
  graphql(createPost, {
    props: ({ mutate }) => ({
      createPost: ({ description, title }) => mutate({ variables: { description, title } }),
    }),
  }),
  graphql(userQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
)(CreatePost);
