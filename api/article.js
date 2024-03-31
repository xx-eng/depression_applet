import { post } from '@/api/api.js'

const baseUrl = '/article'

export function getAllArticle(){
	return post(baseUrl + '/getAllArticle')
}

export function likes(id) {
	return post(baseUrl + '/addLikes', {id})
}

export function getArticle(id){
	return post(baseUrl + '/getArticle', {id})
}

export function getMyArticle(userId){
	return post(baseUrl + '/getUserArticles', {userId})
}
export function deleteArticle(id){
	return post(baseUrl + '/deletedArticle', {id})
}

export function updateArticle(data){
	return post(baseUrl + '/updateArticle', data)
} 

export function addArticle(data){
	return post(baseUrl + '/addArticle',data)
}