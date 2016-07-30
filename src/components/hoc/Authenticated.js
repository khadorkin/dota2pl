import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import history from '../../core/history'





const Wrapper = (Comp) => {
  class WrappedComponent extends React.Component {
    static propTypes = {
      auth: PropTypes.object.isRequired,
    }

    componentWillMount() {
      this._checkAndRedirect();

    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      if(!this.props.auth.userName) {
        history.push('/')
      }
    }
    render() {
      const Placeholder = () => (<div> Auth required, redirecting back</div>);
      const Component = this.props.auth.userName ? Comp : Placeholder
      return (<Component /> )
    }
  }
  return connect(state => ({auth: state.auth}))(WrappedComponent);
}

export default Wrapper;

