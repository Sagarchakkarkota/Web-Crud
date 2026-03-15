import React from "react";
import type { IPost } from "../home.types";
import Button from "../../../components/Button";

type Props = {
  post: IPost;
  onEdit: (post: IPost) => void;
  onDelete: (id: string) => void;
};

const PostCard: React.FC<Props> = ({ post, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-40 object-contain"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">{post.title}</h2>

        <p className="text-gray-600 mt-2">{post.description}</p>

        <div className="flex gap-3 mt-4">
          <Button className="w-20" text="Edit" onClick={() => onEdit(post)} />

          <Button
            className="w-20"
            text="Delete"
            onClick={() => onDelete(post?.id)}
            variant="danger"
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
