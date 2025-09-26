import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Shield, Car, Phone, Search, MessageCircle, Clock, AlertTriangle, ChevronRight, Zap, Bot } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Progress } from './components/ui/progress';
import { Avatar, AvatarFallback } from './components/ui/avatar';

const emergencyTypes = [
  {
    id: 'heart-attack',
    title: 'Heart Attack',
    icon: Heart,
    color: 'from-red-500 to-red-600',
    hoverColor: 'from-red-600 to-red-700',
    severity: 'Critical',
    timeToAct: '5 minutes',
    steps: [
      'Call emergency services immediately (911)',
      'Keep the person calm and seated',
      'Loosen tight clothing around chest and neck',
      'Give aspirin if available and person is not allergic',
      'Be prepared to perform CPR if person becomes unconscious'
    ]
  },
  {
    id: 'snake-bite',
    title: 'Snake Bite',
    icon: Shield,
    color: 'from-green-500 to-green-600',
    hoverColor: 'from-green-600 to-green-700',
    severity: 'High',
    timeToAct: '10 minutes',
    steps: [
      'Keep the victim calm and still',
      'Remove jewelry before swelling begins',
      'Mark the edge of swelling with a pen',
      'Do NOT cut the wound or try to suck out venom',
      'Get to a hospital immediately for antivenom'
    ]
  },
  {
    id: 'road-accident',
    title: 'Road Accident',
    icon: Car,
    color: 'from-orange-500 to-orange-600',
    hoverColor: 'from-orange-600 to-orange-700',
    severity: 'Variable',
    timeToAct: '3 minutes',
    steps: [
      'Ensure scene safety before approaching',
      'Check for responsiveness and breathing',
      'Control severe bleeding with direct pressure',
      'Do NOT move victims unless in immediate danger',
      'Wait for professional medical help'
    ]
  },
  {
    id: 'emergency-call',
    title: 'Emergency Call',
    icon: Phone,
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'from-blue-600 to-blue-700',
    severity: 'Immediate',
    timeToAct: '1 minute',
    steps: [
      'Dial emergency number (911 in US)',
      'Stay calm and speak clearly',
      'Provide your exact location',
      'Describe the emergency and number of victims',
      'Follow dispatcher instructions and stay on line'
    ]
  }
];



const chatMessages = [
  { id: 1, type: 'bot', message: 'Hello! I\'m your AI First Aid Assistant. How can I help you today?' },
  { id: 2, type: 'user', message: 'Someone is having chest pain, what should I do?' },
  { id: 3, type: 'bot', message: 'This could be serious. Here\'s what to do immediately:\n\n1. Call 911 right away\n2. Have them sit down and rest\n3. If they have nitroglycerin, help them take it\n4. Stay with them until help arrives\n\nIs the person conscious and breathing normally?' }
];

export default function App() {
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const filteredEmergencies = emergencyTypes.filter(emergency =>
    emergency.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEmergencyClick = (emergency) => {
    setSelectedEmergency(emergency);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < selectedEmergency.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Variable': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Immediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
            >
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">AI-Powered Emergency Response</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Smart First Aid
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Instant emergency guidance powered by AI. Get step-by-step instructions for critical situations.
            </p>



            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative max-w-md mx-auto mb-12"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search emergency types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Emergency Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredEmergencies.map((emergency, index) => {
            const IconComponent = emergency.icon;
            return (
              <motion.div
                key={emergency.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card 
                      className="cursor-pointer h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 group"
                      onClick={() => handleEmergencyClick(emergency)}
                    >
                      <CardHeader className="text-center">
                        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${emergency.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-white">{emergency.title}</CardTitle>
                        <div className="flex flex-col gap-2">
                          <Badge className={`${getSeverityColor(emergency.severity)} text-xs`}>
                            {emergency.severity}
                          </Badge>
                          <div className="flex items-center justify-center gap-1 text-blue-200 text-sm">
                            <Clock className="w-4 h-4" />
                            {emergency.timeToAct}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-blue-200">
                          <span className="text-sm">View Instructions</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-2xl bg-white text-gray-900">
                    <DialogHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${emergency.color} flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <DialogTitle className="text-2xl">{emergency.title}</DialogTitle>
                          <DialogDescription className="flex items-center gap-4 mt-1">
                            <Badge className={getSeverityColor(emergency.severity)}>
                              {emergency.severity}
                            </Badge>
                            <span className="flex items-center gap-1 text-sm">
                              <Clock className="w-4 h-4" />
                              Act within {emergency.timeToAct}
                            </span>
                          </DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-red-800">Emergency Alert</h4>
                          <p className="text-red-700 text-sm">If this is a life-threatening emergency, call 911 immediately!</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold">Step-by-Step Guide</h3>
                          <div className="text-sm text-gray-500">
                            Step {currentStep + 1} of {emergency.steps.length}
                          </div>
                        </div>
                        
                        <Progress value={((currentStep + 1) / emergency.steps.length) * 100} className="mb-6" />
                        
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-blue-50 border border-blue-200 rounded-lg p-6"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {currentStep + 1}
                            </div>
                            <div>
                              <p className="text-blue-900 font-medium text-lg">
                                {emergency.steps[currentStep]}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                        
                        <div className="flex gap-3 mt-6">
                          <Button 
                            variant="outline" 
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className="flex-1"
                          >
                            Previous
                          </Button>
                          <Button 
                            onClick={nextStep}
                            disabled={currentStep === emergency.steps.length - 1}
                            className="flex-1"
                          >
                            {currentStep === emergency.steps.length - 1 ? 'Complete' : 'Next Step'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* AI Chatbot */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl"
            >
              <Bot className="w-8 h-8" />
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-md bg-white text-gray-900 h-[500px] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-600" />
                AI First Aid Assistant
              </DialogTitle>
              <DialogDescription>
                Get instant emergency guidance from our AI assistant
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.type === 'bot' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-purple-600 text-white text-xs">AI</AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line">{msg.message}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Describe your emergency..." 
                  className="flex-1"
                />
                <Button size="sm">Send</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-blue-200">
            <p className="mb-4">
              © 2024 Smart First Aid - Powered by React & Tailwind CSS
            </p>
            <p className="text-sm text-blue-300">
              For life-threatening emergencies, always call 911 immediately
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}