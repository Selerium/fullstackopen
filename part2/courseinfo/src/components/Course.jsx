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

export default Course