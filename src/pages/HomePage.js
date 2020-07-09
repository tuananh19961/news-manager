import React from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import AddNew from './../components/AddNew';
import Category from './../components/Category';
import './../components/style.css';
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  showAdd = (data) => {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    var { open } = this.state;
    return (
      <div className="gym-box">
        <Header />
        <div className={open === true ? 'col-sm-8' : 'col-sm-12'}>
          <Category showAdd={this.showAdd} status={open} />
        </div>

        <div className={open === true ? 'form col-sm-4' : 'form hidden'}>
          <AddNew />
        </div>
        <div className="clearfix"></div>
        <Footer />
      </div>
    );
  }
}

export default HomePage
