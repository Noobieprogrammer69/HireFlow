import { Download } from "lucide-react"

const ChatProfile = ({ user }) => {

  if (!user) return null

  const avatar =
    user.avatar?.startsWith("http")
      ? user.avatar
      : `http://localhost:5000/uploads/${user.avatar}`

  const resume =
    user.resume
      ? `http://localhost:5000/uploads/${user.resume}`
      : null

  return (

    <div className="w-72 bg-[#141414] border border-white/10 rounded-xl p-6 h-fit">

      <div className="flex flex-col items-center">

        <img
          src={avatar}
          className="w-20 h-20 rounded-full object-cover mb-4"
        />

        <h2 className="text-white font-semibold text-lg">
          {user.name}
        </h2>

        {user.email && (
          <p className="text-gray-400 text-sm mt-1">
            {user.email}
          </p>
        )}

      </div>

      {resume && (

        <a
          href={resume}
          download
          className="flex items-center justify-center gap-2 mt-6 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white"
        >

          <Download size={16}/>
          Download Resume

        </a>

      )}

    </div>

  )

}

export default ChatProfile