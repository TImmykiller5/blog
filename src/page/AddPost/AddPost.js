import React, { useState, useEffect } from "react";
import "draft-js/dist/Draft.css";
import SubmitButton from "../../components/Buttons/SubmitButton";
import "./AddPost.css";
import { useSelector } from "react-redux";
import axios from "axios";
import TinyMce from "../../components/tinymce/TinyMce";
import { useNavigate, useLocation } from "react-router-dom";
import { backend } from "../../redux/actions/userActions";

function AddPost() {
  // const Navigate = useNavigate();

  const Location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userLogin.user);
  const [post, setPost] = useState();
  const [post2, setPost2] = useState();
  const [Data, setData] = useState();
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [title, setTitle] = useState();
 
  const tagHandler = (e) => {
    const { key, which } = e;
    which === 32 &&console.log(e)
    if (key == " " || key === "," || which === 32 || which === 188) {
      e.preventDefault();
      // console.log(input);
      setTags([...tags, input]);
      console.log(tags);
      setInput("");
    }
  };
  const deleteTag = (e, index) => {
    e.preventDefault();
    console.log(index);
    setTags(tags.filter((tag, i) => i !== index));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const dAta = {
      title: title,
      text: Data,
      tag: tags,
    };
    

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const newPost = async () => {
      // if there is a search param in the url this first block runs
      // i should probable put a way to ensure it doesn't break
      if(Location.search){
      const urlparams = new URLSearchParams(Location.search) 
      const id = urlparams.get('id')
      console.log(dAta)

        try {
          setPost({ loading: true });
          const { data } = await axios.put(
            `${backend}create/post/${id}/`,
            dAta,
            config
          );
          setPost({ loading: false, Post: data });
        } catch (error) {
          setPost({
            loading: false,
            error: true,
          });
        
      }
      }
      // if there is no url params, the addpost works as normal
      else{
      try {
        setPost({ loading: true });
        const { data } = await axios.post(
          `${backend}create/post/`,
          dAta,
          config
        );
        setPost({ loading: false, Post: data });
      } catch (error) {
        setPost({
          loading: false,
          error: true,
        });
      
    };}}
    newPost();
  };

  useEffect(() => {
    if (!user) {
      navigate(`/login?next=${Location.pathname}`);
    }
    post?.Post && navigate(`/blog/${post.Post.id}`);

    if(Location.search){
      const urlparams = new URLSearchParams(Location.search) 
      const id = urlparams.get('id')
      const getPost = async () => {
        try {
          setPost2({loading:true})
          const {data} = await axios.get(`${backend}post/${id}/`)
          setPost2({loading:false, toEdit:data})
          setTitle(data.title)
          setTags(data.tags)
          setData(data.text)
        } catch (error) {
          setPost2({
          loading:false,
          err: true,
          message:error
        })
        }
      }
      getPost()
      
      console.log()
    }
  }, [user, post]);
  return (
    <div className="">
      <form onSubmit={submitHandler} className="flex flex-col gap-y-4 p-8">
        <h1 className="text-xl">Create New Post</h1>
        <div className="form-control ">
          <label className="">
            <input
              className="px-4 py-2 w-200 rounded-lg w-8/12"
              name="name"
              type="text"
              required
              value={title}
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
        </div>

        <TinyMce pop={post2?.toEdit?.text}  className="trial" dat={setData} />
        <div className="form-control">
          <div className="tag-input-container flex gap-2 items-center rounded-lg h-16 bg-white">
            {tags.map((tag, index) => (
              <div key={index} className="tag-cont rounded-lg ">
                <div className="flex items-center px-2 h-10 rounded-lg">
                  <div>{tag}</div>
                  <button
                  className="button-tag"
                    onClick={(e) => {
                      deleteTag(e, index);
                    }}
                  >
                    <span className="text-sm">X</span>
                  </button>
                </div>
              </div>
            ))}
            <input
              className="tag-input px-4 py-2 w-200 rounded-lg h-12 w-12/12"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={tagHandler}
              placeholder="Tags are Comma/Space seperated"
            />
          </div>
        </div>
        <SubmitButton onClick className="w-100" action={"Post"} />
      </form>
    </div>
  );
}

export default AddPost;
