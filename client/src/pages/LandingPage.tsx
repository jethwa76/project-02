import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Workflow, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ThemeToggle } from '../components/ThemeToggle';

export function LandingPage() {
  return (
    <div className="gradient-page min-h-screen dark:text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-8">
        <Link to="/" className="text-xl font-black tracking-tight">Stellar CRM</Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login" className="text-sm font-semibold text-slate-700 dark:text-slate-200">Login</Link>
          <Link to="/register"><Button>Get started</Button></Link>
        </div>
      </header>
      <main className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:py-20">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span className="rounded-full border border-cyan-200 bg-white/70 px-4 py-2 text-sm font-semibold text-cyan-700 dark:border-cyan-800 dark:bg-slate-900/70 dark:text-cyan-200">Backend API Development Plus Full Stack SaaS</span>
          <h1 className="mt-7 max-w-3xl text-5xl font-black leading-tight text-slate-950 dark:text-white md:text-7xl">Stellar CRM</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">A polished internship-ready project with secure REST APIs, JWT auth, MongoDB schemas, dashboards, CRUD workflows, admin analytics, Swagger docs, and deployment configuration.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register"><Button className="h-12 px-6">Create account <ArrowRight size={18} /></Button></Link>
            <Link to="/login"><Button className="h-12 bg-white px-6 text-slate-800 hover:bg-slate-100 dark:bg-slate-900 dark:text-white">View dashboard</Button></Link>
          </div>
        </motion.section>
        <motion.section initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }} className="glass rounded-lg p-4 shadow-soft">
          <div className="rounded-lg bg-slate-950 p-5 text-white">
            <div className="grid gap-4 sm:grid-cols-3">
              {['Pipeline', 'Revenue', 'Users'].map((label, index) => (
                <div key={label} className="rounded-lg bg-white/10 p-4">
                  <p className="text-sm text-slate-300">{label}</p>
                  <p className="mt-3 text-2xl font-bold">{['$128k', '32%', '1.4k'][index]}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-white p-4 text-slate-900">
              {['Atlas rollout', 'FinOps renewal', 'Security review'].map((item, index) => (
                <div key={item} className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0">
                  <div>
                    <p className="font-semibold">{item}</p>
                    <p className="text-sm text-slate-500">{['Qualified', 'Proposal', 'Won'][index]}</p>
                  </div>
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">{['High', 'Medium', 'Low'][index]}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-12 sm:px-8 md:grid-cols-3">
        {[
          { icon: ShieldCheck, title: 'Secure by default', text: 'Helmet, CORS, rate limits, bcrypt, JWT, validation, sanitization.' },
          { icon: Workflow, title: 'Real CRUD flow', text: 'Search, filters, sorting, pagination, exports, role-based access.' },
          { icon: Zap, title: 'Production shape', text: 'Swagger docs, tests, deployment files, clean architecture.' }
        ].map((feature) => (
          <Card key={feature.title}>
            <feature.icon className="text-cyan-600" />
            <h3 className="mt-4 font-bold">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{feature.text}</p>
          </Card>
        ))}
      </section>
      <footer className="border-t border-slate-200 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-800">Built for Backend API Development internship requirements.</footer>
    </div>
  );
}
