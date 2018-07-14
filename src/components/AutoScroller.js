import React from 'react';

const AutoScroller = (Comp) => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoScroll: true
    };
    this.rootRef = React.createRef();
    this.onManualScroll = this.onManualScroll.bind(this);
  }

  onManualScroll() {
    const rootEl = this.rootRef.current;
    this.setState({
      autoScroll: rootEl.scrollTop > rootEl.scrollHeight - rootEl.clientHeight - 10
    });
  }

  componentDidUpdate() {
    if (this.state.autoScroll) {
      this.userScroll = false;
      const rootEl = this.rootRef.current;
      rootEl.scrollTop = rootEl.scrollHeight;
    }
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <Comp {...props} ref={this.rootRef} onWheel={() => this.userScroll = true}>
        {children}
      </Comp>
    );
  }
}

export default AutoScroller;