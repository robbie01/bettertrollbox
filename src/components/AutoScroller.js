import React from 'react';
import { findDOMNode } from 'react-dom';

const getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const autoScroller = function autoScroller(Comp) {
  class AutoScroller extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        autoScroll: true
      };
      this.rootRef = React.createRef();
      this.onScroll = this.onScroll.bind(this);
    }

    onManualScroll() {
      const rootEl = findDOMNode(this.rootRef.current);
      this.setState({
        autoScroll: rootEl.scrollTop > rootEl.scrollHeight - rootEl.clientHeight - 5
      });
    }

    onScroll() {
      if (this.userScroll) this.onManualScroll();
    }

    componentDidUpdate() {
      if (this.state.autoScroll) {
        this.userScroll = false;
        const rootEl = findDOMNode(this.rootRef.current);
        rootEl.scrollTop = rootEl.scrollHeight;
        setTimeout(() => this.userScroll = true, 100);
      }
    }

    render() {
      return (
        <Comp {...this.props} ref={this.rootRef} onScroll={this.onScroll} onWheel={() => this.userScroll = true} />
      );
    }
  }
  AutoScroller.displayName = `AutoScroller(${getDisplayName(Comp)})`;
  return AutoScroller;
}

export default autoScroller;