import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import Pagination from "./Pagination";

function Comments({ comments, sortOption }) {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const sortComments = (option) => {
    switch (option) {
      case "newest":
        return comments.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return comments.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "highest":
        return comments.sort((a, b) => b.star - a.star);
      case "lowest":
        return comments.sort((a, b) => a.star - b.star);
      default:
        return comments;
    }
  };

  const sortedComments = sortComments(sortOption);
  const totalPages = Math.ceil(sortedComments.length / commentsPerPage);

  // Get comments for the current page
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = sortedComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {currentComments.length > 0 ? (
        currentComments.map((comment) => (
          <div
            key={comment._id}
            className="p-2 mt-3 flex flex-col gap-2 border rounded-sm w-full h-28"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <span>{comment.user.fullName}</span>
              </div>
              <div className="text-sm">
                {new Date(comment.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center">
              {comment.star !== null && (
                <div className="flex">
                  {Array.from({ length: comment.star }).map((_, index) => (
                    <AiFillStar key={index} size={20} color="yellow" />
                  ))}
                </div>
              )}

              <span className="text-lg">{comment.star}</span>
            </div>
            <div className="break-words overflow-auto scrollbar-hide">
              {comment.text}
            </div>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
      <Pagination
        itemsPerPage={commentsPerPage}
        totalItems={comments?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
}

export default Comments;
