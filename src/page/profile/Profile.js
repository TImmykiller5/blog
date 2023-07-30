import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { backend } from "../../redux/actions/userActions";
import TagStyle from "../../components/tag-style/TagStyle";
import "./Profile.css";
import AddPost from "../AddPost/AddPost";

function Profile() {
  const Location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userLogin.user);
  const [posts, setPosts] = useState({ st: [] });
  const [display, setDisplay] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  
  const [deleteRequest, setDeleteRequest] = useState({ st: [] });
  const htmlTagRegex = /<\/?[^>]+(>|$)/g;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const blog = toDelete;
    const deletePost = async () => {
    setDisplay(false);

      try {
        setDeleteRequest({ loading: true });
        const { data } = await axios.delete(
          `${backend}delete/post/${blog}`,
          config
        );
        setDeleteRequest({ response: data, loading: false });
      } catch (error) {
        setDeleteRequest({ err: error, loading: false, error: true });
      }
    };
    deletePost();

    console.log(deleteRequest);
  };

  const editHandler = (e) => {
    e.preventDefault();
    navigate(`/newpost?type=edit&id=${e.target.id}`)
    console.log(e.target.id);
    
  };
  const inView = (e) => {
    setDisplay(!display);
    setToDelete(e.target.id)

  };
  useEffect(() => {
    if (!user) {
      navigate(`/login`);
    }
    const getPosts = async () => {
      try {
        setPosts({ ...posts, loading: true });
        const { data } = await axios.get(`${backend}profile`, config);
        setPosts({ st: data, loading: false });
        console.log(data);
      } catch (error) {
        setPosts({ err: error, loading: false, error: true });
      }
    };
    getPosts();
  }, [deleteRequest]);

  const { st } = posts;

  return (
    <div className="profile-cont ">
      <div 
      onClick={inView}
      className={`modal-cont ${display ? "active" : "inactive"}`}>
        <div 
        onClick={(e) => {e.stopPropagation()}}
        className="modal flex flex-col items-center gap-4">
          <div className="text-lg">are you sure you want to delete</div>
          <div className="flex gap-12">
            <button onClick={deleteHandler}>
              {" "}
              <img alt="yes" width={27} src="/images/yes.svg" />
            </button>
            <button onClick={inView}>
              {" "}
              <img alt="yes" width={27} src="/images/no.svg" />
            </button>
          </div>
        </div>
      </div>
      {st?.length > 0 &&
        st.map((post, index) => {
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
            <div className="NewsOutline pt-8 pl- pr-" key={post.id}>
              <div className="NewsOutline-Left">
                <div className="NewsOutline-Date">
                  <div>{date.getDate()}</div>
                  <div>{months[date.getMonth() - 1]}</div>
                </div>
                <div className="NewsOutline-Writer">
                  <div className="NewsOutline-Writer-inner">
                    <div className="to-rotate">@{post.user}</div>
                  </div>
                </div>
              </div>
              <div className="NewsOutline-Right w-12/12">
                <div>
                  <div className="flex w-12/12 justify-between">
                    <h1 className="flex w-12/12 justify-between">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h1>

                    <div className="flex gap-4 min-w-max">
                      <Link
                        onClick={(e) => {
                          editHandler(e);
                        }}
                        key={`edit${index}`}
                      >
                        <img
                          width={25}
                          className=""
                          id={`${post.id}`}
                          src="images/edit.svg"
                        />
                      </Link>
                      <Link onClick={(e)=> {inView(e)}} key={`delete${index}`}>
                        <img
                          width={25}
                          className=""
                          id={`${post.id}`}
                          src="images/delete.svg"
                        />
                      </Link>
                    </div>
                  </div>
                  <p>
                    {post.text
                      .replaceAll("</p>", ".")
                      .replaceAll(htmlTagRegex, "")
                      .split(" ")
                      .slice(0, 70)
                      .join(" ")}{" "}
                    <Link to={`/blog/${post.id}`} className="read-more">
                      ...read more
                    </Link>
                  </p>
                </div>
                <div className="NewsOutline-tags">
                  {/* {post?.tags?.map((Tag)=>{console.log(post.title,Tag)})} */}
                  {/* <TagStyle tag={post.tag}/> */}
                  {/* <TagStyle tag='boy'/> */}
                  {post?.tags.map((Tag) => {
                    return <TagStyle tag={Tag} />;
                  })}
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

export default Profile;
