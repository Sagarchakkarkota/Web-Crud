import Button from "../../components/Button";
import PostCard from "./components/PostCard";
import PostModal from "./components/PostModal";
import useHome from "./hooks/useHome";

const Home = () => {
  const {
    states: { posts, isOpen, editPost, setIsOpen },
    functions: { handleEdit, handleDelete, handleSave, openCreateModal },
  } = useHome();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>

        <Button className="w-20" text="Add" onClick={openCreateModal} />
      </div>

      {posts?.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {isOpen && (
        <PostModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
          editPost={editPost}
        />
      )}
    </div>
  );
};

export default Home;
