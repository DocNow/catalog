import React, { useState, useEffect } from "react"
import { Link, withPrefix } from "gatsby"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import moment from "moment"

import style from "./datasets.module.css"

const Datasets = () => {

  // set up some hooks to manage state
  const [datasets, setDatasets] = useState([])
  const [filtered, setFiltered] = useState([])
  const [subjects, setSubjects] = useState([])
  const [start, setStart] = useState('2010-01-01')
  const [end, setEnd] = useState(moment().format('YYYY-MM-DD'))
  const [subject, setSubject] = useState('All')
  const [search, setSearch] = useState('')

  // load initial datasets data when the component mounts
  useEffect(() => {
    // note: useEffect warns about being given an async function
    async function fetchData() {

      // get the datasets.json data
      const url = withPrefix('/data/datasets.json')
      const resp = await fetch(url)
      const datasets = await resp.json()

      // sort the datasets by added date, descending
      datasets.sort((a, b) => new Date(b.dates[0].start) - new Date(a.dates[0].start))

      // update the display with latest data
      setDatasets(datasets)
      setFiltered(datasets.map(d => d.slug))
      setSubjects(getSubjects(datasets))
      setStart(getEarliestDate(datasets))
    }

    fetchData()
  }, [])

  useEffect(() => {
    let slugs = datasets.map(d => d.slug)
    slugs = intersection(slugs, filterSubjects(datasets, subject))
    slugs = intersection(slugs, filterDates(datasets, start, end))
    slugs = intersection(slugs, filterSearch(datasets, search))
    slugs = Array.from(new Set(slugs))
    setFiltered(slugs)
    setSubjects(getSubjects(datasets.filter(d => slugs.includes(d.slug))))
  }, [subject, start, end, search, datasets])

  // render the datasets!
  return (
    <section className={style.datasets}>
      <section style={{ maxWidth :'100%' }}>
        <FormControl className={style.filter}>

          <div className={style.subjects}>
          <InputLabel>Subjects</InputLabel>
          <Select 
            onChange={e => setSubject(e.target.value)} 
            value={subject}>
            <MenuItem value="All">All</MenuItem>
            {subjects.map(s => 
            <MenuItem key={s} value={s}>{s}
            </MenuItem>
            )}
          </Select>
          </div>

          <div className={style.tweetsStart}>
          <TextField
            id="start"
            label="Tweets Start"
            type="date"
            onChange={e => setStart(e.target.value)}
            value={start} />
          </div>

          <div className={style.tweetsEnd}>
          <TextField
            id="end"
            label="Tweets End"
            type="date"
            onChange={e => setEnd(e.target.value)}
            value={end} />
          </div>

          <div className={style.search}>
            
            <TextField 
              id="search"
              label="Search"
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)} />
          </div>

          <div className={style.addRecord}>
            <a href="/admin/">
              <Button title="Add a record to the Catalog" variant="contained" color="primary">Add Record</Button>
            </a>
          </div>

        </FormControl>

        <div className={style.summary}>
          <div className={style.recordCount}>
            {filtered.length} Records <br/>
          </div>
          <div className={style.tweetCount}>
            {datasets.filter(d => filtered.includes(d.slug)).map(d => d.tweets).reduce((a, b) => a + b, 0).toLocaleString()} Tweets
          </div>
          <div className={style.licenseNote}>
            Note: all metadata is shared under a CC0 license. Please read 
            our <a href="https://github.com/docnow/code-of-conduct#readme">Code of Conduct</a> for
            more information about contributing datasets.
          </div>
        </div>

        <TableContainer className={style.datasetsTable} component={Paper}>
          <Table>
            <TableHead>
              <TableRow className={style.colHeader}>
                <TableCell>DATE RANGE</TableCell>
                <TableCell>TITLE</TableCell>
                <TableCell align="right">TWEET COUNT</TableCell>
                <TableCell>CREATOR</TableCell>
                <TableCell>SUBJECTS</TableCell>
                <TableCell>REPOSITORY</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {datasets.filter(d => filtered.includes(d.slug)).map((d, i) => (
              <TableRow key={`dataset-${i}`}>
                <TableCell>{d.dates[0].start} - {d.dates[0].end}</TableCell>
                <TableCell><Link to={`/datasets/${d.slug}/`}>{d.title}</Link></TableCell>
                <TableCell align="right">{d.tweets.toLocaleString()}</TableCell>
                <TableCell>{d.creators.map(c => c.name).join(', ')}</TableCell>
                <TableCell>{d.subjects.join(', ')}</TableCell>
                <TableCell>{d.repository}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </section>
  )

}

function getSubjects(datasets) {
  let subjects = new Set()
  for (const d of datasets) {
    for (const s of d.subjects) {
      subjects.add(s)
    }
  }
  subjects = Array.from(subjects).sort()
  return subjects
}

function getEarliestDate(datasets) {
  let start = null
  for (const d of datasets) {
    for (const r of d.dates) {
      let s = new Date(r.start)
      if (start == null || s < start) start = s
    }
  }
  return moment(start).format('YYYY-MM-DD')
}

function filterSubjects(datasets, subject) {
  let slugs = []
  if (subject !== 'All') {
    slugs = datasets
      .filter(d => d.subjects.includes(subject))
      .map(d => d.slug)
  } else {
    slugs = datasets.map(d => d.slug)
  }
  return slugs
}

function filterDates(datasets, start, end) {
  const slugs = []
  for (const dataset of datasets) {
    for (const date of dataset.dates) {
      if (date.start >= start && date.start <= end && date.end >= start && date.end <= end) {
        slugs.push(dataset.slug)
      }
    }
  }
  return slugs
}

function filterSearch(datasets, search) {
  const pattern = new RegExp(search, 'i')
  const slugs = []
  for (const d of datasets) {
    if (d.title.match(pattern)) {
      slugs.push(d.slug)
    } else if (d.description.match(pattern)) {
      slugs.push(d.slug)
    } else if (d.creators.map(c => c.name).join(' ').match(pattern)) {
      slugs.push(d.slug)
    } else if (d.repository.match(pattern)) {
      slugs.push(d.slug)
    } else if (d.subjects.join(' ').match(pattern)) {
      slugs.push(d.slug)
    }
  }
  return slugs
}

function intersection(a, b) {
  return a.filter(value => -1 !== b.indexOf(value))
}

export default Datasets