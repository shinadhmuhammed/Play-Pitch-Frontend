function VerificationTurf() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white shadow-md p-8 rounded-lg">
        <div className="text-center">
          <span className="text-6xl text-gray-400" role="img" aria-label="Envelope">
            ✉️
          </span>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Turf Verification
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Turf will be added after admin verification. 
            You will receive a verification message in your email shortly.
          </p>
          <a href="/venue" className="text-blue-500 hover:underline mt-4 block">Go to see the turf</a>
        </div>
      </div>
    </div>
  );
}

export default VerificationTurf;
