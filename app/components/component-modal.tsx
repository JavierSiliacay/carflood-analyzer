"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, DollarSign, AlertTriangle, BookOpen } from "lucide-react"

interface ComponentModalProps {
  component: {
    title: string
    icon: React.ReactNode
    damage: string
    details: string
    repairCost: string
    safetyRisk: string
    citations: string[]
  }
  isOpen: boolean
  onClose: () => void
  darkMode: boolean
}

export function ComponentModal({ component, isOpen, onClose, darkMode }: ComponentModalProps) {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto mx-2 sm:mx-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
      >
        <DialogHeader>
          <DialogTitle
            className={`flex items-center gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            {component.icon}
            <span className="truncate">{component.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Damage Overview */}
          <Card className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}`}>
            <CardContent className="p-3 sm:p-4">
              <h3 className={`font-semibold mb-2 text-sm sm:text-base ${darkMode ? "text-white" : "text-gray-900"}`}>
                Primary Damage
              </h3>
              <p className={`text-xs sm:text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{component.damage}</p>
            </CardContent>
          </Card>

          {/* Detailed Explanation */}
          <div>
            <h3 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>Detailed Analysis</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {component.details}
            </p>
          </div>

          {/* Cost and Risk Assessment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Card className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-blue-50"}`}>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                  <h4 className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Repair Cost
                  </h4>
                </div>
                <p className={`text-sm sm:text-lg font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                  {component.repairCost}
                </p>
              </CardContent>
            </Card>

            <Card className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-orange-50"}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className={`w-5 h-5 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                  <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Safety Risk</h4>
                </div>
                <Badge className={getRiskColor(component.safetyRisk)}>{component.safetyRisk}</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Citations */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
              <h3 className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-gray-900"}`}>
                Technical References
              </h3>
            </div>
            <div className="space-y-2">
              {component.citations.map((citation, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 p-2 sm:p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                >
                  <ExternalLink
                    className={`w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                  <p className={`text-xs sm:text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{citation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Safety Information */}
          <Card
            className={`border-l-4 border-l-orange-500 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-orange-50"}`}
          >
            <CardContent className="p-4">
              <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Safety Recommendations
              </h4>
              <ul className={`text-sm space-y-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {component.safetyRisk === "Critical" && (
                  <>
                    <li>• Do not attempt any repairs without professional assessment</li>
                    <li>• Component may require complete replacement</li>
                    <li>• Consider total vehicle loss evaluation</li>
                  </>
                )}
                {component.safetyRisk === "High" && (
                  <>
                    <li>• Professional inspection required before operation</li>
                    <li>• May require specialized repair procedures</li>
                    <li>• Monitor for delayed failure symptoms</li>
                  </>
                )}
                {component.safetyRisk === "Medium" && (
                  <>
                    <li>• Inspect thoroughly before returning to service</li>
                    <li>• Replace fluids and filters as needed</li>
                    <li>• Monitor performance closely after repair</li>
                  </>
                )}
                {component.safetyRisk === "Low" && (
                  <>
                    <li>• Clean and inspect all components</li>
                    <li>• Replace consumable items as precaution</li>
                    <li>• Regular maintenance intervals may need adjustment</li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
