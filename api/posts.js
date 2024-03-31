import { post } from '@/api/api.js'

const baseUrl = '/posts'

export function getAllPosts(){
	return post(baseUrl + '/getAllPosts')
}

export function getPostComments(postsId){
	return post('/comment/getPostComments', {postsId})
}

export function addReply(data){
	return post('/comment/addComment' , data)
}

export function addPost(data){
	return post(baseUrl + '/addPosts', data)
}

export function likes(id) {
	return post(baseUrl + '/addLikes', {id})
}