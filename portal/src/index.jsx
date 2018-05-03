import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './index.scss';

class Portal extends Component {

  static propTypes = {
    children: PropTypes.node,
    target: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.element,
      PropTypes.object
    ]),
    containerClassName: PropTypes.string
  }

  static defaultProps = {
    target: document.body
  }

  constructor(props) {
    super(props);
    const { containerClassName } = this.props;
    this.container = document.createElement('DIV');

    if (containerClassName) {
      this.container.className = containerClassName;
    }
  }

  componentDidMount() {
    this.mountChild(this.props.target);
    this.updateChild();
  }

  componentWillReceiveProps(nextProps) {
    if (this.targetNode && nextProps.target !== this.props.target) {
      this.unMountChild();
      this.mountChild(nextProps.target);
    }
  }

  componentDidUpdate() {
    this.updateChild();
  }

  componentWillUnmount() {
    this.unMountChild();
  }

  mountChild(target) {
    this.targetNode = ReactDOM.findDOMNode(target);
    this.containerNode = this.targetNode.appendChild(this.container);
  }

  updateChild() {
    let children = this.props.children;
    let childrenCount = React.Children.count(children);

    if (childrenCount < 1) {
      return;
    }

    ReactDOM.unstable_renderSubtreeIntoContainer(this, children, this.containerNode);
  }

  unMountChild() {
    if (this.targetNode) {
      ReactDOM.unmountComponentAtNode(this.container);
      this.targetNode.removeChild(this.container);
      this.targetNode = null;
    }
  }

  render() {
    return null;
  }
}

export default Portal;