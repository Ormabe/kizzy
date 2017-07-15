import React from 'react';
import ReactDOM from 'react-dom';

import App from './src/app';
import '../favicon.ico';


class Entry extends React.Component {
  render() {
    return <App />;
  }
}

ReactDOM.render(<Entry />, document.getElementById('root'));
