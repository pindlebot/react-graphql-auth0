import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import CreatePost from './CreatePost';

const createPost = gql`
  mutation createPost($description: String!, $title: String!) {
    createPost(description: $description, title: $title) {
      id
      description
      title
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

export default graphql(createPost, {
  props: ({ ownProps, mutate }) => ({
    createPost: ({ description, title }) => mutate({ variables: { description, title } }),
  }),
})(graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(CreatePost));
