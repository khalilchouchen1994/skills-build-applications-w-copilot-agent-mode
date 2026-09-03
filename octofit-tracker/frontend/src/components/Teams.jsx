import { useCollection } from './useCollection.js'

function Teams() {
  const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'
  const { error, isLoading, items: teams } = useCollection(teamsEndpoint, 'teams')

  if (isLoading) {
    return <p className="status-note">Loading teams...</p>
  }

  if (error) {
    return <p className="alert alert-danger">Unable to load teams: {error}</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Groups</p>
        <h1>Teams</h1>
      </div>
      <div className="record-grid">
        {teams.map((team) => (
          <article className="record-card" key={team._id ?? team.name}>
            <h2>{team.name}</h2>
            <p>{team.mascot}</p>
            <dl>
              <div>
                <dt>Members</dt>
                <dd>{team.memberCount}</dd>
              </div>
              <div>
                <dt>Weekly goal</dt>
                <dd>{team.weeklyGoalMinutes} min</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams
