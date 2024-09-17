import CreateUser from '../features/user/CreateUser';

function Home() {
  return (
    <div>
      <h1 className="text-stone-70 mb-40 text-center text-xl font-semibold">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
