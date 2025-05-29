import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../Components";

function AllPost() {
  const [posts, setPost] = useState(0);
  useEffect(() => {}, []);
  service.getposts([]).then((posts) => {
    if (posts) {
      setPost(posts.documents);
    }
  });
  return (
    <div className="w-full">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
service;

export default AllPost;
