import React from 'react'
import Layout from '../components/layout'

const Dataset = ({ pageContext: dataset }) => (
  <Layout>
    <dl>
      <dt>Title:</dt>
      <dd>{dataset.title}</dd>
      <dt>Creator:</dt>
      <dd>
        {dataset.creators.map(a => (
          <span>{a}</span>
        ))}
      </dd>
    </dl>
    <div dangerouslySetInnerHTML={{__html: dataset.description}} />
  </Layout>
)

export default Dataset