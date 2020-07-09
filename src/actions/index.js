import firebase from './../firebase';
import * as types from './../constants/ActionTypes';
import * as services from './../services/index';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const endpoint = 'https://www.fservingtech.com/api/v1/attachment';
const host = 'https://www.fservingtech.com';
const config = {
  headers: { 'content-type': 'multipart/form-data' }
}

//ADD NEW ITEM
const postDataMultipart =  async(url, data) => {
  try {
    const result = await axios.post(url, data, config);
    return result;
  } catch (e) {
      throw e;
  }
};

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
      let formData = new FormData();
      formData.append("photo", img);
      await postDataMultipart(endpoint, formData).then(res => {
        let { data: {data : { attributes }} } = res;
        let path = `${host}${attributes.pathname}`;
        imagesBlob.push(path);
      }).catch(err => {
        NotificationManager.error('', 'Có lỗi xảy ra, thử lại sau!', 4000);
      });
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
