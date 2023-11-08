import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test } from '@nestjs/testing';
import UserRepo from '@/Modules/postgres/repositories/userRepo';
import PostRepo from '@/Modules/postgres/repositories/postRepo';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import LikesService from '@/Modules/postgres/likes.service';
import LikeRepo from '@/Modules/postgres/repositories/likeRepo';
import { Post_like } from '@/Modules/postgres/Entities/post_like.entity';

const moduleMocker = new ModuleMocker(global);

describe('LikesService', () => {
  let likesService: LikesService;
  const likesRepoMock = {
    checkUserPostLike: jest.fn().mockResolvedValue(new Post_like()),
    createLike: jest.fn().mockResolvedValue(42),
    deleteLike: jest.fn().mockResolvedValue(1),
  };
  const userRepoMock = {
    findUserByUserId: jest.fn().mockResolvedValue({ userId: 1 }),
  };
  const postRepoMock = {
    findPostByPostId: jest.fn().mockResolvedValue(new Post()),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LikesService],
    })
      .useMocker((token) => {
        if (token === LikeRepo) {
          return likesRepoMock;
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

    likesService = moduleRef.get(LikesService);
  });
  it('Должен инициализироваться', function () {
    expect(likesService).toBeDefined();
  });
  it('createNewLike - пост есть', async () => {
    const result = await likesService.createNewLike(1, 1);
    expect(result).toBe(true);
  });
  it('createNewLike - поста нет', async () => {
    postRepoMock.findPostByPostId = jest.fn().mockResolvedValue(undefined);
    await expect(likesService.deleteLike(1, 1)).rejects.toThrow('NO_POST');
    postRepoMock.findPostByPostId = jest.fn().mockResolvedValue(new Post());
  });
  it('deleteLike - пост есть', async () => {
    const result = await likesService.deleteLike(1, 1);
    expect(result).toBe(false);
  });
  it('deleteLike - поста нет', async () => {
    postRepoMock.findPostByPostId = jest.fn().mockResolvedValue(undefined);
    await expect(likesService.deleteLike(1, 1)).rejects.toThrow('NO_POST');
    postRepoMock.findPostByPostId = jest.fn().mockResolvedValue(new Post());
  });
  it('checkIfUserLikesPosts - пост есть', async () => {
    const result = await likesService.checkIfUserLikesPosts(1, 1);
    expect(result).toBe(true);
  });
  it('checkIfUserLikesPosts - поста нет', async () => {
    postRepoMock.findPostByPostId = jest.fn().mockResolvedValue(undefined);
    await expect(likesService.checkIfUserLikesPosts(1, 1)).rejects.toThrow(
      'NO_POST',
    );
    postRepoMock.findPostByPostId = jest.fn().mockResolvedValue(new Post());
  });
});
