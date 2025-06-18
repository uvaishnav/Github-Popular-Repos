import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoDetails
  return (
    <li className="repo-item-container">
      <img src={avatarUrl} alt={name} className="repo-img" />
      <h1 className="repo-name">{name}</h1>
      <div className="repo-stats-container">
        <div className="repo-detail-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="repo-detail-img"
          />
          <p className="repo-detail-text">{starsCount} stars</p>
        </div>
        <div className="repo-detail-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="repo-detail-img"
          />
          <p className="repo-detail-text">{forksCount} forks</p>
        </div>
        <div className="repo-detail-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="repo-detail-img"
          />
          <p className="repo-detail-text">{issuesCount} issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
