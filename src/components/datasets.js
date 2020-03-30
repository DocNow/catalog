import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Datasets = () => {

  const [datasets, setDatasets] = useState([])

  // load all the datasets
  useEffect(() => {
    async function fetchData() {
      const resp = await fetch('/data/datasets.json')
      const datasets = await resp.json()
      setDatasets(datasets)
    }
    fetchData()
  }, [])

  return (
    <section>
      <h2>Datasets</h2>
      <section style={{ maxWidth :'100%' }}>
        {datasets.map(d => (
          <div key={d.slug}>
            {d.title}
          </div>
        ))}
      </section>
    </section>
  )

}

export default Datasets

/*
import { connect } from "react-redux"

const Counter = ({ count, increment }) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>Increment</button>
  </div>
)

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
}

const mapStateToProps = ({ count }) => {
  return { count }
}

const mapDispatchToProps = dispatch => {
  return { increment: () => dispatch({ type: `INCREMENT` }) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
*/