import React from 'react';
import { ResumeData } from '../types';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, Printer } from 'lucide-react';

interface ResumePreviewProps {
  resume: ResumeData;
  scale?: number;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resume, scale = 1 }) => {
  const { personalInfo, summary, education, experience, projects, skills, certifications, template } = resume;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Print / Action bar */}
      <div className="w-full max-w-[850px] mb-3 flex items-center justify-between no-print px-1">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Format: <strong className="text-slate-700 dark:text-slate-300 capitalize">{template}</strong></span>
          <span>·</span>
          <span>Standard US Letter (8.5" × 11")</span>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-all"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* The Printable Paper Container */}
      <div
        id="resume-paper"
        className={`resume-paper w-full max-w-[850px] bg-white text-slate-900 shadow-xl border border-slate-200 transition-all p-8 sm:p-12 font-sans ${
          template === 'ivy' ? 'font-serif' : 'font-sans'
        }`}
        style={{ minHeight: '1100px' }}
      >
        {/* Header */}
        <header className={`border-b pb-4 mb-5 ${template === 'ivy' ? 'text-center border-slate-300' : 'text-left border-slate-200'}`}>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
            {personalInfo.fullName || 'Candidate Name'}
          </h1>
          <div className={`mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 ${template === 'ivy' ? 'justify-center' : 'justify-start'}`}>
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3 h-3 text-slate-400" />
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                <Github className="w-3 h-3 text-slate-400" />
                {personalInfo.github}
              </span>
            )}
            {personalInfo.portfolio && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-400" />
                {personalInfo.portfolio}
              </span>
            )}
          </div>
        </header>

        {/* Executive Summary */}
        {summary && (
          <section className="mb-5">
            <h2 className={`text-xs font-bold tracking-wider uppercase mb-1.5 ${template === 'ivy' ? 'text-slate-800 border-b border-slate-300 pb-0.5' : 'text-indigo-900 border-b border-indigo-100 pb-0.5'}`}>
              Professional Summary
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {summary}
            </p>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-5">
            <h2 className={`text-xs font-bold tracking-wider uppercase mb-2 ${template === 'ivy' ? 'text-slate-800 border-b border-slate-300 pb-0.5' : 'text-indigo-900 border-b border-indigo-100 pb-0.5'}`}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-bold text-slate-900">{edu.school}</span>
                    <span className="text-slate-500 font-medium">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs text-slate-700">
                    <span className="italic">{edu.degree} · {edu.fieldOfStudy}</span>
                    {edu.gpa && <span className="font-medium text-slate-800">GPA: {edu.gpa}</span>}
                  </div>
                  {edu.honors && (
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Honors: {edu.honors}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className={`text-xs font-bold tracking-wider uppercase mb-2 ${template === 'ivy' ? 'text-slate-800 border-b border-slate-300 pb-0.5' : 'text-indigo-900 border-b border-indigo-100 pb-0.5'}`}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <span>{exp.role}</span>
                      <span className="text-slate-400 font-normal">|</span>
                      <span className="text-indigo-800">{exp.company}</span>
                    </div>
                    <span className="text-slate-500 text-[11px]">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic mb-1">{exp.location} · {exp.type}</p>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-700">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="leading-snug">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-5">
            <h2 className={`text-xs font-bold tracking-wider uppercase mb-2 ${template === 'ivy' ? 'text-slate-800 border-b border-slate-300 pb-0.5' : 'text-indigo-900 border-b border-indigo-100 pb-0.5'}`}>
              Technical Projects
            </h2>
            <div className="space-y-3.5">
              {projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <span>{proj.title}</span>
                      {proj.subtitle && (
                        <span className="font-normal text-slate-500 italic hidden sm:inline">
                          — {proj.subtitle}
                        </span>
                      )}
                    </div>
                    {proj.githubUrl && (
                      <span className="text-[11px] text-indigo-700 hover:underline">
                        github link
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 mt-1 leading-snug">
                    {proj.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-600">
                    <strong className="text-slate-800">Stack:</strong>
                    <span>{proj.technologies.join(', ')}</span>
                    {proj.metrics && (
                      <>
                        <span className="text-slate-300">·</span>
                        <span className="text-indigo-700 font-medium">{proj.metrics}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        <section className="mb-4">
          <h2 className={`text-xs font-bold tracking-wider uppercase mb-1.5 ${template === 'ivy' ? 'text-slate-800 border-b border-slate-300 pb-0.5' : 'text-indigo-900 border-b border-indigo-100 pb-0.5'}`}>
            Technical Skills
          </h2>
          <div className="text-xs space-y-1 text-slate-700">
            {skills.languages && skills.languages.length > 0 && (
              <div>
                <strong className="text-slate-900 font-semibold">Programming Languages: </strong>
                <span>{skills.languages.join(', ')}</span>
              </div>
            )}
            {skills.frameworks && skills.frameworks.length > 0 && (
              <div>
                <strong className="text-slate-900 font-semibold">Frameworks & Libraries: </strong>
                <span>{skills.frameworks.join(', ')}</span>
              </div>
            )}
            {skills.developerTools && skills.developerTools.length > 0 && (
              <div>
                <strong className="text-slate-900 font-semibold">Tools & Infrastructure: </strong>
                <span>{skills.developerTools.join(', ')}</span>
              </div>
            )}
          </div>
        </section>

        {/* Certifications & Awards */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className={`text-xs font-bold tracking-wider uppercase mb-1 ${template === 'ivy' ? 'text-slate-800 border-b border-slate-300 pb-0.5' : 'text-indigo-900 border-b border-indigo-100 pb-0.5'}`}>
              Certifications & Honors
            </h2>
            <p className="text-xs text-slate-700">
              {certifications.join(' · ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};
