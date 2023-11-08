import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test } from '@nestjs/testing';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import { AppService } from '@/app.service';
import PostgresService from '@/Modules/postgres/postgres.service';
import { Post_comment } from '@/Modules/postgres/Entities/post_comment.entity';
import CommentsService from '@/Modules/postgres/comments.service';

const moduleMocker = new ModuleMocker(global);

describe('PostService', () => {
  let appService: AppService;
  const likesServiceMock = {
    createNewLike: jest.fn().mockResolvedValue(true),
    deleteLike: jest.fn().mockResolvedValue(true),
    checkIfUserLikesPosts: jest.fn().mockResolvedValue(false),
  };
  const commentsServiceMock = {
    createNewComment: jest.fn().mockResolvedValue(42),
    deleteComment: jest.fn().mockResolvedValue(true),
    getPostComments: jest
      .fn()
      .mockResolvedValue([new Post_comment(), new Post_comment()]),
  };
  const postgresServiceMock = {
    likesService: likesServiceMock,
    commentsService: commentsServiceMock,
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
  it('checkLike', async () => {
    const result = await appService.checkLike({
      userId: 1,
      postId: 1,
    });
    expect(result.code).toBe(200);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('LIKED_FOUND_SUCCEED');
    expect(result.payload.liked).toBe(false);
  });
  it('patchLike', async () => {
    const result = await appService.patchLike({
      postId: 1,
      userId: 1,
    });
    expect(result.code).toBe(201);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('LIKE_SUCCESS');
  });
  it('getPostComments', async () => {
    const result = await appService.getPostComments({
      postId: 1,
    });
    expect(result.code).toBe(200);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('COMMENTS_FOUND_SUCCEED');
    expect(result.payload.comments.length).toBe(2);
  });
  it('createComment', async () => {
    const result = await appService.createComment({
      userId: 1,
      postId: 1,
      text: 'texttext1',
    });
    expect(result.code).toBe(201);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('COMMENT_CREATED');
    expect(result.payload.commentId).toBe(42);
  });
  it('deleteComment', async () => {
    const result = await appService.deleteComment({
      postId: 1,
      userId: 1,
      commentId: 42,
    });
    expect(result.code).toBe(201);
    expect(result.isSucceed).toBe(true);
    expect(result.message).toBe('COMMENT_DELETED');
  });
});
