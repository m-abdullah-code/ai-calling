import { lazy } from "react"
import HeaderLanding from "../components/HeaderLanding"
const FooterLand = lazy(() => import("../components/FooterLanding"));
import benefitBg from "../assets/Images/benefit-bg.webp"


function LandingPage() {


  return (
    <>

      <HeaderLanding />
      {/* Add CallAction section here */}
      <CallAction />
      <UseCases />
      <KeyBenefits />
      <ThreeStep />
      <FooterLand />
    </>
  );
}

// CALL ACTION SECTION
function CallAction() {
  const callStats = [
    {
      title: "Quick to access",
      value: "1 Day",
      desc: "Avg. time from contract to kick off on QCall AI",
    },
    {
      title: "Quality of services",
      value: "50% Savings",
      desc: "From actions that reduce an organization's overall spending",
    },
    {
      title: "Queue-Free",
      value: "50+ Features",
      desc: "Available for all necessary tasks you’ll need",
    },
  ]

  return (
    <section className="py-16 px-4 md:px-8 bg-white text-center">
      <div className="flex flex-col items-center">
        <span className="px-4 py-1 border border-blue-500 rounded-full text-xs text-black">
          What Matters At QCall.ai
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
          We simplify your calling actions
        </h2>
        <p className="text-blue-500 text-base md:text-lg mt-2">
          To improve engagement and drive results.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {callStats.map((item, i) => (
          <div
            key={i}
            className="border border-blue-900 rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-105  transition-all duration-300"
          >
            <h3 className="text-xs text-blue-500 uppercase tracking-wide">
              {item.title}
            </h3>
            <p className="font-bold text-4xl text-blue-900 mt-2">
              {item.value}
            </p>
            <p className="text-gray-800 text-sm mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


// Use Cases Section
function UseCases() {
  const useCases = [
    {
      title: "Customer Support",
      desc: "Provide 24/7 AI-Powered assistance without increasing staff costing",
      img: "/assets/support.png",
    },
    {
      title: "Appointment Scheduling",
      desc: "AI handles bookings, reschedules, and confirmations seamlessly.",
      img: "/assets/calender.png",
    },
    {
      title: "Survey and Feedback Calls",
      desc: "Collect valuable customer insights without human intervention.",
      img: "/assets/list.png",
    },
    {
      title: "Collections & Reminders",
      desc: "Automate payment reminders and reduce overdue payments effortlessly.",
      img: "/assets/collection.png",
    },
    {
      title: "HR & Recruitment",
      desc: "AI can pre-screen candidates, schedule interviews, and follow up automatically.",
      img: "/assets/fifth.png",
    },
    {
      title: "Custom Development",
      desc: "Tailored AI solutions designed to meet your unique business requirements.",
      img: "/assets/calender.png",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 text-center bg-white flex flex-col items-center">
      {/* Section Header */}
      <div className="flex flex-col items-center max-w-lg w-full">
        <span className="px-4 py-1 border border-blue-500 rounded-full text-xs text-black">
          Use Cases
        </span>
        <h2 className="text-[clamp(1.25rem,5vw,2rem)] font-bold text-gray-900 mt-4">
          Who can benefit from QCall.ai
        </h2>
        <p className="text-blue-500 mt-2 text-[clamp(0.875rem,3vw,1rem)] max-w-md">
          Sales & Lead generation - Automated cold calls, qualify leads, and
          follow up without lifting a finger.
        </p>
      </div>

      {/* Use Case Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mt-10 justify-items-center">
        {useCases.map((item, index) => (
          <div
            key={index}
            className="border border-blue-900 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center"
          >
            <img
              src={item.img}
              alt={item.title}
              className="h-12 w-12 mb-3"
              loading="lazy"
            />
            <h3 className="text-sm font-semibold mb-2 text-blue-500">{item.title}</h3>
            <p className="text-gray-800 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <p className="text-gray-600 text-[clamp(1rem,3vw,1.25rem)] mt-8 max-w-md text-center">
        If your business relies on calls, QCall.ai is your GameChanger.
      </p>

      {/* Button */}
      <div className="mt-6">
        <button className="text-blue-900 text-base font-semibold bg-white px-6 py-3 rounded-md border border-2 border-blue-900 hover:bg-blue-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
          <span>Request a Demo</span>
        </button>
      </div>
    </section>
  )
}

// Key Benefits Section

function KeyBenefits() {
  const benefits = [
    {
      title: "Boost Efficiency & Save Time",
      desc: "No more wasting hours on repetitive calls. AI automates tasks, so your team can focus on high-value work.",
    },
    {
      title: "Cut Costs by 70–80%",
      desc: "Eliminate the need for large call center teams—QCall.ai delivers scalable AI-powered calls at a fraction of the cost.",
    },
    {
      title: "Increase Revenue by 50–80%",
      desc: "With AI-driven precision, more leads convert into paying customers—resulting in higher profits.",
    },
    {
      title: "24/7 Availability",
      desc: "AI never sleeps, ensuring seamless customer engagement anytime, anywhere.",
    },
    {
      title: "Seamless Integration",
      desc: "Works with your existing tools (CRM, databases, and more) without disrupting workflow.",
    },
    {
      title: "Data-Driven Insights",
      desc: "Every call is recorded, transcribed, and analyzed for smarter decision-making and better customer understanding.",
    },
  ];

  return (
    <section className=" py-16  text-center bg-white overflow-hidden">
      <div className="relative w-full h-full px-4 md:px-8 py-16">
        {/* bg image */}
        <div className="b-img absolute top-0 left-0 w-full h-full">
          <img src={benefitBg} alt="bg-img" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="relative flex flex-col items-center z-10">
          {/* Header */}
          <div className="flex flex-col items-center max-w-2xl mx-auto">
            <span className="px-4 py-1 border border-gray-200 rounded-full text-xs text-white">
              Key Benefits
            </span>
            <h2 className="text-[clamp(1.25rem,4vw,2rem)] font-bold text-gray-200 mt-4">
              Why Choose QCall.ai?
            </h2>
            <p className="text-gray-200 text-[clamp(0.875rem,2vw,1.125rem)] mt-2">
              To increase engagement and drive results.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl px-2 sm:px-4">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-gray-200 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Three Steps Call Section
function ThreeStep() {
  const steps = [
    {
      title: "Assign a Task",
      desc: "Set up your call requirements—whether it's sales, support, follow-ups, or reminders.",
      img: "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDESIGN.a5a2ce8f.png&w=828&q=75",
    },
    {
      title: "AI Takes Over",
      desc: "QCall.ai dials, engages, and responds in real-time—handling interactions just like a human.",
      img: "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDESIGN.a5a2ce8f.png&w=828&q=75",
    },
    {
      title: "Track & Optimize",
      desc: "Get instant call transcripts, insights, and analytics to improve future conversations.",
      img: "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDESIGN2.a22f4a18.png&w=750&q=75",
    },
  ];

  return (
    <section className="flex flex-col items-center px-4 py-12 md:px-16 text-center bg-white overflow-hidden">
      {/* Section Header */}
      <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold mb-2 text-gray-900">
        3 Simple Steps to Smarter Calls
      </h2>
      <p className="text-blue-500 text-[clamp(0.875rem,2vw,1rem)] mb-8">
        To improve engagement and drive results.
      </p>

      {/* Steps Grid */}
      <div className="flex flex-wrap justify-center items-center gap-6 w-full px-3 sm:px-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="
        relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl
        bg-gradient-to-r from-blue-900 to-blue-500 text-white
        flex flex-col justify-center items-center text-center
        w-[260px] h-[260px] sm:w-[240px] sm:h-[240px] md:w-[250px] md:h-[250px]
        max-[400px]:w-[220px] max-[400px]:h-[220px] max-[350px]:w-[200px] max-[350px]:h-[200px]
        transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
        animate-gradient-move
      "
          >
            <h3 className="font-bold text-[clamp(1rem,2.5vw,1.125rem)] text-white drop-shadow-sm">
              {step.title}
            </h3>
            <p className="mt-2 text-[clamp(0.75rem,2vw,0.875rem)] text-gray-200 max-w-[10rem]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>




      <p className="text-center text-gray-800 mt-8 text-sm md:text-base">
        It’s that simple!
      </p>
      <button className="text-blue-900 text-base font-semibold bg-white px-6 py-3 rounded-md border border-2 border-blue-900 hover:bg-blue-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-6">
        <span>Try QCall.ai Today</span>
      </button>
    </section>
  );
}



export default LandingPage;
