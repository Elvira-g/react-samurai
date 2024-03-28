import React from 'react';
import profileReducer, { addPostActionCreator } from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ]
}

it('length of posts should be incremented', () => {
    let action = addPostActionCreator("some text text");
    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(5)
});

it('last post should has message - \'some text text\' ', () => {
    let action = addPostActionCreator("some text text");
    let newState = profileReducer(state,action)

    expect(newState.posts[4].message).toBe('some text text')
});

// it('after deleting length of posts should be decremented', () => {
//     let action = deletePost(1);
//     let newState = profileReducer(state,action)

//     expect(newState.posts.length).toBe(3)
// });
