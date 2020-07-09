import React from 'react';


class Footer extends React.Component {
  render() {
    return (
      <div className="footer text-center">
      		<div className="container">
			<div className="logo2">
				<h2>
					<a href="index.html">
						<span>N</span>ews
            <span>M</span>anager
					</a>
				</h2>
			</div>

			<div className="agileinfo_social_icons my-4">
				<ul className="agileits_social_list list-unstyled">
					<li>
						<a href="#" className="w3_agile_facebook">
							<i className="fa fa-facebook-f"></i>
						</a>
					</li>
					<li className="mx-2">
						<a href="#" className="agile_twitter">
							<i className="fa fa-twitter"></i>
						</a>
					</li>
					<li>
						<a href="#" className="w3_agile_dribble mx-2">
							<i className="fa fa-dribbble"></i>
						</a>
					</li>
					<li className="ml-2">
						<a href="#" className="w3_agile_google">
							<i className="fa fa-google-plus"></i>
						</a>
					</li>
				</ul>
			</div>

			<p className="copyright-w3ls"> © 2020 15CNTT2. All Rights Reserved | Design by Nguyễn Viết Đức
			</p>

		</div>
      </div>
    );
  }
}

export default Footer;
