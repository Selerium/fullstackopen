const Header = ({ course }) => <h2>{course}</h2>

const Content = ({ parts }) => {
  return parts.map(part => <Part key={part.id} part={part} />)
}


const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({ total }) => {
  return <p style={{ fontWeight: "bold" }}>Number of exercises {total.reduce((sum, part) => sum + part.exercises, 0)}</p>
}

const Course = ({ course }) => {
  return <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total total={course.parts} />
  </>
}

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
  ]

  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course course={course} />)}
    </>
  )
}

export default App