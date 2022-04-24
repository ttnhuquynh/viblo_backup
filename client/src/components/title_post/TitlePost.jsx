import "./titlePost.css"

const TitlePost = ({ post }) => {
  return (
    <div>
      <div className="title">
        <a href={`/posts/${post._id}`} className="titlePost" key={post.id}>
          {post.title}
        </a>
        <hr />
      </div>
    </div>
  );
};

export default TitlePost;
