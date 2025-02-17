import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-purple-800 mb-4">
          Contact Developer
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Addy Sahu
        </h2>
        <hr className="mb-6" />

        <div className="space-y-4">
          {/* GitHub Link with Icon */}
          <p className="text-lg text-gray-700 leading-relaxed">
            <Link
              target="_blank"
              href="https://github.com/aditya-sahu"
              className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
            >
              <span className="text-xl">🐧</span>
              <span>GitHub</span>
            </Link>
          </p>

          {/* LinkedIn Link with Icon */}
          <p className="text-lg text-gray-700 leading-relaxed">
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/adityasahu1511"
              className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
            >
              <span className="text-xl">🔗</span>
              <span>LinkedIn</span>
            </Link>
          </p>

          {/* Phone Number */}
          <p className="text-lg text-gray-700">
            <span>Mobile: (774) 518-0770</span>
          </p>
        </div>
      </div>
    </>
  );
}
