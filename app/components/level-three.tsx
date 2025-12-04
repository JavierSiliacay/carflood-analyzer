"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Sun, Moon, Skull, Zap, Home, Car } from "lucide-react"
import { ComponentModal } from "./component-modal"

interface LevelThreeProps {
  onBack: () => void
  darkMode: boolean
  toggleDarkMode: () => void
}

const componentData = {
  engine: {
    title: "Complete Engine Failure",
    icon: <Skull className="w-6 h-6" />,
    damage: "Total engine destruction, complete hydrostatic lock, catastrophic internal damage",
    details:
      "Complete engine submersion results in total mechanical failure. Water fills all cylinders, causing immediate hydrostatic lock and catastrophic damage to pistons, connecting rods, and crankshaft.",
    repairCost: "$8,000 - $15,000+ (₱453,000 - ₱850,000+)",
    safetyRisk: "Critical",
    citations: [
      "ASE Master Technician Guide: Total Engine Failure",
      "Insurance Institute for Highway Safety: Total Loss Guidelines",
      "SAE Technical Paper: Catastrophic Engine Damage Assessment",
    ],
  },
  electrical: {
    title: "Total Electrical System Loss",
    icon: <Zap className="w-6 h-6" />,
    damage: "Complete ECU failure, wiring harness destruction, all electronic systems inoperative",
    details:
      "Complete electrical system failure occurs with deep submersion. All control modules, sensors, and wiring harnesses suffer irreversible damage from water and corrosion.",
    repairCost: "$5,000 - $12,000+ (₱283,000 - ₱680,000+)",
    safetyRisk: "Critical",
    citations: [
      "IEEE Automotive Electronics Standards",
      "National Institute of Standards: Electronic System Failure Analysis",
    ],
  },
  interior: {
    title: "Interior Damage",
    icon: <Home className="w-6 h-6" />,
    damage: "Seat damage, carpet destruction, dashboard electronics failure, airbag system compromise",
    details:
      "Water entering the passenger compartment destroys upholstery, carpeting, and interior electronics. Airbag systems and safety equipment may be compromised, creating additional safety hazards.",
    repairCost: "$3,000 - $8,000+ (₱170,000 - ₱453,000+)",
    safetyRisk: "High",
    citations: [
      "NHTSA Safety Standards: Interior Component Requirements",
      "Automotive Interior Safety Council Guidelines",
    ],
  },
  structural: {
    title: "Structural Integrity",
    icon: <Car className="w-6 h-6" />,
    damage: "Frame corrosion, body panel damage, structural weakness, safety system compromise",
    details:
      "Prolonged water exposure causes accelerated corrosion of structural components, potentially compromising vehicle safety and structural integrity for years after the flood event.",
    repairCost: "$4,000 - $10,000+ (₱227,000 - ₱567,000+)",
    safetyRisk: "Critical",
    citations: [
      "Society of Automotive Engineers: Structural Integrity Standards",
      "National Highway Traffic Safety Administration: Vehicle Safety Guidelines",
    ],
  },
}

export function LevelThree({ onBack, darkMode, toggleDarkMode }: LevelThreeProps) {
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
        <Badge className="bg-red-500 text-white mb-4">Level 3: Severe Flooding</Badge>
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Dashboard Level Flooding
        </h1>
        <p className={`text-base sm:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto px-4`}>
          Water exceeds 36 inches, reaching dashboard level or higher, causing complete vehicle submersion and total
          system failure. Click on highlighted areas to explore catastrophic damage.
        </p>
      </div>

      {/* Interactive Car Diagram */}
      <Card className={`mb-8 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle className={`text-center ${darkMode ? "text-white" : "text-gray-900"}`}>
            Vehicle Cross-Section - Level 3 Severe Flooding (36+ inches)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mx-auto max-w-4xl">
            <svg viewBox="0 0 800 500" className="w-full h-auto">
              {/* Ground reference line */}
              <line x1="0" y1="400" x2="800" y2="400" className="stroke-gray-600 stroke-2" />
              <text x="10" y="395" className={`text-xs ${darkMode ? "fill-white" : "fill-gray-700"}`}>
                Ground Level
              </text>

              {/* Car body - heavily affected by submersion */}
              <path
                d="M150 320 L200 250 L280 250 L320 220 L480 220 L520 250 L600 250 L650 320 L650 360 L600 360 L600 380 L580 380 L580 360 L220 360 L220 380 L200 380 L200 360 L150 360 Z"
                className={`${darkMode ? "fill-gray-700" : "fill-gray-500"} stroke-red-500 stroke-3 opacity-80`}
              />

              {/* Level 3 water level (36+ inches) - complete submersion */}
              <rect x="0" y="280" width="800" height="120" className="fill-red-500 opacity-70" />
              <text x="10" y="275" className={`text-sm font-bold ${darkMode ? "fill-red-200" : "fill-red-900"}`}>
                Level 3 Water: 36+ inches (Dashboard Level Submersion)
              </text>

              {/* Previous level waters (layered effect) */}
              <rect x="0" y="340" width="800" height="60" className="fill-orange-400 opacity-30" />
              <rect x="0" y="360" width="800" height="40" className="fill-blue-300 opacity-20" />

              {/* Completely submerged wheels */}
              <circle
                cx="220"
                cy="360"
                r="30"
                className={`${darkMode ? "fill-gray-600" : "fill-gray-700"} stroke-gray-800 stroke-2 opacity-50`}
              />
              <circle
                cx="580"
                cy="360"
                r="30"
                className={`${darkMode ? "fill-gray-600" : "fill-gray-700"} stroke-gray-800 stroke-2 opacity-50`}
              />

              {/* Complete engine destruction */}
              <rect
                x="300"
                y="240"
                width="200"
                height="120"
                className="fill-red-600 hover:fill-red-700 cursor-pointer transition-colors stroke-red-800 stroke-4"
                onClick={() => setSelectedComponent("engine")}
              />

              {/* Total electrical system failure */}
              <rect
                x="200"
                y="220"
                width="400"
                height="25"
                className="fill-yellow-600 hover:fill-yellow-700 cursor-pointer transition-colors stroke-yellow-800 stroke-3"
                onClick={() => setSelectedComponent("electrical")}
              />

              {/* Interior flooding */}
              <rect
                x="280"
                y="260"
                width="240"
                height="80"
                className="fill-brown-500 hover:fill-brown-600 cursor-pointer transition-colors stroke-brown-700 stroke-2"
                onClick={() => setSelectedComponent("interior")}
              />

              {/* Structural compromise indicators */}
              <rect
                x="150"
                y="250"
                width="500"
                height="150"
                className="fill-gray-600 hover:fill-gray-700 cursor-pointer transition-colors stroke-gray-800 stroke-2 opacity-40"
                onClick={() => setSelectedComponent("structural")}
              />

              {/* Water level measurements - critical levels */}
              <line x1="750" y1="400" x2="750" y2="280" className="stroke-red-600 stroke-4" />
              <text x="755" y="340" className={`text-sm font-bold ${darkMode ? "fill-red-400" : "fill-red-700"}`}>
                48+ inches
              </text>

              <line x1="720" y1="400" x2="720" y2="300" className="stroke-red-500 stroke-3" />
              <text x="725" y="350" className={`text-xs ${darkMode ? "fill-red-300" : "fill-red-600"}`}>
                42 inches
              </text>

              <line x1="690" y1="400" x2="690" y2="320" className="stroke-red-400 stroke-2" />
              <text x="695" y="360" className={`text-xs ${darkMode ? "fill-red-200" : "fill-red-500"}`}>
                36 inches
              </text>

              {/* Critical component height references */}
              <line x1="100" y1="400" x2="100" y2="280" className="stroke-red-600 stroke-3" strokeDasharray="2,2" />
              <text x="105" y="340" className={`text-xs ${darkMode ? "fill-red-400" : "fill-red-700"}`}>
                Hood Submerged
              </text>

              <line x1="80" y1="400" x2="80" y2="260" className="stroke-yellow-600 stroke-2" strokeDasharray="3,3" />
              <text x="85" y="330" className={`text-xs ${darkMode ? "fill-yellow-400" : "fill-yellow-700"}`}>
                Dashboard Level
              </text>

              <line x1="60" y1="400" x2="60" y2="220" className="stroke-brown-600 stroke-2" strokeDasharray="4,4" />
              <text x="65" y="310" className={`text-xs ${darkMode ? "fill-brown-400" : "fill-brown-700"}`}>
                Roof Line
              </text>

              {/* Danger symbols positioned accurately */}
              <text x="400" y="280" textAnchor="middle" className="text-3xl fill-red-700">
                ⚠
              </text>
              <text x="300" y="300" textAnchor="middle" className="text-2xl fill-red-600">
                ☠
              </text>
              <text x="500" y="300" textAnchor="middle" className="text-2xl fill-red-600">
                ☠
              </text>

              {/* Component labels with total damage indicators */}
              <text
                x="400"
                y="320"
                textAnchor="middle"
                className={`text-lg font-bold ${darkMode ? "fill-red-300" : "fill-red-800"}`}
              >
                TOTAL ENGINE DESTRUCTION
              </text>
              <text
                x="400"
                y="240"
                textAnchor="middle"
                className={`text-sm ${darkMode ? "fill-yellow-300" : "fill-yellow-800"}`}
              >
                Complete Electrical System Loss
              </text>
              <text
                x="400"
                y="350"
                textAnchor="middle"
                className={`text-sm ${darkMode ? "fill-brown-300" : "fill-brown-800"}`}
              >
                Interior Completely Flooded
              </text>
              <text
                x="400"
                y="430"
                textAnchor="middle"
                className={`text-sm ${darkMode ? "fill-gray-300" : "fill-gray-700"}`}
              >
                Structural Integrity Compromised
              </text>

              {/* Water flow indicators */}
              <path
                d="M 50 350 L 50 300"
                className="stroke-red-600 stroke-3 fill-red-600"
                markerEnd="url(#arrowhead)"
              />
              <path
                d="M 70 340 L 70 290"
                className="stroke-red-600 stroke-3 fill-red-600"
                markerEnd="url(#arrowhead)"
              />
              <text x="75" y="315" className={`text-xs ${darkMode ? "fill-red-400" : "fill-red-700"}`}>
                Catastrophic Flooding
              </text>
            </svg>
          </div>

          {/* Total loss measurement reference */}
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-300">
            <h4 className={`font-semibold mb-2 ${darkMode ? "text-red-300" : "text-red-800"}`}>
              Dashboard Level Submersion Impact Points
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className={`font-medium ${darkMode ? "text-red-200" : "text-red-700"}`}>Dashboard:</span>
                <div className="text-red-700 font-bold">36-42 inches</div>
              </div>
              <div>
                <span className={`font-medium ${darkMode ? "text-red-200" : "text-red-700"}`}>Steering Wheel:</span>
                <div className="text-red-700 font-bold">38-44 inches</div>
              </div>
              <div>
                <span className={`font-medium ${darkMode ? "text-red-200" : "text-red-700"}`}>Window Level:</span>
                <div className="text-red-700 font-bold">42-48 inches</div>
              </div>
              <div>
                <span className={`font-medium ${darkMode ? "text-red-200" : "text-red-700"}`}>Roof Line:</span>
                <div className="text-red-700 font-bold">48+ inches</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-red-100 dark:bg-red-800/30 rounded border border-red-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🚨</span>
                <span className={`font-bold ${darkMode ? "text-red-300" : "text-red-800"}`}>
                  CRITICAL: Total Vehicle Loss
                </span>
              </div>
              <p className="text-xs text-red-700 dark:text-red-400">
                At 36 inches+ water depth, the entire vehicle becomes submerged. All systems fail catastrophically.
                Vehicle is unsafe and unrepairable. Immediate disposal required.
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {Object.entries(componentData).map(([key, component]) => (
              <Button
                key={key}
                variant="destructive"
                className="flex items-center gap-1 sm:gap-2 h-auto p-2 sm:p-3 text-xs sm:text-sm"
                onClick={() => setSelectedComponent(key)}
              >
                {component.icon}
                <span className="hidden sm:inline">{component.title}</span>
                <span className="sm:hidden">{component.title.split(" ")[0]}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Damage Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className={`border-red-500 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className={`text-red-600 ${darkMode ? "text-red-400" : ""}`}>
              Level 3 Total Loss Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Estimated Repair Costs
                </h4>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  $20,000 - $45,000+ (₱1,133,000 - ₱2,550,000+) (Often exceeds vehicle value)
                </p>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Insurance Recommendation
                </h4>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Total loss - vehicle should be declared unrepairable
                </p>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Safety Status</h4>
                <p className={`text-sm text-red-600 font-semibold ${darkMode ? "text-red-400" : ""}`}>
                  UNSAFE - Do not attempt any operation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-red-500 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className={`text-red-600 ${darkMode ? "text-red-400" : ""}`}>Emergency Procedures</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={`space-y-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <li className="text-red-600 font-semibold">• NEVER attempt to start or operate vehicle</li>
              <li>• Immediately contact insurance company</li>
              <li>• Arrange for professional towing to salvage yard</li>
              <li>• Remove personal belongings if safe to do so</li>
              <li>• Document all damage with photographs</li>
              <li>• Consider environmental hazard disposal</li>
              <li>• Notify DMV of total loss status</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Warning Banner */}
      <Card className="mt-6 border-red-500 bg-red-50 dark:bg-red-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Skull className="w-8 h-8 text-red-600" />
            <h3 className="text-xl font-bold text-red-600">CRITICAL WARNING</h3>
          </div>
          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Vehicles with Level 3 flood damage pose serious safety risks even after apparent "repair." Hidden corrosion,
            compromised safety systems, and electrical failures can manifest months or years later. These vehicles
            should never be returned to service and must be properly disposed of through authorized salvage facilities.
          </p>
        </CardContent>
      </Card>

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
