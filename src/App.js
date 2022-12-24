import React, { useEffect, useState, useCallback } from "react"

import Tasks from "./components/Tasks/Tasks"
import NewTask from "./components/NewTask/NewTask"
import useFetch from "./hooks/useFetch"

function App() {
	// const [isLoading, setIsLoading] = useState(false)
	// const [error, setError] = useState(null)
	const [tasks, setTasks] = useState([])

	const { isLoading, error, sendRequest: fetchTasks } = useFetch()

	useEffect(() => {
		const transformTasks = (taskObj) => {
			const loadedTasks = []

			for (const taskKey in taskObj) {
				loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text })
			}

			setTasks(loadedTasks)
		}
		fetchTasks(
			{
				url: "https://tasks-menager-default-rtdb.firebaseio.com//tasks.json",
			},
			transformTasks
		)
	}, [fetchTasks])

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task))
	}

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	)
}

export default App
