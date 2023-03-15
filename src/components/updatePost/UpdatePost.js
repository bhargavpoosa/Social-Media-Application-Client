import React,{useState} from 'react'
import {AiOutlineClose} from 'react-icons/ai';
import Avatar from "../avatar/Avatar";
import { BsCardImage } from "react-icons/bs";
import {useDispatch} from 'react-redux';
import { updatePost} from "../../redux/slices/postsSlice";
import "./UpdatePost.scss";


function UpdatePost({ post, onClose }) {
    console.log('updatepost');
    const dispatch = useDispatch();
    const [postImg, setPostImg] = useState(post?.image?.url);
    const [caption, setCaption] = useState(post.caption)

    async function hanldeEditPostSubmit(){
        dispatch(updatePost({
            postId: post._id,
            caption
        }))
        onClose();

    }
    const handleImageEdit = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setPostImg(fileReader.result);
                console.log("img data", fileReader.result);
            }
        };
    };
  return (
    <div className='update-page'>
        <div className='overlay' onClick = {onClose}></div>
        <div className="update-content">
            <div className="header">
                <h3>Edit Post</h3>
                <div className="close-btn" onClick={onClose} >
                    <AiOutlineClose /> Close
                </div>
            </div>
            <div className="main">
                <div className='main-left'>
                    {postImg && (
                        <div className="img-container">
                            <img
                                className="post-img"
                                src={postImg}
                                alt="post-img"
                            />
                        </div>
                    )}
                    {/* <img src={post?.image?.url} alt="" /> */}
                </div>
                <div className='main-right'>
                    <div className='right-header'>
                        <Avatar src={post.owner?.avatar?.url} />
                        <h4>{post.owner?.name}</h4>
                    </div>
                    <div className='right-content'>
                        <textarea value={caption} className="captionInput" name="captionInput" rows="12" cols="50" onChange={(e) => setCaption(e.target.value)}>
                        </textarea>
                    </div>
                    <div className='right-footer'>
                        <div className="input-post-img">
                            <label htmlFor="inputImg" className="labelImg">
                                <BsCardImage />
                            </label>
                            <input
                                className="inputImg"
                                id="inputImg"
                                type="file"
                                accept="image/*"
                                onChange={handleImageEdit}
                            />
                        </div>
                        <button className="edit-post-btn btn-primary" onClick={hanldeEditPostSubmit}>Edit</button>
                    </div>  
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdatePost