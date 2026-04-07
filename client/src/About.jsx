import { Github, Mail, Users, Package } from 'lucide-react';

const developers = [
    {
        name: "Lorenzo A. Atienza",
        email: "lorenzo_atienza@dlsu.edu.ph",
        github: "https://github.com/Nzow6",
        handle: "Nzow6",
        initials: "LA",
        color: "from-violet-500 to-purple-600",
    },
    {
        name: "Karl Matthew T. Divinagracia",
        email: "karl_divinagracia@dlsu.edu.ph",
        github: "https://github.com/lraaak",
        handle: "lraaak",
        initials: "KD",
        color: "from-emerald-500 to-teal-600",
    },
    {
        name: "Charlemagne Hayden C. Lazaro",
        email: "charlemagne_lazaro@dlsu.edu.ph",
        github: "https://github.com/charlemagnelazaro-jpg",
        handle: "charlemagnelazaro-jpg",
        initials: "CL",
        color: "from-orange-500 to-amber-600",
    },
    {
        name: "Ryan Nathan T. Paguila",
        email: "ryan_nathan_t_paguila@dlsu.edu.ph",
        github: "https://github.com/ryanpeagle-rntp",
        handle: "ryanpeagle-rntp",
        initials: "RP",
        color: "from-sky-500 to-blue-600",
    },
];

const clientPackages = [
    "@cloudinary/react@1.14.4",
    "@cloudinary/url-gen@1.22.0",
    "@eslint/js@9.39.2",
    "@radix-ui/react-checkbox@1.3.3",
    "@radix-ui/react-dialog@1.1.15",
    "@radix-ui/react-icons@1.3.2",
    "@radix-ui/react-label@2.1.8",
    "@radix-ui/react-slot@1.2.4",
    "@radix-ui/react-tabs@1.1.13",
    "@tailwindcss/vite@4.1.18",
    "@types/react-dom@19.2.3",
    "@types/react@19.2.13",
    "@vitejs/plugin-react@5.1.3",
    "autoprefixer@10.4.24",
    "bcrypt@6.0.0",
    "class-variance-authority@0.7.1",
    "clsx@2.1.1",
    "connect-mongo@6.0.0",
    "cors@2.8.6",
    "dotenv@17.3.1",
    "embla-carousel-react@8.6.0",
    "eslint-plugin-react-hooks@7.0.1",
    "eslint-plugin-react-refresh@0.4.26",
    "eslint@9.39.2",
    "express-session@1.19.0",
    "express@5.2.1",
    "framer-motion@12.34.0",
    "globals@16.5.0",
    "gsap@3.14.2",
    "lucide-react@0.563.0",
    "mongoose@9.2.3",
    "next-themes@0.4.6",
    "postcss@8.5.6",
    "radix-ui@1.4.3",
    "react-dom@19.2.4",
    "react-dropzone@15.0.0",
    "react-router-dom@7.13.0",
    "react@19.2.4",
    "shadcn@3.8.4",
    "sonner@2.0.7",
    "tailwind-merge@3.4.0",
    "tailwindcss@4.1.18",
    "tw-animate-css@1.4.0",
    "vite@7.3.1",
];

const serverPackages = [
    "bcryptjs@2.4.3",
    "cloudinary@2.9.0",
    "connect-mongo@6.0.0",
    "cors@2.8.6",
    "dotenv@17.3.1",
    "express-fileupload@1.5.2",
    "express-session@1.19.0",
    "express@5.2.1",
    "groq-sdk@1.1.2",
    "mongoose@9.2.4",
    "nodemon@3.1.14",
];

function splitPackage(pkg) {
    // handles scoped packages like @scope/name@version
    const atIdx = pkg.lastIndexOf('@');
    return {
        name: pkg.slice(0, atIdx),
        version: pkg.slice(atIdx + 1),
    };
}

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">

            <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 px-6">
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 25% 50%, #f0de78ff 0%, transparent 50%), radial-gradient(circle at 75% 50%, #f97316 0%, transparent 50%)',
                    }}
                />
                <div className="relative max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-2">
                        CCAPDEV 
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                        About{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-200">
                            ArcherEats
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        A restaurant review platform built for the DLSU community — discover, review,
                        and explore food spots around campus.
                    </p>
                    <a
                        href="https://github.com/charlemagnelazaro-jpg/MCO1-CCAPDEV-Restaurant-Review-Website-"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-5 py-2.5 rounded-lg hover:bg-slate-100 transition-colors text-sm"
                    >
                        <Github size={16} /> View on GitHub
                    </a>
                </div>
            </section>

=            <section className="max-w-4xl mx-auto px-6 py-16 space-y-4 text-center">
                <h2 className="text-3xl font-bold text-slate-800">What is ArcherEats?</h2>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    ArcherEats is a full-stack web application that lets De La Salle University students
                    discover and rate campus restaurants. Users can browse listings, write detailed reviews
                    with photos, and vote on helpful reviews — all in one seamless experience.
                </p>
            </section>

=            <section className="bg-white py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12 space-y-2">
                        <div className="inline-flex items-center gap-2 text-slate-500 text-sm font-semibold uppercase tracking-widest">
                            <Users size={14} /> Meet the Team
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800">The Developers</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {developers.map((dev) => (
                            <div
                                key={dev.handle}
                                className="flex flex-col items-center text-center bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${dev.color} flex items-center justify-center text-white font-extrabold text-xl shadow-md`}
                                >
                                    {dev.initials}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 leading-tight">{dev.name}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">@{dev.handle}</p>
                                </div>
                                <div className="flex flex-col items-center gap-2 w-full pt-2 border-t border-slate-200">
                                    <a
                                        href={`mailto:${dev.email}`}
                                        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                                    >
                                        <Mail size={12} />
                                        <span className="truncate max-w-[160px]">{dev.email}</span>
                                    </a>
                                    <a
                                        href={dev.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                                    >
                                        <Github size={12} /> GitHub Profile
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

=            <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 text-slate-500 text-sm font-semibold uppercase tracking-widest">
                        <Package size={14} /> Dependencies
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">Tech Stack</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
=                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs font-bold rounded-full uppercase tracking-widest">
                                Client
                            </span>
                            <span className="text-slate-400 text-sm">{clientPackages.length} packages</span>
                        </div>
                        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg">
                            <div className="px-4 py-2 bg-slate-800 flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-red-400" />
                                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                                <span className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-slate-400 text-xs font-mono">npm list</span>
                            </div>
                            <ul className="px-4 py-4 space-y-1 font-mono text-sm max-h-[480px] overflow-y-auto">
                                {clientPackages.map((pkg) => {
                                    const { name, version } = splitPackage(pkg);
                                    return (
                                        <li key={pkg} className="flex items-baseline gap-1">
                                            <span className="text-slate-500 select-none">├──</span>
                                            <span className="text-emerald-400">{name}</span>
                                            <span className="text-slate-500">@</span>
                                            <span className="text-amber-300">{version}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

=                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full uppercase tracking-widest">
                                Server
                            </span>
                            <span className="text-slate-400 text-sm">{serverPackages.length} packages</span>
                        </div>
                        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg">
                            <div className="px-4 py-2 bg-slate-800 flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-red-400" />
                                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                                <span className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-slate-400 text-xs font-mono">npm list</span>
                            </div>
                            <ul className="px-4 py-4 space-y-1 font-mono text-sm">
                                {serverPackages.map((pkg) => {
                                    const { name, version } = splitPackage(pkg);
                                    return (
                                        <li key={pkg} className="flex items-baseline gap-1">
                                            <span className="text-slate-500 select-none">├──</span>
                                            <span className="text-sky-400">{name}</span>
                                            <span className="text-slate-500">@</span>
                                            <span className="text-amber-300">{version}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center text-slate-400 text-sm py-8 border-t border-slate-200">
                CCAPDEV · De La Salle University · 2026
            </footer>
        </div>
    );
}
