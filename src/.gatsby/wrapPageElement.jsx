import * as React from 'react';
import Layout from '../components/layout';

/**
 * This will mutate the `props` parameter.  props.data.sitePageContext.context will be
 * merged with props.pageContext.
 * 
 * props.data.sitePageContext will then be deleted, so it will not be available via
 * conventional means
 */
const getPageContext = (props) => {
	let pageContext = {
		...props.pageContext
	};
	if (props.data && props.data.sitePageContext && props.data.sitePageContext.context) {
		pageContext = {
			...pageContext,
			...props.data.sitePageContext.context
		};
		delete props.data.sitePageContext;
	}
	// The props object must be MUTATED here, because if the object reference is changed
	// it will not be passed on to the component as `pageContext`
	Object.assign(props.pageContext, pageContext);
	return pageContext;
}

export default ({ element, props }) => {
	const layoutProps = getPageContext(props);
	return <Layout {...layoutProps}>{element}</Layout>
}