import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem/index'
import RepositoryItem from '../RepositoryItem/index'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    selectedFilter: 'ALL',
    apiState: null,
    popularRepoList: [],
  }

  //   selectedFilterOptions = {
  //     all: 'ALL',
  //     javascript: 'JAVASCRIPT',
  //     ruby: 'RUBY',
  //     java: 'JAVA',
  //     css: 'CSS',
  //   }

  apiStatus = {
    success: 'SUCCESS',
    loading: 'LOADING',
    failure: 'FAILURE',
  }

  componentDidMount() {
    this.callForRepositories()
  }

  callForRepositories = () => {
    this.setState({apiState: this.apiStatus.loading}, this.getRepositories)
  }

  getRepositories = async () => {
    const url = this.getUrl()
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)
      const formattedData = data.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))

      this.setState({
        apiState: this.apiStatus.success,
        popularRepoList: formattedData,
      })
    } else {
      this.setState({apiState: this.apiStatus.failure})
    }
  }

  getUrl = () => {
    const {selectedFilter} = this.state
    return `https://apis.ccbp.in/popular-repos?language=${selectedFilter}`
  }

  onChangingLanguageOption = event => {
    console.log(event.target.value)
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  renderSuccessView = popularRepoList => (
    <ul className="repo-list-container">
      {popularRepoList.map(eachRepo => (
        <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
      ))}
    </ul>
  )

  render() {
    const {selectedFilter, apiState, popularRepoList} = this.state
    let repositoryView
    switch (apiState) {
      case this.apiStatus.loading:
        repositoryView = this.renderLoadingView()
        break
      case this.apiStatus.failure:
        repositoryView = this.renderFailureView()
        break
      case this.apiStatus.success:
        repositoryView = this.renderSuccessView(popularRepoList)
        break
      default:
        break
    }

    return (
      <div className="github-main-container">
        <h1 className="main-heading">Popular</h1>
        <select
          className="selection-container"
          value={selectedFilter}
          onChange={this.onChangingLanguageOption}
        >
          {languageFiltersData.map(eachLang => (
            <LanguageFilterItem
              key={eachLang.id}
              optionDisplay={eachLang.language}
              optionValue={eachLang.id}
              isSelected={selectedFilter === eachLang.id}
            />
          ))}
        </select>
        {repositoryView}
      </div>
    )
  }
}

export default GithubPopularRepos
