import { useCollection } from './useCollection.js'

function Activities() {
  const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'
  const { error, isLoading, items: activities } = useCollection(activitiesEndpoint, 'activities')

  if (isLoading) {
    return <p className="status-note">Loading activities...</p>
  }

  if (error) {
    return <p className="alert alert-danger">Unable to load activities: {error}</p>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Training Log</p>
        <h1>Activities</h1>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Athlete</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.userEmail}-${activity.activityDate}`}>
                <td>{activity.type}</td>
                <td>{activity.userEmail}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.caloriesBurned}</td>
                <td>{new Date(activity.activityDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities
