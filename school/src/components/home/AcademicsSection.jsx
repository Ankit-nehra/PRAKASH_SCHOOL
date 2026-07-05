function AcademicsSection() {
  const academics = [
    {
      id: 1,
      title: "Primary School",
      description: "Foundation years with focus on basic literacy, numeracy, and creativity.",
      color: "bg-yellow-400",
    },
    {
      id: 2,
      title: "Middle School",
      description: "Developing critical thinking and deeper knowledge across subjects.",
      color: "bg-green-400",
    },
    {
      id: 3,
      title: "Senior School",
      description: "Advanced academic programs to prepare students for higher education.",
      color: "bg-blue-400",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          Academics
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {academics.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-lg shadow hover:shadow-md transition ${item.color} text-white`}
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-white/90">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AcademicsSection;