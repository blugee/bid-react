import React, { PureComponent } from "react";
import { Layout, Row, Col } from "antd";

import Sidebar from "../../components/AppModule/Sidebar/index";
import Topbar from "../../components/AppModule/Topbar/index";
import App from "routes/index";
import AuthService from "../../service/AuthService";
import IntlMessages from "../../util/IntlMessages";

const { Content, Footer } = Layout;


export class MainApp extends PureComponent {
  constructor() {
    super();
    this.state = {
      footerText: '',
      year: new Date().getFullYear(),
      sesionTime: 30
    }
  }

  componentDidMount() {
    // var profile = AuthService.GetCurrentLoggedUserDetails();
    // this.setState({
    //   footerText: profile.company_copyright
    // })
  }
  

  render() {
    const { match } = this.props;

    return (
      <Layout>
        <Sidebar />

        <Layout>
          <Topbar {...this.props} sesionTime={this.state.sesionTime} />
          <Content>
            <App match={match} />
            <Footer>
              <Row gutter={24}>
                {/* <Col span={12}><IntlMessages id="copyright" /> {this.state.footerText} © {this.state.year}</Col> */}
               
              </Row>
            </Footer>
          </Content>

        </Layout>
      
      </Layout>
    )
  }
}


export default MainApp;

