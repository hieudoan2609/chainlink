import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Content from 'components/Content'
import RegionalNav from 'components/Jobs/RegionalNav'
import PrettyJson from 'components/PrettyJson'
import { connect } from 'react-redux'
import { fetchJob, createJobRun } from 'actions'
import jobSelector from 'selectors/job'
import matchRouteAndMapDispatchToProps from 'utils/matchRouteAndMapDispatchToProps'
import jobSpecDefinition from 'utils/jobSpecDefinition'

const styles = theme => ({
  definitionTitle: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  divider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3
  }
})

const renderDetails = ({job, classes}) => {
  const definition = job && jobSpecDefinition(job)

  if (definition) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='title' className={classes.definitionTitle}>
            Definition
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider light className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <PrettyJson object={definition} />
        </Grid>
      </Grid>
    )
  }

  return <React.Fragment>Fetching ...</React.Fragment>
}

class Definition extends Component {
  componentDidMount () {
    this.props.fetchJob(this.props.jobSpecId)
  }

  render () {
    const { jobSpecId, job } = this.props

    return (
      <div>
        <RegionalNav jobSpecId={jobSpecId} job={job} />

        <Content>
          <Card>
            <CardContent>
              {renderDetails(this.props)}
            </CardContent>
          </Card>
        </Content>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const jobSpecId = ownProps.match.params.jobSpecId
  const job = jobSelector(state, jobSpecId)

  return {
    jobSpecId,
    job
  }
}

export const ConnectedDefinition = connect(
  mapStateToProps,
  matchRouteAndMapDispatchToProps({fetchJob, createJobRun})
)(Definition)

export default withStyles(styles)(ConnectedDefinition)
