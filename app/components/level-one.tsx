"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Sun, Moon, Disc, Zap, Wind, Wrench } from "lucide-react"
import { ComponentModal } from "./component-modal"

interface LevelOneProps {
  onBack: () => void
  darkMode: boolean
  toggleDarkMode: () => void
}

const componentData = {
  brakes: {
    title: "Brake System",
    icon: <Disc className="w-6 h-6" />,
    damage: "Brake fluid contamination, reduced stopping power, corrosion of brake components",
    details:
      "Water infiltration into brake lines can cause brake fluid contamination, leading to reduced hydraulic pressure and compromised stopping ability. Brake pads and rotors may experience accelerated corrosion.",
    repairCost: "$300 - $800 (₱17,000 - ₱45,000)",
    safetyRisk: "High",
    citations: [
      "SAE International J1703 - Motor Vehicle Brake Fluid Standards",
      "NHTSA Technical Report: Flood-Damaged Vehicle Safety Assessment",
    ],
  },
  suspension: {
    title: "Suspension System",
    icon: <Wind className="w-6 h-6" />,
    damage: "Bearing contamination, shock absorber damage, spring corrosion",
    details:
      "Water and debris can contaminate wheel bearings and suspension components, causing premature wear and potential failure. Shock absorbers may lose effectiveness due to seal damage.",
    repairCost: "$400 - $1,200 (₱22,000 - ₱68,000)",
    safetyRisk: "Medium",
    citations: [
      "Automotive Engineering Handbook - Suspension Systems",
      "Institute of Mechanical Engineers: Water Damage Assessment",
    ],
  },
  electrical: {
    title: "Lower Electrical",
    icon: <Zap className="w-6 h-6" />,
    damage: "Wiring harness corrosion, sensor malfunction, connection failures",
    details:
      "Lower electrical components including ABS sensors, wheel speed sensors, and wiring harnesses are susceptible to water damage, causing intermittent failures and corrosion.",
    repairCost: "$200 - $600 (₱11,000 - ₱34,000)",
    safetyRisk: "Medium",
    citations: ["IEEE Standards for Automotive Electrical Systems", "Bosch Automotive Handbook - Electrical Systems"],
  },
  exhaust: {
    title: "Exhaust System",
    icon: <Wind className="w-6 h-6" />,
    damage: "Catalytic converter damage, muffler corrosion, emission system failure",
    details:
      "Water ingestion into the exhaust system can damage the catalytic converter and cause accelerated corrosion of exhaust components, leading to emission failures and reduced performance.",
    repairCost: "$500 - $1,500 (₱28,000 - ₱85,000)",
    safetyRisk: "Low",
    citations: ["EPA Emission Control System Guidelines", "SAE J1930 - Exhaust System Standards"],
  },
  differential: {
    title: "Differential & Transmission",
    icon: <Wrench className="w-6 h-6" />,
    damage: "Gear oil contamination, seal failure, bearing damage",
    details:
      "Water entering the differential or transmission pan causes immediate lubrication failure and internal component damage. Seals and gaskets deteriorate rapidly when exposed to water.",
    repairCost: "$800 - $2,000 (₱45,000 - ₱113,000)",
    safetyRisk: "Medium",
    citations: ["SAE J306 - Automotive Gear Lubricant Viscosity Classification"],
  },
}

export function LevelOne({ onBack, darkMode, toggleDarkMode }: LevelOneProps) {
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
        <Badge className="bg-yellow-500 text-white mb-4">Level 1: Minor Flooding</Badge>
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Rocker Panel Flooding
        </h1>
        <p className={`text-base sm:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto px-4`}>
          Water reaches 0-6 inches, affecting undercarriage and rocker panel area. Click on highlighted areas to explore
          specific damage.
        </p>
      </div>

      {/* Interactive Car Diagram */}
      <Card className={`mb-6 sm:mb-8 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle className={`text-center text-lg sm:text-xl ${darkMode ? "text-white" : "text-gray-900"}`}>
            Vehicle Cross-Section - Level 1 Minor Flooding (0-6 inches)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 md:p-6">
          <div className="relative mx-auto max-w-4xl">
            <svg viewBox="0 0 800 300" className="w-full h-auto">
              {/* Clean background */}
              <rect x="0" y="0" width="800" height="300" className={`${darkMode ? "fill-gray-900" : "fill-gray-50"}`} />

              {/* Ground line */}
              <line x1="0" y1="250" x2="800" y2="250" className="stroke-gray-800 stroke-3" />
              <text x="20" y="240" className={`text-sm font-bold ${darkMode ? "fill-white" : "fill-gray-900"}`}>
                Ground Level
              </text>

              {/* Simple car outline */}
              <path
                d="M150 180 L200 120 L250 120 L280 100 L520 100 L550 120 L600 120 L650 180 L650 220 L600 220 L600 230 L580 230 L580 220 L220 220 L220 230 L200 230 L200 220 L150 220 Z"
                className={`${darkMode ? "fill-gray-600" : "fill-gray-400"} stroke-gray-700 stroke-2`}
              />

              {/* Wheels */}
              <circle cx="220" cy="220" r="25" className="fill-gray-700 stroke-gray-900 stroke-2" />
              <circle cx="580" cy="220" r="25" className="fill-gray-700 stroke-gray-900 stroke-2" />

              {/* Level 1 water - clean and simple */}
              <rect x="0" y="220" width="800" height="30" className="fill-blue-500 opacity-60" />
              <text x="20" y="215" className="text-lg font-bold fill-blue-800">
                Level 1: 0-6 inches Water
              </text>

              {/* Water surface line */}
              <line x1="0" y1="220" x2="800" y2="220" className="stroke-blue-600 stroke-2" strokeDasharray="5,5" />

              {/* Clean component layout - well spaced and simple */}

              {/* Brake components at wheels */}
              <rect
                x="200"
                y="235"
                width="40"
                height="10"
                className="fill-red-600 hover:fill-red-700 cursor-pointer transition-colors stroke-red-800 stroke-2"
                onClick={() => setSelectedComponent("brakes")}
              />
              <text x="220" y="247" textAnchor="middle" className="text-xs fill-white font-bold">
                BRAKES
              </text>

              <rect
                x="560"
                y="235"
                width="40"
                height="10"
                className="fill-red-600 hover:fill-red-700 cursor-pointer transition-colors stroke-red-800 stroke-2"
                onClick={() => setSelectedComponent("brakes")}
              />

              {/* Suspension components */}
              <rect
                x="180"
                y="240"
                width="30"
                height="8"
                className="fill-orange-600 hover:fill-orange-700 cursor-pointer transition-colors stroke-orange-800 stroke-2"
                onClick={() => setSelectedComponent("suspension")}
              />
              <text x="195" y="252" textAnchor="middle" className="text-xs fill-white font-bold">
                SUSP
              </text>

              <rect
                x="590"
                y="240"
                width="30"
                height="8"
                className="fill-orange-600 hover:fill-orange-700 cursor-pointer transition-colors stroke-orange-800 stroke-2"
                onClick={() => setSelectedComponent("suspension")}
              />

              {/* Exhaust system - center, fully submerged */}
              <rect
                x="350"
                y="242"
                width="100"
                height="6"
                className="fill-purple-600 hover:fill-purple-700 cursor-pointer transition-colors stroke-purple-800 stroke-2"
                onClick={() => setSelectedComponent("exhaust")}
              />
              <text x="400" y="252" textAnchor="middle" className="text-xs fill-white font-bold">
                EXHAUST
              </text>

              {/* Differential/transmission pan */}
              <rect
                x="480"
                y="240"
                width="40"
                height="8"
                className="fill-green-600 hover:fill-green-700 cursor-pointer transition-colors stroke-green-800 stroke-2"
                onClick={() => setSelectedComponent("differential")}
              />
              <text x="500" y="252" textAnchor="middle" className="text-xs fill-white font-bold">
                DIFF/TRANS
              </text>

              {/* Electrical wiring */}
              <rect
                x="250"
                y="245"
                width="80"
                height="4"
                className="fill-yellow-600 hover:fill-yellow-700 cursor-pointer transition-colors stroke-yellow-800 stroke-1"
                onClick={() => setSelectedComponent("electrical")}
              />
              <text x="290" y="255" textAnchor="middle" className="text-xs fill-white font-bold">
                WIRING
              </text>

              {/* Simple measurement scale */}
              <line x1="720" y1="250" x2="720" y2="220" className="stroke-blue-700 stroke-3" />
              <text x="730" y="235" className="text-lg font-bold fill-blue-700">
                6 inches
              </text>

              <line x1="740" y1="250" x2="740" y2="235" className="stroke-blue-600 stroke-2" />
              <text x="750" y="242" className="text-sm fill-blue-600">
                0 inches
              </text>

              {/* Clean zone labels */}
              <text x="400" y="80" textAnchor="middle" className="text-xl font-bold fill-green-600">
                ENGINE BAY - SAFE
              </text>
              <text x="400" y="270" textAnchor="middle" className="text-lg font-bold fill-blue-600">
                UNDERCARRIAGE FLOODING
              </text>
            </svg>
          </div>

          {/* Level 1 Impact Points - Clean Info Panel */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-2 border-yellow-300">
            <h4 className={`text-xl font-bold mb-4 text-yellow-800 ${darkMode ? "text-yellow-300" : ""}`}>
              Level 1 Minor Flooding Impact Points
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
              <div className="text-center">
                <div className={`font-bold text-yellow-700 ${darkMode ? "text-yellow-200" : ""}`}>Brake System:</div>
                <div className="text-2xl font-bold text-red-600">2-6 inches</div>
                <div className="text-sm text-red-500">Partially flooded</div>
              </div>
              <div className="text-center">
                <div className={`font-bold text-yellow-700 ${darkMode ? "text-yellow-200" : ""}`}>Exhaust System:</div>
                <div className="text-2xl font-bold text-purple-600">4-6 inches</div>
                <div className="text-sm text-purple-500">Fully submerged</div>
              </div>
              <div className="text-center">
                <div className={`font-bold text-yellow-700 ${darkMode ? "text-yellow-200" : ""}`}>Suspension:</div>
                <div className="text-2xl font-bold text-orange-600">4-6 inches</div>
                <div className="text-sm text-orange-500">At water level</div>
              </div>
              <div className="text-center">
                <div className={`font-bold text-yellow-700 ${darkMode ? "text-yellow-200" : ""}`}>Electrical:</div>
                <div className="text-2xl font-bold text-yellow-600">0-4 inches</div>
                <div className="text-sm text-yellow-500">Corrosion risk</div>
              </div>
            </div>

            <div className="p-4 bg-yellow-100 dark:bg-yellow-800/30 rounded-lg border border-yellow-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⚠️</span>
                <span className={`font-bold text-yellow-800 ${darkMode ? "text-yellow-300" : ""}`}>
                  MINOR: Undercarriage Damage
                </span>
              </div>
              <p className={`text-sm text-yellow-700 ${darkMode ? "text-yellow-400" : ""}`}>
                At 0-6 inches water depth, undercarriage components become affected. Exhaust system may be submerged,
                lower electrical connections at risk. Vehicle typically remains drivable but requires inspection.
              </p>
            </div>
          </div>

          {/* Component Legend - Make it cleaner */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {Object.entries(componentData).map(([key, component]) => (
              <Button
                key={key}
                variant="outline"
                size="sm"
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 h-auto p-2 sm:p-3 bg-transparent hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-xs sm:text-sm min-h-[60px] sm:min-h-[auto]"
                onClick={() => setSelectedComponent(key)}
              >
                {component.icon}
                <span className="font-medium text-center sm:text-left leading-tight">
                  {window.innerWidth < 640 ? component.title.split(" ")[0] : component.title}
                </span>
              </Button>
            ))}
          </div>

          {/* Clean summary boxes */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">💧 FLOODED COMPONENTS</h4>
              <div className="space-y-1 text-sm">
                <div>• Brake System - Reduced stopping power</div>
                <div>• Exhaust System - Fully submerged</div>
                <div>• Suspension - Bearing contamination</div>
                <div>• Electrical Wiring - Corrosion risk</div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200">
              <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">⚠️ DAMAGE ASSESSMENT</h4>
              <div className="space-y-1 text-sm">
                <div>• Repair Cost: $1,400 - $4,100 (₱79,000 - ₱232,000)</div>
                <div>• Recovery Time: 3-7 days</div>
                <div>• Status: May be drivable</div>
                <div>• Action: Immediate inspection needed</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Damage Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className={`${darkMode ? "text-white" : "text-gray-900"}`}>Level 1 Damage Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Typical Repair Costs
                </h4>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  $1,400 - $4,100 (₱79,000 - ₱232,000) total estimated repair costs
                </p>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Recovery Time</h4>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  3-7 days for complete inspection and repairs
                </p>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Drivability</h4>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Vehicle may be drivable but requires immediate inspection
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className={`${darkMode ? "text-white" : "text-gray-900"}`}>Immediate Actions Required</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={`space-y-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <li>• Do not start the engine until professional inspection</li>
              <li>• Disconnect battery to prevent electrical damage</li>
              <li>• Drain and replace all fluids (brake, transmission, differential)</li>
              <li>• Inspect and clean electrical connections</li>
              <li>• Check brake system functionality before driving</li>
              <li>• Document damage for insurance claims</li>
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
