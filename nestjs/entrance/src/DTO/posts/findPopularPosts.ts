import Output from '@/DTO/output';

export class FindPopularPosts extends Output {
  payload: {
    posts: object[];
  };
}
