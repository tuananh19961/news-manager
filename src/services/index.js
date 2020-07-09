import firebase from './../firebase';

export const deleteDataApi = async (endpoint,key) => {
	let result = await firebase.database().ref(endpoint).child(key).remove();
	return result;
}