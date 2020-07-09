import React from 'react';
class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
      	<div className="container-fluid">

      	<div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

              <a href="index.html" className="navbar-brand">
                <span>N</span>ews
                <span> </span>
                <span>M</span>anager
              </a>

        </div>
           <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          		<ul className="nav navbar-nav navbar-right">
          			<li className="active">
          				<a href="#">Trang chủ</a>
          			</li>
          		</ul>
            </div>
      	</div>
      </nav>
    );
  }
}

export default Header;
