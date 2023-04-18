import { useEffect} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    
    useEffect(()=>{
        const fetchWorkouts = async() => {
            const response = await fetch('/api/workouts') // we added proxy to json file
            const json = await response.json() // now we have array of objects here
            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [dispatch])

  return (
    <div className='home'>
        <div className="workouts">
            {workouts && workouts.map((w)=>(
                <WorkoutDetails key={w._id} workout={w} />
            ))}
        </div>
        <WorkoutForm/>
    </div>
  )
}

export default Home