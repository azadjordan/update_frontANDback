import { useContext, useState } from "react";
import { WorkoutsContext } from "../context/WorkoutContext";


function WorkoutEdit({ workout, selectedId, setSelectedId }) {
  const { dispatch } = useContext(WorkoutsContext);
  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const updatedWorkout = {
      title,
      load,
      reps,
    };
  
    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWorkout),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        dispatch({ type: 'UPDATE_WORKOUT', payload: data });
        setSelectedId(null)
      } else {
        console.error('Error updating workout:', data.error);
      }
    } catch (error) {
      console.error('Error updating workout:', error.message);
    }
  };

  const handleClose = () => {
    setSelectedId(null);
  };

  return (
    <>
    <form className="create edit-form" onSubmit={handleSubmit}>
      <h3 className="edit-form-heading">Edit Workout:</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label> Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label> Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button type="submit">Update</button>
      <span className='material-symbols-outlined hide-button' onClick={handleClose}>hide</span>
    </form>
    </>
    
  )
}

export default WorkoutEdit;
