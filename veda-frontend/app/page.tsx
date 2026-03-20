"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    title: "",
    questions: "",
    marks: "",
    instructions: "",
  });
  const [output, setOutput] = useState<any[]>([]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateQuestions = () => {
  return [
    {
      section: "Section A",
      questions: [
        { text: "What is Python?", difficulty: "Easy", marks: 2 },
        { text: "Define OOP.", difficulty: "Medium", marks: 5 },
      ],
    },
    {
      section: "Section B",
      questions: [
        { text: "Explain inheritance.", difficulty: "Hard", marks: 10 },
      ],
    },
  ];
};

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  if (!form.title || !form.questions || !form.marks) {
    alert("Please fill all required fields ❗");
    return;
  }

  if (Number(form.questions) <= 0 || Number(form.marks) <= 0) {
    alert("Values must be greater than 0 ❗");
    return;
  }


  console.log("Clicked ✅");
  console.log("Form Data:", form);

  try {
    const res = await fetch("https://veda-ai-assignment-old3.onrender.com/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.title,
        email: form.instructions || "test@gmail.com",
      }),
    });

    const data = await res.json();
    setOutput(generateQuestions()); // 👈 ADD THIS

    console.log("Response from backend:", data);

    alert("Saved to DB ✅");
  } catch (error) {
    console.error("Error:", error);
    alert("Backend error ❌");
  }
};
  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6">

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-md w-[400px]"
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-black">
        Create Assignment
      </h1>

      <input
        type="text"
        name="title"
        placeholder="Assignment Title"
        className="w-full p-2 mb-4 border rounded text-black bg-white"
        onChange={handleChange}
      />

      <input
        type="number"
        name="questions"
        placeholder="Number of Questions"
        className="w-full p-2 mb-4 border rounded text-black bg-white"
        onChange={handleChange}
      />

      <input
        type="number"
        name="marks"
        placeholder="Total Marks"
        className="w-full p-2 mb-4 border rounded text-black bg-white"
        onChange={handleChange}
      />

      <textarea
        name="instructions"
        placeholder="Instructions"
        className="w-full p-2 mb-4 border rounded text-black bg-white"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-black text-white p-2 rounded"
      >
        Generate Assignment
      </button>
    </form>

    {/* OUTPUT */}
    {output.length > 0 && (
      <div className="bg-white p-6 rounded-xl shadow-lg text-black w-[420px]">

        <h2 className="text-xl font-bold mb-4">Generated Question Paper</h2>

        {/* STUDENT INFO */}
        <div className="mb-4">
          <p>Name: ________________________</p>
          <p>Roll No: _____________________</p>
          <p>Section: _____________________</p>
        </div>

        {/* SECTIONS */}
        {output.map((section, i) => (
          <div key={i} className="mb-4">

            <h3 className="font-semibold mt-4 text-lg">
              {section.section}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Attempt all questions
            </p>

            {section.questions.map((q: any, index: number) => (
              <div
                key={index}
                className="flex justify-between border-b py-2 text-sm"
              >
                <span>
                  {index + 1}. {q.text}
                </span>

                <span className="text-gray-700">
                  {q.difficulty} | {q.marks} marks
                </span>
              </div>
            ))}

          </div>
        ))}

      </div>
    )}

  </div>
);
}