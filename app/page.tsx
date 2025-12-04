"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Droplets, Car, AlertTriangle, Moon, Sun, ChevronRight, Info, ExternalLink } from "lucide-react"
import { LevelOne } from "./components/level-one"
import { LevelTwo } from "./components/level-two"
import { LevelThree } from "./components/level-three"
import { WaterAnimation } from "./components/water-animation"

export default function FloodDamageGuide() {
  const [currentLevel, setCurrentLevel] = useState<number | null>(null)
  const [darkMode, setDarkMode] = useState(false)

  const levels = [
    {
      id: 1,
      title: "Level 1: Minor Flooding",
      subtitle: "Water reaches bottom of tires or rocker panel",
      waterHeight: "0-6 inches",
      severity: "Minor",
      color: "bg-yellow-500",
      icon: <Droplets className="w-6 h-6" />,
      description: "Water reaches up to the bottom of the tires or rocker panel, affecting undercarriage components.",
      affectedSystems: ["Exhaust System", "Lower Electrical", "Brake Components", "Suspension Mounts"],
    },
    {
      id: 2,
      title: "Level 2: Moderate Flooding",
      subtitle: "Floodwater enters cabin, reaching floor to seat level",
      waterHeight: "6-24 inches",
      severity: "Moderate",
      color: "bg-orange-500",
      icon: <Car className="w-6 h-6" />,
      description:
        "Floodwater enters the cabin, reaching the floor and possibly up to the seat level, affecting interior and mechanical systems.",
      affectedSystems: [
        "Interior Systems",
        "Engine Components",
        "Transmission",
        "Electrical Systems",
        "All Level 1 Damage",
      ],
    },
    {
      id: 3,
      title: "Level 3: Severe Flooding",
      subtitle: "Substantial submersion, water reaching dashboard or higher",
      waterHeight: "36+ inches",
      severity: "Severe",
      color: "bg-red-500",
      icon: <AlertTriangle className="w-6 h-6" />,
      description:
        "Substantial submersion with water reaching the dashboard or higher, causing catastrophic damage to all vehicle systems.",
      affectedSystems: [
        "Complete Engine Failure",
        "Total Interior Loss",
        "All Electronics",
        "Structural Damage",
        "All Previous Damage",
      ],
    },
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  if (currentLevel) {
    const LevelComponent = currentLevel === 1 ? LevelOne : currentLevel === 2 ? LevelTwo : LevelThree
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 to-cyan-50"}`}
      >
        <LevelComponent onBack={() => setCurrentLevel(null)} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 to-cyan-50"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 lg:mb-8 gap-2 sm:gap-4">
          <div className="text-center flex-1 w-full">
            <h1
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4 px-2 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Vehicle Flood Damage Guide
            </h1>
            <p
              className={`text-sm sm:text-base md:text-lg lg:text-xl ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto px-2 sm:px-4`}
            >
              Understanding the progressive impact of flooding on vehicle components across three critical severity
              levels
            </p>
          </div>
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            size="icon"
            className="ml-0 sm:ml-4 bg-transparent shrink-0 w-10 h-10"
          >
            {darkMode ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>

        {/* Water Animation */}
        <div className="mb-8 sm:mb-12">
          <WaterAnimation darkMode={darkMode} />
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-12">
          {levels.map((level) => (
            <Card
              key={level.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                darkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => setCurrentLevel(level.id)}
            >
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`p-2 sm:p-2.5 lg:p-3 rounded-full ${level.color} text-white`}>{level.icon}</div>
                  <Badge
                    variant={
                      level.severity === "Minor"
                        ? "secondary"
                        : level.severity === "Moderate"
                          ? "destructive"
                          : "destructive"
                    }
                    className="text-xs"
                  >
                    {level.severity}
                  </Badge>
                </div>

                <h3
                  className={`text-base sm:text-lg lg:text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {level.title}
                </h3>

                <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {level.subtitle}
                </p>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs sm:text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Water Height:
                    </span>
                    <span className={`text-xs sm:text-sm font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {level.waterHeight}
                    </span>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <span className={`text-xs sm:text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Affected Systems:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {level.affectedSystems.slice(0, 2).map((system, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {system}
                        </Badge>
                      ))}
                      {level.affectedSystems.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{level.affectedSystems.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full mt-3 sm:mt-4 group text-xs sm:text-sm lg:text-base py-2 sm:py-2.5"
                  variant="default"
                >
                  Explore Level {level.id}
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Information Section */}
        <Card className={`mb-6 sm:mb-8 lg:mb-12 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Info className={`w-5 h-5 sm:w-6 sm:h-6 ${darkMode ? "text-blue-400" : "text-blue-600"} shrink-0`} />
              <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Understanding Flood Damage Progression
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <div>
                <h3
                  className={`text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  Why Water Levels Matter
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Vehicle flood damage is directly correlated with water depth. As water levels rise, they progressively
                  affect different vehicle systems, starting with ground-level components and eventually reaching
                  critical engine and electrical systems. Understanding these levels helps assess repair costs and
                  safety implications.
                </p>
              </div>

              <div>
                <h3
                  className={`text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  Interactive Exploration
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Click on each level to explore detailed vehicle diagrams with interactive components. Each clickable
                  part reveals specific damage information, repair considerations, and safety implications backed by
                  automotive engineering references.
                </p>
              </div>
            </div>

            <div
              className={`mt-3 sm:mt-4 lg:mt-6 p-2 sm:p-3 lg:p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
            >
              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                <strong>Disclaimer:</strong> This guide provides educational information about flood damage patterns.
                Always consult qualified automotive professionals for actual vehicle assessment and repair decisions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="text-center">
              <h3
                className={`text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Contact & Support
              </h3>
              <p
                className={`text-xs sm:text-sm lg:text-base mb-4 sm:mb-6 px-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                If you have any questions or inquiries, please kindly contact USTP-Autotronics.
              </p>

              {/* USTP Autotronics Logo */}
              <div className="flex justify-center mb-3 sm:mb-4">
                <a
                  href="https://www.facebook.com/groups/2137901033113594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transition-all duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src="/images/ustp-autotronics-logo.png"
                      alt="USTP Autotronics Society Logo"
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <ExternalLink className="absolute top-1 right-1 sm:top-2 sm:right-2 w-3 h-3 sm:w-4 sm:h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </a>
              </div>

              <div className="text-center">
                <a
                  href="https://www.facebook.com/groups/2137901033113594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base font-medium transition-colors duration-300 ${
                    darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  Visit USTP-Autotronics Facebook Group
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>

              <div className={`mt-6 pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <p className={`text-xs sm:text-sm mb-3 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  For more questions and inquiries, you may contact the IoT programmer from Autotronics.
                </p>

                <div className="flex justify-center">
                  <a
                    href="https://github.com/JavierSiliacay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-sm font-medium">GitHub Profile</span>
                  </a>
                </div>
              </div>

              <div className={`mt-4 sm:mt-6 pt-3 sm:pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"} px-2`}>
                  Solidarity of Autotronics Society • University of Science and Technology of Southern Philippines
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
