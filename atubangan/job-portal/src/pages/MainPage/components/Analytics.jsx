import { motion } from "framer-motion";
import { TrendingUp, Users, Briefcase, Target } from "lucide-react";

const Analytics = () => {
  const stats = [
    { icon: Users, title: "Active Users", value: "2.4M+", growth: "+15%" },
    { icon: Briefcase, title: "Jobs Posted", value: "150K+", growth: "+22%" },
    { icon: Target, title: "Successful Hires", value: "89K+", growth: "+18%" },
    { icon: TrendingUp, title: "Match Rate", value: "94%", growth: "+8%" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#0f0f0f] to-black relative overflow-hidden text-white">
      <div className="container mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Platform
            <span className="bg-gradient-to-r px-3 from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Analytics
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real-time insights and data-driven results connecting talent with opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#141414]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:shadow-[0_0_25px_rgba(255,115,0,0.25)] transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-orange-400" />
                </div>

                <span className="text-orange-400 text-sm font-semibold bg-orange-500/10 px-2 py-1 rounded-full">
                  {stat.growth}
                </span>
              </div>

              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-400">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Analytics;