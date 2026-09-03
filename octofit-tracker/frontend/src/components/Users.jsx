import { useCollection } from './useCollection.js'

function Users({ apiBaseUrl }) {
  const { error, isLoading, items: users } = useCollection(apiBaseUrl, 'users')

  if (isLoading) {
    return <p className="status-note">Loading users...</p>
  }

  if (error) {
    return <p className="alert alert-danger">Unable to load users: {error}</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Members</p>
        <h1>Users</h1>
      </div>
      <div className="record-grid">
        {users.map((user) => (
          <article className="record-card" key={user._id ?? user.email}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{user.role}</dd>
              </div>
              <div>
                <dt>Goal</dt>
                <dd>{user.fitnessGoal}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users
