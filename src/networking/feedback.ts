import gql from 'graphql-tag';

export interface Feedback {
  createdAt: string;
  id: string;
  nps: number;
  feedback: string;
  email: string;
}

export const GET_ALL_FEEDBACK = gql`
  query allFeedback {
    allFeedback {
      createdAt,
      id,
      feedback,
      email,
    }
  }
`;
