'use client';
import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { resumeData } from '@/assets/data';

export default function ResumePage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section id="resume" className="max-w-7xl mx-auto py-12">
            <div className="rounded-3xl bg-white p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_12px_48px_rgba(255,34,0,0.2)] hover:shadow-[0_12px_48px_rgba(255,34,0,0.3)] transition-all duration-500 xl:mx-auto xl:max-w-none border border-gray-100">

                {/* Header */}
                <div className={`mb-10 flex flex-col items-start sm:items-center border-b border-gray-200 pb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <h1 className="mb-2 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight sm:text-center w-full" style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>
                        {resumeData.name}
                    </h1>
                    <p className="mb-6 text-lg sm:text-xl font-medium text-gray-600 sm:text-center w-full">
                        {resumeData.title}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-4 sm:gap-6 text-sm w-full">
                        <a href={`mailto:${resumeData.email}`} className="group flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-all duration-300">
                            <Mail className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-medium">{resumeData.email}</span>
                        </a>
                        <span className="flex items-center gap-2 text-gray-700">
                            <Phone className="h-4 w-4 shrink-0" />
                            <span className="font-medium">{resumeData.phone}</span>
                        </span>
                        <span className="flex items-center gap-2 text-gray-700">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span className="font-medium">{resumeData.location}</span>
                        </span>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">

                    {/* Main Column */}
                    <div className="space-y-10 lg:min-w-0">

                        {/* Introduction */}
                        <section className={`transition-all duration-700 delay-75 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <h2 className="mb-4 text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-linear-to-b from-orange-500 to-orange-600 rounded-full" />
                                Introduction
                            </h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-5">
                                {resumeData.introduction}
                            </p>
                        </section>

                        {/* Experience */}
                        <section className={`transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <h2 className="mb-5 text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-linear-to-b from-orange-500 to-orange-600 rounded-full" />
                                Work Experience
                            </h2>
                            {resumeData.experience.map((exp, index) => (
                                <div key={index} className="pl-5 space-y-3 pb-6 border-l-2 border-gray-200 ml-0.75">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                        <div className="flex-1">
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                                                {exp.role}
                                            </h3>
                                            <p className="text-sm sm:text-base font-medium text-gray-600 mt-1">
                                                {exp.company} | Budhlada, Punjab
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium whitespace-nowrap">
                                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                                            {exp.dates}
                                        </span>
                                    </div>
                                    <ul className="space-y-2.5 text-sm sm:text-base text-gray-700">
                                        {exp.responsibilities.map((resp, i) => (
                                            <li key={i} className="flex gap-3 leading-relaxed group">
                                                <span className="mt-2 w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0 group-hover:scale-150 transition-transform duration-300" />
                                                <span>{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>

                        {/* Projects */}
                        <section className={`transition-all duration-700 delay-225 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <h2 className="mb-5 text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-linear-to-b from-orange-500 to-orange-600 rounded-full" />
                                Featured Projects
                            </h2>
                            <div className="pl-5 space-y-6">
                                {resumeData.projects.map((proj, index) => (
                                    <div key={index} className="group transition-all duration-300 border-l-2 border-gray-200 hover:border-orange-300 pl-4">
                                        <div className="flex flex-col gap-2 mb-3">
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                                                {proj.name}
                                            </h3>
                                            <p className="text-sm font-medium text-orange-600">
                                                {proj.tech}
                                            </p>
                                        </div>
                                        <div className="space-y-2.5 mb-3.5">
                                            {proj.businessChallenge && (
                                                <div className="p-3 bg-orange-50/50 border border-orange-100 rounded-lg group-hover:bg-orange-50 transition-colors duration-300">
                                                    <p className="text-xs font-semibold text-orange-800 uppercase tracking-wide mb-1">Business Challenge</p>
                                                    <p className="text-sm text-gray-700">{proj.businessChallenge}</p>
                                                </div>
                                            )}
                                            {proj.clientObjective && (
                                                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg group-hover:bg-blue-50 transition-colors duration-300">
                                                    <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">Client Objective</p>
                                                    <p className="text-sm text-gray-700">{proj.clientObjective}</p>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3.5">
                                            {proj.description}
                                        </p>
                                        {proj.link && (
                                            <a
                                                href={proj.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 hover:gap-3 transition-all duration-300 group/link"
                                            >
                                                View Project
                                                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/link:rotate-12 group-hover/link:scale-110" />
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section className={`transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <h2 className="mb-5 text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-linear-to-b from-orange-500 to-orange-600 rounded-full" />
                                Education
                            </h2>
                            {resumeData.education.map((edu, index) => (
                                <div key={index} className="pl-5 space-y-2 pb-6 last:pb-0 border-l-2 border-gray-200 ml-0.75">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                        <div className="flex-1">
                                            <h3 className="text-base sm:text-lg font-bold text-gray-900">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-sm sm:text-base font-medium text-gray-600 mt-1">
                                                {edu.institution}
                                            </p>
                                        </div>
                                        <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                                            {edu.dates}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-10 lg:min-w-85">

                        {/* Skills */}
                        <section className={`transition-all duration-700 delay-375 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <h2 className="mb-5 text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-linear-to-b from-orange-500 to-orange-600 rounded-full" />
                                Technical Skills
                            </h2>
                            <div className="space-y-5 pl-5">
                                {Object.entries(resumeData.skills).map(([category, skills]) => (
                                    <div key={category}>
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center px-3 py-1.5 bg-linear-to-r from-neutral-800 to-black text-white rounded-lg text-sm font-medium hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Languages */}
                        <section className={`transition-all duration-700 delay-450 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <h2 className="mb-5 text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-linear-to-b from-orange-500 to-orange-600 rounded-full" />
                                Languages
                            </h2>
                            <ul className="space-y-3 pl-5">
                                {resumeData.languages.map((lang, index) => (
                                    <li key={index} className="flex justify-between items-center text-sm sm:text-base group hover:pl-2 transition-all duration-300">
                                        <span className="font-semibold text-gray-900">{lang.name}</span>
                                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium group-hover:bg-orange-50 group-hover:text-orange-700 transition-all duration-300">
                                            {lang.level}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
