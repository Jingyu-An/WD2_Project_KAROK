import React, {useRef} from 'react';

import './Comments.css'
import {UilEnter} from "@iconscout/react-unicons";
import {useDispatch, useSelector} from "react-redux";
import {commentPost} from "../../Actions/postAction";

const Comments = (props) => {
  
  const {user} = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  
  const data = props.data;
  const comment = useRef();
  
  const summitHandler = (event) => {
    event.preventDefault();
    
    console.log(data);
    dispatch(commentPost(data._id, user._id, comment.current.value));
    comment.current.value = '';
    props.commentHandler();
  };
  
  return (
    <div className="Comments">
      <div className="Comment">
        <input
          type="text"
          placeholder='Comments...'
          ref={comment}
        />
        <div className="s-icon">
            <UilEnter onClick={summitHandler}/>
        </div>
      </div>
    </div>
  );
};

export default Comments;