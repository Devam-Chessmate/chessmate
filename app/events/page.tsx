"use client"

import { useState } from "react"
import Link from "next/link";
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarIcon,
  Clock,
  MapPin,
  Users,
  Trophy,
  BookOpen,
  Star,
  ArrowRight,
  Filter,
  Sparkles,
  Crown,
  Target,
  Zap,
} from "lucide-react"
import { format } from "date-fns"
import TestimonialsSection from "@/components/testimonials-section"

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedCategory, setSelectedCategory] = useState("all")

  const events = [
    {
      id: 1,
      title: "State Championship 2024",
      category: "tournament",
      date: "2024-03-15",
      time: "09:00 AM",
      location: "Hyderabad Convention Center",
      participants: "200+",
      prize: "Trophies & Medals",
      description: "Annual state-level championship open to all ages.",
      image: "/chess-tournament.png",
      status: "upcoming",
      registrationFee: "Members Entry",
      color: "from-red-500 to-rose-600",
      bgColor: "bg-gradient-to-br from-red-50 to-rose-50",
    },
    {
      id: 2,
      title: "Grandmaster Workshop",
      category: "workshop",
      date: "2024-03-08",
      time: "02:00 PM",
      location: "Academy Main Hall",
      participants: "50",
      prize: "FIDE Certificate",
      description: "Exclusive workshop by GM Rajesh Kumar on advanced openings.",
      image: "/chess-workshop.jpg",
      status: "upcoming",
      registrationFee: "Included in Track",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      id: 3,
      title: "Youth Rapid Tournament",
      category: "tournament",
      date: "2024-03-22",
      time: "10:00 AM",
      location: "Online Platform",
      participants: "100+",
      prize: "Trophy & Ranking",
      description: "Fast-paced tournament for players under 18.",
      image: "/youth-chess.jpg",
      status: "upcoming",
      registrationFee: "Open Registration",
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
    },
    {
      id: 4,
      title: "Chess Psychology Seminar",
      category: "seminar",
      date: "2024-03-12",
      time: "11:00 AM",
      location: "Academy Conference Room",
      participants: "30",
      prize: "Certificate",
      description: "Learn mental strategies and psychology of competitive chess.",
      image: "/chess-psychology.jpg",
      status: "upcoming",
      registrationFee: "Workshop Pass",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    },
    {
      id: 5,
      title: "Simultaneous Exhibition",
      category: "exhibition",
      date: "2024-03-18",
      time: "04:00 PM",
      location: "City Chess Club",
      participants: "40",
      prize: "Experience",
      description: "Play simultaneous games against GM Rajesh Kumar.",
      image: "/chess-simultaneous.jpg",
      status: "upcoming",
      registrationFee: "Special Entry",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
    },
    {
      id: 6,
      title: "Women's Chess Day",
      category: "special",
      date: "2024-03-25",
      time: "09:30 AM",
      location: "Academy Main Hall",
      participants: "80",
      prize: "Trophies & Awards",
      description: "Tournament & workshop celebrating women.",
      image: "/women-chess.jpg",
      status: "upcoming",
      registrationFee: "Open Invite",
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-rose-50 to-pink-50",
    },
  ]

  const categories = [
    { id: "all", name: "All Events", icon: CalendarIcon, color: "from-gray-500 to-gray-700" },
    { id: "tournament", name: "Tournaments", icon: Trophy, color: "from-red-500 to-rose-600" },
    { id: "workshop", name: "Workshops", icon: BookOpen, color: "from-blue-500 to-cyan-600" },
    { id: "seminar", name: "Seminars", icon: Users, color: "from-purple-500 to-pink-600" },
    { id: "exhibition", name: "Exhibitions", icon: Star, color: "from-amber-500 to-orange-600" },
    { id: "special", name: "Special Events", icon: Sparkles, color: "from-emerald-500 to-green-600" },
  ]

  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter(event => event.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 px-6 py-2 text-lg shadow-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            Events & Tournaments
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Chess Events
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join thrilling tournaments, master workshops, and exclusive chess events. Compete, learn, and grow with the chess community.
          </p>
        </div>
      </section>

      {/* Event Categories */}
      <section className="relative py-12 px-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Event Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover events tailored to your interests and skill level
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-2xl`
                    : "bg-white/80 backdrop-blur-sm border-gray-200 text-gray-700 hover:border-gray-300 shadow-lg"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="w-8 h-8" />
                <span className="text-sm font-semibold text-center">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-4">
              {/* <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-1 w-full lg:w-auto">
                <TabsTrigger 
                  value="grid" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-xl px-8 py-3 transition-all duration-300"
                >
                  Grid View
                </TabsTrigger>
                <TabsTrigger 
                  value="calendar" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-xl px-8 py-3 transition-all duration-300"
                >
                  Calendar View
                </TabsTrigger>
              </TabsList> */}
              <div className="flex items-center gap-3 text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl border border-gray-200">
                <Filter className="w-5 h-5" />
                <span className="text-sm font-medium">Showing {filteredEvents.length} of {events.length} events</span>
              </div>
            </div>

            <TabsContent value="grid">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredEvents.map(event => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className={`${event.bgColor} border-2 border-gray-200/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                      {/* Gradient Header */}
                      <div className={`h-2 bg-gradient-to-r ${event.color}`}></div>
                      
                      <CardContent className="p-0">
                        {/* Event Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={event.image || "/placeholder.svg"} 
                            alt={event.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 right-4">
                            <Badge className={`bg-gradient-to-r ${event.color} text-white px-4 py-1.5 rounded-full shadow-lg border-0`}>
                              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                            </Badge>
                          </div>

                          {/* Event Date */}
                          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                            <div className="text-sm font-bold text-gray-800">
                              {format(new Date(event.date), "MMM dd")}
                            </div>
                          </div>
                        </div>

                        {/* Event Content */}
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {event.description}
                          </p>

                          {/* Event Details */}
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-gray-700">
                              <Clock className="w-5 h-5 text-blue-500" />
                              <span className="text-sm font-medium">{event.time}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                              <MapPin className="w-5 h-5 text-blue-500" />
                              <span className="text-sm font-medium">{event.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                              <Users className="w-5 h-5 text-blue-500" />
                              <span className="text-sm font-medium">{event.participants} participants</span>
                            </div>
                          </div>

                          {/* Prize and Fee */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200">
                              <Trophy className="w-6 h-6 mx-auto mb-2 text-amber-500" />
                              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Prize Pool</div>
                              <div className="text-lg font-bold text-gray-800">{event.prize}</div>
                            </div>
                            <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200">
                              <CalendarIcon className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Entry Fee</div>
                              <div className="text-lg font-bold text-gray-800">{event.registrationFee}</div>
                            </div>
                          </div>

                          {/* CTA Button */}
                          <Link href="/contact">
                            <Button className={`w-full bg-gradient-to-r ${event.color} hover:opacity-90 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg`}>
                              Register Now
                              <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </section>

      {/* Auto-scrolling Reviews */}
      <TestimonialsSection />
    </div>
  )
}