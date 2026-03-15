import Modal from "react-modal";
import { useState, useEffect } from "react";
import Button from "../../../components/Button";
import type { IPost } from "../home.types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: IPost) => void;
  editPost?: IPost | null;
};

export default function PostModal({
  isOpen,
  onClose,
  onSave,
  editPost,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setDescription(editPost.description);
      setImage(editPost.image);
    } else {
      setTitle("");
      setDescription("");
      setImage("");
    }
  }, [editPost]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG, JPG or JPEG images are allowed");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!title || !description || !image) {
      alert("All fields are required");
      return;
    }

    const post: IPost = {
      id: editPost ? editPost.id : Date.now().toString(),
      title,
      description,
      image,
    };

    onSave(post);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center"
      className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editPost ? "Edit Post" : "Create Post"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full border rounded-md p-2 mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full border rounded-md p-2 mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        onChange={handleImage}
        className="mb-3"
      />

      {image && (
        <img
          src={image}
          alt="preview"
          className="h-24 rounded mb-3 object-contain"
        />
      )}

      <div className="flex justify-end gap-3 mt-4">
        <Button
          className="w-24"
          text="Cancel"
          variant="secondary"
          onClick={onClose}
        />
        <Button
          className="w-24"
          text={editPost ? "Update" : "Save"}
          type="submit"
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
}
