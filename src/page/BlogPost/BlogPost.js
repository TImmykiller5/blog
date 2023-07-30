import React from "react";
import "./BlogPost.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { backend } from "../../redux/actions/userActions";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';
import TagStyle from "../../components/tag-style/TagStyle";
import Comments from "../../components/comments/Comments";

function BlogPost() {
  const [view, setView] = useState(false);

  const [post, setPost] = useState({ st: null });
  const params = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        setPost({ ...post, loading: true });
        const { data } = await axios.get(`${backend}post/${params.id}/`);
        setPost({ st: data, loading: false });
        // console.log(data)
      } catch (error) {
        setPost({ err: error, loading: false, error: true });
      }
    };
    getPost();
  }, []);

  const { st: Post } = post;
  console.log(Post);
  const getDate = (m) => {
    const dateRaw = m?.updated_at.split(":")[0].split("-");
  const date = new Date(dateRaw[0], dateRaw[1], dateRaw[2].split("T")[0]);
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
  const day = date.getDate()
  const month = months[date.getMonth()-1].toLocaleLowerCase()
  const year = date.getFullYear()
  return (day +  ' ' + month + ' ' + year)
  }
 
  
  return (
    <div onClick={()=>setView(false)} className="blogPost">
      <h1>{Post?.title}</h1>
      {}
      <div className="writerInfo">
        <span>written by @{Post?.user}</span>
        <span>on {Post && getDate(Post)}</span>
      </div>
      <div className="blogPostText">
        <span>
          {Post && parse(Post?.text)}
          
        </span>
        <div className="NewsOutline-tags pt-6">
        {Post?.tags?.map((tag, id)=>
          <div  key={id}><TagStyle tag={tag}/></div>
        )}
        </div>
      </div>
      <Comments post={post} view={view} setView={setView}/>
    </div>
  );
}

export default BlogPost;
