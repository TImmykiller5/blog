import React, { useEffect, useState } from "react";
import "./NewsOutline.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { backend } from "../../redux/actions/userActions";
import TagStyle from "../tag-style/TagStyle";

function NewsOutline() {
  const [posts, setPosts] = useState({ st: [] });
  const htmlTagRegex = /<\/?[^>]+(>|$)/g;
  useEffect(() => {
    const getPosts = async () => {
      try {
        setPosts({ ...posts, loading: true });
        const { data } = await axios.get(`${backend}posts`);
        setPosts({ st: data, loading: false });
        console.log(data)
      } catch (error) {
        setPosts({ err: error, loading: false, error: true });
      }
    };
    getPosts();
  }, []);

  const { st } = posts;

  // console.log(st);
  return (
    <div>
      {st?.length > 0 &&
        st?.map((post) => {
          const dateRaw = post.updated_at.split(":")[0].split("-");
          const date = new Date(
            dateRaw[0],
            dateRaw[1],
            dateRaw[2].split("T")[0]
          );
          const months = [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ];
          // console.log(date.getMonth());
          return (
            <div className="NewsOutline" key={post.id}>
              <div className="NewsOutline-Left">
                <div className="NewsOutline-Date">
                  <div>{date.getDate()}</div>
                  <div>{months[date.getMonth()-1]}</div>
                </div>
                <div className="NewsOutline-Writer">
                  <div className="NewsOutline-Writer-inner">
                    <div className="to-rotate">@{post.user}</div>
                  </div>
                </div>
              </div>
              <div className="NewsOutline-Right">
                <div>
                  <h1>
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h1>
                  <p>
                    {post.text.replaceAll('</p>', '.').replaceAll(htmlTagRegex, '').split(" ").slice(0, 70).join(" ")}{" "}
                    <Link to={`/blog/${post.id}`} className="read-more">...read more</Link>
                  </p>
                </div>
                <div className="NewsOutline-tags">
                  {/* {post?.tags?.map((Tag)=>{console.log(post.title,Tag)})} */}
                  {/* <TagStyle tag={post.tag}/> */}
                  {/* <TagStyle tag='boy'/> */}
                  {post?.tags.map((Tag)=>{return <TagStyle tag={Tag}/>})}
                  {/* <div className="NewsOutline-tag">#meditation</div>
                  <div className="NewsOutline-tag">#mentalPlace</div> */}
                </div>
              </div>
            </div>
          );
        })}

 

      
    </div>
  );
}

export default NewsOutline;
