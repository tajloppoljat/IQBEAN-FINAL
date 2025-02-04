import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  ChevronRight,
  Cloud,
  Users,
  Building2,
  ArrowRight,
  ArrowLeft,
  Target,
  Shield,
  Zap,
  Clock,
  Calendar,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

/*******************************************/
/* 1) TRANSPARENT FIXED BACK BUTTON       */
/*******************************************/
function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        top: "1rem",
        left: "1rem",
        backgroundColor: "transparent",
        color: "#BFDBFE",
        border: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.9rem",
        zIndex: 50, // ensures it's above other elements
        cursor: "pointer",
      }}
      className="hover:opacity-70 transition-opacity font-medium"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back</span>
    </button>
  );
}

/****************************************************************/
/* 2) CUSTOM SELECT COMPONENT FOR TALENT TYPE (more aesthetic)  */
/****************************************************************/
function AestheticSelect({ value, onChange, options = [], placeholder }) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  // Close the dropdown if user clicks outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div
      ref={selectRef}
      style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255, 0.1)",
        color: "#FFFFFF",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "0.5rem",
        cursor: "pointer",
      }}
      className="w-full"
    >
      {/* Selected value + custom arrow */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-white" />
        </motion.div>
      </div>

      {/* Dropdown options */}
      {open && (
        <div
          style={{
            backgroundColor: "rgba(255,255,255, 0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          className="absolute left-0 right-0 mt-1 rounded-lg shadow-lg z-10"
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-white/20 transition-colors text-sm"
              style={{ color: "#FFFFFF" }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/*********************************************************/
/* 3) SUCCESS STORIES PAGE  (unchanged old layout)       */
/*********************************************************/
function SuccessStoriesPage({ onBack }) {
  return (
    <div
      style={{ backgroundColor: "#001430" }}
      className="min-h-screen relative"
    >
      {/* Subtle back button top-left */}
      <div className="absolute top-6 left-6">
        <BackButton onClick={onBack} />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="pt-10 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div
              style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6"
            >
              <span
                style={{ backgroundColor: "#60A5FA" }}
                className="w-2 h-2 rounded-full animate-pulse"
              />
              <span
                style={{ color: "#BFDBFE" }}
                className="font-medium tracking-wide text-sm"
              >
                CLIENT SUCCESS STORIES
              </span>
            </div>

            <h1
              style={{ color: "#FFFFFF" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Transforming IT Teams Across Industries
            </h1>

            <p
              style={{ color: "#E5E7EB" }}
              className="text-xl leading-relaxed mb-12"
            >
              Discover how leading companies accelerated their growth with
              IQBean's elite IT talent solutions.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { value: "500+", label: "Success Stories" },
                { value: "95%", label: "Retention Rate" },
                { value: "48hrs", label: "Average Placement" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                  className="p-6 rounded-xl border border-white/10"
                >
                  <div
                    style={{ color: "#FFFFFF" }}
                    className="text-3xl font-bold mb-2"
                  >
                    {stat.value}
                  </div>
                  <div style={{ color: "#BFDBFE" }} className="text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {[
              {
                industry: "Fortune 500 Technology",
                title: "Scaling Cloud Engineering Excellence",
                challenge:
                  "Needed to rapidly scale cloud engineering team for major digital transformation initiative",
                solution:
                  "Deployed a specialized team of 15 senior cloud engineers within 3 weeks",
                results: [
                  "40% faster project completion",
                  "100% retention rate after 6 months",
                  "$2M saved in recruitment costs",
                ],
                icon: (
                  <Cloud className="w-6 h-6" style={{ color: "#60A5FA" }} />
                ),
              },
              {
                industry: "Healthcare Innovation",
                title: "Building Elite Security Infrastructure",
                challenge:
                  "Required specialized security talent for HIPAA-compliant platform development",
                solution:
                  "Built complete security team from scratch with industry-specific expertise",
                results: [
                  "Zero security incidents in first year",
                  "95% first-time fit rate",
                  "Achieved compliance 2 months ahead of schedule",
                ],
                icon: (
                  <Shield className="w-6 h-6" style={{ color: "#60A5FA" }} />
                ),
              },
              {
                industry: "Financial Services",
                title: "Legacy System Modernization",
                challenge:
                  "Critical need for full-stack team to modernize legacy trading platform",
                solution:
                  "Assembled cross-functional team of 12 specialists within budget",
                results: [
                  "30% reduction in system latency",
                  "50% decrease in maintenance costs",
                  "Zero downtime during transition",
                ],
                icon: (
                  <Building2 className="w-6 h-6" style={{ color: "#60A5FA" }} />
                ),
              },
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: "rgba(96, 165, 250, 0.1)" }}
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                    >
                      {story.icon}
                    </div>
                    <span
                      style={{ color: "#BFDBFE" }}
                      className="text-sm font-medium"
                    >
                      {story.industry}
                    </span>
                  </div>

                  <h2
                    style={{ color: "#FFFFFF" }}
                    className="text-3xl font-bold"
                  >
                    {story.title}
                  </h2>

                  <div
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                    className="p-6 rounded-xl border border-white/10"
                  >
                    <h3
                      style={{ color: "#FFFFFF" }}
                      className="font-semibold mb-2"
                    >
                      Challenge:
                    </h3>
                    <p style={{ color: "#E5E7EB" }} className="text-sm">
                      {story.challenge}
                    </p>
                  </div>

                  <div
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                    className="p-6 rounded-xl border border-white/10"
                  >
                    <h3
                      style={{ color: "#FFFFFF" }}
                      className="font-semibold mb-2"
                    >
                      Solution:
                    </h3>
                    <p style={{ color: "#E5E7EB" }} className="text-sm">
                      {story.solution}
                    </p>
                  </div>
                </div>

                <div
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                  className="p-8 rounded-2xl border border-white/10"
                >
                  <h3
                    style={{ color: "#FFFFFF" }}
                    className="text-xl font-semibold mb-6"
                  >
                    Key Results
                  </h3>
                  <div className="space-y-4">
                    {story.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div
                          style={{ backgroundColor: "rgba(96, 165, 250, 0.1)" }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        >
                          <CheckCircle className="w-5 h-5 text-blue-400" />
                        </div>
                        <p
                          style={{ color: "#E5E7EB" }}
                          className="text-sm pt-1.5"
                        >
                          {result}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div
            style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
            className="rounded-2xl p-12 relative overflow-hidden"
          >
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2
                style={{ color: "#FFFFFF" }}
                className="text-4xl font-bold mb-6"
              >
                Ready to Write Your Success Story?
              </h2>
              <p style={{ color: "#E5E7EB" }} className="text-lg mb-8">
                Join these industry leaders and transform your IT capabilities
                with IQBean's elite talent solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  style={{ backgroundColor: "#FFFFFF", color: "#001430" }}
                  className="px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-3 font-semibold text-lg hover:opacity-90"
                >
                  Schedule Consultation
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#FFFFFF",
                  }}
                  className="px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-3 font-semibold text-lg hover:opacity-90"
                >
                  View More Stories
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/******************************************************************/
/* 4) BOOKING PAGE (OLD LAYOUT + EmailJS + aesthetic confirmation)*/
/******************************************************************/
function BookingPage({ onBack }) {
  // form states
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    company: "",
    talent_type: "",
  });
  // success or error message to show after submit
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // handle changes for text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle changes for the custom select
  const handleTalentChange = (val) => {
    setFormData({ ...formData, talent_type: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbackMsg(""); // reset any prior message

    // call EmailJS
    console.log("Sending emailJS request...", formData);
    emailjs
      .send(
        "service_yas32fo", // Service ID
        "template_q5p3i3p", // Template ID
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          company: formData.company,
          talent_type: formData.talent_type,
        },
        "kSj57epLWRZ6MXmhx" // Public key
      )
      .then(
        (result) => {
          console.log("EmailJS success:", result.text);
          setFeedbackMsg("success");
          // Clear fields
          setFormData({
            from_name: "",
            from_email: "",
            company: "",
            talent_type: "",
          });
        },
        (error) => {
          console.error("EmailJS error:", error);
          setFeedbackMsg("error");
        }
      );
  };

  return (
    <div style={{ backgroundColor: "#001430" }} className="min-h-screen">
      {/* Transparent, fixed back button */}
      <BackButton onClick={onBack} />

      <div className="container mx-auto px-6 lg:px-8 pt-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6"
            >
              <span
                style={{ backgroundColor: "#60A5FA" }}
                className="w-2 h-2 rounded-full animate-pulse"
              />
              <span
                style={{ color: "#BFDBFE" }}
                className="font-medium tracking-wide text-sm"
              >
                SOLVE YOUR IT CHALLENGES
              </span>
            </div>

            <h1
              style={{ color: "#FFFFFF" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Transform Your IT Workforce Today
            </h1>

            <p
              style={{ color: "#E5E7EB" }}
              className="text-xl leading-relaxed mb-8 max-w-xl"
            >
              Schedule a consultation to discover how IQBean can help you build
              a high-performing IT team that drives innovation and growth.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <div
                style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                className="p-6 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-4 mb-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">
                    30-Minute Session
                  </span>
                </div>
                <p className="text-gray-300 text-sm">
                  Quick, focused discussion of your IT staffing needs
                </p>
              </div>
              <div
                style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                className="p-6 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-4 mb-3">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">
                    No Obligation
                  </span>
                </div>
                <p className="text-gray-300 text-sm">
                  Free consultation with our IT staffing experts
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Consultation Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div
              style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
              className="rounded-2xl border border-white/10 p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Schedule Your Consultation
              </h3>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="space-y-2">
                  <label
                    style={{ color: "#BFDBFE" }}
                    className="text-sm font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "rgba(255,255,255, 0.1)",
                      color: "#FFFFFF",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:border-blue-400"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Work Email */}
                <div className="space-y-2">
                  <label
                    style={{ color: "#BFDBFE" }}
                    className="text-sm font-medium"
                  >
                    Work Email
                  </label>
                  <input
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "rgba(255,255,255, 0.1)",
                      color: "#FFFFFF",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:border-blue-400"
                    placeholder="work@company.com"
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label
                    style={{ color: "#BFDBFE" }}
                    className="text-sm font-medium"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "rgba(255,255,255, 0.1)",
                      color: "#FFFFFF",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:border-blue-400"
                    placeholder="Your company name"
                  />
                </div>

                {/* Type of IT Talent Needed - AestheticSelect */}
                <div className="space-y-2">
                  <label
                    style={{ color: "#BFDBFE" }}
                    className="text-sm font-medium"
                  >
                    Type of IT Talent Needed
                  </label>
                  <AestheticSelect
                    value={formData.talent_type}
                    onChange={handleTalentChange}
                    placeholder="Select talent type..."
                    options={[
                      { value: "", label: "Select talent type..." },
                      { value: "development", label: "Software Development" },
                      { value: "cloud", label: "Cloud Architecture" },
                      { value: "data", label: "Data Engineering" },
                      { value: "security", label: "Security" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: "#FFFFFF", color: "#001430" }}
                  className="w-full px-8 py-4 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 font-semibold"
                >
                  Book Consultation
                  <Calendar className="w-5 h-5" />
                </button>
              </form>

              {/* Aesthetic confirmation messages below the form */}
              {feedbackMsg === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 px-4 py-3 border border-green-400 rounded text-green-300 text-sm"
                  style={{ backgroundColor: "rgba(16,185,129,0.1)" }}
                >
                  <strong>Thank you!</strong> Your request was sent
                  successfully.
                </motion.div>
              )}
              {feedbackMsg === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 px-4 py-3 border border-red-400 rounded text-red-300 text-sm"
                  style={{ backgroundColor: "rgba(220,38,38,0.1)" }}
                >
                  Oops! Something went wrong. Please try again later.
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/************************************************/
/* 5) HOME PAGE (With original code, non-blank) */
/************************************************/
function HomePage({ onShowBooking, onShowStories }) {
  return (
    <div style={{ backgroundColor: "#001430" }} className="min-h-screen">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="pt-10 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6"
              >
                <span
                  style={{ backgroundColor: "#60A5FA" }}
                  className="w-2 h-2 rounded-full animate-pulse"
                ></span>
                <span
                  style={{ color: "#BFDBFE" }}
                  className="font-medium tracking-wide text-sm"
                >
                  WHERE TALENT MEETS TRANSFORMATION
                </span>
              </div>

              <h1
                style={{ color: "#FFFFFF" }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              >
                <span className="block mb-2">Accelerate Your</span>
                <span style={{ color: "#BFDBFE" }} className="block">
                  Digital Evolution
                </span>
                <span className="block mt-2">
                  With IQBean's Elite IT Talent
                </span>
              </h1>

              <p
                style={{ color: "#E5E7EB" }}
                className="text-xl leading-relaxed mb-8"
              >
                In a world where{" "}
                <span style={{ color: "#FFFFFF" }} className="font-semibold">
                  73% of IT projects fail
                </span>{" "}
                due to talent gaps, we ensure your success by connecting you
                with precisely matched IT professionals who drive results from
                day one.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 mb-12">
                <button
                  onClick={onShowBooking}
                  className="px-8 py-4 bg-white text-[#001430] rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-3 font-semibold text-lg"
                >
                  Solve Your IT Challenges
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={onShowStories}
                  className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-3 font-semibold text-lg border border-white/20"
                >
                  See Our Impact
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {[
                  { value: "60%", label: "Time-to-hire reduced" },
                  { value: "94%", label: "Project success rate" },
                  { value: "98%", label: "Client retention" },
                ].map((stat, index) => (
                  <div key={index} className="flex flex-col">
                    <span
                      style={{ color: "#FFFFFF" }}
                      className="text-3xl font-bold mb-1"
                    >
                      {stat.value}
                    </span>
                    <span style={{ color: "#BFDBFE" }} className="text-sm">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block mt-20"
            >
              <div className="absolute top-0 right-0 -translate-y-1/4 text-[20rem] font-bold opacity-5 text-white">
                IT
              </div>

              <div className="relative space-y-6">
                <div
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                  className="p-10 rounded-2xl border border-white/10 h-[280px]"
                >
                  <div className="flex items-center gap-8 mb-8">
                    <div
                      style={{ backgroundColor: "rgba(96, 165, 250, 0.1)" }}
                      className="w-20 h-20 rounded-xl flex items-center justify-center"
                    >
                      <Users
                        className="w-10 h-10"
                        style={{ color: "#60A5FA" }}
                      />
                    </div>
                    <div>
                      <h3
                        style={{ color: "#FFFFFF" }}
                        className="text-4xl font-bold mb-2"
                      >
                        5000+
                      </h3>
                      <p style={{ color: "#BFDBFE" }} className="text-lg">
                        Elite IT Professionals
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {["Bristol Myers", "Merck", "NJ State"].map(
                      (company, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                          }}
                          className="px-6 py-4 rounded-lg text-center hover:bg-white/10 transition-colors"
                        >
                          <span
                            style={{ color: "#E5E7EB" }}
                            className="text-sm font-medium"
                          >
                            {company}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      icon: (
                        <Cloud
                          className="w-8 h-8"
                          style={{ color: "#60A5FA" }}
                        />
                      ),
                      value: "48hrs",
                      label: "Average Placement",
                    },
                    {
                      icon: (
                        <Building2
                          className="w-8 h-8"
                          style={{ color: "#60A5FA" }}
                        />
                      ),
                      value: "95%",
                      label: "First-time Fit",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                      }}
                      className="p-8 rounded-xl border border-white/10 h-[160px] hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-6">
                        <div
                          style={{ backgroundColor: "rgba(96, 165, 250, 0.1)" }}
                          className="w-16 h-16 rounded-lg flex items-center justify-center"
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div
                            style={{ color: "#FFFFFF" }}
                            className="text-2xl font-bold mb-1"
                          >
                            {item.value}
                          </div>
                          <div style={{ color: "#BFDBFE" }} className="text-sm">
                            {item.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Make sure it's a valid tailwind grid classes: md:grid-cols-3 */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <Users className="w-8 h-8" style={{ color: "#60A5FA" }} />
                ),
                title: "Close Skills Gaps Fast",
                description:
                  "Access pre-vetted IT experts within 48 hours, not weeks",
                metric: "60% faster placements",
                stats: [
                  { value: "48hrs", label: "Average Response" },
                  { value: "5000+", label: "IT Experts" },
                ],
              },
              {
                icon: (
                  <Cloud className="w-8 h-8" style={{ color: "#60A5FA" }} />
                ),
                title: "Risk-Free Innovation",
                description:
                  "Scale your cloud initiatives with guaranteed expertise",
                metric: "100% project success rate",
                stats: [
                  { value: "100%", label: "Satisfaction" },
                  { value: "200+", label: "Projects" },
                ],
              },
              {
                icon: (
                  <Building2 className="w-8 h-8" style={{ color: "#60A5FA" }} />
                ),
                title: "Predictable Excellence",
                description: "Our talent succeeds where others struggle",
                metric: "95% first-time fit",
                trusted: true,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                className="rounded-2xl p-8"
              >
                <div
                  style={{ backgroundColor: "rgba(96, 165, 250, 0.1)" }}
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                >
                  {feature.icon}
                </div>
                <h3
                  style={{ color: "#FFFFFF" }}
                  className="text-2xl font-semibold mb-3"
                >
                  {feature.title}
                </h3>
                <p style={{ color: "#E5E7EB" }} className="text-base mb-4">
                  {feature.description}
                </p>
                <div
                  style={{ color: "#60A5FA" }}
                  className="text-lg font-medium mb-6"
                >
                  {feature.metric}
                </div>

                {feature.stats ? (
                  <div className="grid grid-cols-2 gap-4">
                    {feature.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                        }}
                        className="p-4 rounded-lg"
                      >
                        <div
                          style={{ color: "#FFFFFF" }}
                          className="text-2xl font-bold mb-1"
                        >
                          {stat.value}
                        </div>
                        <div style={{ color: "#BFDBFE" }} className="text-sm">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div style={{ color: "#9CA3AF" }} className="text-sm">
                      Trusted By Industry Leaders
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {["Bristol Myers", "Merck", "NJ State"].map(
                        (company, idx) => (
                          <div
                            key={idx}
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                            }}
                            className="px-3 py-2 rounded-lg text-center"
                          >
                            <span
                              style={{ color: "#E5E7EB" }}
                              className="text-sm font-medium"
                            >
                              {company}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section
        style={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
        className="py-24"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              style={{ color: "#FFFFFF" }}
              className="text-4xl font-bold mb-6"
            >
              The IQBean Difference
            </h2>
            <p style={{ color: "#E5E7EB" }} className="text-lg">
              We combine deep industry expertise with advanced talent matching
              to deliver IT professionals who make an immediate impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <Target className="w-6 h-6" style={{ color: "#60A5FA" }} />
                ),
                title: "Precision Matching",
                description:
                  "AI-powered talent matching ensuring perfect fit every time",
                metric: "95% retention rate",
              },
              {
                icon: <Zap className="w-6 h-6" style={{ color: "#60A5FA" }} />,
                title: "Rapid Deployment",
                description: "Urgent IT staffing needs solved in record time",
                metric: "48-hour placement",
              },
              {
                icon: (
                  <Shield className="w-6 h-6" style={{ color: "#60A5FA" }} />
                ),
                title: "Quality Guaranteed",
                description: "Rigorous vetting process for all candidates",
                metric: "100% satisfaction",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                className="p-8 rounded-xl hover:scale-[1.02] transition-transform"
              >
                <div
                  style={{ backgroundColor: "rgba(96, 165, 250, 0.1)" }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                >
                  {feature.icon}
                </div>
                <h3
                  style={{ color: "#FFFFFF" }}
                  className="text-xl font-semibold mb-3"
                >
                  {feature.title}
                </h3>
                <p style={{ color: "#E5E7EB" }} className="text-sm mb-4">
                  {feature.description}
                </p>
                <span
                  style={{ color: "#60A5FA" }}
                  className="text-sm font-medium"
                >
                  {feature.metric}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div
            style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
            className="rounded-2xl p-12 relative overflow-hidden"
          >
            <div className="relative z-10 max-w-2xl">
              <h2
                style={{ color: "#FFFFFF" }}
                className="text-4xl font-bold mb-6"
              >
                Ready to Transform Your IT Workforce?
              </h2>
              <p style={{ color: "#E5E7EB" }} className="text-lg mb-8">
                Join leading companies who trust IQBean to deliver exceptional
                IT talent that drives innovation and growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  style={{ backgroundColor: "#FFFFFF", color: "#001430" }}
                  className="px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-3 font-semibold text-lg hover:opacity-90"
                  onClick={onShowBooking}
                >
                  Schedule a Consultation
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#FFFFFF",
                  }}
                  className="px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-3 font-semibold text-lg hover:opacity-90"
                  onClick={onShowStories}
                >
                  View Success Stories
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/*************************************************************************/
/* 5) MAIN COMPONENT CombinedCanvas with EmailJS, all pages, scroll-to-top*/
/*************************************************************************/
export default function CombinedCanvas() {
  const [page, setPage] = useState("home");

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      {page === "home" && (
        <HomePage
          onShowBooking={() => setPage("booking")}
          onShowStories={() => setPage("stories")}
        />
      )}
      {page === "booking" && <BookingPage onBack={() => setPage("home")} />}
      {page === "stories" && (
        <SuccessStoriesPage onBack={() => setPage("home")} />
      )}
    </>
  );
}
