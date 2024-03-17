

function LandinPage() {
  return (
    <div>
    <div className="flex justify-end mt-3 mr-4 ">
      <button>
        <a className="bg-green-500 text-white border border-white px-4 py-2 rounded mr-2 shadow-md" href="/login">Login</a>
        <a className="bg-white text-black px-4 py-2 rounded shadow-md" href="/signup">Register</a>
      </button>
    </div>

    <div>
  <img src="/images/landingturf2.jpg" className="w-full h-auto mt-2 " alt="hello" />
</div>


  </div>
  

  )
}

export default LandinPage
