import React, { useState, useEffect } from 'react';
import debounce from "lodash.debounce";

import './index.css';
import useInfinetScroll from '../../hooks/useInfinetScroll';

export default function Repo() {

  const [pageNumber, setPageNumber] = useState(1);
  
  const {
    hasMore,
    repos,
    error,
    loading
  } = useInfinetScroll(pageNumber)


  useEffect(() => {
    window.onscroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight && hasMore
      ) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    }, 100);
  }, [pageNumber, hasMore]);

  
  
    return (
      <>
        {repos.map((repo, index) => {
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
        )}
        <div className="loader">{loading && "loading..."}</div>
        <div className="error">{error && "Error"}</div>
      </>
    );
}
