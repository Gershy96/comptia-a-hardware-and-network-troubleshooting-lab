/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Wrench, 
  ShieldAlert, 
  CheckCircle, 
  Terminal as TerminalIcon, 
  ArrowRight, 
  History, 
  Gauge, 
  LifeBuoy, 
  BookOpen, 
  Smartphone, 
  Network, 
  Printer, 
  RotateCcw, 
  Play, 
  Sliders, 
  Cpu, 
  FileText, 
  HelpCircle, 
  Activity, 
  Info, 
  ChevronRight, 
  AlertCircle, 
  VolumeX, 
  Database,
  ThumbsUp,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Difficulty, 
  SubsystemType, 
  Scenario, 
  TroubleshootingStepNumber, 
  TroubleshootingLog, 
  SimulationState, 
  Action 
} from './types';
import { GLOBAL_ACTIONS, SCENARIOS, getRandomScenario } from './scenarios';
import ReportCard from './components/ReportCard';

// Initial global state template
const INITIAL_STATS = {
  score: 100,
  timeSpentMinutes: 0,
  currentStep: 1 as TroubleshootingStepNumber,
  selectedTheory: null as string | null,
  theoryTestedAndConfirmed: false,
  solutionImplemented: false,
  verificationDone: false,
  preventiveDone: false,
  documentationCompleted: false,
  actionLogs: [] as TroubleshootingLog[],
};

export default function App() {
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'reported'>('welcome');
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [isHintEnabled, setIsHintEnabled] = useState<boolean>(true);
  const [selectedSubsystem, setSelectedSubsystem] = useState<SubsystemType | 'All'>('All');
  
  // Game session states
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [currentStep, setCurrentStep] = useState<TroubleshootingStepNumber>(1);
  const [selectedTheory, setSelectedTheory] = useState<string | null>(null);
  const [theoryConfirmed, setTheoryConfirmed] = useState<boolean>(false);
  const [solutionFixed, setSolutionFixed] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isPrevented, setIsPrevented] = useState<boolean>(false);
  const [actionLogs, setActionLogs] = useState<TroubleshootingLog[]>([]);
  
  // Scored variables
  const [caseScore, setCaseScore] = useState<number>(100);
  const [timeElapsed, setTimeElapsed] = useState<number>(0); // active seconds count
  const [activeTab, setActiveTab] = useState<'visual' | 'hardware' | 'software_bios' | 'testing'>('visual');
  const [casesHistory, setCasesHistory] = useState<SimulationState['casesHistory']>(() => {
    try {
      const saved = localStorage.getItem('comptia_cases_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
      }
    } catch (e) {
      console.error("Failed to load cases history", e);
    }
    return [];
  });

  // Keep localStorage in sync with casesHistory
  useEffect(() => {
    try {
      localStorage.setItem('comptia_cases_history', JSON.stringify(casesHistory));
    } catch (e) {
      console.error("Failed to save cases history", e);
    }
  }, [casesHistory]);

  // Telemetry indicators
  const [tempIndicator, setTempIndicator] = useState<string>('38°C (Normal)');
  const [ramIndicator, setRamIndicator] = useState<string>('16GB DDR4 (Dual)');
  const [psuIndicator, setPsuIndicator] = useState<string>('+12.04 V');
  const [netIndicator, setNetIndicator] = useState<string>('Connected (1Gbps)');
  const [printerIndicator, setPrinterIndicator] = useState<string>('Online');

  // Step 6 Documentation Choices
  const [docSymptom, setDocSymptom] = useState<string>('');
  const [docCause, setDocCause] = useState<string>('');
  const [docSolution, setDocSolution] = useState<string>('');
  const [docPreventive, setDocPreventive] = useState<string>('');
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState<boolean>(false);

  const SCENARIO_PREVENTIVE_ACTIONS: Record<string, string> = {
    'scen_016_cmos_battery': 'Maintain a local stock of spare CR2032 lithium coin cell batteries and establish a 5-year proactive replacement schedule for office workstations',
    'scen_001_motherboard_caps': 'Deploy high-quality UPS surge protection systems to guard motherboard capacitors from power spikes',
    'scen_002_ram_intermittent': 'Establish routine MemTest86 diagnostic audits and configure ECC alerts where applicable',
    'scen_003_cpu_thermal': 'Schedule quarterly dust cleanup venting and refresh CPU thermal paste every two years',
    'scen_004_psu_voltage': 'Implement active power load balances and register surge-suppression line filters',
    'scen_005_storage_unrecognized': 'Configure standard BIOS Boot Order hierarchies and secure chassis storage locking rails',
    'scen_006_storage_clicking': 'Set up local automated disk backup schedules and configure SMART pre-failure alerts',
    'scen_007_printer_faded': 'Store replacement cartridges/toners in a cool, low-humidity storage locker and run self-clean diagnostics monthly',
    'scen_008_mobile_draining': 'Enforce battery health threshold monitors and limit overnight high-voltage continuous charging',
    'scen_009_network_apipa': 'Deploy redundant DHCP service failover pools to prevent IP address lease exhaustion',
    'scen_010_network_conflict': 'Maintain active IP/MAC address pools and deploy dynamic IP assignment structures',
    'scen_011_display_flicker': 'Upgrade physical interface cabling with certified high-bandwidth shielded digital cables',
    'scen_012_printer_thermal_blank': 'Store heat-sensitive paper media away from high temperatures and verify loading alignment directions',
    'scen_013_beep_codes_ram': 'Check memory mounting tabs and clean slot terminals using compressed air & isopropyl alcohol',
    'scen_014_network_dns_fail': 'Configure redundant secondary fallback DNS servers (such as 8.8.8.8 or 1.1.1.1) in local address profiles',
    'scen_015_raid_degraded': 'Configure real-time server email alerts for physical disk shelf hardware errors',
    'scen_017_projector_aspect': 'Configure OS standard screen projection rules to project at native aspect ratios',
    'scen_018_wifi_interference': 'Deploy dual-band router access points to steer users off congested 2.4GHz consumer spectrums',
    'scen_019_printer_ghosting': 'Ensure scheduled preventative printer maintenance kits (fuser, transfer roller) are installed on time',
    'scen_020_tablet_unresponsive': 'Perform routine digitizer recalibrations and check screen protector alignments quarterly',
    'scen_021_network_jitter': 'Configure administrative Quality of Service (QoS) rules to prioritize real-time VoIP packets',
    'scen_022_network_flapping': 'Inspect RJ-45 wall drops for strain and shield ports from heavy physical cable drag',
    'scen_023_display_burnin': 'Apply short screen-saver timeouts and configure active panel pixel-shifting algorithms',
    'scen_024_display_dead_pixel': 'Run specialized screen exercises to massage stuck liquid crystals with rapid cycling color sequences',
    'scen_025_projector_thermal': 'Clear air intake paths of teaching booth projectors and replace clogged dust filters quarterly',
    'scen_026_storage_missing_drive': 'Ensure internal storage power branches use high-vibration locking SATA / NVMe latch connectors',
    'scen_027_storage_bcd_corrupt': 'Set up automatic hourly OS system restore points and lock standard user write-rights to the Master Boot partition',
    'scen_028_printer_paper_jam': 'Inspect paper feed rubber separation pads and roller rings for wear patterns and clean off paper glaze',
    'scen_029_printer_inkjet_clogged': 'Enforce printer automatic low-frequency clean-sweeps to keep active ink nozzle arrays wet',
    'scen_030_printer_drum_scratch': 'Only use approved micro-filtered toner cartridges and clean photo-receptive drum tracks using special static-free vacuums',
    'scen_031_printer_impact_ribbon': 'Routinely rotate and oil impact printhead pin arrays to prevent heat locks and ribbon dry-outs',
    'scen_032_mobile_liquid': 'Supply administrative staff with heavy-duty IP68 liquid-proof protective carrying cases',
    'scen_033_mobile_malware': 'Deploy strict Mobile Device Management (MDM) endpoint policies to sandbox unauthorized application background installations',
    'scen_034_mobile_screen_crack': 'Supply field personnel with high-durability thermoplastic polyurethane (TPU) screen guards',
    'scen_035_power_burnt_smell': 'Decommission high-duty server workstations after five consecutive years of standard room temperature operation',
    'scen_036_power_unlatched_plug': 'Instruct PC builders to fully latch dual-retention motherboard ATX power clips until an audible click is heard',
    'scen_037_cpu_skewed_pins': 'Apply uniform cross-pattern screwdriver torque rules when clamping down heavy custom cooling plates',
    'scen_038_ram_memory_thrashing': 'Audit workstation application footprints and baseline recommended minimum memory counts before rolling out software'
  };

  const PREVENTIVE_ACTIONS_BY_SUBSYSTEM: Record<string, string> = {
    'Motherboard': 'Deploy high-quality UPS surge protection systems to guard motherboard capacitors from power spikes',
    'RAM': 'Establish routine MemTest86 diagnostic audits and configure ECC alerts where applicable',
    'CPU': 'Schedule quarterly dust cleanup venting and refresh CPU thermal paste every two years',
    'Power Supply': 'Implement active power load balances and register surge-suppression line filters',
    'Storage': 'Set up local automated system/folder backup schedules and configure SMART pre-failure alerts',
    'Printer': 'Store replacement cartridges/toners in a cool, low-humidity storage locker and run self-clean diagnostics monthly',
    'Mobile Device': 'Enforce battery health threshold monitors and limit overnight high-voltage continuous charging',
    'Network': 'Maintain active IP/MAC address pools and deploy secondary fallback DNS/Gateway router redundancies',
    'Display': 'Install gold-plated shielded video interface ports to avoid high RF spectrum EMI flickering'
  };

  const getActionDisplay = (action: Action) => {
    if (!activeScenario) return { label: action.label, hints: action.hints };
    
    if (activeScenario.id === 'scen_012_printer_thermal_blank' && action.id === 'replace_toner') {
      return {
        label: "Flip/Reload thermal receipt paper roll to the correct orientation",
        hints: "Ensures the heat-sensitive chemical layer actively faces the print head heating pins."
      };
    }
    if (activeScenario.id === 'scen_011_display_flicker' && action.id === 'inspect_cables') {
      return {
        label: "Replace the low-bandwidth HDMI 1.4 cable with a certified Ultra High Speed HDMI 2.1 cable",
        hints: "Secures stable 48Gbps video bandwidth necessary for clean 4K high-refresh-rate output."
      };
    }
    return { label: action.label, hints: action.hints };
  };

  // Dynamic Option lists for Step 2 Actions (8 options limit)
  const step2Actions = useMemo(() => {
    if (!activeScenario) return [];
    const correctId = activeScenario.hiddenRootCause.correctPlan;
    
    const correctAct = GLOBAL_ACTIONS.find(act => act.id === correctId);
    if (!correctAct) return GLOBAL_ACTIONS.filter(act => act.comptiaStep === 4); // Fallback
    
    // Get all other potential action distractors
    const correctPlansForOtherScenarios = SCENARIOS.map(s => s.hiddenRootCause.correctPlan);
    const others = GLOBAL_ACTIONS.filter(act => 
      act.id !== correctId && 
      (act.comptiaStep === 4 || correctPlansForOtherScenarios.includes(act.id))
    );
    
    // Prioritize actions from the same subsystem/category to make challenging distractors
    const matchingSubsystem = others.filter(act => {
      const sub = (activeScenario.subsystem || '').toLowerCase();
      const label = act.label.toLowerCase();
      
      if (sub === 'printer' && (label.includes('printer') || label.includes('ink') || label.includes('toner') || label.includes('printhead') || label.includes('fuser') || label.includes('paper'))) {
        return true;
      }
      if (sub === 'network' && (label.includes('network') || label.includes('router') || label.includes('wifi') || label.includes('ip') || label.includes('dns') || label.includes('ping') || label.includes('gateway'))) {
        return true;
      }
      if (sub === 'ram' && (label.includes('ram') || label.includes('memory') || label.includes('dimm') || label.includes('memtest'))) {
        return true;
      }
      if (sub === 'storage' && (label.includes('storage') || label.includes('drive') || label.includes('ssd') || label.includes('chkdsk') || label.includes('hdd') || label.includes('sata'))) {
        return true;
      }
      if (sub === 'display' && (label.includes('display') || label.includes('gpu') || label.includes('monitor') || label.includes('screen') || label.includes('video') || label.includes('cable'))) {
        return true;
      }
      if (sub === 'motherboard' && (label.includes('motherboard') || label.includes('cmos') || label.includes('bios') || label.includes('battery') || label.includes('capacitor'))) {
        return true;
      }
      if (sub === 'cpu' && (label.includes('cpu') || label.includes('thermal') || label.includes('paste') || label.includes('cooling') || label.includes('fan') || label.includes('heatsink'))) {
        return true;
      }
      if (sub === 'power supply' && (label.includes('psu') || label.includes('power') || label.includes('voltage') || label.includes('multimeter'))) {
        return true;
      }
      
      // Fallback: match by correct action's category
      if (correctAct.category === act.category) {
        return true;
      }
      return false;
    });

    // We need exactly 7 distractors to have exactly 8 options in total.
    let selectedDistractors: Action[] = [];
    if (matchingSubsystem.length >= 7) {
      selectedDistractors = matchingSubsystem.slice(0, 7);
    } else {
      selectedDistractors = [...matchingSubsystem];
      const remainingOthers = others.filter(act => !matchingSubsystem.some(m => m.id === act.id));
      const padCount = 7 - selectedDistractors.length;
      selectedDistractors = [...selectedDistractors, ...remainingOthers.slice(0, padCount)];
    }
    
    // Combine correct action + 7 distractors, and sort them alphabetically
    const combined = [correctAct, ...selectedDistractors];
    combined.sort((a, b) => {
      const aLabel = getActionDisplay(a).label;
      const bLabel = getActionDisplay(b).label;
      return aLabel.localeCompare(bLabel);
    });
    return combined;
  }, [activeScenario]);

  // Dynamic Option lists for Step 3 Documentation Specially Suited to Resolved Ticket (Exactly 6 options)
  const step3Symptoms = useMemo(() => {
    if (!activeScenario) return [];
    const correct = activeScenario.title;
    const others = SCENARIOS.filter(s => s.id !== activeScenario.id).map(s => s.title);
    
    const selected = others.slice(0, 5);
    const combined = [correct, ...selected];
    combined.sort();
    return combined;
  }, [activeScenario]);

  const step3Causes = useMemo(() => {
    if (!activeScenario) return [];
    const correct = activeScenario.hiddenRootCause.shortDescription;
    const others = SCENARIOS.filter(s => s.id !== activeScenario.id)
      .map(s => s.hiddenRootCause.shortDescription)
      .filter(Boolean);
    
    const selected = others.slice(0, 5);
    const combined = [correct, ...selected];
    combined.sort();
    return combined;
  }, [activeScenario]);

  const step3Solutions = useMemo(() => {
    return step2Actions.map(act => getActionDisplay(act).label);
  }, [step2Actions, activeScenario]);

  const step3Preventives = useMemo(() => {
    if (!activeScenario) return [];
    
    const correct = SCENARIO_PREVENTIVE_ACTIONS[activeScenario.id] || 
      PREVENTIVE_ACTIONS_BY_SUBSYSTEM[activeScenario.subsystem || 'Motherboard'] || 
      'Deploy high-quality UPS surge protection systems to guard motherboard capacitors from power spikes';
    
    // Select all other possible detailed preventive actions as distraction fodder
    const otherCandidates = Object.entries(SCENARIO_PREVENTIVE_ACTIONS)
      .filter(([id, text]) => id !== activeScenario.id && text !== correct)
      .map(([_, text]) => text);

    // Grab 5 distinct distractors dynamically linked to the scenario index to ensure fresh options every time
    const sKeys = Object.keys(SCENARIO_PREVENTIVE_ACTIONS);
    const correctIdx = sKeys.indexOf(activeScenario.id);
    const startIndex = correctIdx !== -1 ? (correctIdx + 1) % otherCandidates.length : 0;
    
    const selectedDistractors: string[] = [];
    for (let i = 0; i < 5; i++) {
      // Select 5 non-duplicating alternatives
      const idx = (startIndex + i) % otherCandidates.length;
      const val = otherCandidates[idx];
      if (val && !selectedDistractors.includes(val)) {
        selectedDistractors.push(val);
      }
    }
      
    const combined = [correct, ...selectedDistractors];
    combined.sort();
    return combined;
  }, [activeScenario]);

  // Memoize step1 actions to optimize rendering and state transitions with smart, tricky distractors
  const step1Actions = useMemo(() => {
    if (!activeScenario) return [];

    // Filter down to the matching tab's actions (comptiaStep !== 4)
    const tabActions = GLOBAL_ACTIONS.filter(act => 
      act.comptiaStep !== 4 && (
        activeTab === 'visual' 
          ? act.category === 'visual' 
          : activeTab === 'software_bios'
            ? act.category === 'software_bios'
            : act.category === 'testing' || act.category === 'hardware'
      )
    );

    // Identify the required tests for the current scenario
    const requiredTestIds = activeScenario.hiddenRootCause.requiredTests;
    const requiredForThisTab = tabActions.filter(act => requiredTestIds.includes(act.id));

    // Identify the rest of the actions in this tab
    const otherInTab = tabActions.filter(act => !requiredTestIds.includes(act.id));

    const subsystem = (activeScenario.subsystem || '').toLowerCase();

    // Prioritize actions in this tab that are relevant to the active scenario's subsystem
    const relatedOthers = otherInTab.filter(act => {
      const label = act.label.toLowerCase();
      const id = act.id.toLowerCase();
      
      if (subsystem === 'printer') {
        return label.includes('printer') || label.includes('ink') || label.includes('toner') || label.includes('printhead') || label.includes('fuser') || label.includes('paper') || label.includes('spooler') || id.includes('fuser') || id.includes('roller');
      }
      if (subsystem === 'network') {
        return label.includes('network') || label.includes('router') || label.includes('wifi') || label.includes('ip') || label.includes('dns') || label.includes('ping') || label.includes('gateway') || label.includes('trace') || label.includes('dhcp') || label.includes('link') || label.includes('cable');
      }
      if (subsystem === 'ram') {
        return label.includes('ram') || label.includes('memory') || label.includes('dimm') || label.includes('memtest') || label.includes('beep') || id.includes('ram');
      }
      if (subsystem === 'storage') {
        return label.includes('storage') || label.includes('drive') || label.includes('ssd') || label.includes('chkdsk') || label.includes('hdd') || label.includes('sata') || label.includes('raid') || id.includes('storage');
      }
      if (subsystem === 'display') {
        return label.includes('display') || label.includes('gpu') || label.includes('monitor') || label.includes('screen') || label.includes('video') || label.includes('cable') || label.includes('pixel') || label.includes('projector') || id.includes('display');
      }
      if (subsystem === 'motherboard') {
        return label.includes('motherboard') || label.includes('cmos') || label.includes('bios') || label.includes('battery') || label.includes('capacitor') || label.includes('board') || id.includes('bios') || id.includes('cmos');
      }
      if (subsystem === 'cpu') {
        return label.includes('cpu') || label.includes('thermal') || label.includes('paste') || label.includes('cooling') || label.includes('fan') || label.includes('heatsink') || label.includes('temperature') || id.includes('cpu');
      }
      if (subsystem.includes('power')) {
        return label.includes('psu') || label.includes('power') || label.includes('voltage') || label.includes('multimeter') || label.includes('atx') || label.includes('outlet') || id.includes('psu');
      }
      if (subsystem.includes('mobile')) {
        return label.includes('mobile') || label.includes('phone') || label.includes('battery') || label.includes('recalibrate') || label.includes('screen') || id.includes('iphone') || id.includes('mobile');
      }
      return false;
    });

    // Provide high-quality general-purpose decoys/distractors
    const generalOthers = otherInTab.filter(act => {
      const id = act.id;
      return ['inspect_cables', 'sniff_components', 'check_event_viewer', 'check_device_manager', 'test_outlet_receptacle'].includes(id);
    });

    // Combine priorities: required actions first, then subsystem related, then general checks, then others to pad if needed.
    const prioritizedPool = [...requiredForThisTab];
    
    relatedOthers.forEach(act => {
      if (!prioritizedPool.some(p => p.id === act.id)) {
        prioritizedPool.push(act);
      }
    });

    generalOthers.forEach(act => {
      if (!prioritizedPool.some(p => p.id === act.id)) {
        prioritizedPool.push(act);
      }
    });

    otherInTab.forEach(act => {
      if (!prioritizedPool.some(p => p.id === act.id)) {
        prioritizedPool.push(act);
      }
    });

    // Target a consistent panel layout with exactly 8 options per tab view
    const finalSelection = prioritizedPool.slice(0, 8);

    // Alphabetically sort final choices to prevent predictable order placement
    finalSelection.sort((a, b) => a.label.localeCompare(b.label));

    return finalSelection;
  }, [activeTab, activeScenario]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [actionLogs]);

  // Keep track of chronological timer
  useEffect(() => {
    if (gameState === 'playing') {
      setTimeElapsed(0);
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Handle live PC telemetry indicators dynamically based on scenario states
  useEffect(() => {
    if (!activeScenario) return;

    // Reset Defaults
    setTempIndicator('37°C (Healthy)');
    setRamIndicator('16GB Loaded');
    setPsuIndicator('+11.98 V (Stable)');
    setNetIndicator('Connected (1000 Mbps)');
    setPrinterIndicator('Idle Ready');

    // Load custom telemetry sags based on scenario
    if (activeScenario.id === 'scen_003_cpu_thermal') {
      setTempIndicator('89°C (OVERHEATED ALERT)');
    } else if (activeScenario.id === 'scen_004_psu_voltage') {
      setPsuIndicator('+11.41 V (SAG DEGRADING)');
    } else if (activeScenario.id === 'scen_009_network_apipa') {
      setNetIndicator('APIPA Autoconfigure (169.254.99.14)');
    } else if (activeScenario.id === 'scen_010_network_conflict') {
      setNetIndicator('IP COLLISION WARNING');
    } else if (activeScenario.id === 'scen_013_beep_codes_ram') {
      setRamIndicator('0 MB Recognized (POST FAIL)');
    } else if (activeScenario.id === 'scen_014_network_dns_fail') {
      setNetIndicator('No Name Resolution (DNS Tyrant)');
    }
  }, [activeScenario]);

  // Launch a new scenario
  const startLabSession = (forceScenario?: Scenario) => {
    let selected: Scenario | null = null;
    
    if (forceScenario && typeof forceScenario === 'object' && 'id' in (forceScenario as any)) {
      selected = JSON.parse(JSON.stringify(forceScenario));
    } else {
      let pool = SCENARIOS.filter(s => selectedSubsystem === 'All' || s.subsystem === selectedSubsystem);
      const completedIds = casesHistory.map(h => h.scenarioId);
      const uncompletedPool = pool.filter(s => !completedIds.includes(s.id));
      
      const activePool = uncompletedPool.length > 0 ? uncompletedPool : pool;
      
      if (activePool.length > 0) {
        const index = Math.floor(Math.random() * activePool.length);
        selected = JSON.parse(JSON.stringify(activePool[index]));
      } else {
        // Fallback
        selected = getRandomScenario();
      }
    }

    if (selected) {
      setActiveScenario(selected);
      setCurrentStep(1);
      setSelectedTheory(null);
      setTheoryConfirmed(false);
      setSolutionFixed(false);
      setIsVerified(false);
      setIsPrevented(false);
      setActionLogs([]);
      setCaseScore(100);
      setGameState('playing');
      setActiveTab('visual');

      // Clear documentation states
      setDocSymptom('');
      setDocCause('');
      setDocSolution('');
      setDocPreventive('');
      setWarningMsg(null);

      // Add bootstrap log
      const bootstrapLog: TroubleshootingLog = {
        timestamp: new Date(),
        step: 1,
        actionId: 'ticket_opened',
        actionLabel: 'Ticket Opened & Assigned',
        response: `Technician assigned to Support Request Group. Initial customer symptom: "${selected.ticket.description}"`,
        scorePenalty: 0
      };
      setActionLogs([bootstrapLog]);
    }
  };

  // Perform a diagnostic or repair action
  const executeTechnicianAction = (action: Action) => {
    if (!activeScenario) return;

    // Check action limitations relative to CompTIA step guidance
    let penalty = 0;
    let customText = "";

    // 1. Calculate sequence logical penalties
    // If we trigger a physical hardware replace in Step 1 or prior to testing, punish them!
    if (action.comptiaStep === 4 && currentStep < 2) {
      penalty += 15;
      customText += "⚠️ METHODOLOGY ERROR: You attempted a hardware replacement modification BEFORE diagnosing or formulating a theory! ";
    }

    // Unnecessary major items checked for other subsystems
    if (action.category === 'hardware' && action.id !== activeScenario.hiddenRootCause.correctPlan) {
      // Swapping heavy boards or CPU when it's irrelevant and costly
      if (['replace_motherboard', 'replace_cpu', 'replace_psu', 'replace_gpu', 'replace_storage'].includes(action.id)) {
        penalty += 10;
      } else {
        penalty += 4;
      }
    }

    // Determine custom scenario specific reactions
    const specificResp = activeScenario.actionResponses[action.id];
    let finalResponseText = "";
    let isClueAction = false;

    if (specificResp) {
      finalResponseText = specificResp.text;
      isClueAction = !!specificResp.isClue;

      // Unlocks
      if (action.id === activeScenario.hiddenRootCause.correctPlan && currentStep === 2) {
        setSolutionFixed(true);
        // Telemetry heals
        if (activeScenario.id === 'scen_003_cpu_thermal') setTempIndicator('34°C (Normal)');
        if (activeScenario.id === 'scen_004_psu_voltage') setPsuIndicator('+12.01 V (Regulated)');
        if (activeScenario.id === 'scen_009_network_apipa') setNetIndicator('DHCP Assigned (192.168.1.133)');
        if (activeScenario.id === 'scen_010_network_conflict') setNetIndicator('Stable Assignment ok');
        if (activeScenario.id === 'scen_013_beep_codes_ram') setRamIndicator('8GB Installed (Stable)');
        if (activeScenario.id === 'scen_014_network_dns_fail') setNetIndicator('Connected (DNS Resolved)');
      }

      // If they ran the exact required test validation inside Step 1
      if (activeScenario.hiddenRootCause.requiredTests.includes(action.id) && currentStep === 1) {
        setTheoryConfirmed(true);
      }
    } else {
      // Procedural default responses
      if (action.category === 'visual') {
        finalResponseText = "Visual inspection completes smoothly. The selected sector looks intact with regular connections.";
      } else if (action.category === 'hardware') {
        finalResponseText = `You completed the action: [${action.label}]. However, this modification did not resolve the ticket symptoms. The system remains stuck.`;
      } else if (action.category === 'software_bios') {
        finalResponseText = "Software logs read standard execution metrics. Bios options match stock defaults.";
      } else {
        finalResponseText = "Diagnostic logs returned generic OK. No errors or hardware blocks were detected in this field.";
      }
    }

    // Formulate final telemetry string
    const completeResponse = (customText ? customText + "\n" : "") + finalResponseText;

    // Track state logging
    const newLog: TroubleshootingLog = {
      timestamp: new Date(),
      step: currentStep,
      actionId: action.id,
      actionLabel: action.label,
      response: completeResponse,
      scorePenalty: penalty
    };

    // Append log and apply penalty to score
    setActionLogs(prev => [...prev, newLog]);
    setCaseScore(prev => Math.max(10, prev - penalty));
  };

  // Step 1 theory formulation selection
  const selectTroubleshootingTheory = (theory: string) => {
    setSelectedTheory(theory);
    
    let penalty = 0;
    const isCorrect = theory === activeScenario?.hiddenRootCause.correctTheory;

    if (!isCorrect) {
      penalty = 8;
      setCaseScore(prev => Math.max(10, prev - penalty));
    }

    const log: TroubleshootingLog = {
      timestamp: new Date(),
      step: 1,
      actionId: 'theory_asserted',
      actionLabel: `Formulated Hypothesis`,
      response: `Theory asserted: "${theory}". ${isCorrect ? '✅ This theory matches the gathered symptoms logically. Proceed to test it or advance to repairs.' : '❌ This theory does not align with core clues. Think again or test it to clarify.'}`,
      scorePenalty: penalty
    };
    setActionLogs(prev => [...prev, log]);
  };

  // Verifying Step 2
  const executeVerificationAction = (type: 'verify' | 'prevent') => {
    if (type === 'verify') {
      setIsVerified(true);
    } else {
      setIsPrevented(true);
    }

    const log: TroubleshootingLog = {
      timestamp: new Date(),
      step: 2,
      actionId: `step5_${type}`,
      actionLabel: type === 'verify' ? 'System Verification Scan' : 'Preventative Measures Asset',
      response: type === 'verify' 
        ? "Verification of system functionality check completed with 100% stable results. System stress test validated." 
        : "Preventive measure applied to this workstation directory. Documentation updated.",
      scorePenalty: 0
    };
    setActionLogs(prev => [...prev, log]);
  };

  // Handlers to jump steps in CompTIA Methodology
  const handleNextStep = () => {
    setWarningMsg(null);
    if (currentStep === 1) {
      if (!selectedTheory) {
        setWarningMsg("You must formulate a theory of probable cause first!");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!solutionFixed) {
        setWarningMsg("The system remains unresolved. You must implement the correct repair solution first!");
        return;
      }
      
      // Auto-trigger verification and/or preventive measures if they have not been manually run, ensuring a seamless user experience
      if (!isVerified) {
        setIsVerified(true);
        const log: TroubleshootingLog = {
          timestamp: new Date(),
          step: 2,
          actionId: 'step5_verify',
          actionLabel: 'System Verification Scan',
          response: "Verification diagnostics auto-completed: Verified full system functionality with stable test results.",
          scorePenalty: 0
        };
        setActionLogs(prev => [...prev, log]);
      }
      
      if (!isPrevented) {
        setIsPrevented(true);
        const log: TroubleshootingLog = {
          timestamp: new Date(),
          step: 2,
          actionId: 'step5_prevent',
          actionLabel: 'Preventative Measures Asset',
          response: "Preventative precautions auto-completed: Proactive protection routines scheduled successfully.",
          scorePenalty: 0
        };
        setActionLogs(prev => [...prev, log]);
      }

      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    setWarningMsg(null);
    if (currentStep > 1) {
      setCurrentStep(prev => (prev - 1) as TroubleshootingStepNumber);
    }
  };

  // Final ticket submission
  const submitTicketResolution = () => {
    setWarningMsg(null);
    if (!docSymptom || !docCause || !docSolution || !docPreventive) {
      setWarningMsg("Please complete all document logs to close out the support ticket!");
      return;
    }

    // Analyze final adherence and stats
    // Methodology Adherence calculation:
    let stepAdherenceScore = 100;
    
    // Penalize if they jumped steps or replaced components blindly prior to hypothesis/testing
    const replacementsPreTest = actionLogs.filter(log => log.step < 2 && log.actionId.startsWith('replace'));
    if (replacementsPreTest.length > 0) stepAdherenceScore -= 40;
    
    const theoryFormulatedEarly = actionLogs.some(log => log.actionId === 'theory_asserted' && actionLogs.filter(l => l.step === 1).length <= 1);
    if (theoryFormulatedEarly) stepAdherenceScore -= 20;

    stepAdherenceScore = Math.max(10, stepAdherenceScore);

    // Calculate accuracy
    let accuracyScore = 100;
    const theoryGuesses = actionLogs.filter(log => log.actionId === 'theory_asserted').length;
    accuracyScore -= (theoryGuesses - 1) * 30; // 30% penalty for guessing wrong theories
    accuracyScore = Math.max(10, accuracyScore);

    // Calculate action efficiency
    let efficiencyScore = 100;
    const extraSwaps = actionLogs.filter(log => log.actionId.startsWith('replace') && log.actionId !== activeScenario?.hiddenRootCause.correctPlan).length;
    efficiencyScore -= (extraSwaps * 25);
    efficiencyScore = Math.max(10, efficiencyScore);

    // Formulate final aggregated weighted score
    let aggregatedRaw = (stepAdherenceScore * 0.35) + (accuracyScore * 0.40) + (efficiencyScore * 0.25);
    
    // In Exam Mode, hide keys/hints, and add speed deduction if >10 minutes
    if (difficulty === 'exam') {
      const minutes = Math.floor(timeElapsed / 60);
      if (minutes > 10) {
        aggregatedRaw -= (minutes - 10) * 2;
      }
    }

    const finalCalculatedScore = Math.round(Math.max(10, Math.min(100, aggregatedRaw)));
    setCaseScore(finalCalculatedScore);

    // Update session history
    const historyItem = {
      scenarioId: activeScenario!.id,
      score: finalCalculatedScore,
      difficulty: difficulty,
      timeSpent: Math.floor(timeElapsed / 60) || 1,
      stepAdherence: stepAdherenceScore,
      accuracy: accuracyScore,
      efficiency: efficiencyScore,
      timestamp: new Date()
    };

    setCasesHistory(prev => [...prev, historyItem]);
    setGameState('reported');
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "1. Investigate & Diagnose";
      case 2: return "2. Repair & Verify System";
      case 3: return "3. Document & Close Support Ticket";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased">
      
      {/* Visual Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-emerald-500 to-sky-600 p-2.5 rounded-xl shadow-lg shadow-emerald-500/10">
            <Wrench className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              CompTIA A+ Troubleshooting Lab
              <span className="text-[10px] font-mono font-semibold uppercase bg-slate-800 text-emerald-400 px-2 py-0.5 rounded border border-slate-700/60">
                Core 1 Suite
              </span>
            </h1>
            <p className="text-xs text-slate-400">Interactive Simulation Portal • Domain 5.0 Practice</p>
          </div>
        </div>

        {gameState === 'playing' && (
          <div className="flex items-center gap-5 bg-slate-950/40 px-4 py-2 rounded-xl border border-slate-800/80">
            <div className="text-center sm:text-right">
              <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-widest">Active Timer</span>
              <span className="font-mono text-sm text-slate-200 font-bold">
                {Math.floor(timeElapsed / 60).toString().padStart(2, '0')}:
                {(timeElapsed % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div className="text-center sm:text-right">
              <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-widest">Current Grade</span>
              <span className={`font-mono text-sm font-bold ${caseScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {difficulty === 'exam' ? 'Hidden (Exam Mode)' : `${caseScore}/100`}
              </span>
            </div>
          </div>
        )}
      </header>

      {/* Main Body */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6" id="applet-main-canvas">
        <AnimatePresence mode="wait">

          {/* WELCOME PORTAL CARD */}
          {gameState === 'welcome' && (
            <motion.div
              id="welcome-container"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl mx-auto space-y-8 py-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Panel 1: Configure options */}
                <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Prepare for your CompTIA A+ Core 1 Hardware Exam</h2>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Put yourself in the boots of an enterprise system support analyst. Practice applying the strict CompTIA Six-Step Methodology to troubleshoot, repair, and document issues spanning CPU, Motherboards, RAM, Storage, Displays, Mobile Devices, Networks, and Printers.
                    </p>

                    {/* Parameter Config */}
                    <div className="space-y-4 pt-4 border-t border-slate-800">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          1. Select Lab Subsystem Category
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {(['All', 'Motherboard', 'RAM', 'CPU', 'Power Supply', 'Storage', 'Display', 'Printer', 'Mobile', 'Network'] as const).map(sub => (
                            <button
                              key={sub}
                              onClick={() => setSelectedSubsystem(sub)}
                              className={`text-xs px-3 py-2 rounded-lg font-medium transition-all cursor-pointer border ${
                                selectedSubsystem === sub 
                                  ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-lg shadow-emerald-950/20' 
                                  : 'bg-slate-950 text-slate-300 border-slate-800/80 hover:bg-slate-900'
                              }`}
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Difficulties */}
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          2. Select Lab Difficulty Mode
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          
                          {/* Beginner */}
                          <div 
                            onClick={() => { setDifficulty('beginner'); setIsHintEnabled(true); }}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                              difficulty === 'beginner' 
                                ? 'bg-emerald-950/20 border-emerald-500/50 text-emerald-200 shadow-inner' 
                                : 'bg-slate-950/65 border-slate-850 hover:bg-slate-900/50 text-slate-300'
                            }`}
                          >
                            <span className="font-bold text-xs flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-emerald-450 inline-block" /> Beginner Support
                            </span>
                            <span className="text-[10px] text-slate-400 mt-2 block font-sans">
                              Detailed tips & diagnostics mapping assistance. Perfect for studying core mechanics.
                            </span>
                          </div>

                          {/* Intermediate */}
                          <div 
                            onClick={() => { setDifficulty('intermediate'); setIsHintEnabled(true); }}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                              difficulty === 'intermediate' 
                                ? 'bg-amber-950/20 border-amber-500/50 text-amber-200 shadow-inner' 
                                : 'bg-slate-950/65 border-slate-850 hover:bg-slate-900/50 text-slate-300'
                            }`}
                          >
                            <span className="font-bold text-xs flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-amber-450 inline-block" /> Intermediate Tech
                            </span>
                            <span className="text-[10px] text-slate-400 mt-2 block font-sans">
                              Moderate hints. Active grading is visible. Encourages structured methodology.
                            </span>
                          </div>

                          {/* Exam mode */}
                          <div 
                            onClick={() => { setDifficulty('exam'); setIsHintEnabled(false); }}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                              difficulty === 'exam' 
                                ? 'bg-rose-950/20 border-rose-500/50 text-rose-200 shadow-inner' 
                                : 'bg-slate-950/65 border-slate-850 hover:bg-slate-900/50 text-slate-300'
                            }`}
                          >
                            <span className="font-bold text-xs flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-rose-450 inline-block" /> Exam Assessment
                            </span>
                            <span className="text-[10px] text-slate-400 mt-2 block font-sans">
                              No hints. Grade evaluation hidden during flow. STRICT 10-minute speed limits.
                            </span>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex justify-end">
                    <button
                      onClick={() => startLabSession()}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl transition-all duration-150 flex items-center gap-2 text-sm shadow-xl shadow-emerald-950/30 cursor-pointer"
                    >
                      Initialize Lab Workbench <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
                    </button>
                  </div>
                </div>

                {/* Panel 2: Sidebar stats history */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2 text-slate-400 uppercase font-bold text-xs tracking-wider">
                        <History className="w-4 h-4 text-emerald-400" /> Lab Session History
                      </div>
                      {casesHistory.length > 0 && (
                        <div className="flex gap-2 items-center">
                          {showConfirmClear ? (
                            <>
                              <button
                                onClick={() => {
                                  setCasesHistory([]);
                                  setShowConfirmClear(false);
                                  try {
                                    localStorage.removeItem('comptia_cases_history');
                                  } catch (e) {
                                    console.error(e);
                                  }
                                }}
                                className="text-[10px] text-red-400 hover:text-red-300 font-bold border border-rose-950 px-1.5 py-0.5 rounded bg-rose-950/40 transition cursor-pointer"
                              >
                                Yes, Clear
                              </button>
                              <button
                                onClick={() => setShowConfirmClear(false)}
                                className="text-[10px] text-slate-400 hover:text-slate-300 border border-slate-800 px-1.5 py-0.5 rounded hover:bg-slate-800 transition cursor-pointer"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setShowConfirmClear(true)}
                              className="text-[10px] text-rose-400 hover:text-rose-300 font-mono underline transition cursor-pointer animate-pulse"
                            >
                              Clear History
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                      {casesHistory.map((h, i) => (
                        <div key={i} className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex justify-between items-center text-xs">
                          <div>
                            <span className="font-mono text-slate-400 border-r border-slate-850 pr-2 mr-2">Case #{h.scenarioId.split('_')[1]}</span>
                            <span className="text-[10px] uppercase font-bold text-slate-500 block sm:inline">{h.difficulty}</span>
                          </div>
                          <span className={`font-mono font-bold ${h.score >= 90 ? 'text-emerald-400' : h.score >= 75 ? 'text-amber-400' : 'text-rose-400'}`}>
                            {h.score}/100
                          </span>
                        </div>
                      ))}

                      {casesHistory.length === 0 && (
                        <div className="text-center py-10 text-slate-500 italic text-xs">
                          No diagnostics recorded yet. Select subsystems and run labs.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary performance block */}
                  <div className="bg-slate-950/60 p-4 border border-slate-850 rounded-xl space-y-3.5 mt-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Session Metrics</h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <span className="text-2xl font-bold font-mono text-slate-100">{casesHistory.length}</span>
                        <span className="text-[10px] text-slate-500 block">Completed Cases</span>
                      </div>
                      <div>
                        <span className="text-2xl font-bold font-mono text-emerald-400">
                          {casesHistory.length > 0 
                            ? Math.round(casesHistory.reduce((sum, item) => sum + item.score, 0) / casesHistory.length) 
                            : '0'}
                        </span>
                        <span className="text-[10px] text-slate-500 block">Average Rating</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Six Step Methodology Card Guide */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-sky-400" /> The CompTIA 6-Step Hardware Troubleshooting Methodology
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3.5">
                  {[
                    { s: "Step 1", t: "Identify the problem", d: "Interview user and verify obvious symptoms." },
                    { s: "Step 2", t: "Establish theory", d: "Think through causes and obvious explanations." },
                    { s: "Step 3", t: "Test the theory", d: "Isolate elements or run targeted diagnostics." },
                    { s: "Step 4", t: "Establish plan & solve", d: "Implement correct replacements or resets." },
                    { s: "Step 5", t: "Verify & Prevent", d: "Confirm functionality and take preventive action." },
                    { s: "Step 6", t: "Document Findings", d: "Log the ticket with findings and resolutions." }
                  ].map((step, idx) => (
                    <div key={idx} className="bg-slate-950/50 border border-slate-850 p-3 rounded-xl flex flex-col justify-between text-xs">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-sky-400 uppercase">{step.s}</span>
                        <h4 className="font-bold text-slate-200 mt-1">{step.t}</h4>
                      </div>
                      <p className="text-[10px] text-slate-450 mt-2 font-sans leading-relaxed">{step.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ACTIVE PLAYING DIAGNOSTIC CONSOLE */}
          {gameState === 'playing' && activeScenario && (
            <motion.div
              id="lab-workspace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              
              {/* Sidebar Left: Ticket detail + specifications */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Support Ticket details */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold font-mono text-slate-450">SUPPORT CONSOLE</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                      activeScenario.ticket.urgency === 'Critical' || activeScenario.ticket.urgency === 'High'
                        ? 'bg-rose-950/35 border-rose-900/60 text-rose-450' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}>
                      {activeScenario.ticket.urgency} Urgency
                    </span>
                  </div>

                  {/* Header info */}
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500">CLIENT METADATA:</p>
                    <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-850/70 text-xs space-y-1">
                      <p className="text-slate-300 font-medium">Name: <span className="text-slate-100 font-bold">{activeScenario.ticket.clientName}</span></p>
                      <p className="text-slate-400 text-[11px]">Dept: {activeScenario.ticket.userDepartment} • Role: {activeScenario.ticket.role}</p>
                      <p className="text-slate-455 text-[10px] font-mono">Asset ID: {activeScenario.ticket.assetTag} • Submitted: {activeScenario.ticket.submittedTime}</p>
                    </div>
                  </div>

                  {/* Core Ticket Content Text */}
                  <div className="space-y-1.5">
                    <p className="text-xs text-slate-500 font-mono">ISSUE COMPLAINT DESCRIPTION:</p>
                    <div className="bg-indigo-950/10 border border-indigo-900/30 p-4 rounded-xl relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-500" />
                      <p className="text-xs sm:text-sm text-slate-250 italic leading-relaxed font-sans select-text">
                        "{activeScenario.ticket.description}"
                      </p>
                    </div>
                  </div>

                  {/* Physical Symptoms bullets clues */}
                  <div className="space-y-1">
                    <p className="text-xs text-slate-505 font-mono">CONFIRMED OBSERVATIONS:</p>
                    <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc pl-4 font-sans">
                      {activeScenario.symptoms.map((sym, i) => (
                        <li key={i}>{sym}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Subspec card */}
                  <div className="border-t border-slate-800 pt-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Device Component Specifications</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-850/60 max-h-[140px] overflow-y-auto">
                      <div><span className="text-slate-500">Board:</span> <span className="text-slate-300">{activeScenario.specification.motherboard}</span></div>
                      <div><span className="text-slate-500">Processor:</span> <span className="text-slate-300">{activeScenario.specification.cpu}</span></div>
                      <div><span className="text-slate-500">Memory:</span> <span className="text-slate-300">{activeScenario.specification.ram}</span></div>
                      <div><span className="text-slate-500">Video GPU:</span> <span className="text-slate-300">{activeScenario.specification.gpu}</span></div>
                      <div><span className="text-slate-500">Supply PSU:</span> <span className="text-slate-300">{activeScenario.specification.psu}</span></div>
                      <div><span className="text-slate-500">Disk Storage:</span> <span className="text-slate-300">{activeScenario.specification.storage}</span></div>
                    </div>
                  </div>

                </div>

                {/* Dashboard Metrics / Telemetry system monitor */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-slate-450 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
                    <Gauge className="w-4 h-4 text-emerald-400 animate-pulse" /> Live Hardware Bench Telemetry
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                    
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-850/80">
                      <span className="text-slate-500 block text-[9px] uppercase font-bold mb-1">Processor Junction</span>
                      <span className={`font-semibold ${tempIndicator.includes('ALERT') ? 'text-rose-400' : 'text-slate-300'}`}>{tempIndicator}</span>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-850/80">
                      <span className="text-slate-500 block text-[9px] uppercase font-bold mb-1">POST RAM Status</span>
                      <span className={`font-semibold ${ramIndicator.includes('FAIL') ? 'text-rose-400' : 'text-slate-300'}`}>{ramIndicator}</span>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-850/80">
                      <span className="text-slate-500 block text-[9px] uppercase font-bold mb-1">PSU +12V Line Voltage</span>
                      <span className={`font-semibold ${psuIndicator.includes('SAG') ? 'text-amber-400 animate-pulse' : 'text-slate-300'}`}>{psuIndicator}</span>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-850/80">
                      <span className="text-slate-500 block text-[9px] uppercase font-bold mb-1">Link/Network Adapter</span>
                      <span className="font-semibold text-slate-300 truncate block">{netIndicator}</span>
                    </div>

                  </div>
                </div>

              </div>

              {/* Central Space: active bench logs + diagnostics selection */}
              <div className="lg:col-span-8 space-y-6 flex flex-col">
                
                {/* COMPTIA STEPS TIMELINE OVERLAY */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-855/80 w-full justify-between">
                    {([1, 2, 3] as number[]).map((stepNum) => {
                      const isActive = currentStep === stepNum;
                      const isDone = currentStep > stepNum;
                      return (
                        <button
                          key={stepNum}
                          onClick={() => {
                            if (difficulty !== 'exam' || stepNum <= currentStep) {
                              setCurrentStep(stepNum as TroubleshootingStepNumber);
                            }
                          }}
                          className={`flex-1 text-center py-2.5 px-1.5 rounded-lg text-[10px] font-mono uppercase font-bold transition-all relative cursor-pointer ${
                            isActive 
                              ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30 shadow' 
                              : isDone
                                ? 'bg-slate-900 text-slate-400 border border-transparent'
                                : 'text-slate-505 hover:text-slate-350 bg-transparent border border-transparent'
                          }`}
                        >
                          <span className={`block text-[11px] font-black ${isActive ? 'text-sky-400' : isDone ? 'text-emerald-400' : ''}`}>
                            {isDone ? '✓' : `PHASE ${stepNum}`}
                          </span>
                          <span className="hidden sm:inline-block md:hidden xl:inline-block max-w-[125px] truncate text-[9px] mt-0.5">
                            {stepNum === 1 ? 'Investigate & Diagnose' : stepNum === 2 ? 'Repair & Verify' : 'Document & Close'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                     {/* ACTIVE STEP DETAILS PANEL */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="text-xs font-mono bg-sky-950 border border-sky-800 px-2 py-0.5 rounded text-sky-400 uppercase">Active methodology</span>
                      {getStepTitle(currentStep)}
                    </h2>
                  </div>

                  {/* Warning / Error inline toast */}
                  {warningMsg && (
                    <div className="bg-amber-950/40 border border-amber-500/20 text-amber-200 p-3.5 rounded-xl flex items-center justify-between gap-3 text-xs font-sans animate-fadeIn relative">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[9px] text-amber-500 font-bold bg-amber-955 px-1.5 py-0.5 rounded border border-amber-800/65">Methodology block</span>
                        <span className="leading-relaxed font-medium">{warningMsg}</span>
                      </div>
                      <button 
                        onClick={() => setWarningMsg(null)}
                        className="text-amber-400 hover:text-amber-100 transition font-bold text-base px-2 cursor-pointer shrink-0"
                        title="Dismiss notice"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {/* Guided clues / hint banner */}
                  {isHintEnabled && (
                    <div className="bg-slate-950/80 border border-slate-850 p-3 rounded-lg text-xs text-slate-300 font-sans leading-relaxed flex items-start gap-2">
                      <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        {currentStep === 1 && "Perform visual checks, check BIOS reports, or test components. Choose your diagnosed theory of probable cause below."}
                        {currentStep === 2 && "Apply physical fixes under Part A. Once live telemetry normalizes, run both verification and preventive audits under Part B."}
                        {currentStep === 3 && "Record Symptom, Cause, Solution, and Preventive logs in the ticket closure form to complete findings."}
                      </div>
                    </div>
                  )}

                  {/* COMPTIA CONTROLS ACCORDING TO CURRENT STEP */}
                  <div className="space-y-4">
                    
                    {/* STEP 1: INVESTIGATE & DIAGNOSE (With Integrated Theory Formulator) */}
                    {currentStep === 1 && (
                      <div className="space-y-4 animate-fadeIn">
                        <p className="text-xs text-slate-400 font-medium font-sans">Run visual inspections, review software reports, or execute diagnostic testing tools to isolate physical failures:</p>
                        
                        <div className="flex gap-2 border-b border-slate-800 pb-2 mb-2 font-mono text-[10px]">
                          {(['visual', 'software_bios', 'testing'] as const).map(tab => (
                            <button
                              key={tab}
                              type="button"
                              onClick={() => setActiveTab(tab)}
                              className={`px-3 py-1.5 font-bold rounded-t-lg transition-all cursor-pointer ${
                                activeTab === tab || (tab === 'testing' && activeTab === 'hardware')
                                  ? 'bg-slate-950 text-sky-400 border-b-2 border-sky-500' 
                                  : 'text-slate-500 hover:text-slate-300'
                              }`}
                            >
                              {tab === 'visual' ? 'VISUAL CHECKS' : tab === 'software_bios' ? 'BIOS & SOFTWARE LOGS' : 'DIAGNOSTIC TESTING'}
                            </button>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                          {step1Actions.map(action => (
                            <button
                              key={action.id}
                              onClick={() => executeTechnicianAction(action)}
                              className="text-xs text-left p-2.5 rounded-lg border border-slate-800 bg-slate-955 hover:bg-slate-900 active:scale-98 transition text-slate-300 flex items-start gap-2 group cursor-pointer"
                            >
                              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold text-slate-205">{action.label}</p>
                                {isHintEnabled && <p className="text-[10px] text-slate-500 mt-1">{action.hints}</p>}
                              </div>
                            </button>
                          ))}
                        </div>

                        {/* EXPLICIT THEORY / PROBABLE CAUSE SELECTOR */}
                        <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                          <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
                            <span>Formulate Hypothesis (Theory of Probable Cause)</span>
                          </h3>
                          <p className="text-xs text-slate-400 font-sans">Lock in your primary diagnosis theory before executing repair actions in Phase 2:</p>
                          
                          {theoryConfirmed ? (
                            <div className="bg-emerald-950/20 border border-emerald-500/30 p-3 rounded-lg flex items-center gap-2 text-xs text-emerald-300">
                              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                              <span>Theory Confirmed! Your diagnostic runs successfully verified the core physical failure. Proceed to Phase 2.</span>
                            </div>
                          ) : selectedTheory ? (
                            <div className="bg-amber-950/10 border border-amber-900/20 p-3 rounded-lg flex items-center gap-2 text-xs text-amber-400">
                              <Info className="w-5 h-5 text-amber-500 shrink-0" />
                              <span>Current Theory: "{selectedTheory}". (Verify this by launching the correct diagnostic test above, or proceed to Repair)</span>
                            </div>
                          ) : null}

                          <div className="grid grid-cols-1 gap-1.5 max-h-[160px] overflow-y-auto pr-1">
                            {activeScenario.hiddenRootCause.possibleTheories.map((theory, idx) => (
                              <button
                                key={idx}
                                onClick={() => selectTroubleshootingTheory(theory)}
                                className={`w-full text-left text-xs p-2.5 rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                                  selectedTheory === theory 
                                    ? 'bg-sky-955/25 border-sky-500/50 text-sky-200 shadow' 
                                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-350'
                                }`}
                              >
                                <span className="pr-2 font-sans">{theory}</span>
                                <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${selectedTheory === theory ? 'border-sky-400 bg-sky-500/20' : 'border-slate-750'}`}>
                                  {selectedTheory === theory && <div className="h-2 w-2 rounded-full bg-sky-400" />}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}
                        {/* STEP 2: REPAIR & VERIFY SYSTEM */}
                    {currentStep === 2 && (
                      <div className="space-y-5 animate-fadeIn">
                        
                        {/* Section A: Corrective Actions */}
                        <div className="space-y-3">
                          <h3 className="text-xs font-mono font-bold text-slate-355 uppercase tracking-widest flex justify-between items-center border-b border-slate-800 pb-1.5">
                            <span>A. Core Physical Corrective Actions</span>
                            {solutionFixed ? (
                              <span className="text-[10px] bg-emerald-950/60 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-900/50 font-sans font-bold">SOLVED</span>
                            ) : (
                              <span className="text-[10px] bg-rose-955/60 text-rose-455 px-2.5 py-0.5 rounded border border-rose-900/50 font-sans font-bold">UNRESOLVED</span>
                            )}
                          </h3>
                          <p className="text-xs text-slate-400">Apply the physical hardware swaps, paste compound renewals, battery replacements, or settings flushes:</p>

                          {solutionFixed ? (
                            <div className="bg-emerald-950/20 border border-emerald-500/30 p-3 rounded-lg flex items-center gap-2 text-xs text-emerald-300">
                              <CheckCircle className="w-5 h-5 text-emerald-450 shrink-0" />
                              <span>Corrective repairs applied successfully! Sensors and diagnostic indicators have returned to nominal levels. Proceed to Part B verification.</span>
                            </div>
                          ) : (
                            <div className="bg-rose-955/10 border border-rose-900/20 p-3 rounded-lg flex items-center gap-2 text-xs text-rose-400 font-sans">
                              <Info className="w-5 h-5 text-rose-500 shrink-0" />
                              <span>Status: Active client reports are unresolved. Execute your core fix action based on diagnostic details:</span>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-1">
                            {step2Actions.map(action => {
                              const display = getActionDisplay(action);
                              return (
                                <button
                                  key={action.id}
                                  onClick={() => executeTechnicianAction(action)}
                                  className="text-xs text-left p-2.5 rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-900 active:scale-98 transition text-slate-300 flex items-start gap-2 group cursor-pointer animate-fadeIn"
                                >
                                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-rose-405 shrink-0 mt-0.5" />
                                  <div className="flex-1">
                                    <p className="font-bold text-slate-205">{display.label}</p>
                                    {isHintEnabled && <p className="text-[10px] text-slate-500 mt-1">{display.hints}</p>}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Section B: Verification checks & preventative routines */}
                        <div className="space-y-3 pt-4 border-t border-slate-800">
                          <h3 className="text-xs font-mono font-bold text-slate-350 uppercase tracking-widest">B. Verification Audits & Preventive Measures</h3>
                          <p className="text-xs text-slate-400 font-sans">Once repaired, you must run stress/integrity tests and establish proactive protections to guarantee closeout scoring:</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            {/* Verification */}
                            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl space-y-3">
                              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                                <CheckCircle className={`w-4 h-4 ${isVerified ? 'text-emerald-400' : 'text-slate-500'}`} />
                                1. Verify Load Integrity
                              </h4>
                              <button
                                type="button"
                                onClick={() => executeVerificationAction('verify')}
                                disabled={!solutionFixed}
                                className={`w-full text-xs py-2 px-3 rounded-lg font-bold transition cursor-pointer ${
                                  isVerified 
                                    ? 'bg-slate-855 text-emerald-400 border border-emerald-500/20' 
                                    : solutionFixed
                                      ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-955 shadow shadow-emerald-500/20'
                                      : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
                                }`}
                              >
                                {isVerified ? '✓ Stress Audit Completed' : 'Trigger Stress & Load Integrity Diagnostics'}
                              </button>
                            </div>

                            {/* Prevention */}
                            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl space-y-3">
                              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                                <CheckCircle className={`w-4 h-4 ${isPrevented ? 'text-emerald-400' : 'text-slate-500'}`} />
                                2. Proactive Preventative Measure
                              </h4>
                              <button
                                type="button"
                                onClick={() => executeVerificationAction('prevent')}
                                disabled={!solutionFixed}
                                className={`w-full text-xs py-2 px-3 rounded-lg font-bold transition cursor-pointer ${
                                  isPrevented 
                                    ? 'bg-slate-855 text-emerald-400 border border-emerald-500/20' 
                                    : solutionFixed
                                      ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-955 shadow shadow-emerald-500/20'
                                      : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
                                }`}
                              >
                                {isPrevented ? '✓ Preventive Rules Engaged' : 'Set Up Backups / Register Surge Protections'}
                              </button>
                            </div>

                          </div>
                        </div>

                      </div>
                    )}
                    {/* STEP 3: DOCUMENT CLOSURE CARD */}
                    {currentStep === 3 && (
                      <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl space-y-4 font-sans text-xs animate-fadeIn">
                        <span className="text-xs font-bold text-slate-300 tracking-wider font-mono block uppercase border-b border-slate-855 pb-2">
                          Incident Verification & Documentation Closeout Report
                        </span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          
                          <div>
                            <label className="text-slate-400 font-bold block mb-1">Observed Client Symptom:</label>
                            <select
                              value={docSymptom}
                              onChange={e => setDocSymptom(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 focus:border-sky-505 outline-none p-2 rounded text-slate-200 cursor-pointer"
                            >
                              <option value="">-- Choose Symptom --</option>
                              {step3Symptoms.map((sym, idx) => (
                                <option key={idx} value={sym}>{sym}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="text-slate-400 font-bold block mb-1">Identified Root Cause:</label>
                            <select
                              value={docCause}
                              onChange={e => setDocCause(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 focus:border-sky-505 outline-none p-2 rounded text-slate-200 cursor-pointer"
                            >
                              <option value="">-- Choose Cause --</option>
                              {step3Causes.map((cause, idx) => (
                                <option key={idx} value={cause}>{cause}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="text-slate-400 font-bold block mb-1">Resolution Applied:</label>
                            <select
                              value={docSolution}
                              onChange={e => setDocSolution(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 focus:border-sky-505 outline-none p-2 rounded text-slate-200 cursor-pointer"
                            >
                              <option value="">-- Choose Solution --</option>
                              {step3Solutions.map((sol, idx) => (
                                <option key={idx} value={sol}>{sol}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="text-slate-410 font-bold block mb-1">Preventative Action Planned:</label>
                            <select
                              value={docPreventive}
                              onChange={e => setDocPreventive(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 focus:border-sky-505 outline-none p-2 rounded text-slate-200 cursor-pointer"
                            >
                              <option value="">-- Choose Preventive --</option>
                              {step3Preventives.map((prev, idx) => (
                                <option key={idx} value={prev}>{prev}</option>
                              ))}
                            </select>
                          </div>

                        </div>
                      </div>
                    )}

                  </div>

                  {/* Warning visual alert right of the cursor above bottom footer */}
                  {warningMsg && (
                    <div className="bg-amber-950/45 border border-amber-500/25 text-amber-200 p-3 rounded-lg flex items-center justify-between gap-3 text-xs font-sans mt-2 animate-fadeIn relative">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] text-amber-500 font-bold bg-amber-955 px-1 py-0.5 rounded border border-amber-800/40">Step blocked</span>
                        <span className="leading-relaxed font-medium">{warningMsg}</span>
                      </div>
                      <button 
                        onClick={() => setWarningMsg(null)}
                        className="text-amber-400 hover:text-amber-100 transition font-bold text-base px-2 cursor-pointer shrink-0"
                        title="Dismiss notice"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {/* NAV FOOTER TO MOVE ACROSS STEPS */}
                  <div className="flex justify-between pt-4 border-t border-slate-800" id="methodology-navigation">
                    <button
                      onClick={handlePrevStep}
                      disabled={currentStep === 1}
                      className={`text-xs px-4 py-2 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        currentStep === 1 
                          ? 'opacity-40 text-slate-600 bg-transparent border border-slate-800' 
                          : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-900'
                      }`}
                    >
                      ← Previous Phase
                    </button>

                    {currentStep < 3 ? (
                      <button
                        onClick={handleNextStep}
                        className="bg-sky-500 hover:bg-sky-600 active:scale-98 text-slate-950 text-xs px-5 py-2.5 rounded-lg font-extrabold transition flex items-center gap-1 shadow shadow-sky-950/20 cursor-pointer"
                      >
                        Advance to Phase {currentStep + 1} <ChevronRight className="w-4 h-4 text-slate-950" />
                      </button>
                    ) : (
                      <button
                        onClick={submitTicketResolution}
                        className="bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-slate-950 text-xs px-6 py-2.5 rounded-lg font-extrabold transition flex items-center gap-1 shadow shadow-emerald-950/30 cursor-pointer animate-pulse"
                      >
                        Document & Force Close Ticket <CheckCircle className="w-4 h-4 text-slate-900" />
                      </button>
                    )}
                  </div>

                </div>

                {/* PC Terminal Logs scrolling board (CRT Styled black console) */}
                <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[280px]">
                  <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center shrink-0">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                      <TerminalIcon className="w-3.5 h-3.5 text-emerald-450 animate-pulse" /> Diagnostic System Feed CLI
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-[11px] leading-relaxed custom-terminal">
                    
                    {actionLogs.map((log, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center gap-1 text-slate-500 border-b border-slate-900 pb-0.5">
                          <span className="text-[9px] bg-slate-900 px-1 py-0.2 rounded border border-slate-800 text-sky-400">Step {log.step}</span>
                          <span>[{log.timestamp.toLocaleTimeString()}]</span>
                          <span className="text-slate-350 font-medium font-sans">{log.actionLabel}</span>
                        </div>
                        <p className="text-emerald-400 whitespace-pre-wrap pl-2 border-l border-emerald-900">{log.response}</p>
                      </div>
                    ))}
                    
                    <div ref={terminalEndRef} />
                  </div>
                </div>

              </div>
              
            </motion.div>
          )}

          {/* REPORT CARD GRADING PANEL */}
          {gameState === 'reported' && activeScenario && (
            <ReportCard
              scenario={activeScenario}
              difficulty={difficulty}
              score={caseScore}
              timeSpent={Math.round(timeElapsed / 60) || 1}
              logs={actionLogs}
              onNext={() => startLabSession()}
              onReturnToDashboard={() => { setGameState('welcome'); }}
              metrics={{
                stepAdherence: Math.max(20, Math.min(100, 100 - actionLogs.filter(log => log.step < 3 && log.actionId.startsWith('replace')).length * 30)),
                accuracy: Math.max(10, 100 - actionLogs.filter(log => log.actionId === 'theory_asserted').length * 20),
                efficiency: Math.max(10, 100 - actionLogs.filter(log => log.actionId.startsWith('replace') && log.actionId !== activeScenario?.hiddenRootCause.correctPlan).length * 25)
              }}
            />
          )}

        </AnimatePresence>
      </main>

      {/* Visual background noise indicator */}
      <footer className="bg-slate-900 border-t border-slate-800 px-6 py-2.5 flex justify-between items-center text-[10px] text-slate-500 shrink-0 font-mono">
        <span>© 2026 CompTIA A+ Core 1 Workbench Simulator</span>
        <span>Ready State • Domain 5.0 Core Objectives</span>
      </footer>

    </div>
  );
}
