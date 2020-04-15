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
import TableSortLabel from "@material-ui/core/TableSortLabel"
import Paper from "@material-ui/core/Paper"
import moment from "moment"

import style from "./datasets.module.css"

const Datasets = () => {

  // set up some hooks to manage state
  const [datasets, setDatasets] = useState([])
  const [filtered, setFiltered] = useState([])
  const [subjects, setSubjects] = useState([])
  const [start, setStart] = useState('2010-01-01')
  const [end, setEnd] = useState(moment().add(1, 'days').format('YYYY-MM-DD'))
  const [subject, setSubject] = useState('All')
  const [search, setSearch] = useState('')
  const [orderBy, setOrderBy] = useState('added')
  const [order, setOrder] = useState('desc')

  // load initial datasets data when the component mounts
  useEffect(() => {
    // note: useEffect warns about being given an async function
    async function fetchData() {

      // get the datasets.json data
      const url = withPrefix('/data/datasets.json')
      const resp = await fetch(url)
      const datasets = await resp.json()

      // sort the datasets by added date, descending
      datasets.sort((a, b) => new Date(b.added) - new Date(a.added))

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

  const updateOrder = (newOrderBy) => {
    const newOrder = order === 'asc' ? 'desc' : 'asc'
    setOrderBy(newOrderBy)
    setOrder(newOrder)
    const newDatasets = [...datasets]
    newDatasets.sort(getComparator(newOrder, newOrderBy))
    setDatasets(newDatasets)
  }

  const headCells = [
    { id: 'added', numeric: false, label: 'ADDED' },
    { id: 'dates', numeric: false, label: 'DATE RANGE' },
    { id: 'title', numeric: false, label: 'TITLE' },
    { id: 'tweets', numeric: true, label: 'TWEET COUNT' },
    { id: 'creators', numeric: false, label: 'CREATORS' },
    { id: 'subjects', numeric: false, label: 'SUBJECTS' },
    { id: 'repository', numeric: false, label: 'REPOSITORY' }
  ]

  const numTweets = datasets
    .filter(d => filtered.includes(d.slug))
    .map(d => d.tweets)
    .reduce((a, b) => a + b, 0)
    .toLocaleString() 

  // render the datasets!

  return (
    <section className={style.datasets}>

      <div className={style.summary}>
        <div className={style.recordCount}>
          {filtered.length} Records comprising {numTweets} tweets
        </div>
        <div className={style.addRecord}>
          <a href="/admin/#/collections/datasets/new">
            <Button title="Add a record to the Catalog" variant="contained" color="primary">Add Record</Button>
          </a>
        </div>
      </div>

      <div style={{ maxWidth :'100%' }}>

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

          <div className={style.dates}>

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

          </div>

          <div className={style.search}>
            <TextField 
              id="search"
              label="Search"
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)} />
          </div>

        </FormControl>

        <div className={style.licenseNote}>
          Note: all metadata is shared under a CC0 license. Please read 
          our <a href="https://github.com/docnow/code-of-conduct#readme">Code of Conduct</a> for
          more information about contributing datasets.
        </div>

        <TableContainer className={style.datasetsTable} component={Paper}>
          <Table>

            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={e => updateOrder(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
            {datasets.filter(d => filtered.includes(d.slug)).map((d, i) => (
              <TableRow key={`dataset-${i}`}>
                <TableCell>{moment(d.added).format('L')}</TableCell>
                <TableCell align="center">{moment(d.dates[0].start).format('L')}<br />to<br /> {moment(d.dates[0].end).format('L')}</TableCell>
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

      </div>

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

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function descendingComparator(a, b, orderBy) {
  let vals = [ a[orderBy], b[orderBy] ]
  // normalize the values based on what column they are
  if (orderBy === 'dates') {
    // sort by the first date in the range
    vals = vals.map(d => d[0].start)
  } else if (['title', 'repository'].includes(orderBy)) {
    // sort by lower cased string
    vals = vals.map(s => s.toLowerCase())
  } else if (orderBy === 'creators') {
    // sort by the first creator's name
    vals = vals.map(c => c[0].name.toLowerCase())
  } else if (orderBy === 'subjects') {
    // sort by the first subject lower cased
    vals = vals.map(l => l[0].toLowerCase())
  }

  // now we can compare
  if (vals[1] < vals[0]) {
    return -1;
  }
  if (vals[1] > vals[0]) {
    return 1;
  }
  return 0;
}

export default Datasets
