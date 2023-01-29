import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PostStats, PostWithStats } from '~/types';
import { useGetPost } from './queries/post';
import useLikePost from './queries/post/useLikePost';
import useUnlikePost from './queries/post/useUnlikePost';

interface Props {
  initialIsLiked: boolean;
  initialLikeCount: number;
  postId: string;
}

const usePostLikeManager = ({ initialIsLiked, initialLikeCount, postId }: Props) => {
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const { mutate: like } = useLikePost();
  const { mutate: unlike } = useUnlikePost();

  const toggleLike = () => {
    if (!isLiked) {
      setLikeCount(likeCount + 1);
      setIsLiked(true);

      like(postId, {
        onSuccess: (postStats: PostStats) => {
          setLikeCount(postStats.likes);
          queryClient.setQueryData<PostWithStats | undefined>(
            useGetPost.getKey(postId),
            (oldState) =>
              oldState && {
                ...oldState,
                postStats,
                isLiked: true,
              },
          );
        },
      });
    } else {
      setLikeCount(likeCount - 1);
      setIsLiked(false);

      unlike(postId, {
        onSuccess: (postStats: PostStats) => {
          setLikeCount(postStats.likes);
          queryClient.setQueryData<PostWithStats | undefined>(
            useGetPost.getKey(postId),
            (oldState) =>
              oldState && {
                ...oldState,
                postStats,
                isLiked: false,
              },
          );
        },
      });
    }
  };

  useEffect(() => {
    setLikeCount(initialLikeCount);
  }, [initialLikeCount]);

  return { isLiked, likeCount, toggleLike };
};

export default usePostLikeManager;
