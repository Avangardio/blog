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
    findPopularPosts: jest.fn().mockResolvedValue([new Post()]),
    getPosts: jest.fn().mockResolvedValue([new Post(), new Post()]),
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
  it('getExactPost - с постом', async () => {
    const result = await postService.getExactPost(1);
    expect(result).toBeInstanceOf(Post);
  });
  it('getExactPost - без поста', async () => {
    postRepoMock.findExactPost = jest.fn().mockResolvedValue(null);
    await expect(postService.getExactPost(4242)).rejects.toThrow('NO_POST');
  });
  it('findPosts - с постом', async () => {
    const result = await postService.findPosts(1, {});
    expect(typeof result.hasMore).toBe('boolean');
    expect(result.posts.length).toBe(2);
  });
  it('findPosts - без постов', async () => {
    postRepoMock.getPosts = jest
      .fn()
      .mockResolvedValue({ posts: [], hasMore: false });
    await expect(postService.getExactPost(4242)).rejects.toThrow('NO_POST');
  });
  it('deletePost - с юзером', async () => {
    const result = await postService.deletePost(1, 1);
    expect(result);
  });
  it('deletePost - без юзера', async () => {
    userRepoMock.findUserByUserId = jest.fn().mockResolvedValue(undefined);
    await expect(postService.deletePost(1, 1)).rejects.toThrow('NO_USER');
  });
  it('findPopularPosts - с постами', async () => {
    const result = await postService.findPopularPosts();
    expect(result.length);
  });
  it('findPopularPosts - нет постов', async () => {
    postRepoMock.findPopularPosts = jest.fn().mockResolvedValue([]);
    await expect(postService.findPopularPosts()).rejects.toThrow('NO_POSTS');
  });
});
