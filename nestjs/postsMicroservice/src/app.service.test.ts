import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test } from '@nestjs/testing';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import { AppService } from '@/app.service';
import PostgresService from '@/Modules/postgres/postgres.service';

const moduleMocker = new ModuleMocker(global);

describe('PostService', () => {
  let appService: AppService;
  const postRepoMock = {
    createNewPost: jest.fn().mockResolvedValue(42),
    findPosts: jest
      .fn()
      .mockResolvedValue({ posts: [new Post(), new Post()], hasMore: true }),
    getExactPost: jest.fn().mockResolvedValue({ postId: 1 }),
    deletePost: jest.fn().mockResolvedValue(undefined),
    findPopularPosts: jest.fn().mockResolvedValue([new Post(), new Post()]),
  };
  const postgresServiceMock = {
    postService: postRepoMock,
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AppService],
    })
      .useMocker((token) => {
        if (token === PostgresService) {
          return postgresServiceMock;
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

    appService = moduleRef.get(AppService);
  });
  it('Должен инициализироваться', function () {
    expect(appService).toBeDefined();
  });
  it('createNewPost', async () => {
    const result = await appService.createNewPost({
      userId: 1,
      newPostData: {
        picture: 'picture',
        description: 'description',
        tags: ['a', 'b'],
        texts: 'texts',
        title: 'title',
      },
    });
    expect(result.code).toBe(201);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('POST_CREATE_SUCCEED');
    expect(result.payload.postId).toBe(42);
  });
  it('getExactPost', async () => {
    const result = await appService.getExactPost({
      postId: 1,
    });
    expect(result.code).toBe(200);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('POST_FOUND_SUCCEED');
    expect(result.payload.postId).toBe(1);
  });
  it('deletePost', async () => {
    const result = await appService.deletePost({
      postId: 1,
      userId: 1,
    });
    expect(result.code).toBe(200);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('POST_DELETE_SUCCEED');
  });
  it('findPosts', async () => {
    const result = await appService.findPosts({
      page: 1,
      criteria: {},
    });
    expect(result.code).toBe(200);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('FIND_SUCCEED');
    expect(result.payload.posts.length === 2).toBeTruthy();
    expect(typeof result.payload.hasMore).toBe('boolean');
  });
  it('findPopularPosts', async () => {
    const result = await appService.findPopularPosts();
    expect(result.code).toBe(200);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('FIND_SUCCEED');
    expect(result.payload.length === 2).toBeTruthy();
  });
});
