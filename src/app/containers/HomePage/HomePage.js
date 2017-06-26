import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectUsername, makeSelectRepos, makeSelectLoading, makeSelectError } from './selectors'
import { changeUsername, loadRepos } from './actions'
import messages from './messages'

class HomePage extends Component {
  render() {
    const { username, onChangeUsername, onSubmitForm, loading, error, repos } = this.props
    return (
      <div>
        <div>Github <FormattedMessage {...messages.authorName} />:</div>
        <div>
          <form onSubmit={onSubmitForm}>
            <input name="name" type="text"
              value={username}
              onChange={onChangeUsername}
            />
          </form>
        </div>
        {
          loading?<div>Loading...</div>:null
        }
        {
          error?<div>Something went wrong, please try again!</div>:null
        }
        {
          repos?
          <div>
            <ul>
            {repos.map((item, i) =>{
              return (
                <li key={i}>
                  <a href={item.html_url}>
                    {item.name}
                  </a>
                </li>
              )
            })}
            </ul>
          </div>:null
        }
      </div>
    )
  }
}

HomePage.propTypes = {
  username: PropTypes.string,
}

const mapDispatchToProps = dispatch => ({
  onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
  onSubmitForm: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault()
    dispatch(loadRepos())
  },
})

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  repos: makeSelectRepos(),
})

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
