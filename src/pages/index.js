import 'bootstrap/dist/css/bootstrap.min.css'

export default Home;

function Home() {
  return (
    <div className='p-4'>
      <div className='container'>
        <h1>Hi {userService.userValue?.firstName}</h1>
        <p>You&apos;re logged in with Next.js</p>
      </div>
    </div>
  )
}