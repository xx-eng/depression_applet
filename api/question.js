import { post } from '@/api/api.js'

const baseUrl = '/question'
export function getAllQuestions(){
	return post( baseUrl + '/getAllQuestions')
}

export function getQuestion(id){
	return post(baseUrl + '/getQuestion', {id})
}

export function getAnswer(id){
	return post('/answer/getAnswer', {id})
}

export function addQuestion(data) {
	return post(baseUrl + '/addQuestion', data)
}

export function updateQuestion(data) {
	return post(baseUrl + '/updateQuetion', data)
}

export function getMyQuestions(userId){
	return post(baseUrl + '/getUserQuestions', {userId})
}


export function getMyAnswer(userId){
	return post('/answer/getUserAnswer', {userId})
}


export function deleteQuesion(id){
	return post( baseUrl + '/deletedQuestion', {id})
}

export function deleteAnswer(id){
	return post('/answer/deletedAnswer', {id})
}

export function likes(id) {
	return post('/answer/addLikes', {id})
}

export function getQAnswer(questionId){
	return post('/answer/getQAnswer', {questionId})
}

export function addAnswer(data){
	return post('/answer/addAnswer', data)
}

export function updateAnswer(data){
	return post('/answer/updateAnswer', data)
}