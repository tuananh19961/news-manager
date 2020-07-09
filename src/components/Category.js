import React from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ReactHtmlParser from 'react-html-parser';

class Category extends React.Component {

  //function formater cell dataFormat
  imageFormatter = (cell, row) => {
    return `<a data-fancybox='gallery' href='${cell}'>
	  	<img src="${cell}" alt="${cell}" class="img-gym"/>
	  </a>` ;
  }


  actionFormatter = (cell, row) => {
    return (
      <div className="text-center">
        <button type="button" className="btn btn-danger"
          onClick={() => {
            let alert = window.confirm('Bạn có chắc chắn muốn xóa?');
            if (alert) {
              this.props.deleteData(cell);
              NotificationManager.success('', 'Xóa bài tập thành công!', 4000);
            }
          }
          }><i className="fa fa-trash"></i></button>
      </div>
    );
  }

  nodata = (cell, row) => {
    return (<img src="../img/loading.gif" className="img-loading" alt="loading..." />);
  }

  descriptionFormatter = (cell, row) => {
    return <div className="list-describ">
      {ReactHtmlParser(cell)}
    </div>;
  }
  //Data table config
  componentDidMount() {
    this.props.getData();
  }

  //on handle table item

  modal = () => {
    return <h1>login</h1>
  }

  render() {
    var { Gym, status } = this.props;
    var ids = Object.keys(Gym);
    var list_gym = [];

    if (ids.length > 0) {
      list_gym = ids.map((id) => {
        return { ...Gym[id], key: id };
      }).reverse();
    }

    const options = {
      sizePerPage: 6,
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: '<', // Previous page button text
      nextPage: '>', // Next page button text
      paginationPosition: 'bottom',
      noDataText: this.nodata(),
      hideSizePerPage: true
    }

    return (
      <div className="table-gym">
        <NotificationContainer />
        <div className="section-bar is-tabs clearfix">
          <h3 className="section-title">Danh sách tin tức</h3>
          <div className="grid-1"><span></span></div>
        </div>

        <div className="btn-add">
          <button
            type="button"
            className="btn btn-success"
            onClick={
              () => {
                this.props.showAdd(true);
              }
            }
          >
            {
              status
                ? <span><i className="fa fa-times"></i> Close</span>
                : <span><i className="fa fa-plus"></i> Add</span>
            }
          </button>
        </div>

        <BootstrapTable data={list_gym} options={options} pagination search={true}>
          <TableHeaderColumn isKey={true} dataField='Image' dataFormat={this.imageFormatter} width="120">Ảnh</TableHeaderColumn>
          <TableHeaderColumn width="15%" dataField='Header'>Tiêu đề</TableHeaderColumn>
          <TableHeaderColumn width="30%" dataField='Description' dataFormat={this.descriptionFormatter}>Mô tả</TableHeaderColumn>
          <TableHeaderColumn width="100" dataField='League' dataSort={true}>Giải Đấu</TableHeaderColumn>
          <TableHeaderColumn dataField='Source'>Nguồn</TableHeaderColumn>
          <TableHeaderColumn dataField='Time'>Thời gian</TableHeaderColumn>
          <TableHeaderColumn width="100" dataField='key' dataFormat={this.actionFormatter}>Action</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Gym: state.Gym
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    getData: () => {
      dispatch(actions.getDataRequest());
    },
    deleteData: (key) => {
      dispatch(actions.deleteDataRequest(key))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
