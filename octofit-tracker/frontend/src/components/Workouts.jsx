import { useCollection } from './useCollection.js'

function Workouts() {
  const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'
  const { error, isLoading, items: workouts } = useCollection(workoutsEndpoint, 'workouts')

  if (isLoading) {
    return <p className="status-note">Loading workouts...</p>
  }

  if (error) {
    return <p className="alert alert-danger">Unable to load workouts: {error}</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h1>Workouts</h1>
      </div>
      <div className="record-grid">
        {workouts.map((workout) => (
          <article className="record-card" key={workout._id ?? workout.title}>
            <h2>{workout.title}</h2>
            <p>{workout.focusArea}</p>
            <dl>
              <div>
                <dt>Level</dt>
                <dd>{workout.difficulty}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{workout.durationMinutes} min</dd>
              </div>
            </dl>
            <ul className="exercise-list">
              {(workout.exercises ?? []).map((exercise) => (
                <li key={exercise}>{exercise}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts
