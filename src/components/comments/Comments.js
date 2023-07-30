import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../sidebar/Navbar";
import NavbarItem from "../sidebar/NavbarItem";
import "./comments.css";
import axios from "axios";
import { backend } from "../../redux/actions/userActions";

import IndiComment from "./IndiComment";

function Comments({ post, view, setView }) {
  const [comment, setComment] = useState();
  const [postComment, setPostComment] = useState();
  const expand = () => {
    setView(!view);
  };

  

  const user = useSelector((state) => state.userLogin.user);
//   console.log(post?.st?.comments);
  const userInit = user?.username[0].toUpperCase();
  const postComments =  (e) => {
    console.log(comment)

    e.preventDefault();
    const dAta = {
      text: comment,
    };
    console.log('works')

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const send = async() => {
        try {
            setPostComment({ loading: true });
            const { data } = await axios.post(
              `${backend}comment/${post?.st?.id}/`,
              dAta,
              config
            );
            console.log(data)
            setPostComment({ loading: false, resComment: data });
          } catch (error) {
            console.log(e)
            setPostComment({
              loading: false,
              error: true,
            });
        };
        
    }
    send()
    setComment('')

  }
    

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`comment-cont  ${view ? "cactive" : "cinactive"} rounded-lg`}
    >
      <div className="inner-comment-cont">
      { 
      postComment?.resComment?(postComment?.resComment?.map
        ((comment) => (
            <IndiComment comment={comment} view={view} />
          )) ):(post?.st?.comments?.map((coMment) => (
            <IndiComment comment={coMment} view={view} />
          )))
         
    }
      </div>

      <div className="flex outer-cont">
        <div className="">
          <div className="  p-1.5">
            <div className="mr-4 ">
              {userInit ? (
                <NavbarItem sizes={true} size={"text-xl"} User={userInit} />
              ) : (
                <NavbarItem
                  sizes={true}
                  size={20}
                  icon="/images/user.svg"
                  text="login"
                />
              )}
            </div>
          </div>
        </div>
        <div className="inp-cont ">
          <span className="pb-2" >Comments {
            // postComment?.comments?(postComment?.comments?.lenght()):('m')
            }</span>
          <form onSubmit={postComments} className="flex gap-3 ">
            <textarea
            // rows={5}
            // cols={20}
            required
            minLength={3}
            disabled={!user}
            placeholder={!user?'please login first':'add a comment'}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              type="text-area"
              className=""
              name="comment"
            />
            <div className="flex gap-4">
              <button type="submit"  >
                <img className="" width="25" src="/images/send.svg" />
              </button>
              <button  onClick={expand}>^</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Comments;
