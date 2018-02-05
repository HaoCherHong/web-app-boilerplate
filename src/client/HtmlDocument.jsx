import React from 'react';

export default class HtmlDocument extends React.PureComponent {
  render() {
    const {children, state} = this.props;
    const dehydratedState = 'window.$STATE=' + JSON.stringify(state);

    return (
      <html>
        <head>
          <meta charSet='UTF-8'/>
          <title>噗比 PUPY</title>
          <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'/>
          <link href='https://use.fontawesome.com/releases/v5.0.6/css/all.css' rel='stylesheet'/>
          <link href='/serverSideRender.bundle.css' rel='stylesheet'/>
        </head>
        <body>
          <div id='react-root'>
            {children}
          </div>
          <script type='text/javascript' dangerouslySetInnerHTML={{__html: dehydratedState}}/>
          <script type='text/javascript' src='/build/app.bundle.js'></script>
        </body>
      </html>
    );
  }
}