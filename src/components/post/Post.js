import React, {useState} from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md"
import { HiPencil} from "react-icons/hi"
import {useDispatch} from 'react-redux';
import { likeAndUnlikePost, getUserProfile} from "../../redux/slices/postsSlice";
import { useNavigate, useParams } from "react-router";
import { axiosClient } from "../../utils/axiosClient";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
import UpdatePost from "../updatePost/UpdatePost";


function Post({ post }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ openEditPost, setOpenEditPost ] = useState(false);
    const params = useParams();

    console.log(openEditPost);
    

    async function handlePostLiked() {
        dispatch(likeAndUnlikePost({
            postId: post._id
        }))
    }

    async function handleDeletePost(){
        const postId = post._id;
        console.log('postid', postId);
        try {
            const result = await axiosClient.post('/posts/delete', {
                postId,
            });
            console.log(result);
            dispatch(getUserProfile({
                userId: params.userId
            }));
        } catch (error) {
            console.log('what is th error', error);
        } 
    }

    return (
        <>
            <div className="Post">
                <div className="heading" onClick={() => navigate(`/profile/${post.owner._id}`)}>
                    <Avatar src={post.owner?.avatar?.url} />
                    <h4>{post.owner?.name}</h4>
                </div>
                <div className="content">
                    <img src={post?.image?.url} alt="" />
                    
                </div>
                <div className="footer">
                    {/* Added 13th */}
                    <div className="post-bottom">
                        <div className="post-bottom-left">
                            <div className="like" onClick={handlePostLiked}>
                                {post.isLiked ? <AiFillHeart style={{color: 'red'}} className="icon" /> : <AiOutlineHeart className="icon" />}
                                <h4>{`${post.likesCount} likes`}</h4>
                            </div>
                        </div>  
                        {post.owner._id === params.userId && <div className="post-bottom-right">
                            <div className="update-post" onClick={() => setOpenEditPost(true)}>
                                <HiPencil className="icon"/>
                            </div>
                            <div className="delete-post" onClick={handleDeletePost}>
                                <MdOutlineDeleteOutline className="icon"/>
                            </div>
                        </div>}
                        
                    </div>
                    
                    <p className="caption">{post.caption}</p>
                    <h6 className="time-ago">{post?.timeAgo}</h6>
                </div>
            </div>
            {openEditPost && <UpdatePost key={post._id} post={post} onClose={() => setOpenEditPost(false)} />}
        </>
    );
}

export default Post;