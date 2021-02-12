import React, {PureComponent} from 'react';
import SomethingWrong from '../components/AppModule/ErrorPages/SomethingWrong';

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {error: null, eventId: null};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({error});
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <SomethingWrong/>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
