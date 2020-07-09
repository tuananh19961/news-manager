import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import CKEditor from "react-ckeditor-component";
import { getBase64 } from '../utils';

class AddNew extends React.Component {

  constructor() {
    super();
    this.state = {
      id: null,
      name: '',
      description: '',
      category: '',
      rep: '',
      link: '',
      images: [],
      tempImg: []
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.type === 'file' ? target.files[0] : target.value;
    this.setState({
      [name]: value,
    });
  }

  onChangeCK = (event) => {
    var newContent = event.editor.getData();
    this.setState({ Detail: newContent });
  }

  // Upload file function
  onChangeFile = e => {
    let target = e.target;
    let { files } = target;
    if (files && files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        const element = files[index];
        this.onTempFile(element);
      }
      this.fileInput.value = "";
    }
  }

  onTempFile = file => {
    const isImage = file.type && file.type.startsWith('image/');
    if (isImage) {
      getBase64(file, imageUrl => {
        this.setState(prev => ({...prev, tempImg: [...prev.tempImg, imageUrl], images: [...prev.images, file]}));
      });
    } else {
      console.error('Phải tải file ảnh lên');
    }
  }

  removeImage = index => {
    let imgs = [...this.state.images];
    let temps = [...this.state.tempImg];
    imgs.splice(index, 1);
    temps.splice(index, 1);
    this.setState({ images: imgs, tempImg: temps});
  }

  onHandleAdd = (event) => {
    event.preventDefault();
    const { elements } = event.target;
    let formData = {};
    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
      if(element.name) formData = { ...formData,  [element.name]: element.value };
    }

    formData = { ...formData, Detail: this.state.Detail, images: this.state.images };

    this.resetForm();
    this.props.addNew(formData);
    NotificationManager.success('Xem chi tiết ở bảng bên', 'Thêm mới tin tức thành công!', 4000);
  }


  resetForm = () =>{
    this.refs.form.reset();
    this.setState(Object.assign(...Object.keys(this.state).map(k => ({[k]: null}))))
  }

  render() {
    const { tempImg, images } = this.state;

    return (
      <div className="form-add">
        <NotificationContainer />
        <form ref='form' onSubmit={this.onHandleAdd}>

          <div className="section-bar is-tabs clearfix">
            <h3 className="section-title">Thêm mới tin tức</h3>
            <div className="grid-1"><span></span></div>
          </div>

          <div className="form-group">
            <label>Tiêu đề:</label>
            <input type="text" className="form-control" name="Header" placeholder="Tiêu đề" required="required" />
          </div>

          <div className="form-group">
            <label>Mô tả:</label>
            <textarea
              className="form-control"
              name="Description"
              placeholder="Mô tả ngắn"
              required="required"
              rows="4"
            >
            </textarea>
          </div>

          <div className="form-group">
            <label>Chi tiết:</label>
            <CKEditor
              activeClass="p10"
              content={this.state.Detail}
              events={{
                "change": this.onChangeCK
              }}
            />
          </div>

          {/* <div className="form-group">
            <label>Danh mục:</label>
            <select
              required="required"
              name="category"
              className="form-control"
              required="required"
              onChange={this.onChange}
              value={this.state.category}
            >
              <option value="">-- Danh mục--</option>
              <option value="ABSBeginer">ABSBeginer</option>
              <option value="ABSInt">ABSInt</option>
              <option value="ABSAdvance">ABSAdvance</option>
              <option value="ChestBeginer">ChestBeginer</option>
              <option value="ChestInt">ChestInt</option>
              <option value="ChestAdvance">ChestAdvance</option>
              <option value="ShoulderBeginer">ShoulderBeginer</option>
              <option value="ShoulderInt">ShoulderInt</option>
              <option value="ShoulderAdvance">ShoulderAdvance</option>
              <option value="LegBeginer">LegBeginer</option>
              <option value="LegInt">LegInt</option>
              <option value="LegAdvance">LegAdvance</option>
            </select>
          </div> */}


          <div className="form-group">
            <label>Giải Đấu:</label>
            <input required="required" type="text" className="form-control" name="League" id="" placeholder="Giải đấu" />
          </div>

          <div className="form-group">
            <label>Nguồn:</label>
            <input required="required" type="text" className="form-control" name="Source" placeholder="Nguồn" />
          </div>

          <div className="form-group">
            <label>Thời gian:</label>
            <input required="required" type="text" className="form-control" name="Time" placeholder="Thời gian"/>
          </div>

          <div className="form-group">
            <label>Hình ảnh:</label>
            <input multiple type="file" className="form-control" id="img-post" onChange={this.onChangeFile} ref={ref => this.fileInput = ref} required={!images || (images && images.length == 0)} />
            <div className="preview">
                { tempImg && tempImg.length > 0 && tempImg.map((item, index) =>{
                  return <div className="preview-item" key={index}>
                        <span className="btn btn-delete" onClick={() => this.removeImage(index)}>
                          <i className="fa fa-times"></i>
                        </span>
                        <img src={item}/>
                  </div>;
                })}
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn-save"><i className="fa fa-floppy-o"></i> Lưu lại</button>
          </div>

        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addNew: (gym) => {
      dispatch(actions.addNewGymRequest(gym))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNew)
