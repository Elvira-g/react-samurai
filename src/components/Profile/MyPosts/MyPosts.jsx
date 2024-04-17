import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength = maxLengthCreator(10)

const PostsForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
            <div><Field component={Textarea} name={'message'}
                        placeholder='Enter your message'
                        validate={[required, maxLength]}/>
            </div>
            <div><button type='submit'>Add Post</button>
            </div>
        </form>
}

const PostsReduxForm = reduxForm({form: 'posts'})(PostsForm)

const MyPosts = React.memo((props) => {
    let postsElements =
        props.posts.map( p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    // let newPostElement = React.createRef();

    // let onAddPost = () => {
    //     props.addPost();
    // }

    // let onPostChange = () => {
    //     let text = newPostElement.current.value;
    //     props.updateNewPostText(text);
    // }

    const onSubmit = (formData) => {
        props.addPost(formData.message)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <PostsReduxForm onSubmit={onSubmit} />
            </div>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
})

export default MyPosts;