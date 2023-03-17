import React,{useState} from 'react'
import {AiOutlineClose} from 'react-icons/ai';
import Avatar from "../avatar/Avatar";
import { RxUpdate } from "react-icons/rx";
import {useDispatch} from 'react-redux';
import { updatePost} from "../../redux/slices/postsSlice";
import "./UpdatePost.scss";


function UpdatePost({ post, onClose }) {
    console.log('updatepost');
    const dispatch = useDispatch();
    const [updatePostImg, setUpdatePostImg] = useState(post?.image?.url);
    const [caption, setCaption] = useState(post.caption)

    async function hanldeEditPostSubmit(){
        dispatch(updatePost({
            postId: post._id,
            caption,
            updatePostImg
        }))
        onClose();

    }
    const handleImageEdit = (e) => {
        console.log('In update')
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setUpdatePostImg(fileReader.result);
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
                    {updatePostImg && 
                        <div className="img-container">
                            <img
                                className="post-img"
                                src={updatePostImg}
                                alt="post-img"
                            />
                        </div>  
                    }
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
                            <label htmlFor="updateinputImg" className="updatelabelImg">
                                <RxUpdate />
                            </label>
                            <input
                                className="updateinputImg"
                                id="updateinputImg"
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