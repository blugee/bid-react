import React, { PureComponent } from "react";
import { Layout, Row } from "antd";
import Sidebar from "../../components/AppModule/Sidebar/index";
import Topbar from "../../components/AppModule/Topbar/index";
import App from "routes/index";

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
              </Row>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    )
  }
}


export default MainApp;

