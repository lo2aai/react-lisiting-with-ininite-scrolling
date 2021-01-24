import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useInfiniteScroll(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  // Here we made a custom hook that it takes page number as a paremter
  // and call the API URL, response with data in the succecc and set them as shown
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `https://api.github.com/search/repositories?q=page=${pageNumber}&per_page=50`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setRepos((prevRepos) => [...prevRepos, ...res.data.items]);
        setHasMore(repos.length < res.data.total_count);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setLoading(false);
        setError(true);
      });
    return () => cancel();
  }, [pageNumber]);

  return { loading, error, repos, hasMore };
}