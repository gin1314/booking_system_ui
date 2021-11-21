import React from 'react';
import Link from 'next/link';

// a class based component is needed to prevent
// material-ui from throwing warning
class NextLink extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { className, href, hrefAs, children, style, activeClassName, router } = this.props;
    let activeClass = '';
    if (activeClassName && router) {
      if (href === router.pathname) {
        activeClass = activeClassName;
      }
    }

    return (
      <Link href={href} as={hrefAs}>
        <a className={`${className} ${activeClass}`} style={style}>
          {children}
        </a>
      </Link>
    );
  }
}

export default NextLink;
