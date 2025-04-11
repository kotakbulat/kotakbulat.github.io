// src/pages/experience.tsx
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BriefcaseIcon, UserGroupIcon, AcademicCapIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, LinkIcon } from '@heroicons/react/24/outline';

// --- Data Definitions ---
interface WorkExperience { company: string; title: string; startDate: string; endDate: string; current?: boolean; }
interface OrgExperience { organization: string; role: string; }
interface EducationItem { institution: string; status: string; details: string; endDate?: string; }

const workExperiences: WorkExperience[] = [
    { company: "Airpaz.com", title: "Global Client Support", startDate: "Apr 2024", endDate: "Current", current: true },
    { company: "IMKOM Academy", title: "Programming and Design Educator", startDate: "Feb 2024", endDate: "Apr 2024" },
    { company: "PT. Kontakperkasa Futures Yogyakarta", title: "Telemarketing and Business Consultant", startDate: "Jan 2024", endDate: "Apr 2024" },
    { company: "Padepokan Seni Bagong Kussudiardja", title: "Librarian", startDate: "Nov 2023", endDate: "Mar 2024" },
    { company: "Treat", title: "Bartender", startDate: "Oct 2023", endDate: "Feb 2024" },
    { company: "PT Asuransi Tugu Pratama Indonesia Tbk", title: "Product Management and Business Retail Intern", startDate: "Oct 2021", endDate: "Jan 2022" },
    { company: "PT Asuransi Tugu Pratama Indonesia Tbk", title: "Premium Reserve Actuary Intern", startDate: "Jul 2021", endDate: "Oct 2021" },
    { company: "GPdI Jatinangor", title: "Multimedia Operator", startDate: "Jun 2016", endDate: "Jun 2019" },
    { company: "Local Mini Market", title: "Shop Keeper", startDate: "Jun 2012", endDate: "Jun 2019" },
];
const orgExperiences: OrgExperience[] = [
  { organization: "UGM Diving Club", role: "Logistic, Gear, and Equipment Staff" },
  { organization: "UGM Diving Club", role: "Accomodation and Transport Coordinator" },
  { organization: "Libera", role: "Visual Design Staff" },
  { organization: "DPM FMIPA UGM", role: "Head of Treasury" },
  { organization: "Youth Science Club", role: "Public Affair" },
];
const educationHistory: EducationItem[] = [ { institution: "Gadjah Mada University", status: "Natural Science Faculty - Mathematics Department", details: "Drop Out in 6th Semester due finance problem after Covid Pandemy", endDate: "August 2023" } ];
const contactDetails = { email1: "hokicoc@mail.ugm.ac.id", email2: "hokilimpahwijaya@gmail.com", linkedin: "https://www.linkedin.com/in/hoki-wijaya-80528b144", github: "https://github.com/kotakbulat", phone: "+6285172488634", location: "Kota Yogyakarta, DI Yogyakarta, 55233, Indonesia" };

// --- Framer Motion Variants ---
const sectionVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const listVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const listItemVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } };

export default function ExperiencePage() {
  // --- Refs for Horizontal Scroll ---
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalContentRef = useRef<HTMLDivElement>(null);

  // --- GSAP Horizontal Scroll Effect ---
  useEffect(() => {
    const horizontalEl = horizontalContentRef.current;
    const pinWrapEl = horizontalSectionRef.current;
    if (!horizontalEl || !pinWrapEl) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const pinWrapWidth = pinWrapEl.offsetWidth;
      const horizontalScrollLength = horizontalEl.scrollWidth;
      const scrollDistance = horizontalScrollLength - pinWrapWidth;
      if (scrollDistance <= 0) return;

      const ctx = gsap.context(() => {
        gsap.timeline({ scrollTrigger: { trigger: pinWrapEl, pin: true, scrub: 1, start: "top top", end: () => `+=${scrollDistance}`, invalidateOnRefresh: true }})
            .to(horizontalEl, { x: -scrollDistance, ease: "none" });
      }, pinWrapEl); // Scope context to the pinWrap element
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <>
      <Head>
        <title>My Experience & CV - Hoki Wijaya</title>
        <meta name="description" content="Detailed work experience, organizational involvement, and education history of Hoki Wijaya." />
      </Head>

      <motion.div className="container mx-auto py-16 md:py-24 px-0 md:px-10 lg:px-4 min-h-screen text-gray-700 dark:text-gray-200" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }} >
        <motion.h1 className="text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-center text-gray-900 dark:text-white px-6 md:px-0" variants={sectionVariants} > My Experience </motion.h1>

        {/* Work Experience Section */}
        <motion.section className="mb-16 px-6 md:px-0" variants={sectionVariants} viewport={{ once: true, amount: 0.2 }}>
          <h2 className="flex items-center text-3xl font-semibold mb-8 pb-3 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
            <BriefcaseIcon className="w-7 h-7 mr-3 text-blue-600 dark:text-blue-400" /> Work Experience
          </h2>
          <motion.ul className="space-y-8" variants={listVariants}>
            {workExperiences.map((exp, index) => (
              <motion.li key={index} className="relative pl-8" variants={listItemVariants}>
                 <span className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 ring-4 ring-gray-100 dark:ring-gray-800"></span>
                 <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{exp.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">{exp.startDate} - {exp.endDate}</p>
                 </div>
                 <p className="text-md text-gray-700 dark:text-gray-300">{exp.company}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        {/* Education Section */}
        <motion.section className="mb-16 px-6 md:px-0" variants={sectionVariants} viewport={{ once: true, amount: 0.2 }}>
          <h2 className="flex items-center text-3xl font-semibold mb-8 pb-3 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
             <AcademicCapIcon className="w-7 h-7 mr-3 text-purple-600 dark:text-purple-400" /> Education
          </h2>
          <motion.ul className="space-y-6" variants={listVariants}>
             {educationHistory.map((edu, index) => (
                <motion.li key={index} className="relative pl-8" variants={listItemVariants}>
                    <span className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 ring-4 ring-gray-100 dark:ring-gray-800"></span>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{edu.institution}</h3>
                        {edu.endDate && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">Ended {edu.endDate}</p>}
                    </div>
                    <p className="text-md font-medium text-gray-700 dark:text-gray-300">{edu.status}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{edu.details}</p>
                </motion.li>
             ))}
          </motion.ul>
        </motion.section>

        {/* Organizational Experience Section (HORIZONTAL SCROLL) */}
        <div ref={horizontalSectionRef} className="mb-16 overflow-hidden"> {/* Pinned container */}
           <motion.h2 className="flex items-center text-3xl font-semibold mb-8 pb-3 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white container mx-auto px-6 md:px-10 lg:px-4" // Heading inside container
                variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} >
              <UserGroupIcon className="w-7 h-7 mr-3 text-green-600 dark:text-green-400" /> Organizational Experience
           </motion.h2>
           <div ref={horizontalContentRef} className="flex w-max py-8 pl-6 md:pl-10 lg:pl-4"> {/* Scrolling content */}
               {orgExperiences.map((org, index) => (
                   <motion.div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 mr-6 md:mr-8 w-72 md:w-80 flex-shrink-0 border border-gray-200 dark:border-gray-700 transition-colors duration-300" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: index * 0.1 }} >
                       <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{org.role}</h3>
                       <p className="text-gray-600 dark:text-gray-400">{org.organization}</p>
                   </motion.div>
               ))}
               <div className="w-6 md:w-10 lg:w-4 flex-shrink-0"></div> {/* Spacer */}
           </div>
        </div>


         {/* Contact Info Section */}
        <motion.section className="px-6 md:px-0" variants={sectionVariants} viewport={{ once: true, amount: 0.2 }}>
          <h2 className="flex items-center text-3xl font-semibold mb-8 pb-3 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
             <EnvelopeIcon className="w-7 h-7 mr-3 text-yellow-600 dark:text-yellow-400" /> Contact Information
          </h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4" variants={listVariants}>
              <motion.div className="flex items-center" variants={listItemVariants}>
                 <EnvelopeIcon className="w-5 h-5 mr-3 text-yellow-600 dark:text-yellow-400 flex-shrink-0"/>
                 <a href={`mailto:${contactDetails.email1}`} className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors break-all">{contactDetails.email1}</a>
              </motion.div>
              <motion.div className="flex items-center" variants={listItemVariants}>
                 <LinkIcon className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0"/>
                 <a href={contactDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors truncate">linkedin.com/in/hoki-wijaya...</a>
              </motion.div>
              <motion.div className="flex items-center" variants={listItemVariants}>
                 <EnvelopeIcon className="w-5 h-5 mr-3 text-yellow-600 dark:text-yellow-400 flex-shrink-0"/>
                 <a href={`mailto:${contactDetails.email2}`} className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors break-all">{contactDetails.email2}</a>
              </motion.div>
              <motion.div className="flex items-center" variants={listItemVariants}>
                 <LinkIcon className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400 flex-shrink-0"/>
                 <a href={contactDetails.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">github.com/kotakbulat</a>
              </motion.div>
              <motion.div className="flex items-center" variants={listItemVariants}>
                 <PhoneIcon className="w-5 h-5 mr-3 text-green-600 dark:text-green-400 flex-shrink-0"/>
                 <span className="text-gray-700 dark:text-gray-300">{contactDetails.phone}</span>
              </motion.div>
              <motion.div className="flex items-center" variants={listItemVariants}>
                 <MapPinIcon className="w-5 h-5 mr-3 text-red-600 dark:text-red-400 flex-shrink-0"/>
                 <span className="text-gray-700 dark:text-gray-300">{contactDetails.location}</span>
              </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>

      <footer className="text-center py-8 bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-500 text-sm">
         © {new Date().getFullYear()} Hoki Wijaya. All Rights Reserved.
       </footer>
    </>
  );
}