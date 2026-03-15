import { useEffect, useState } from "react";
import type { IPost } from "../home.types";

const useHome = () => {
  const [posts, setPosts] = useState<IPost[]>(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [editPost, setEditPost] = useState<IPost | null>(null);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleEdit = (post: IPost) => {
    setEditPost(post);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const handleSave = (post: IPost) => {
    if (editPost) {
      setPosts((prev) => prev.map((p) => (p.id === post.id ? post : p)));
      setEditPost(null);
    } else {
      setPosts((prev) => [post, ...prev]);
    }
    setIsOpen(false);
  };

  const openCreateModal = () => {
    setEditPost(null);
    setIsOpen(true);
  };
  return {
    states: {
      posts,
      isOpen,
      editPost,
      setIsOpen,
    },
    functions: {
      openCreateModal,
      handleEdit,
      handleDelete,
      handleSave,
    },
  };
};

export default useHome;
