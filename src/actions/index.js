import firebase from './../firebase';
import * as types from './../constants/ActionTypes';
import * as services from './../services/index';

//ADD NEW ITEM
export const addNewGymRequest = (gym) => {
  return async (dispatch) => {
    var { images, ...data } = gym;
    let paths = await uploadImagesStorage(images);

    let imagesObject = {};
    paths.forEach(function (item, index) {
      imagesObject = index == 0 ? { 'Image': item } : { ...imagesObject, [`Image${index}`]: item };
    });

    var newItem = {
      ...data,
      ...imagesObject,
      created_at: Date.now()
    }

    return firebase.database().ref(`Fast`).push(newItem).then((data) => {
      return Promise.resolve(data)
    }).catch(err => {
      return Promise.reject(err)
    });
  }
}

const uploadImagesStorage = async (imageArray) => {
  const imagesBlob = [];
  await Promise.all(
    imageArray.map(async (img) => {
      let rand = Math.random().toString(36).substring(7);
      let nameImg = `${img.name}_${rand}`;
      let storageRef = firebase.storage().ref(`store/${nameImg}`);
      await storageRef.put(img);
      return await storageRef.getDownloadURL().then((result) => imagesBlob.push(result))
    }),
  );

  return imagesBlob
};

export const addNewGym = (gym) => {
  return {
    type: types.ADD_NEW,
    gym: gym
  }
}

//GET DATA FROM FIREBASE
export const getDataRequest = () => {
  return (dispatch) => {
    firebase.database().ref('Fast').orderByChild("created_at").on('value', (snapshot) => {
      var news = {}
      snapshot.forEach((data) => {
        var item = data.val();
        news = { ...news, [data.key]: item }
      });

      dispatch(getData(news));
    })
  }
}

export const getData = (datas) => {
  return {
    type: types.GET_DATA,
    datas: datas
  }
}


//DELETE ITEM
export const deleteDataRequest = (key) => async (dispatch) => {
  await services.deleteDataApi('Fast', key);
  dispatch(deleteData());
}

export const deleteData = () => {
  return {
    type: types.DELETE_DATA
  }
}
