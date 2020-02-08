import * as React from 'react';
import Layout from '../components/layout';

export default ({ element, props }) => {
	const layoutProps = element.type.context || props;
	return <Layout {...layoutProps}>{element}</Layout>
}