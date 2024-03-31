import {post} from '@/api/api.js'

const baseUrl = '/record'

export function addRecord(data){
	return post(baseUrl+'/addRecord', data)
}

export function getRecord(theDate, userId){
	return post(baseUrl+ '/getDateRecord', {theDate, userId})
}

export function getUser(id){
    return post( '/user/getUser', {id})
}