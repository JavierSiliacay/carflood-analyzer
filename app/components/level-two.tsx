"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Sun, Moon, PenLine as Engine, Zap, Cog, Home } from "lucide-react"
import { ComponentModal } from "./component-modal"

interface LevelTwoProps {
  onBack: () => void
  darkMode: boolean
  toggleDarkMode: () => void
}

const componentData = {
  interior: {
    title: "Interior Systems",
    icon: <Home className="w-6 h-6" />,
    damage: "Carpet saturation, seat damage, floor electronics failure",
    details:
      "Water entering the cabin destroys carpeting, upholstery, and floor-mounted electronics. Door panels, seat mechanisms, and interior wiring suffer immediate damage from water exposure.",
    repairCost: "$3,000 - $8,000 (₱170,000 - ₱453,000)",
    safetyRisk: "High",
    citations: ["NHTSA Interior Safety Standards", "Automotive Interior Restoration Guidelines"],
  },
  engine: {
    title: "Engine Systems",
    icon: <Engine className="w-6 h-6" />,
    damage: "Oil pan contamination, air intake risk, cooling system damage",
    details:
      "At 6-24 inch levels, engine oil pan and lower engine components face contamination. Air intake systems are at critical risk if water reaches air filter housing.",
    repairCost: "$2,000 - $6,000 (₱113,000 - ₱340,000)",
    safetyRisk: "Critical",
    citations: ["SAE Engine Contamination Standards", "ASE Engine Repair Certification"],
  },
  transmission: {
    title: "Transmission System",
    icon: <Cog className="w-6 h-6" />,
    damage: "Fluid contamination, valve body damage, electronic control failure",
    details:
      "Transmission fluid contamination occurs when water reaches transmission pan level. Electronic transmission controls and solenoids fail immediately upon water contact.",
    repairCost: "$3,000 - $7,000 (₱170,000 - ₱396,000)",
    safetyRisk: "High",
    citations: ["ATSG Transmission Repair Manual", "SAE Automatic Transmission Standards"],
  },
  electrical: {
    title: "Electrical Systems",
    icon: <Zap className="w-6 h-6" />,
    damage: "ECU damage, wiring harness failure, sensor malfunction",
    details:
      "Water at cabin level affects critical electrical systems including engine control units, body control modules, and extensive wiring harnesses throughout the vehicle.",
    repairCost: "$2,500 - $8,000 (₱142,000 - ₱453,000)",
    safetyRisk: "Critical",
    citations: ["IEEE Automotive Electronics Standards", "SAE Electrical System Guidelines"],
  },
}

export function LevelTwo({ onBack, darkMode, toggleDarkMode }: LevelTwoProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          className={`flex items-center gap-2 bg-transparent order-2 sm:order-1 ${darkMode ? "text-white hover:text-gray-200" : "text-black hover:text-gray-800"}`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Overview</span>
          <span className="sm:hidden">Back</span>
        </Button>
        <Button onClick={toggleDarkMode} variant="outline" size="icon" className="order-1 sm:order-2 bg-transparent">
          {darkMode ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>

      {/* Level Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge className="bg-orange-500 text-white mb-4">Level 2: Moderate Flooding</Badge>
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Cabin Floor Flooding
        </h1>
        <p className={`text-base sm:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto px-4`}>
          Water reaches 6-24 inches, entering the cabin and affecting floor, seats, and critical mechanical systems.
          Click on components to explore damage.
        </p>
      </div>

      {/* Interactive Car Diagram */}
      <Card className={`mb-8 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle className={`text-center ${darkMode ? "text-white" : "text-gray-900"}`}>
            Vehicle Cross-Section - Level 2 Moderate Flooding (6-24 inches)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mx-auto max-w-4xl">
            <svg viewBox="0 0 800 400" className="w-full h-auto">
              {/* Clean background */}
              <rect x="0" y="0" width="800" height="400" className={`${darkMode ? "fill-gray-900" : "fill-gray-50"}`} />

              {/* Ground line */}
              <line x1="0" y1="350" x2="800" y2="350" className="stroke-gray-800 stroke-3" />
              <text x="20" y="340" className={`text-sm font-bold ${darkMode ? "fill-white" : "fill-gray-900"}`}>
                Ground Level
              </text>

              {/* Simple car outline */}
              <path
                d="M150 280 L200 200 L250 200 L280 180 L520 180 L550 200 L600 200 L650 280 L650 320 L600 320 L600 330 L580 330 L580 320 L220 320 L220 330 L200 330 L200 320 L150 320 Z"
                className={`${darkMode ? "fill-gray-600" : "fill-gray-400"} stroke-gray-700 stroke-2`}
              />

              {/* Wheels */}
              <circle cx="220" cy="320" r="25" className="fill-gray-700 stroke-gray-900 stroke-2" />
              <circle cx="580" cy="320" r="25" className="fill-gray-700 stroke-gray-900 stroke-2" />

              {/* Water levels - clean and simple */}
              <rect x="0" y="320" width="800" height="30" className="fill-blue-400 opacity-40" />
              <text x="20" y="315" className="text-sm fill-blue-700">
                Level 1: 15-30cm
              </text>

              <rect x="0" y="290" width="800" height="60" className="fill-orange-500 opacity-60" />
              <text x="20" y="285" className="text-lg font-bold fill-orange-800">
                Level 2: 6-24 inches
              </text>

              {/* Water surface line */}
              <line x1="0" y1="290" x2="800" y2="290" className="stroke-orange-600 stroke-2" strokeDasharray="5,5" />

              {/* Clean component layout - well spaced */}

              {/* Interior - bottom center */}
              <rect
                x="360"
                y="325"
                width="80"
                height="15"
                className="fill-red-600 hover:fill-red-700 cursor-pointer transition-colors stroke-red-800 stroke-2"
                onClick={() => setSelectedComponent("interior")}
              />
              <text x="400" y="337" textAnchor="middle" className="text-xs fill-white font-bold">
                INTERIOR
              </text>

              {/* Engine - right of interior */}
              <rect
                x="450"
                y="325"
                width="60"
                height="15"
                className="fill-purple-600 hover:fill-purple-700 cursor-pointer transition-colors stroke-purple-800 stroke-2"
                onClick={() => setSelectedComponent("engine")}
              />
              <text x="480" y="337" textAnchor="middle" className="text-xs fill-white font-bold">
                ENGINE
              </text>

              {/* Transmission - left side of engine */}
              <rect
                x="320"
                y="310"
                width="30"
                height="20"
                className="fill-yellow-600 hover:fill-yellow-700 cursor-pointer transition-colors stroke-yellow-800 stroke-2"
                onClick={() => setSelectedComponent("transmission")}
              />
              <text x="335" y="323" textAnchor="middle" className="text-xs fill-white font-bold">
                TRANS
              </text>

              {/* Electrical - right side of engine */}
              <rect
                x="520"
                y="300"
                width="40"
                height="25"
                className="fill-green-600 hover:fill-green-700 cursor-pointer transition-colors stroke-green-800 stroke-2"
                onClick={() => setSelectedComponent("electrical")}
              />
              <text x="540" y="315" textAnchor="middle" className="text-xs fill-white font-bold">
                ELECT
              </text>

              {/* Simple measurement scale */}
              <line x1="720" y1="350" x2="720" y2="290" className="stroke-orange-700 stroke-3" />
              <text x="730" y="320" className="text-lg font-bold fill-orange-700">
                24 inches
              </text>

              <line x1="740" y1="350" x2="740" y2="320" className="stroke-blue-600 stroke-2" />
              <text x="750" y="335" className="text-sm fill-blue-600">
                6 inches
              </text>

              {/* Clean zone labels */}
              <text x="400" y="250" textAnchor="middle" className="text-xl font-bold fill-green-600">
                SAFE ZONE
              </text>
              <text x="400" y="370" textAnchor="middle" className="text-lg font-bold fill-red-600">
                FLOOD ZONE
              </text>
            </svg>
          </div>

          {/* Clean summary boxes */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200">
              <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">🚨 FLOODED COMPONENTS</h4>
              <div className="space-y-1 text-sm">
                <div>• Interior Systems (6-24 inches) - Carpet and seat damage</div>
                <div>• Engine Systems (6-24 inches) - Oil pan contamination</div>
                <div>• Transmission System (6-24 inches) - Fluid contamination</div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200">
              <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-2">⚠️ CRITICAL RISK</h4>
              <div className="space-y-1 text-sm">
                <div>• Electrical Systems (6-24 inches) - ECU and wiring failure</div>
                <div>• Repair Cost: $10,500 - $23,500 (₱595,000 - ₱1,330,000)</div>
                <div>• Status: POTENTIALLY REPAIRABLE</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level 2 Impact Points - Clean Info Panel */}
      <div className="mt-8 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-2 border-orange-300">
        <h4 className={`text-xl font-bold mb-4 text-orange-800 ${darkMode ? "text-orange-300" : ""}`}>
          Level 2 Moderate Flooding Impact Points
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
          <div className="text-center">
            <div className={`font-bold text-orange-700 ${darkMode ? "text-orange-200" : ""}`}>Interior Systems:</div>
            <div className="text-2xl font-bold text-red-600">6-24 inches</div>
            <div className="text-sm text-red-500">HIGH</div>
          </div>
          <div className="text-center">
            <div className={`font-bold text-orange-700 ${darkMode ? "text-orange-200" : ""}`}>Engine Systems:</div>
            <div className="text-2xl font-bold text-purple-600">6-24 inches</div>
            <div className="text-sm text-purple-500">CRITICAL</div>
          </div>
          <div className="text-center">
            <div className={`font-bold text-orange-700 ${darkMode ? "text-orange-200" : ""}`}>Transmission System:</div>
            <div className="text-2xl font-bold text-yellow-600">6-24 inches</div>
            <div className="text-sm text-yellow-500">HIGH</div>
          </div>
          <div className="text-center">
            <div className={`font-bold text-orange-700 ${darkMode ? "text-orange-200" : ""}`}>Electrical Systems:</div>
            <div className="text-2xl font-bold text-green-600">6-24 inches</div>
            <div className="text-sm text-green-500">CRITICAL</div>
          </div>
        </div>

        <div className="p-4 bg-red-100 dark:bg-red-800/30 rounded-lg border border-red-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🚨</span>
            <span className={`font-bold text-red-800 ${darkMode ? "text-red-300" : ""}`}>
              MODERATE: Cabin Floor Flooding
            </span>
          </div>
          <p className={`text-sm text-red-700 ${darkMode ? "text-red-400" : ""}`}>
            At 6-24 inch water depth, critical cabin and mechanical components become flooded. Interior systems suffer
            extensive damage. Engine and transmission fluid contamination cause significant issues. Vehicle may be
            repairable but requires professional assessment.
          </p>
        </div>
      </div>

      {/* Component Legend - Clean buttons */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
        {Object.entries(componentData).map(([key, component]) => (
          <Button
            key={key}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 sm:gap-2 h-auto p-2 sm:p-3 bg-transparent hover:bg-orange-50 dark:hover:bg-orange-900/20 text-xs sm:text-sm"
            onClick={() => setSelectedComponent(key)}
          >
            {component.icon}
            <span className="font-medium hidden sm:inline">{component.title}</span>
            <span className="font-medium sm:hidden">{component.title.split(" ")[0]}</span>
          </Button>
        ))}
      </div>

      {/* Damage Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className={`${darkMode ? "text-white" : "text-gray-900"}`}>Level 2 Damage Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Estimated Repair Costs
                </h4>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  $10,500 - $23,500 (₱595,000 - ₱1,330,000) (depends on extent of damage)
                </p>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Recovery Timeline</h4>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  2-6 weeks for assessment and repairs
                </p>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Vehicle Status</h4>
                <p className={`text-sm text-red-600 font-semibold ${darkMode ? "text-red-400" : ""}`}>
                  POTENTIALLY REPAIRABLE - Requires professional evaluation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className={`${darkMode ? "text-white" : "text-gray-900"}`}>Emergency Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={`space-y-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <li className="text-red-600 font-bold">• NEVER attempt to start the engine</li>
              <li>• Disconnect battery immediately</li>
              <li>• Remove spark plugs to check for water</li>
              <li>• Drain all fluids and inspect for contamination</li>
              <li>• Contact insurance for damage evaluation</li>
              <li>• Arrange professional towing service</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Component Modal */}
      {selectedComponent && (
        <ComponentModal
          component={componentData[selectedComponent as keyof typeof componentData]}
          isOpen={!!selectedComponent}
          onClose={() => setSelectedComponent(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  )
}
