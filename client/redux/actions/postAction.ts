import axios from 'axios';
import {URI} from '../URI';
import {Dispatch} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

// create post
export const createPostAction =
  (
    title: string,
    image: string,
    user: Object,
    replies: Array<{title: string; image: string; user: object}>,
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: 'postCreateRequest',
      });
      const config = {headers: {'Content-Type': 'application/json'}};
      const token = await AsyncStorage.getItem('token');
      const {data} = await axios.post(
        'http://192.168.100.16:8000/api/v1/create-post',
        {title, image, user, replies},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // },
      );
      dispatch({
        type: 'postCreateSuccess',
        payload: data.user,
      });
    } catch (error: any) {
      console.log(error.message);
      dispatch({
        type: 'postCreateFailed',
        payload: error.response.data.message,
      });
    }
  };

// // get all Posts
export const getAllPosts = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: 'getAllPostRequest',
    });

    const token = await AsyncStorage.getItem('token');
    const {data} = await axios.get(
      `http://192.168.100.16:8000/api/v1/get-all-posts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    dispatch({
      type: 'getAllPostSuccess',
      payload: data.posts,
    });
  } catch (error: any) {
    dispatch({
      type: 'getAllPostFailed',
      payload: error.response.data.message,
    });
  }
};

interface LikesParams {
  postId: string;
  posts: any;
  user: any;
  replyId?: string | null;
  title?: string;
  singleReplyId?: string;
}

// add likes
// export const addLikes =
//   ({postId, posts, user}: LikesParams) =>
//   async (dispatch: Dispatch<any>) => {
//     try {
//       const token = await AsyncStorage.getItem('token');

//       const updatedPosts = posts.map((userObj: any) =>
//         userObj._id === postId
//           ? {
//               ...userObj,
//               likes: [
//                 ...userObj.likes,
//                 {
//                   userName: user.name,
//                   userId: user._id,
//                   userAvatar: user.avatar.url,
//                   postId,
//                 },
//               ],
//             }
//           : userObj,
//       );

//       dispatch({
//         type: 'getAllPostsSuccess',
//         payload: updatedPosts,
//       });

//       await axios.put(
//         `http://192.168.100.16:8000/api/v1/create-post/update-likes`,
//         {postId},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//     } catch (error: any) {
//       console.log(error, 'error');
//     }
//   };
export const addLikes =
  ({postId, posts, user}: LikesParams) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const updatedPosts = posts.map((userObj: any) =>
        userObj._id === postId
          ? {
              ...userObj,
              likes: [
                ...userObj.likes,
                {
                  userName: user.name,
                  userId: user._id,
                  userAvatar: user.avatar.url,
                  postId,
                },
              ],
            }
          : userObj,
      );
      dispatch({
        type: 'getAllPostSuccess',
        payload: updatedPosts,
      });

      await axios.put(
        `http://192.168.100.16:8000/api/v1/update-likes`,
        {postId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error: any) {
      console.log(error, 'error');
    }
  };
// // remove likes

export const removeLikes =
  ({postId, posts, user}: LikesParams) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const token = await AsyncStorage.getItem('token');

      const updatedPosts = posts.map((userObj: any) =>
        userObj._id === postId
          ? {
              ...userObj,
              likes: userObj.likes.filter(
                (like: any) => like.userId !== user._id,
              ),
            }
          : userObj,
      );
      dispatch({
        type: 'getAllPostSuccess',
        payload: updatedPosts,
      });

      await axios.put(
        `http://192.168.100.16:8000/api/v1/update-likes`,
        {postId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.error('Error following likes:', error);
    }
  };

// add likes to reply
export const addLikesToReply =
  ({postId, posts, user, replyId, title}: LikesParams) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const updatedPosts = posts.map((post: any) =>
        post._id === postId
          ? {
              ...post,
              replies: post.replies.map((reply: any) =>
                reply._id === replyId
                  ? {
                      ...reply,
                      likes: [
                        ...reply.likes,
                        {
                          userName: user.name,
                          userId: user._id,
                          userAvatar: user.avatar.url,
                        },
                      ],
                    }
                  : reply,
              ),
            }
          : post,
      );
      dispatch({
        type: 'getAllPostSuccess',
        payload: updatedPosts,
      });

      await axios.put(
        `http://192.168.100.16:8000/api/v1/update-reply-react`,
        {postId, replyId, replyTitle: title},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log(error, 'error');
    }
  };

// remove likes from reply
// export const removeLikesFromReply = ({postId, posts, user, replyId}: LikesParams) =>
//   async (dispatch: Dispatch<any>) => {
//     try {
//       const token = await AsyncStorage.getItem('token');

//       const updatedPosts = posts.map((post: any) =>
//         post._id === postId
//           ? {
//               ...post,
//               replies: post.replies.map((reply: any) =>
//                 reply._id === replyId
//                   ? {
//                       ...reply,
//                       likes: reply.likes.filter(
//                         (like: any) => like.userId !== user._id,
//                       ),
//                     }
//                   : reply,
//               ),
//             }
//           : post,
//       );

//       dispatch({
//         type: 'getAllPostsSuccess',
//         payload: updatedPosts,
//       });

//       await axios.put(
//         `${URI}/update-replies-react`,
//         {postId, replyId},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//     } catch (error: any) {
//       console.log(error, 'error');
//     }
//   };

// add likes to replies > reply
// export const addLikesToRepliesReply =({postId, posts, user, replyId, singleReplyId, title}: LikesParams) =>
//   async (dispatch: Dispatch<any>) => {
//     try {
//       const token = await AsyncStorage.getItem('token');

//       const updatedPosts = posts.map((post: any) =>
//         post._id === postId
//           ? {
//               ...post,
//               replies: post.replies.map((r: any) =>
//                 r._id === replyId
//                   ? {
//                       ...r,
//                       reply: r.reply.map((reply: any) =>
//                         reply._id === singleReplyId
//                           ? {
//                               ...reply,
//                               likes: [
//                                 ...reply.likes,
//                                 {
//                                   userName: user.name,
//                                   userId: user._id,
//                                   userAvatar: user.avatar.url,
//                                 },
//                               ],
//                             }
//                           : reply,
//                       ),
//                     }
//                   : r,
//               ),
//             }
//           : post,
//       );

//       dispatch({
//         type: 'getAllPostsSuccess',
//         payload: updatedPosts,
//       });
//       await axios.put(
//         `${URI}/update-reply-react`,
//         {postId, replyId, singleReplyId, replyTitle: title},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//     } catch (error) {
//       console.log(error, 'error');
//     }
//   };

// remove likes from replies > reply
// export const removeLikesFromRepliesReply =
//   ({postId, posts, user, replyId, singleReplyId}: LikesParams) =>
//   async (dispatch: Dispatch<any>) => {
//     try {
//       const token = await AsyncStorage.getItem('token');

//       const updatedPosts = posts.map((post: any) =>
//         post._id === postId
//           ? {
//               ...post,
//               replies: post.replies.map((r: any) =>
//                 r._id === replyId
//                   ? {
//                       ...r,
//                       reply: r.reply.map((reply: any) =>
//                         reply._id === singleReplyId
//                           ? {
//                               ...reply,
//                               likes: reply.likes.filter(
//                                 (like: any) => like.userId !== user._id,
//                               ),
//                             }
//                           : reply,
//                       ),
//                     }
//                   : r,
//               ),
//             }
//           : post,
//       );

//       dispatch({
//         type: 'getAllPostsSuccess',
//         payload: updatedPosts,
//       });

//       await axios.put(
//         `${URI}/update-reply-react`,
//         {postId, replyId, singleReplyId},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//     } catch (error: any) {
//       console.log(error, 'error');
//     }
//   };
