import { useEffect, useState } from 'react';

import { RootState } from './redux/store';
import { useSelector } from 'react-redux';

import PostService from './services/post';
import CommentService from './services/comment';

import Post from './models/post';

function usePosts() {
  const { posts } = useSelector((state: RootState) => state.data);
  return posts.map(Post.fromJson);
}

function App() {
  const [isLoaded, setLoadingState] = useState(false);
  const posts = usePosts();

  useEffect(() => {
    Promise.all([
      PostService.fetchPosts(),
      CommentService.fetchComments(),
    ]).then(() => setLoadingState(true));
  }, []);

  return (
    <div className="App">
      {isLoaded ? posts.map((post) => (
        <div key={post.id}>
          <h1>{post.id}, {post.title}, {post.author} <button onClick={() => PostService.deletePost(post.id)}>-</button></h1>
          <div>
            {post.comments.map((comment) => (
              <div key={comment.id}>
                <h2>{comment.id}, {comment.body} <button onClick={() => CommentService.deleteComment(comment.id)}>-</button></h2>
              </div>
            ))}
            <button onClick={() => CommentService.createComment({ body: `Body ${Math.random()}`, postId: post.id })}>
              Create comment
            </button>
          </div>
        </div>
      )) : <p>Loading...</p>}
      <button onClick={() => PostService.createPost({ title: `Title ${Math.random()}`, author: 'typicode' })}>
        Create post
      </button>
    </div>
  );
}

export default App;
