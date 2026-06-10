'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircle, Infinity, FileCode2, MessagesSquare, Calendar, Clock, Globe, ShieldCheck, Folder, MonitorSmartphone, FileText, Layers, Layout, ExternalLink, Twitter, Instagram, Linkedin, Quote } from 'lucide-react';
import { FAQ } from '@/components/faq';
import Cal, { getCalApi } from "@calcom/embed-react";
import { motion } from 'motion/react';

const words = ["Founders", "Creators", "Businesses", "Artisans", "Entrepreneurs", "Academia", "Consultants", "Startups", "NGOs", "Labs"];

const portfolioData = [
  { title: "Voicemonial", url: "https://voicemonial.com", type: "MVP Web App", category: "Software", brand: "bg-blue-500" },
  { title: "Karysburg", url: "https://karysburg.com", type: "Business / Company", category: "Software", brand: "bg-gray-800" },
  { title: "Machine Dreams Podcast", url: "https://machinedreamspod.com", type: "Podcast", category: "Software", brand: "bg-red-500" },
  { title: "Ruvertech", url: "https://ruvertech.com", type: "Business / Company", category: "Software", brand: "bg-teal-500" },
  { title: "BBT Essentials", url: "https://bbtessentials.com", type: "Ecommerce", category: "Software", brand: "bg-neutral-800" },
  { title: "Global Divide", url: "https://globaldivide.org", type: "Business / Company", category: "Software", brand: "bg-emerald-600" },
  { title: "Olusegun Ruth", url: "https://rutholusegun.com", type: "Personal Portfolio", category: "Software", brand: "bg-pink-400" },
  { title: "Unserious Collective", url: "https://unseriouscollective.com", type: "Magazine", category: "Software", brand: "bg-yellow-500" },
  { title: "Beauty By Tejj", url: "https://www.beautybytejj.com", type: "Ecommerce", category: "Software", brand: "bg-rose-500" },
  { title: "Luzta Cosmetics", url: "https://luztacosmetics.com", type: "Ecommerce", category: "Software", brand: "bg-amber-600" },
  { title: "Zainab Azeez", url: "https://zainabazeez.com", type: "Personal Portfolio", category: "Software", brand: "bg-violet-500" },
  { title: "Kolawole Samuel Adebayo", url: "https://officialksa.com", type: "Personal Portfolio", category: "Software", brand: "bg-indigo-600" },
  { title: "CAF Cares", url: "https://cafcares.org", type: "NGO", category: "Software", brand: "bg-orange-500" },
  { title: "Dr. Tiffanie Culpepper", url: "https://drtiffanieculpepper.com", type: "Coaching", category: "Software", brand: "bg-sky-500" },
  { title: "ClawBank", url: "https://clawbankprototype.vercel.app", type: "Prototype", category: "Software", brand: "bg-slate-700" },
  { title: "SwiftInvoice", url: "https://swiftinvoice-xyz.vercel.app", type: "Prototype", category: "Software", brand: "bg-lime-500" },
  { title: "Market Nova", url: "https://marketnova.vercel.app", type: "Prototype", category: "Software", brand: "bg-cyan-500" },
  { title: "Novacart", url: "https://novacart-xyz.vercel.app", type: "Prototype", category: "Software", brand: "bg-fuchsia-500" },
  { title: "LinkNest", url: "https://linknest-xyz.vercel.app", type: "Prototype", category: "Software", brand: "bg-violet-600" },
  { title: "Tired of Grammarly? Here are 5 Free Grammarly Alternatives", url: "https://www.linkedin.com/pulse/tired-grammarly-here-5-free-alternatives-worth-trying-temidayo-jacob", type: "Article (LinkedIn)", category: "Tech Articles" },
  { title: "10 Most Bizarre Car Myths That Are Actually True", url: "https://www.hotcars.com/10-most-bizarre-car-myths-that-are-actually-true/", type: "Article (HotCars)", category: "Tech Articles" },
  { title: "Adaptive Marketing: Leveraging Shifting Trends", url: "https://www.linkedin.com/pulse/adaptive-marketing-leveraging-shifting-trends-temidayo-jacob", type: "Article (LinkedIn)", category: "Tech Articles" },
  { title: "Inexperienced Drivers Should Stay Away From These European Sports Cars", url: "https://www.hotcars.com/inexperienced-drivers-should-stay-away-from-these-european-sports-cars/", type: "Article (HotCars)", category: "Tech Articles" },
  { title: "Log4Shell: Could This Be The Mother of All Vulnerabilities?", url: "https://www.linkedin.com/pulse/log4shell-could-mother-all-vulnerabilities-temidayo-jacob", type: "Article (LinkedIn)", category: "Tech Articles" },
  { title: "Leveraging TikTok for Your Brand Visibility in 2022", url: "https://www.linkedin.com/pulse/leveraging-tiktok-your-brand-visibility-2022-temidayo-jacob", type: "Article (LinkedIn)", category: "Tech Articles" },
  { title: "10 Status Symbol Sports Cars Of The Past Anyone Can Afford", url: "https://www.hotcars.com/10-status-symbol-sports-cars-of-the-past-anyone-can-afford/", type: "Article (HotCars)", category: "Tech Articles" },
  { title: "10 Supercars That Aren’t As Cool As Everyone Thinks", url: "https://www.hotcars.com/10-supercars-that-arent-as-cool-as-everyone-thinks/", type: "Article (HotCars)", category: "Tech Articles" },
  { title: "8 Things Porsche Owners Keep Quiet About", url: "https://www.hotcars.com/8-things-porsche-owners-keep-quiet-about/", type: "Article (HotCars)", category: "Tech Articles" },
  { title: "PMR Forecasts Growth in Global Mobile Marketing Market", url: "https://temidayoxyz.medium.com/pmr-forecasts-growth-in-global-mobile-marketing-market-bc62a0f1369f", type: "Article (Medium)", category: "Tech Articles" },
  { title: "Is Automation in Web Development Replacing Human Creativity?", url: "https://hackernoon.com/is-automation-in-web-development-replacing-human-creativity", type: "Article (HackerNoon)", category: "Tech Articles" },
  { title: "AI Apocalypse: What Happens When Artificial Intelligence Goes Rogue?", url: "https://hackernoon.com/ai-apocalypse-what-happens-when-artificial-intelligence-goes-rogue", type: "Article (HackerNoon)", category: "Tech Articles" },
  { title: "Czy automatyzacja w webdevie zastąpi ludzką kreatywność?", url: "https://bulldogjob.pl/readme/czy-automatyzacja-w-tworzeniu-stron-internetowych-zastapi-nam-ludzka-kreatywnosc", type: "Article (Bulldogjob)", category: "Tech Articles" },
  { title: "How AI Is Streamlining Consulting for Businesses", url: "https://hackernoon.com/how-ai-is-streamlining-consulting-for-businesses", type: "Article (HackerNoon)", category: "Tech Articles" },
  { title: "What the Twitter-Meta Dispute Means for the Tech Industry", url: "https://dev.to/temidayo/implications-of-the-twitter-meta-dispute-for-the-tech-industry-498b", type: "Article (Dev.to)", category: "Tech Articles" },
  { title: "How an IDS Can Protect Your Business from Cyberattacks", url: "https://hackernoon.com/how-an-ids-can-protect-your-business-from-cyberattacks", type: "Article (HackerNoon)", category: "Tech Articles" },
  { title: "5 Often-Ignored Docker Security Risks", url: "https://dev.to/temidayo/5-often-ignored-docker-security-risks-4jja", type: "Article (Dev.to)", category: "Tech Articles" },
  { title: "How to Choose the Right Cloud Provider for Your Startup", url: "https://dev.to/temidayo/how-to-choose-the-right-cloud-provider-for-your-startup-5ack", type: "Article (Dev.to)", category: "Tech Articles" },
  { title: "AI Is Not Making You Dumb", url: "https://medium.com/@temidayojacob/ai-is-not-making-you-dumb-3ff043ade15f", type: "Article (Medium)", category: "Tech Articles" }
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [activeCard, setActiveCard] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev === 2 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [activeCard]);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"call"});
      cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#FF0000"},"dark":{"cal-brand":"#FF0000"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (subIndex === words[index].length + 1 && !reverse) {
        setReverse(true);
      } else if (subIndex === 0 && reverse) {
        setReverse(false);
        setIndex((prev) => (prev + 1) % words.length);
      } else {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      }
    }, reverse ? (subIndex === words[index].length + 1 ? 2000 : 50) : (subIndex === 0 ? 500 : 100));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  const getCardAnimation = (cardIndex: number) => {
    const isActive = activeCard === cardIndex;
    const isRight = (activeCard + 1) % 3 === cardIndex;
    
    if (isActive) {
      return { x: "0%", y: 0, scale: 1, rotate: 0, zIndex: 30, opacity: 1 };
    } else if (isRight) {
      return { x: isMobile ? "45%" : "70%", y: 20, scale: 0.85, rotate: 6, zIndex: 10, opacity: 0.8 };
    } else {
      return { x: isMobile ? "-45%" : "-70%", y: 20, scale: 0.85, rotate: -6, zIndex: 10, opacity: 0.8 };
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 50) {
      setActiveCard((prev) => (prev === 0 ? 2 : prev - 1));
    } else if (info.offset.x < -50) {
      setActiveCard((prev) => (prev === 2 ? 0 : prev + 1));
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-gray-900 font-sans selection:bg-[#FF0000] selection:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Temidayo XYZ Logo" width={32} height={32} className="rounded-lg object-contain" unoptimized />
          <span className="font-semibold text-xl tracking-tight">Temidayo XYZ</span>
        </div>
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="#works" className="text-gray-600 hover:text-gray-900 font-medium">Works</Link>
          <Link href="mailto:hello@temidayo.xyz" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-colors">
            <MessageCircle className="w-4 h-4 text-[#FF0000]" />
            Send a Message
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-sm font-medium mb-8 border border-gray-200">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          Open for Projects
        </div>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
          <span className="block text-gray-900 mb-2">Problem-solving For</span>
          <span className="bg-gradient-to-r from-[#FF0000] via-[#FF4D4D] to-[#B30000] bg-clip-text text-transparent inline-block min-h-[1.2em]">
            {words[index].substring(0, subIndex)}
            <span className="inline-block w-[4px] h-[0.9em] bg-[#FF0000] ml-1 animate-pulse align-middle"></span>
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          I build robust software solutions and conduct deep technical research that turn complex ideas into clear, high-leverage decisions that drive real-world growth.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FF0000] text-white font-medium hover:bg-red-700 transition-colors text-lg">
            <Calendar className="w-5 h-5" />
            Book a Call
          </Link>
          <Link href="#pricing" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-gray-900 font-medium border border-gray-200 hover:bg-gray-50 transition-colors text-lg">
            View Offerings
          </Link>
        </div>
      </section>

      {/* Hero Visuals (Mockups) */}
      <section className="max-w-7xl mx-auto px-4 pb-24 overflow-hidden">
        <div className="relative h-[400px] lg:h-[500px] w-full max-w-5xl mx-auto flex justify-center items-center">
          {/* Card 1: Software Development */}
          <motion.div 
            animate={getCardAnimation(0)}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            onClick={() => setActiveCard(0)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute w-[280px] sm:w-[320px] lg:w-[384px] h-[360px] lg:h-[448px] rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl border border-gray-700 p-4 flex flex-col overflow-hidden cursor-grab active:cursor-grabbing"
          >
            {/* Mac window controls */}
            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <div className="ml-2 h-3 w-16 bg-gray-700 rounded-full"></div>
            </div>
            {/* Code Editor Mockup */}
            <div className="flex-1 bg-[#0D1117] rounded-xl border border-gray-700/50 p-4 flex flex-col gap-3 font-mono">
              <div className="flex gap-2 items-center">
                <div className="text-pink-500 text-xs font-bold">import</div>
                <div className="h-2 w-24 bg-blue-400/80 rounded-sm"></div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="text-pink-500 text-xs font-bold">const</div>
                <div className="text-yellow-300 text-xs font-bold">App</div>
                <div className="text-gray-400 text-xs">= () =&gt; {`{`}</div>
              </div>
              <div className="pl-4 flex flex-col gap-2">
                <div className="h-2 w-3/4 bg-gray-600 rounded-sm"></div>
                <div className="h-2 w-1/2 bg-gray-600 rounded-sm"></div>
                <div className="flex gap-2 items-center mt-1">
                  <div className="text-pink-500 text-xs font-bold">return</div>
                  <div className="text-gray-400 text-xs">(</div>
                </div>
                <div className="pl-4 flex flex-col gap-2 border-l border-gray-700 ml-1">
                  <div className="h-2 w-full bg-green-400/80 rounded-sm"></div>
                  <div className="h-2 w-5/6 bg-green-400/80 rounded-sm"></div>
                  <div className="h-2 w-4/6 bg-green-400/80 rounded-sm"></div>
                </div>
                <div className="text-gray-400 text-xs">)</div>
              </div>
              <div className="text-gray-400 text-xs">{`}`}</div>
            </div>
          </motion.div>
          
          {/* Card 2: Technical Research/Writing */}
          <motion.div 
            animate={getCardAnimation(1)}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            onClick={() => setActiveCard(1)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute w-[280px] sm:w-[320px] lg:w-[384px] h-[360px] lg:h-[448px] rounded-2xl bg-white shadow-2xl border border-gray-200 p-6 flex flex-col overflow-hidden cursor-grab active:cursor-grabbing"
          >
             {/* Header */}
             <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                   <div className="w-4 h-4 border-2 border-blue-500 rounded-sm"></div>
                 </div>
                 <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
               </div>
               <div className="h-6 w-20 bg-[#FF0000]/10 text-[#FF0000] text-[10px] font-bold flex items-center justify-center rounded-full tracking-wider">REPORT</div>
             </div>
             {/* Document Body */}
             <div className="flex-1 bg-gray-50 rounded-xl border border-gray-100 p-5 flex flex-col gap-5">
               {/* Title */}
               <div className="space-y-2">
                 <div className="h-5 w-3/4 bg-gray-800 rounded-md"></div>
                 <div className="h-5 w-1/2 bg-gray-800 rounded-md"></div>
               </div>
               {/* Paragraph */}
               <div className="space-y-2.5">
                 <div className="h-2 w-full bg-gray-300 rounded-sm"></div>
                 <div className="h-2 w-full bg-gray-300 rounded-sm"></div>
                 <div className="h-2 w-5/6 bg-gray-300 rounded-sm"></div>
               </div>
               {/* Highlight Quote */}
               <div className="flex gap-3">
                 <div className="w-1 bg-[#FF0000] rounded-full"></div>
                 <div className="flex-1 space-y-2.5 py-1">
                   <div className="h-2 w-full bg-gray-400 rounded-sm"></div>
                   <div className="h-2 w-4/5 bg-gray-400 rounded-sm"></div>
                 </div>
               </div>
               {/* Data Viz / Chart */}
               <div className="mt-auto grid grid-cols-3 gap-2 h-16 items-end">
                 <div className="bg-blue-200 rounded-t-md h-1/3"></div>
                 <div className="bg-blue-400 rounded-t-md h-2/3"></div>
                 <div className="bg-blue-600 rounded-t-md h-full"></div>
               </div>
             </div>
          </motion.div>
          
          {/* Card 3: AI-Native Development */}
          <motion.div 
            animate={getCardAnimation(2)}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            onClick={() => setActiveCard(2)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute w-[280px] sm:w-[320px] lg:w-[384px] h-[360px] lg:h-[448px] rounded-2xl bg-gradient-to-br from-red-50 to-red-100 shadow-2xl border border-red-200 p-4 flex flex-col overflow-hidden cursor-grab active:cursor-grabbing"
          >
            {/* AI Status */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF0000] to-orange-500 flex items-center justify-center shadow-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="h-3 w-16 bg-red-200 rounded-full"></div>
              </div>
              <div className="h-3 w-8 bg-red-200 rounded-full"></div>
            </div>
            {/* Chat/Generation Interface */}
            <div className="flex-1 bg-white/60 backdrop-blur-md rounded-xl border border-red-100 p-4 flex flex-col gap-4">
              {/* User Message */}
              <div className="self-end bg-white shadow-sm border border-red-50 rounded-2xl rounded-tr-sm p-3 max-w-[85%]">
                <div className="h-2 w-full bg-gray-300 rounded-sm mb-2"></div>
                <div className="h-2 w-2/3 bg-gray-300 rounded-sm"></div>
              </div>
              {/* AI Response */}
              <div className="self-start bg-gradient-to-br from-red-50 to-white shadow-sm border border-red-100 rounded-2xl rounded-tl-sm p-3 max-w-[95%] w-full">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded bg-[#FF0000]/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#FF0000] rounded-sm"></div>
                  </div>
                  <div className="h-2 w-20 bg-red-200 rounded-sm"></div>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="h-2 w-full bg-gray-200 rounded-sm"></div>
                  <div className="h-2 w-5/6 bg-gray-200 rounded-sm"></div>
                </div>
                {/* Generated Component */}
                <div className="bg-gray-900 rounded-lg p-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="h-1.5 w-12 bg-gray-600 rounded-full"></div>
                    <div className="h-1.5 w-4 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-700 rounded-sm"></div>
                  <div className="h-1.5 w-3/4 bg-gray-700 rounded-sm"></div>
                  <div className="h-1.5 w-5/6 bg-gray-700 rounded-sm"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-4 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-semibold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse"></span>
                About Me
              </div>
              <h2 className="text-4xl font-bold tracking-tight mb-4">Builder. Researcher. Operator.</h2>
            </div>
            
            <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              <p>
                I’m Temidayo, a software developer and technical researcher focused on solving problems that actually matter. Seven years in, I’ve helped founders, startups, and businesses build web applications, MVPs, and AI-powered solutions while also producing applied technical research, documentation, and strategic reports that turn complex ideas into clear, actionable decisions.
              </p>
              <p>
                I operate at the intersection of system design and execution. As a founder-operator, I understand that technical excellence is a means to a commercial end, which is why I approach technical work with a focus on real-world outcomes.  My approach bypasses the traditional consulting bloat, focusing on high-leverage technical decisions that shape how businesses and their products or services scale, perform, and evolve over time.
              </p>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-8 md:gap-12">
              <div className="flex flex-col gap-1">
                <span className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">7+</span>
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">Years Experience</span>
              </div>
              <div className="w-px h-16 bg-gray-200 hidden md:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">99.9%</span>
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">Client Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Image Composition */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100">
              <Image 
                src="/temidayo.jpg" 
                alt="Temidayo XYZ" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700" 
                referrerPolicy="no-referrer" 
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Core Offerings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pricing Card 1 */}
            <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Software Development</h3>
              <div className="text-5xl font-bold mb-4">$CUSTOM</div>
              <p className="text-gray-600 mb-8">Building scalable web applications, MVPs, and AI-powered solutions with a focus on strong architecture, performance, and real business outcomes.</p>
              
              <Link href="#contact" className="w-full inline-flex justify-center items-center py-4 rounded-full bg-[#FF0000] text-white font-bold text-lg hover:bg-red-700 transition-colors mb-8">
                Book a Strategy Call
              </Link>
              
              <div className="flex-1">
                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-900">What&apos;s included</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span className="text-gray-600">MVP Development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span className="text-gray-600">Full-Stack Web Development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span className="text-gray-600">AI-Native Development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span className="text-gray-600">Prototype Design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span className="text-gray-600">Domain Name Procurement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span className="text-gray-600">Hosting & Deployment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span className="text-gray-600">System Maintenance & Security</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pricing Card 2 */}
            <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Technical Research</h3>
              <div className="text-5xl font-bold mb-4">$CUSTOM</div>
              <p className="text-gray-600 mb-8">Delivering applied research, technical documentation, and strategic insights that turn complex ideas into clear decisions and validated direction.</p>
              
              <Link href="#contact" className="w-full inline-flex justify-center items-center py-4 rounded-full bg-[#FF0000] text-white font-bold text-lg hover:bg-red-700 transition-colors mb-8">
                Book a Strategy Call
              </Link>
              
              <div className="flex-1">
                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-900">What&apos;s included</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span className="text-gray-600">Applied Research</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span className="text-gray-600">Technical Documentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span className="text-gray-600">Whitepaper Development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span className="text-gray-600">Technical Case Studies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span className="text-gray-600">Analytical Articles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span className="text-gray-600">Product Research</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                    <span className="text-gray-600">Strategic Research Reports</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features (Bento) */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">What I Bring to the Table</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-gray-50 hover:bg-white rounded-[2rem] p-10 flex flex-col justify-between border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="mb-12 flex justify-center">
              <div className="relative w-full max-w-[200px] aspect-[2/1] flex items-center justify-center">
                <Infinity className="w-32 h-32 text-red-100 absolute transform group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                <div className="absolute top-0 left-0 bg-red-50 text-[#FF0000] text-xs font-bold px-3 py-1 rounded-full border border-red-100 shadow-sm animate-bounce">refine</div>
                <div className="absolute bottom-0 right-0 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">deploy</div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Agile, Outcome-Driven Iteration</h3>
              <p className="text-gray-600 leading-relaxed">You get focused, iterative development with continuous refinement throughout the project. Every decision is shaped by your goals until the final output is aligned, polished, and production-ready.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 hover:bg-white rounded-[2rem] p-10 flex flex-col justify-between border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="mb-12 flex justify-center">
              <div className="bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow border border-gray-200 p-6 w-full max-w-[280px]">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Scope</span>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Fixed Budget</div>
                    <div className="text-lg font-bold text-[#FF0000]">Guaranteed</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000]" />
                    <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF0000]" />
                    <div className="h-2 w-4/5 bg-gray-100 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Transparent, Fixed-Scope Delivery</h3>
              <p className="text-gray-600 leading-relaxed">No ambiguity, no hidden costs. You know exactly what you are getting from the start, with clear deliverables, defined scope, and a straightforward project experience built on trust.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 hover:bg-white rounded-[2rem] p-10 flex flex-col justify-between border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="mb-12 flex flex-col gap-3 max-w-[300px] mx-auto w-full relative">
              <div className="bg-white rounded-2xl rounded-tr-sm shadow-sm border border-gray-100 p-3.5 text-sm self-end text-gray-900 font-medium z-10 transform group-hover:-translate-y-1 transition-transform">
                Here&apos;s the latest update! 🚀
              </div>
              <div className="bg-[#FF0000] text-white rounded-2xl rounded-tl-sm shadow-md p-3.5 text-sm self-start font-medium z-10 transform group-hover:translate-x-1 transition-transform">
                Looks perfect. Approved.
              </div>
              <div className="flex items-center gap-2 mt-2 self-start ml-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Async Workflow</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Real-Time Collaborative Workflow</h3>
              <p className="text-gray-600 leading-relaxed">You stay informed throughout the entire process with clear, async updates. No unnecessary meetings, just consistent progress and transparent communication that keeps the project moving efficiently.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-50 hover:bg-white rounded-[2rem] p-10 flex flex-col justify-between border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="mb-12 flex justify-center relative">
              <div className="w-full max-w-[280px] grid grid-cols-2 gap-3 relative z-10">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 transform group-hover:-translate-y-1 transition-transform">
                  <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 mb-4 flex items-center justify-center">
                    <div className="w-3 h-3 bg-[#FF0000] rounded ml-1"></div>
                  </div>
                  <div className="h-1.5 w-1/2 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full"></div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 transform group-hover:translate-y-1 transition-transform">
                  <div className="w-8 h-8 rounded-lg bg-gray-900 mb-4 flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="h-1.5 w-1/2 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full"></div>
                </div>
                <div className="col-span-2 bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-xl shadow-lg text-white flex justify-between items-center overflow-hidden relative">
                   <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] opacity-20"></div>
                   <div className="text-xs font-bold tracking-widest uppercase text-gray-300 z-10">Architecture</div>
                   <div className="flex gap-1.5 z-10">
                     <div className="w-1.5 h-1.5 bg-[#FF0000] rounded-full"></div>
                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                   </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Builder-Level Ownership</h3>
              <p className="text-gray-600 leading-relaxed">I don’t just execute tasks, I think through systems, edge cases, and long-term scalability. Every decision is made with product performance, maintainability, and real-world impact in mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      {/* Portfolio / Archives */}
      <section id="works" className="py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Explore the Folio</h2>
        </div>
        
        {/* macOS UI Window */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden flex flex-col relative">
          {/* Window Header */}
          <div className="h-12 bg-gray-50/80 backdrop-blur border-b border-gray-200 flex items-center px-4 shrink-0 relative z-10">
             <div className="flex gap-2 absolute left-4">
               <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/30"></div>
               <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/30"></div>
               <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/30"></div>
             </div>
             <div className="mx-auto flex items-center gap-2 text-sm font-semibold text-gray-600">
               <Folder className="w-4 h-4 text-blue-500" />
               Temidayo_Archives
             </div>
          </div>
          
          {/* Window Body */}
          <div className="flex-1 flex bg-white">
            {/* Sidebar (Removed completely to adopt top-pills pattern everywhere) */}
            {/* Main Content (File List) */}
            <div className="flex-1 p-4 md:p-8 bg-white relative overflow-hidden">
              {/* Category Selector (Pills) */}
              <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                 {['All', 'Software', 'Tech Articles'].map(cat => (
                   <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${activeCategory === cat ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>

              {/* Swipe/Scroll Hint */}
              <div className="flex items-center justify-end gap-1 text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-3 pr-2">
                 <span className="animate-pulse">Scroll to explore</span>
                 <ArrowRight className="w-3 h-3 animate-pulse" />
              </div>

              {/* Horizontal swiping 2-row grid for all devices */}
              <div className="grid grid-rows-2 grid-flow-col auto-cols-[9rem] md:auto-cols-[11rem] gap-2 md:gap-4 overflow-x-auto pb-6 px-2 snap-x snap-mandatory scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-gray-200 hover:scrollbar-track-transparent">
                 {portfolioData.sort((a, b) => a.title.localeCompare(b.title)).filter(item => activeCategory === 'All' || item.category === activeCategory).map((item, i) => (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" key={i} className="snap-start snap-always group flex flex-col items-center p-3 rounded-2xl hover:bg-black/[0.03] border border-transparent transition-all text-center cursor-pointer">
                       <div className="w-20 h-20 mb-3 flex items-center justify-center relative">
                          {item.category === 'Software' ? (
                             <div className={`w-16 h-12 ${item.brand || 'bg-blue-500'} rounded-lg shadow-sm flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300 ring-1 ring-black/10`}>
                                <Layout className="w-6 h-6" />
                             </div>
                          ) : (
                             <div className="w-12 h-16 bg-white rounded-lg shadow-sm ring-1 ring-black/10 flex flex-col items-center justify-start pt-2 px-2 text-gray-400 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                                {/* Folded corner */}
                                <div className="absolute top-0 right-0 w-4 h-4 bg-gray-100 border-b border-l border-gray-200/50 shadow-sm rounded-bl-sm z-10" />
                                <div className="space-y-1 w-full mt-2 opacity-30">
                                   <div className="h-0.5 w-full bg-gray-400 rounded-full" />
                                   <div className="h-0.5 w-4/5 bg-gray-400 rounded-full" />
                                   <div className="h-0.5 w-full bg-gray-400 rounded-full" />
                                   <div className="h-0.5 w-3/5 bg-gray-400 rounded-full" />
                                </div>
                             </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0">
                            <ExternalLink className="w-3 h-3 text-gray-500" />
                          </div>
                       </div>
                       <div className="w-full">
                          <h4 className="text-[13px] font-semibold text-gray-900 leading-tight line-clamp-2 px-1 mb-1">{item.title}</h4>
                          <p className="text-[11px] text-gray-500 font-medium">{item.type}</p>
                       </div>
                    </a>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 px-4 bg-gray-50 relative overflow-hidden">
        <style>{`
          @keyframes runTimeline {
            0% { top: 0%; opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { top: calc(100% - 64px); opacity: 0; }
          }
          .animate-timeline {
            animation: runTimeline 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          .animate-timeline-glow {
            animation: runTimeline 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}</style>
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold tracking-tight mb-4">How I Get Things Done</h2>
          </div>
          
          <div className="relative">
            {/* Center Line for Desktop, Left Line for Mobile */}
            <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-gray-200 transform md:-translate-x-1/2 rounded-full hidden sm:block">
               {/* Moving Dot */}
               <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-16 bg-gradient-to-b from-transparent via-[#FF0000] to-transparent rounded-full animate-timeline-glow z-10 blur-sm opacity-50"></div>
               <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 h-12 bg-[#FF0000] rounded-full animate-timeline z-20 shadow-[0_0_10px_rgba(255,0,0,0.8)] mt-2"></div>
            </div>

            <div className="space-y-16 md:space-y-24 relative z-30">
              
              {/* Step 1 */}
              <div className="relative flex flex-col md:flex-row items-center w-full group">
                {/* Node */}
                <div className="hidden sm:flex absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-gray-50 items-center justify-center shadow-lg group-hover:border-red-50 transition-colors duration-500 z-40">
                  <Calendar className="w-5 h-5 text-gray-400 group-hover:text-[#FF0000] transition-colors duration-500" />
                </div>
                
                {/* Content */}
                <div className="w-full md:w-1/2 pl-0 sm:pl-20 md:pl-0 md:pr-16 text-left md:text-right flex flex-col justify-center order-2 md:order-1 mt-6 md:mt-0">
                  <div className="sm:hidden w-12 h-12 bg-white rounded-full border border-gray-100 flex items-center justify-center shadow-sm mb-4">
                     <Calendar className="w-5 h-5 text-[#FF0000]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">1. Book a free strategy call</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">We&apos;ll discuss your goals and business needs. This call helps us understand your product and align better.</p>
                </div>
                
                {/* Illustration */}
                <div className="w-full md:w-1/2 pl-0 sm:pl-20 md:pl-16 order-1 md:order-2">
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1 relative overflow-hidden">
                    {/* Abstract Calendar UI */}
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <div className="flex justify-between items-center mb-5">
                        <div className="h-3 w-20 bg-gray-300 rounded-full"></div>
                        <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-gray-300"></div><div className="w-2 h-2 rounded-full bg-gray-300"></div></div>
                      </div>
                      <div className="grid grid-cols-7 gap-2 mb-3">
                         {[1,2,3,4,5,6,7].map(i => <div key={i} className="h-2 bg-gray-200 rounded-sm"></div>)}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                         {[...Array(14)].map((_, i) => (
                           <div key={i} className={`h-6 rounded-md ${i===9 ? 'bg-[#FF0000] shadow-md transform scale-110 flex items-center justify-center' : 'bg-white border border-gray-100'}`}>
                             {i===9 && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col md:flex-row items-center w-full group">
                {/* Node */}
                <div className="hidden sm:flex absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-gray-50 items-center justify-center shadow-lg group-hover:border-red-50 transition-colors duration-500 z-40">
                  <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-[#FF0000] transition-colors duration-500" />
                </div>
                
                {/* Illustration */}
                <div className="w-full md:w-1/2 pl-0 sm:pl-20 md:pl-0 md:pr-16 order-1 md:order-1">
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1 relative overflow-hidden">
                    {/* Abstract Planning UI */}
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4">
                       <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                         <div className="w-8 h-8 rounded-lg bg-[#FF0000]/10 flex items-center justify-center shrink-0"><div className="w-3 h-3 bg-[#FF0000] rounded-sm"></div></div>
                         <div className="flex-1"><div className="h-2.5 w-3/4 bg-gray-800 rounded-full mb-1.5"></div><div className="h-1.5 w-1/2 bg-gray-300 rounded-full"></div></div>
                       </div>
                       <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-50 opacity-60">
                         <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center shrink-0"><div className="w-3 h-3 bg-gray-400 rounded-sm"></div></div>
                         <div className="flex-1"><div className="h-2.5 w-1/2 bg-gray-400 rounded-full mb-1.5"></div><div className="h-1.5 w-1/3 bg-gray-200 rounded-full"></div></div>
                       </div>
                       <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-50 opacity-40">
                         <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center shrink-0"><div className="w-3 h-3 bg-gray-400 rounded-sm"></div></div>
                         <div className="flex-1"><div className="h-2.5 w-2/3 bg-gray-300 rounded-full mb-1.5"></div><div className="h-1.5 w-1/4 bg-gray-200 rounded-full"></div></div>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 pl-0 sm:pl-20 md:pl-16 text-left flex flex-col justify-center order-2 md:order-2 mt-6 md:mt-0">
                  <div className="sm:hidden w-12 h-12 bg-white rounded-full border border-gray-100 flex items-center justify-center shadow-sm mb-4">
                     <MessageCircle className="w-5 h-5 text-[#FF0000]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">2. Discovery & Planning</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">70 percent upfront to start. Once your slot is secured, we set up the project, share timelines and begin planning.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col md:flex-row items-center w-full group">
                {/* Node */}
                <div className="hidden sm:flex absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-gray-50 items-center justify-center shadow-lg group-hover:border-red-50 transition-colors duration-500 z-40">
                  <FileCode2 className="w-5 h-5 text-gray-400 group-hover:text-[#FF0000] transition-colors duration-500" />
                </div>
                
                {/* Content */}
                <div className="w-full md:w-1/2 pl-0 sm:pl-20 md:pl-0 md:pr-16 text-left md:text-right flex flex-col justify-center order-2 md:order-1 mt-6 md:mt-0">
                  <div className="sm:hidden w-12 h-12 bg-white rounded-full border border-gray-100 flex items-center justify-center shadow-sm mb-4">
                     <FileCode2 className="w-5 h-5 text-[#FF0000]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">3. Development & Delivery</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">From first draft to final handoff, you&apos;ll stay in the loop with unlimited revisions and clean developer handoff.</p>
                </div>
                
                {/* Illustration */}
                <div className="w-full md:w-1/2 pl-0 sm:pl-20 md:pl-16 order-1 md:order-2 group">
                  <div className="bg-gray-50 rounded-3xl shadow-sm border border-gray-100 group-hover:shadow-xl transition-all duration-500 relative h-[240px] overflow-hidden flex items-center justify-center">
                    
                    {/* Unified Success Component */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 w-[80%] max-w-[260px] sm:w-64 transform rotate-2 group-hover:rotate-0 group-hover:scale-105 group-hover:-translate-y-[55%] transition-all duration-700 z-10">
                      <div className="absolute -top-8 -right-8 w-24 h-24 bg-green-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 delay-100"></div>
                      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 delay-100"></div>
                      
                      <div className="flex flex-col items-center text-center relative z-10">
                        <div className="w-14 h-14 bg-green-50 rounded-full border-4 border-white shadow-sm flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500 delay-200">
                          <CheckCircle2 className="w-7 h-7 text-green-500 relative z-10" />
                          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
                        </div>
                        
                        <div className="h-3 w-28 bg-gray-800 rounded-full mb-1.5 transition-all duration-500"></div>
                        <div className="h-2 w-20 bg-gray-300 rounded-full mb-5 transition-all duration-500"></div>
                        
                        <div className="flex flex-col gap-2 w-full">
                          {/* Software Item */}
                          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                             <div className="flex items-center gap-2.5">
                               <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                                 <FileCode2 className="w-3 h-3 text-blue-600" />
                               </div>
                               <div className="h-1.5 w-16 bg-gray-300 rounded-full"></div>
                             </div>
                             <CheckCircle2 className="w-4 h-4 text-green-500" />
                          </div>

                          {/* Research Item */}
                          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-400">
                             <div className="flex items-center gap-2.5">
                               <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
                                 <FileText className="w-3 h-3 text-purple-600" />
                               </div>
                               <div className="h-1.5 w-20 bg-gray-300 rounded-full"></div>
                             </div>
                             <CheckCircle2 className="w-4 h-4 text-green-500" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Accent Elements */}
                    <div className="absolute top-8 left-10 w-3 h-3 rounded-full bg-blue-400 opacity-0 group-hover:opacity-40 transition-all duration-700 delay-300 transform group-hover:-translate-y-4"></div>
                    <div className="absolute bottom-10 right-12 w-4 h-4 rounded-full bg-green-400 opacity-0 group-hover:opacity-40 transition-all duration-700 delay-500 transform group-hover:-translate-y-6"></div>
                    
                    {/* Decorative background grid */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px] transition-opacity duration-700 group-hover:opacity-[0.05]"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          <div className="text-center mt-24 relative z-30">
            <p className="text-lg font-medium mb-6 text-gray-600">It&apos;s Really Simple</p>
            <Link href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FF0000] text-white font-medium hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/25 hover:-translate-y-1 text-lg">
              <Calendar className="w-5 h-5" />
              Book a Call
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 overflow-hidden relative border-t border-gray-100">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 50s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Great Work Brings Great Words</h2>
        </div>
        
        {/* Marquee Wrapper */}
        <div className="w-full flex overflow-hidden group">
          <div className="flex animate-marquee whitespace-nowrap min-w-max">
            {/* Array of Testimonials (Duplicated for infinite scroll effect) */}
            {[
              {
                name: "Founder",
                company: "Voicemonial",
                text: "Temidayo completely transformed our MVP process. We went from a rough idea to a fully functional, scalable web application infinitely faster than we expected. His architectural decisions saved us months of rework."
              },
              {
                name: "Director",
                company: "Global Divide",
                text: "Clear communication, transparent scope, and excellent delivery. As an NGO, we needed someone who respected our constraints while delivering top tier work. Temidayo delivered far beyond expectations."
              },
              {
                name: "Lead Engineer",
                company: "Ruvertech",
                text: "We needed deep technical case studies to clearly communicate complex systems to our stakeholders. Temidayo delivered striking, well researched documentation that hit the mark immediately."
              },
              {
                name: "Host",
                company: "Machine Dreams Podcast",
                text: "The technical execution is flawless. He built a digital presence for our podcast that perfectly captures our vibe while remaining lightning fast. Truly builder level ownership at its finest."
              },
              {
                name: "Director",
                company: "Karysburg",
                text: "Working with Temidayo is a breath of fresh air. He gets the business side as much as the technical side. Delivered an incredibly polished product with zero hidden costs or surprise delays."
              },
              {
                name: "Editor",
                company: "Unserious Collective",
                text: "The platform is incredibly sleek and responsive. He took our magazine's vision and translated it beautifully. The async workflow was also a massive plus for our very busy creative team."
              },
              {
                name: "E-commerce Head",
                company: "Beauty By Tejj",
                text: "Our store's performance skyrocketed after working together. The attention to detail, modern practices, and focus on absolute performance made updating our commercial presence effortless."
              }
            ].map((i) => i).concat([
              {
                name: "Founder",
                company: "Voicemonial",
                text: "Temidayo completely transformed our MVP process. We went from a rough idea to a fully functional, scalable web application infinitely faster than we expected. His architectural decisions saved us months of rework."
              },
              {
                name: "Director",
                company: "Global Divide",
                text: "Clear communication, transparent scope, and excellent delivery. As an NGO, we needed someone who respected our constraints while delivering top tier work. Temidayo delivered far beyond expectations."
              },
              {
                name: "Lead Engineer",
                company: "Ruvertech",
                text: "We needed deep technical case studies to clearly communicate complex systems to our stakeholders. Temidayo delivered striking, well researched documentation that hit the mark immediately."
              },
              {
                name: "Host",
                company: "Machine Dreams Podcast",
                text: "The technical execution is flawless. He built a digital presence for our podcast that perfectly captures our vibe while remaining lightning fast. Truly builder level ownership at its finest."
              },
              {
                name: "Director",
                company: "Karysburg",
                text: "Working with Temidayo is a breath of fresh air. He gets the business side as much as the technical side. Delivered an incredibly polished product with zero hidden costs or surprise delays."
              },
              {
                name: "Editor",
                company: "Unserious Collective",
                text: "The platform is incredibly sleek and responsive. He took our magazine's vision and translated it beautifully. The async workflow was also a massive plus for our very busy creative team."
              },
              {
                name: "E-commerce Head",
                company: "Beauty By Tejj",
                text: "Our store's performance skyrocketed after working together. The attention to detail, modern practices, and focus on absolute performance made updating our commercial presence effortless."
              }
            ]).map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mx-4 w-[400px] shrink-0 whitespace-normal shadow-sm flex flex-col justify-between hover:border-gray-200 transition-colors">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm mb-6 text-[#FF0000]">
                    <Quote className="w-5 h-5" fill="currentColor" />
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">&quot;{testimonial.text}&quot;</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-[#FF0000] font-medium">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-4xl font-bold tracking-tight mb-6">Didn&apos;t Find What You Were Looking For?</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF0000] text-white font-medium hover:bg-red-700 transition-colors">
                <Calendar className="w-4 h-4" />
                Book a Call
              </Link>
              <Link href="mailto:hello@temidayo.xyz" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-colors">
                <MessageCircle className="w-4 h-4 text-[#FF0000]" />
                Send a Message
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <FAQ />
          </div>
        </div>
      </section>

      {/* Booking / Calendar Section */}
      <section id="contact" className="py-24 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-16">Let&apos;s Build Something that Stands Out</h2>
        
        <div className="max-w-4xl mx-auto min-h-[600px]">
          <Cal 
            namespace="call"
            calLink="temidayo/call"
            style={{width:"100%",height:"100%",minHeight:"600px",overflow:"scroll"}}
            config={{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-sm">
            © XYZ Intelligent Solutions {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Temidayo XYZ Logo" width={24} height={24} className="rounded object-contain" unoptimized />
            <span className="font-bold tracking-tight">Temidayo XYZ</span>
          </div>
          <div className="flex gap-4 text-gray-400">
            <a href="https://x.com/temidayoxyz" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors p-2 rounded-full hover:bg-red-50">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/temidayoxyz" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors p-2 rounded-full hover:bg-red-50">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://instagram.com/temidayoxyz" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors p-2 rounded-full hover:bg-red-50">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
