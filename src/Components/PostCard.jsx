import { Link } from "react-router-dom";
import service from "../appwrite/config";

function PostCard({ $id, title, featureImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={service.getFilePreview(featureImage)}
            alt={title}
            className="rounded-xl"
          />
          {/* featureimage is itself is ID as we store iD in the database */}
        </div>
        <h2 className="text-xl font-bold"> {title} </h2>
      </div>
    </Link>
  );
}

export default PostCard;
