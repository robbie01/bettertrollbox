import React from 'react';

class Preloader extends React.Component {
  constructor(props) {
    super(props);
    this.elements = {};
  }

  componentDidMount() {
    for (let href in this.props.content) {
      let el = document.createElement('link');
      el.rel = 'preload';
      el.href = href;
      el.as = this.props.content[href];
      this.elements[href] = el;
      document.head.appendChild(el);
    }
  }

  componentDidUpdate(prevProps) {
    for (let x in prevProps.content) {
      if (!(x in this.props.content)) {
        document.head.removeChild(this.elements[x]);
        delete this.elements[x];
      }
    }
    for (let href in this.props.content) {
      if (!(href in prevProps.content)) {
        let el = document.createElement('link');
        el.rel = 'preload';
        el.href = href;
        el.as = this.props.content[href];
        this.elements[href] = el;
        document.head.appendChild(el);
      }
    }
  }

  componentWillUnmount() {
    for (let href in this.elements) {
      document.head.removeChild(this.elements[href]);
      delete this.elements[href];
    }
  }

  render() {
    return null;
  }
}

export default Preloader;