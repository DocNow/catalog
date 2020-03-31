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
  const [datasets, setDatasets] = useState([])
  const [subjects, setSubjects] = useState([])
  const [start, setStart] = useState('2010-01-01')
  const [end, setEnd] = useState('2020-01-01')
  const [subjectFilter, setSubjectFilter] = useState('All')
  const [search, setSearch] = useState('')

  // load all the datasets when the component mounts
  // and *only* when the component mounts
  useEffect(() => {
    async function fetchData() {
      const url = withPrefix('/data/datasets.json')
      const resp = await fetch(url)
      const datasets = await resp.json()
      setDatasets(datasets)

      let subjects = new Set()
      let start, end = null

      for (const d of datasets) {

        for (const s of d.subjects) {
          subjects.add(s)
        }

        for (const r of d.dates) {
          let s = new Date(r.start)
          let e = new Date(r.end)
          if (start == null || s < start) start = s
          if (end == null || e > end) end = e
        }

      }

      subjects = Array.from(subjects).sort()
      setSubjects(subjects)
      setStart(moment(start).format('YYYY-MM-DD'))
      setEnd(moment(end).format('YYYY-MM-DD'))
    }
    fetchData()
  }, [])

  return (
    <section className={style.datasets}>
      <section style={{ maxWidth :'100%' }}>
        <FormControl className={style.filter}>

          <div className={style.subjects}>
          <InputLabel>Subjects</InputLabel>
          <Select 
            onChange={e => setSubjectFilter(e.target.value)} 
            value={subjectFilter}>
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
            <Button variant="contained" color="primary">Add Record</Button>
          </div>

        </FormControl>

        <div className={style.summary}>
          <div className={style.recordCount}>
            {datasets.length} Records <br/>
          </div>
          <div className={style.tweetCount}>
            {datasets.map(d => d.tweets).reduce((a, b) => a + b, 0).toLocaleString()} Tweets
          </div>
          <div className={style.licenseNote}>
            Note all metadata is shared under a CC0 license. Please read 
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
              </TableRow>
            </TableHead>
            <TableBody>
            {datasets.map(d => (
              <TableRow key={d.slug}>
                <TableCell>{d.dates[0].start} - {d.dates[0].end}</TableCell>
                <TableCell>{d.title}</TableCell>
                <TableCell align="right">{d.tweets.toLocaleString()}</TableCell>
                <TableCell>{d.creators.join(', ')}</TableCell>
                <TableCell>{d.subjects.join(', ')}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </section>
  )

}

export default Datasets