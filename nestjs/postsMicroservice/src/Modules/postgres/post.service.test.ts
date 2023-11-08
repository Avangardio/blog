import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import PostService from '@/Modules/postgres/post.service';
import { Test } from '@nestjs/testing';
import UserRepo from '@/Modules/postgres/repositories/userRepo';
import PostRepo from '@/Modules/postgres/repositories/postRepo';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import MockedClass = jest.MockedClass;
import Mocked = jest.Mocked;

const moduleMocker = new ModuleMocker(global);

describe('PostService', () => {
  let postService: PostService;
  const postRepoMock = {
    createPost: jest.fn().mockResolvedValue(42),
    findExactPost: jest.fn().mockResolvedValue(new Post()),
    increasePostViews: jest.fn().mockResolvedValue(1),
    deletePost: jest.fn().mockResolvedValue(new Post()),
    findPopularPosts: jest.fn().mockResolvedValue(new Post()),
  };
  const userRepoMock = {
    findUserByUserId: jest.fn().mockResolvedValue({ userId: 1 }),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PostService],
    })
      .useMocker((token) => {
        if (token === UserRepo) {
          return userRepoMock;
        }
        if (token === PostRepo) {
          return postRepoMock;
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    postService = moduleRef.get(PostService);
  });
  it('Должен инициализироваться', function () {
    expect(postService).toBeDefined();
  });
  it('CreateNewPost', async () => {
    const result = await postService.createNewPost(1, {
      tags: ['tag1', 'tag2'],
      texts: 'Text for test',
      description: 'description',
      title: 'Test title',
      picture: 'pictureURL',
    });
    expect(typeof result).toBe('number');
  });
  it('GetExactPost - с постом', async () => {
    const result = await postService.getExactPost(1);
    expect(result).toBeInstanceOf(Post);
  });
  it('GetExactPost - без поста', async () => {
    postRepoMock.findExactPost = jest.fn().mockResolvedValue(null);
    await expect(postService.getExactPost(4242)).rejects.toThrowError();
  });
});
