import { employerFeatures, jobSeekerFeatures } from "../../../utils/data";

const Features = () => {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-4">

        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need
            <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              To Succeed
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Powerful tools designed to help job seekers and employers connect faster and smarter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">

          <div>
            <h3 className="text-2xl font-bold mb-10 text-center">
              For Job Seekers
            </h3>

            <div className="space-y-6">
              {jobSeekerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-6 rounded-2xl bg-[#141414]/80 border border-white/10 hover:border-orange-500/30 hover:shadow-[0_0_25px_rgba(255,115,0,0.2)] transition cursor-pointer"
                >
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-orange-400" />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-1">
                      {feature.title}
                    </h4>

                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-10 text-center">
              For Employers
            </h3>

            <div className="space-y-6">
              {employerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-6 rounded-2xl bg-[#141414]/80 border border-white/10 hover:border-orange-500/30 hover:shadow-[0_0_25px_rgba(255,115,0,0.2)] transition cursor-pointer"
                >
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-orange-400" />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-1">
                      {feature.title}
                    </h4>

                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;