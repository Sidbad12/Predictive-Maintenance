import React, { useState, useEffect, useMemo } from 'react';  // Added useMemo to the import
import { Play, Pause, RotateCcw, TrendingUp, AlertTriangle, Phone, Calendar, CheckCircle, Activity, Users, Wrench, Factory } from 'lucide-react';
<script src="https://cdn.tailwindcss.com"></script>
import './index.css'

const CompleteSystemDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('monitoring');
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [alert, setAlert] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [callLog, setCallLog] = useState([]);
  const [booking, setBooking] = useState(null);
  const [metrics, setMetrics] = useState({
    totalVehicles: 50000,
    monitored: 50000,
    anomaliesDetected: 234,
    predictionsToday: 87,
    servicesScheduled: 64,
    accuracy: 92
  });

  // Initialize sample vehicles
  useEffect(() => {
    const sampleVehicles = [
      { id: 'MH12AB1234', model: 'Hero Splendor Plus', health: 85, clutch: 45, brakes: 92, battery: 88, km: 18500, status: 'warning' },
      { id: 'MH12CD5678', model: 'Mahindra Bolero', health: 72, clutch: 88, brakes: 35, battery: 65, km: 42000, status: 'critical' },
      { id: 'MH12EF9012', model: 'Hero Glamour', health: 94, clutch: 95, brakes: 89, battery: 92, km: 8500, status: 'healthy' },
      { id: 'MH12GH3456', model: 'Mahindra Scorpio', health: 81, clutch: 78, brakes: 85, battery: 75, km: 35000, status: 'healthy' },
      { id: 'MH12IJ7890', model: 'Hero Xtreme', health: 68, clutch: 42, brakes: 68, battery: 82, km: 22000, status: 'warning' }
    ];
    setVehicles(sampleVehicles);
    setSelectedVehicle(sampleVehicles[0]);
  }, []);

  // Memoize phase config to avoid recalculations
  const phaseConfig = useMemo(() => ({
    monitoring: { icon: Activity, color: 'bg-black', label: 'Monitoring' },
    detection: { icon: AlertTriangle, color: 'bg-black', label: 'Detection' },
    prediction: { icon: TrendingUp, color: 'bg-black', label: 'Prediction' },
    communication: { icon: Phone, color: 'bg-black', label: 'Communication' },
    scheduling: { icon: Calendar, color: 'bg-black', label: 'Scheduling' },
    confirmation: { icon: CheckCircle, color: 'bg-black', label: 'Confirmation' },
    learning: { icon: Activity, color: 'bg-black', label: 'Learning' },
    complete: { icon: CheckCircle, color: 'bg-black', label: 'Complete' }
  }), []);

  // Auto-advance demo phases with better cleanup
  useEffect(() => {
    if (!isRunning) return;

    const phaseTimings = {
      'monitoring': 3000,
      'detection': 3000,
      'prediction': 3000,
      'communication': 4000,
      'scheduling': 3000,
      'confirmation': 3000,
      'learning': 2000
    };

    const phases = Object.keys(phaseTimings);
    const currentIndex = phases.indexOf(currentPhase);
    
    const timer = setTimeout(() => {
      if (currentIndex < phases.length - 1) {
        const nextPhase = phases[currentIndex + 1];
        setCurrentPhase(nextPhase);
        executePhase(nextPhase);
      } else {
        setIsRunning(false);
        setCurrentPhase('complete');
      }
    }, phaseTimings[currentPhase]);

    return () => clearTimeout(timer); // Cleanup on unmount or phase change
  }, [isRunning, currentPhase]);

  const executePhase = (phase) => {
    switch(phase) {
      case 'detection':
        setAlert({
          type: 'Clutch Wear Detected',
          severity: 'Medium',
          component: 'Clutch',
          currentHealth: 45,
          vehicle: selectedVehicle.id
        });
        setMetrics(prev => ({ ...prev, anomaliesDetected: prev.anomaliesDetected + 1 }));
        break;
      
      case 'prediction':
        setPrediction({
          component: 'Clutch',
          currentHealth: 45,
          predictedFailureKm: 500,
          confidence: 87,
          recommendation: 'Schedule maintenance within 500 km',
          estimatedCost: 2800
        });
        setMetrics(prev => ({ ...prev, predictionsToday: prev.predictionsToday + 1 }));
        break;
      
      case 'communication':
        setCallLog([
          { time: '18:32:05', message: 'Initiating call to customer +91 9876543210', type: 'system' },
          { time: '18:32:08', message: 'Call connected', type: 'success' },
          { time: '18:32:10', message: 'AI: "Hello Mr. Sharma, this is your Hero Splendor\'s smart assistant..."', type: 'ai' },
          { time: '18:32:35', message: 'Customer: "Yes, I can come this Saturday"', type: 'customer' },
          { time: '18:32:40', message: 'AI: "Perfect! Let me find the best time for you..."', type: 'ai' }
        ]);
        break;
      
      case 'scheduling':
        setTimeout(() => {
          setCallLog(prev => [...prev, 
            { time: '18:32:45', message: 'Checking 3 nearby service centers...', type: 'system' },
            { time: '18:32:47', message: 'Hero Authorized - Pune Kothrud: 9 AM available ✓', type: 'success' }
          ]);
        }, 1000);
        break;
      
      case 'confirmation':
        setBooking({
          id: 'BK2025001',
          customer: 'Rajesh Sharma',
          vehicle: selectedVehicle.id,
          model: selectedVehicle.model,
          date: 'Saturday, Dec 21, 2025',
          time: '09:00 AM',
          center: 'Hero Authorized - Pune Kothrud',
          estimatedDuration: '45 minutes',
          estimatedCost: '₹2,800',
          parts: ['Clutch Plates', 'Clutch Springs'],
          status: 'Confirmed'
        });
        setMetrics(prev => ({ ...prev, servicesScheduled: prev.servicesScheduled + 1 }));
        break;
      
      case 'learning':
        setMetrics(prev => ({ ...prev, accuracy: 92.3 }));
        break;
    }
  };

  const startDemo = () => {
    setIsRunning(true);
    setCurrentPhase('monitoring');
    setAlert(null);
    setPrediction(null);
    setCallLog([]);
    setBooking(null);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentPhase('monitoring');
    setAlert(null);
    setPrediction(null);
    setCallLog([]);
    setBooking(null);
    setMetrics({
      totalVehicles: 50000,
      monitored: 50000,
      anomaliesDetected: 234,
      predictionsToday: 87,
      servicesScheduled: 64,
      accuracy: 92
    });
  };

  return (
    <div className="relative min-h-screen p-6 font-sans" role="main" aria-label="Autonomous Predictive Maintenance System Demo">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      </div>
  
      {/* Your Existing Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
      <div className="text-center mb-12 py-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-slate-900 mb-4 drop-shadow-sm">
          <span className="text-sky-900">Autonomous</span> Predictive 
          <span className="block">Maintenance System</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-700">
          Live End-to-End Demonstration - Hero MotoCorp & Mahindra & Mahindra
        </p>
      </div>

        {/* Control Panel */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">System Control</h2>
              <p className="text-sm text-slate-500">Current Phase: <span className="font-medium text-slate-700">{phaseConfig[currentPhase]?.label}</span></p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={startDemo}
                disabled={isRunning}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all border ${
                  isRunning ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' : 'bg-white text-slate-900 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Play size={16} />
                Start Demo
              </button>
              <button
                onClick={resetDemo}
                className="flex items-center gap-2 px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-md font-medium text-sm transition-all hover:bg-slate-50"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              {Object.entries(phaseConfig).filter(([key]) => key !== 'complete').map(([key, config], idx) => {
                const Icon = config.icon;
                const isActive = key === currentPhase;
                const isCompleted = Object.keys(phaseConfig).indexOf(currentPhase) > idx;
                
                return (
                  <div key={key} className="flex flex-col items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive ? config.color + ' scale-110' :
                      isCompleted ? 'bg-slate-300' : 'bg-slate-200'
                    }`}>
                      <Icon className="text-white" size={16} />
                    </div>
                    <span className={`mt-2 text-xs font-medium ${
                      isActive ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      {config.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* System Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white border border-slate-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} />
              <span className="text-xs text-slate-500">Total Fleet</span>
            </div>
            <p className="text-lg font-semibold text-slate-900">{metrics.totalVehicles.toLocaleString()}</p>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={16} />
              <span className="text-xs text-slate-500">Monitored</span>
            </div>
            <p className="text-lg font-semibold text-slate-900">{metrics.monitored.toLocaleString()}</p>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} />
              <span className="text-xs text-slate-500">Anomalies</span>
            </div>
            <p className="text-lg font-semibold text-slate-900">{metrics.anomaliesDetected}</p>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} />
              <span className="text-xs text-slate-500">Predictions</span>
            </div>
            <p className="text-lg font-semibold text-slate-900">{metrics.predictionsToday}</p>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} />
              <span className="text-xs text-slate-500">Scheduled</span>
            </div>
            <p className="text-lg font-semibold text-slate-900">{metrics.servicesScheduled}</p>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} />
              <span className="text-xs text-slate-500">Accuracy</span>
            </div>
            <p className="text-lg font-semibold text-slate-900">{metrics.accuracy}%</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vehicle Fleet Status */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="text-slate-500" size={16} />
              Live Fleet Monitoring
            </h3>
            <div className="space-y-3">
              {vehicles.map(vehicle => (
                <div 
                  key={vehicle.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedVehicle?.id === vehicle.id 
                      ? 'border-slate-400 bg-slate-50' 
                      : vehicle.status === 'critical' 
                        ? 'border-red-300 bg-red-50'  // Changed to red for critical (better distinction)
                        : vehicle.status === 'warning'
                          ? 'border-amber-300 bg-amber-50'
                          : 'border-slate-200 bg-white'
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{vehicle.id}</p>
                      <p className="text-xs text-slate-500">{vehicle.model}</p>
                      <p className="text-xs text-slate-400 mt-1">{vehicle.km.toLocaleString()} km</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold" style={{ 
                        color: vehicle.health > 80 ? '#10b981' : vehicle.health > 60 ? '#f59e0b' : '#ef4444' 
                      }}>
                        {vehicle.health}
                      </p>
                      <p className="text-xs text-slate-500">Health Score</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Clutch</p>
                      <p className="font-medium text-sm" style={{ 
                        color: vehicle.clutch > 70 ? '#10b981' : vehicle.clutch > 50 ? '#f59e0b' : '#ef4444' 
                      }}>
                        {vehicle.clutch}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Brakes</p>
                      <p className="font-medium text-sm" style={{ 
                        color: vehicle.brakes > 70 ? '#10b981' : vehicle.brakes > 50 ? '#f59e0b' : '#ef4444' 
                      }}>
                        {vehicle.brakes}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Battery</p>
                      <p className="font-medium text-sm" style={{ 
                        color: vehicle.battery > 70 ? '#10b981' : vehicle.battery > 50 ? '#f59e0b' : '#ef4444' 
                      }}>
                        {vehicle.battery}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Status</p>
                      <p className={`text-xs font-medium uppercase ${
                        vehicle.status === 'healthy' ? 'text-emerald-600' :
                        vehicle.status === 'warning' ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {vehicle.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detection & Prediction */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="text-slate-500" size={16} />
              AI Analysis & Prediction
            </h3>
            
            {alert && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-amber-600" size={16} />
                  <span className="font-medium text-amber-900 text-sm">Anomaly Detected</span>
                </div>
                <div className="space-y-2 text-xs">
                  <p><strong>Component:</strong> {alert.component}</p>
                  <p><strong>Vehicle:</strong> {alert.vehicle}</p>
                  <p><strong>Current Health:</strong> <span className="text-amber-600 font-medium">{alert.currentHealth}%</span></p>
                  <p><strong>Severity:</strong> {alert.severity}</p>
                </div>
              </div>
            )}

            {prediction && (
              <div className="bg-white border border-slate-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="text-slate-500" size={16} />
                  <span className="font-medium text-slate-900 text-sm">Prediction Generated</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500">Component at Risk</p>
                    <p className="text-sm font-medium text-slate-900">{prediction.component}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500">Current Health</p>
                      <p className="text-lg font-semibold text-amber-600">{prediction.currentHealth}%</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500">Predicted Failure</p>
                      <p className="text-lg font-semibold text-red-600">{prediction.predictedFailureKm} km</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500">AI Confidence</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-1000"
                          style={{ width: `${prediction.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-emerald-600">{prediction.confidence}%</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-slate-900 font-medium text-xs">📋 Recommendation:</p>
                    <p className="text-slate-800 text-xs mt-1">{prediction.recommendation}</p>
                    <p className="text-slate-700 text-xs mt-2"><strong>Estimated Cost:</strong> ₹{prediction.estimatedCost}</p>
                  </div>
                </div>
              </div>
            )}

            {!alert && !prediction && (
              <div className="flex items-center justify-center h-64 text-slate-400">
                <div className="text-center">
                  <Activity size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="text-sm">Monitoring vehicles... Analysis will appear here</p>
                </div>
              </div>
            )}
          </div>

          {/* Voice Agent Communication */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Phone className="text-slate-500" size={16} />
              AI Voice Agent
            </h3>
            
            {callLog.length > 0 ? (
              <div className="space-y-3">
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-emerald-800 text-sm">Call Active</span>
                  </div>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {callLog.map((log, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-lg ${
                        log.type === 'system' ? 'bg-slate-100' :
                        log.type === 'success' ? 'bg-emerald-100' :
                        log.type === 'ai' ? 'bg-slate-50' :
                        'bg-slate-50'
                      }`}
                    >
                      <p className="text-xs text-slate-500 mb-1">{log.time}</p>
                      <p className="text-xs font-medium">{log.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-slate-400">
                <div className="text-center">
                  <Phone size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="text-sm">Voice agent will activate when prediction is made</p>
                </div>
              </div>
            )}
          </div>

          {/* Booking Confirmation */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-slate-500" size={16} />
              Service Booking
            </h3>
            
            {booking ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="text-emerald-600" size={16} />
                    <span className="font-medium text-emerald-900 text-sm">Booking Confirmed!</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <p className="text-xs text-slate-500">Booking ID</p>
                      <p className="font-medium text-slate-900 text-sm">{booking.id}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <p className="text-xs text-slate-500">Customer</p>
                      <p className="font-medium text-slate-900 text-sm">{booking.customer}</p>
                      <p className="text-xs text-slate-500 mt-1">{booking.vehicle} - {booking.model}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <p className="text-xs text-slate-500">Date</p>
                        <p className="font-medium text-slate-900 text-sm">{booking.date}</p>
                        <p className="font-medium text-slate-700 text-sm">{booking.time}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <p className="text-xs text-slate-500">Duration</p>
                        <p className="font-medium text-slate-900 text-sm">{booking.estimatedDuration}</p>
                        <p className="text-xs text-slate-500 mt-1">Est. Cost: {booking.estimatedCost}</p>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <p className="text-xs text-slate-500">Service Center</p>
                      <p className="font-medium text-slate-900 text-sm">{booking.center}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <p className="text-xs text-slate-500 mb-2">Parts to Replace</p>
                      <div className="flex gap-2 flex-wrap">
                        {booking.parts.map((part, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-800 rounded text-xs font-medium">
                            {part}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                  <p className="text-emerald-900 font-medium text-sm flex items-center gap-2">
                    <CheckCircle size={16} />
                    Notifications Sent
                  </p>
                  <ul className="text-emerald-800 text-xs mt-2 space-y-1">
                    <li>✓ SMS confirmation to customer</li>
                    <li>✓ WhatsApp reminder scheduled</li>
                    <li>✓ Service center notified with pre-diagnosis</li>
                    <li>✓ Parts inventory updated</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-slate-400">
                <div className="text-center">
                  <Calendar size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="text-sm">Booking details will appear after customer confirms</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* System Impact */}
        {currentPhase === 'complete' && (
          <div className="mt-6 bg-white border border-slate-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <CheckCircle size={24} />
              Demo Complete - System Impact
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-semibold text-slate-900 mb-2">60%</p>
                <p className="text-sm text-slate-500">Fewer Unexpected Breakdowns</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-slate-900 mb-2">92%</p>
                <p className="text-sm text-slate-500">Prediction Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-slate-900 mb-2">40%</p>
                <p className="text-sm text-slate-500">Faster Service Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-slate-900 mb-2">400%</p>
                <p className="text-sm text-slate-500">3-Year ROI</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteSystemDemo;