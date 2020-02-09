
/**
 * This array defines all of the available fields that can be used
 * in the @pagecontext directive from each Page Query.
 * 
 * These fields will automatically be set up as valid fields
 * within each SitePageContext.context field, but not assigned any values.
 * 
 * They will also be set up as valid parameters on the @pagecontext directive
 */
const pageContextFields = [ 'title' ];

/**
 * Need this to make sure there is something for the Pages to query.
 * 
 * Each root node of type SitePageContext will contain a context field,
 * which will just be a stub. You query it using the @pagecontext directive
 * from a page or static query to fill in the values.
 * 
 * SitePageContext will also contain a `path` field, which contain the path value
 * of each SitePage that is created.  This is how you will query the SitePageContext
 * in each Page Query
 * 
 * A standard page query will look like this:
 *  query {
 *      sitePageContext(path: { eq: "/" }) {
 *          context(title: "Home") {
 *              title
 *          }
 *      }
 *  }
 * 
 * The field `context()` is what is using the @pagecontext directive, so the parameters
 * defined there will be fed into the @pagecontext directive resolver.
 * These should be the values of each field you want to define
 * 
 * The fields defined underneath `context()` must be included for the data to be returned
 * so that it can be used by the page
 */
exports.onCreateNode = ({ actions, createNodeId, node, createContentDigest }) => {
    if (node.internal.type === "SitePage") {
        const { createNode } = actions;
        const nodeId = createNodeId(`SitePageContext >>> ${node.id}`)
        const nodeData = {
            context: {
                // If any values are placed here for any of the page nodes,
                // it will override the values passed in by the @pagecontext directive
                abcd: 1234
            },
            path: node.path,
        }
        createNode({
            id: nodeId,
            children: [],
            ...nodeData,
            internal: {
                type: 'SitePageContext',
                contentDigest: createContentDigest(nodeData),
            }
        })
    }
}

/**
 * We needs to implement this endpoint to define the GraphQL types that
 * our Page Queries will use
 */
exports.createSchemaCustomization = ({ actions, schema }) => {
    const { createTypes } = actions;
    
    const typeDefs = [
        // Need to create a root node type to contain each SitePageContextInfo stub
        `
            type SitePageContext implements Node {
                path: String
                context: SitePageContextInfo @pagecontext
            }
        `,
        // This represents the `context` field of the `SitePageContext` node
        schema.buildObjectType({
            name: 'SitePageContextInfo',
            // This uses `pageContextFields` to automatically set up all of the valid
            // nodes that can be defined for each `SitePageContext.context` field
            fields: pageContextFields.reduce((acc, fieldName) => {
                acc[fieldName] = {
                    type: 'String',
                }
                return acc;
            }, {}),
        })
    ];

    createTypes(typeDefs);

    /** 
     * This is just a utility that will generate all of the arguments that can be used
     * in the `@pageContext` directive, which are based off of `pageContextFields`
     */
    const createExtensionFields = () => pageContextFields.reduce((acc, fieldName) => {
        acc[fieldName] = 'String'
        return acc;
    }, {})

    /**
     * Defines the extension (field-level directive) @pagecontext
     */
    actions.createFieldExtension({
        name: "pagecontext",
        args: createExtensionFields(),
        extend() {
            return {
                args: createExtensionFields(),
                resolve(source, args) {
                    const resolveValue = {
                        ...args,
                        ...source.context,
                    }
                    return resolveValue;
                },
            }
        },
    })
}