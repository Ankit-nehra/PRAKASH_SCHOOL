import { useEffect, useRef, useState } from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaTrophy, FaSchool } from "react-icons/fa";

const stats = [
  { id: 1, label: "Total Students", value: 500, icon: FaUserGraduate },
  { id: 2, label: "Total Teachers", value: 25, icon: FaChalkboardTeacher },
  { id: 3, label: "Total Awards", value: 45, icon: FaTrophy },
  { id: 4, label: "Total Classes", value: 20, icon: FaSchool },
];

export default function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          startCounting();
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const startCounting = () => {
    stats.forEach((stat, index) => {
      let start = 0;
      const end = stat.value;

      const duration = 2000;
      const steps = 60;
      const increment = Math.ceil(end / steps);
      const interval = duration / steps;

      const timer = setInterval(() => {
        start += increment;

        if (start >= end) {
          start = end;
          clearInterval(timer);
        }

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = start;
          return updated;
        });
      }, interval);
    });
  };

  return (
    <section ref={sectionRef} className="py-20 bg-blue-900">
      
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
         School at a Glance

        </h2>
        <p className="text-blue-300 mt-2">
          Excellence in education and achievements
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">

        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.id}
              className="bg-blue-800 border border-blue-700 p-8 rounded-xl text-center text-white shadow-lg hover:scale-105 hover:bg-blue-700 transition duration-300"
            >
              <Icon className="text-4xl mx-auto mb-4 text-yellow-400" />

              <h2 className="text-4xl font-bold">
                {counts[index]}+
              </h2>

              <p className="mt-2 text-blue-200 font-medium">
                {stat.label}
              </p>
            </div>
          );
        })}

      </div>
    </section>
  );
}