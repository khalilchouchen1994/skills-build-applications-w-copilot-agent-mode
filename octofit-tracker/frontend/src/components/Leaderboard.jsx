import { useCollection } from './useCollection.js'

function Leaderboard({ apiBaseUrl }) {
  const { error, isLoading, items: leaderboard } = useCollection(apiBaseUrl, 'leaderboard')

  if (isLoading) {
    return <p className="status-note">Loading leaderboard...</p>
  }

  if (error) {
    return <p className="alert alert-danger">Unable to load leaderboard: {error}</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h1>Leaderboard</h1>
      </div>
      <ol className="leaderboard-list">
        {leaderboard.map((entry) => (
          <li className="leaderboard-row" key={entry._id ?? entry.userEmail}>
            <span className="rank">#{entry.rank}</span>
            <span>
              <strong>{entry.displayName}</strong>
              <small>{entry.userEmail}</small>
            </span>
            <span>{entry.points} pts</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Leaderboard
