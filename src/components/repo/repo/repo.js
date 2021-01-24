import React, { useState, useRef, useCallback } from "react";

import useInfiniteScroll from "../../../hooks/useInfinetScroll";
import LoadinSpinner from '../loading-spinner/LoadingSpinner'

import './index.css'

export default function Repo() {
  const [pageNumber, setPageNumber] = useState(1);

  const { repos, hasMore, loading, error } = useInfiniteScroll(pageNumber);

  const observer = useRef();
  // Here we are setting a reffrence for the last item on the array to call the next page when it shows on the screen.
  // For more details see https://reactjs.org/docs/hooks-reference.html#useref
  const lastRepoElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    // Here we are rendering a repo with ref if its the last item, otherwise just render normal repo
    <>
      {repos.map((repo, index) => {
        if (repos.length === index + 1) {
          return (
            <div ref={lastRepoElementRef} className="repo" key={index}>
              <div className="avatar-image-container">
                <img src={repo.owner.avatar_url} alt="Authour" />
              </div>

              <div className="repo-deatils">
                <div className="name-of-repo">
                  <p>{repo.name}</p>
                </div>

                <div className="repo-description">
                  <p>{repo.description}</p>
                </div>

                <div className="repo-historical-info">
                  <div className="repo-stars">
                    <span>Stars:</span> {repo.stargazers_count}
                  </div>

                  <div className="repo-issues">
                    <span>Issues:</span> {repo.open_issues_count}
                  </div>

                  <div className="repo-submited-by-name">
                    Submited by <span>{repo.name}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="repo" key={index}>
              <div className="avatar-image-container">
                <img src={repo.owner.avatar_url} alt="Authour" />
              </div>

              <div className="repo-deatils">
                <div className="name-of-repo">
                  <p>{repo.name}</p>
                </div>

                <div className="repo-description">
                  <p>{repo.description}</p>
                </div>

                <div className="repo-historical-info">
                  <div className="repo-stars">
                    <span>Stars:</span> {repo.stargazers_count}
                  </div>

                  <div className="repo-issues">
                    <span>Issues:</span> {repo.open_issues_count}
                  </div>

                  <div className="repo-submited-by-name">
                    Submited by <span>{repo.name}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
      <div>{loading && <LoadinSpinner />}</div>
      <div className="error">{error && "Error"}</div>
    </>
  );
}
