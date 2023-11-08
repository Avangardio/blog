import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test } from '@nestjs/testing';
import UserRepo from '@/Modules/postgres/repositories/userRepo';
import PostRepo from '@/Modules/postgres/repositories/postRepo';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import MockedClass = jest.MockedClass;
import Mocked = jest.Mocked;
import { AppService } from '@/app.service';
import PostgresService from '@/Modules/postgres/postgres.service';
import CommentsService from '@/Modules/postgres/comments.service';
import { Post_comment } from '@/Modules/postgres/Entities/post_comment.entity';
import CommentRepo from '@/Modules/postgres/repositories/commentRepo';

const moduleMocker = new ModuleMocker(global);

describe('CommentsService', () => {
  let commentsService: CommentsService;
  const commentRepoMock = {
    findPostComments: jest
      .fn()
      .mockResolvedValue([new Post_comment(), new Post_comment()]),
    createComment: jest.fn().mockResolvedValue(42),
    deleteComment: jest.fn().mockResolvedValue(1),
  };
  const userRepoMock = {
    findUserByUserId: jest.fn().mockResolvedValue({ userId: 1 }),
  };
  const postRepoMock = {
    findPostByPostId: jest.fn().mockResolvedValue(new Post()),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CommentsService],
    })
      .useMocker((token) => {
        if (token === CommentRepo) {
          return commentRepoMock;
        }
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

    commentsService = moduleRef.get(CommentsService);
  });
  it('Должен инициализироваться', function () {
    expect(commentsService).toBeDefined();
  });
  it('createNewComment - пост есть', async () => {
    const result = await commentsService.createNewComment(1, 1, 'text');
    expect(result).toBe(42);
  });
  it('createNewComment - поста нет', async () => {
    postRepoMock.findPostByPostId = jest.fn().mockResolvedValue(undefined);
    await expect(
      commentsService.createNewComment(1, 1, 'text'),
    ).rejects.toThrow('NO_POST');
    postRepoMock.findPostByPostId = jest.fn().mockResolvedValue(new Post());
  });
  it('deleteComment - пост есть', async () => {
    const result = await commentsService.deleteComment({
      postId: 1,
      userId: 1,
      commentId: 1,
    });
    expect(result).toBe(false);
  });
  it('deleteComment - поста нет', async () => {
    postRepoMock.findPostByPostId = jest.fn().mockResolvedValue(undefined);
    await expect(
      commentsService.deleteComment({
        postId: 1,
        userId: 1,
        commentId: 1,
      }),
    ).rejects.toThrow('NO_POST');
    postRepoMock.findPostByPostId = jest.fn().mockResolvedValue(new Post());
  });
  it('getPostComments - пост есть', async () => {
    const result = await commentsService.getPostComments(1);
    expect(result.length).toBe(2);
  });
  it('getPostComments - поста нет', async () => {
    postRepoMock.findPostByPostId = jest.fn().mockResolvedValue(undefined);
    await expect(commentsService.getPostComments(1)).rejects.toThrow('NO_POST');
    postRepoMock.findPostByPostId = jest.fn().mockResolvedValue(new Post());
  });
});
