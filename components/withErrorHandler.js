import { Component } from 'react';
import { Alert, Button } from 'reactstrap';
import router from 'next/router';

const withErrorHandler = (WrappedComponent) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      this.setState({ error: null });
    }

    handleSetError = (error) => {
      this.setState({ error: error.message });
    };

    handleGoToHome = () => {
      router.push('/');
    };

    render() {
      if (this.state.error) {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Alert color='danger'>{this.state.error}</Alert>
            <Button onClick={this.handleGoToHome}>Back to home page</Button>
          </div>
        );
      }
      return (
        <WrappedComponent
          {...this.props}
          setError={this.handleSetError}
        ></WrappedComponent>
      );
    }
  };
};

export default withErrorHandler;
