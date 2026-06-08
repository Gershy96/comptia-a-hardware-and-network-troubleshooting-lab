/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scenario, Action } from './types';

export const GLOBAL_ACTIONS: Action[] = [
  // --- Visual Inspection ---
  { id: 'inspect_cables', label: 'Inspect physical external cables & slots', category: 'visual', timeMinutes: 5, comptiaStep: 1, hints: 'Verifies external monitors, power wires, and device plugs.' },
  { id: 'check_monitor_power', label: 'Check monitor status indicator & power switch', category: 'visual', timeMinutes: 3, comptiaStep: 1, hints: 'Is the display actually turned on?' },
  { id: 'inspect_fans', label: 'Inspect CPU, GPU, and chassis fans for rotation', category: 'visual', timeMinutes: 5, comptiaStep: 1, hints: 'Tests for physical dust clogs or dead cooling systems.' },
  { id: 'examine_capacitors', label: 'Inspect motherboard for distended/swollen capacitors', category: 'visual', timeMinutes: 10, comptiaStep: 1, hints: 'Swollen capacitors leak brown fluid or bulge.' },
  { id: 'verify_psu_connections', label: 'Check ATX 24-pin and CPU EPS 8-pin power plugs', category: 'visual', timeMinutes: 5, comptiaStep: 1, hints: 'Checks if internal supply rails are fully seated.' },
  
  // --- Hardware Actions ---
  { id: 'reseat_ram', label: 'Reseat memory modules in RAM slots', category: 'hardware', timeMinutes: 10, comptiaStep: 4, hints: 'Secures RAM contact plates into motherboard DIMM lanes.' },
  { id: 'replace_ram', label: 'Install brand-new RAM modules', category: 'hardware', timeMinutes: 15, comptiaStep: 4, hints: 'Replaces defective or incompatible RAM modules.' },
  { id: 'reseat_gpu', label: 'Reseat PCI-Express graphics card', category: 'hardware', timeMinutes: 12, comptiaStep: 4, hints: 'Ensures the GPU is correctly engaged in the primary slot.' },
  { id: 'replace_gpu', label: 'Install replacement graphics card', category: 'hardware', timeMinutes: 15, comptiaStep: 4, hints: 'Replaces faulty GPU circuits or VRAM chips.' },
  { id: 'reconnect_storage', label: 'Reconnect power & data cables on the drive', category: 'hardware', timeMinutes: 8, comptiaStep: 4, hints: 'Insures firm attachment for SATA power/data or NVMe screws.' },
  { id: 'replace_storage', label: 'Install brand-new storage drive (SSD/HDD)', category: 'hardware', timeMinutes: 20, comptiaStep: 4, hints: 'Overcomes severe drive failures, bad sectors, or mechanical clicks.' },
  { id: 'replace_cmos', label: 'Install new CR2032 CMOS battery cell', category: 'hardware', timeMinutes: 5, comptiaStep: 4, hints: 'Restores the volatile BIOS memory clocks and preferences.' },
  { id: 'replace_psu', label: 'Install new 650W Power Supply Unit (PSU)', category: 'hardware', timeMinutes: 25, comptiaStep: 4, hints: 'Resolves failing rails or fluctuating voltage outputs.' },
  { id: 'replace_motherboard', label: 'Install brand-new motherboard swap', category: 'hardware', timeMinutes: 45, comptiaStep: 4, hints: 'Resolves cracked board traces, general failures, or blown capacitors.' },
  { id: 'replace_cpu', label: 'Install new CPU swap in socket', category: 'hardware', timeMinutes: 30, comptiaStep: 4, hints: 'Overcomes fried silicon or internal core malfunctions.' },
  { id: 'clean_dust', label: 'Clean heavy dust build-up with compressed air', category: 'hardware', timeMinutes: 10, comptiaStep: 4, hints: 'Restores unobstructed airflow to clogged heatsinks.' },
  { id: 'apply_thermal', label: 'Clean old paste and apply new thermal compound', category: 'hardware', timeMinutes: 15, comptiaStep: 4, hints: 'Ensures optimal heat transfer between CPU lid and cooler.' },

  // --- Software / BIOS Actions ---
  { id: 'enter_bios', label: 'Boot up computer and access UEFI/BIOS menus', category: 'software_bios', timeMinutes: 5, comptiaStep: 1, hints: 'Verifies motherboard startup, system time, and asset specs.' },
  { id: 'reset_bios', label: 'Clear BIOS memory via jumper or temporary CMOS battery removal', category: 'software_bios', timeMinutes: 10, comptiaStep: 4, hints: 'Wipes corrupted states, incorrect voltage tweaks, or boot loops.' },
  { id: 'load_defaults', label: 'Restore default original optimized BIOS configuration', category: 'software_bios', timeMinutes: 5, comptiaStep: 4, hints: 'Restores stable factory defaults for non-POSTing boards.' },
  { id: 'verify_boot_order', label: 'Verify boot priority queue on primary storage', category: 'software_bios', timeMinutes: 4, comptiaStep: 1, hints: 'Assures the primary OS partition drive is checked first.' },
  { id: 'check_cpu_temp', label: 'Inspect CPU 온도 (temperature level) inside BIOS monitor', category: 'software_bios', timeMinutes: 3, comptiaStep: 3, hints: 'Checks temperature parameters without booting OS.' },
  { id: 'check_mem_amount', label: 'Inspect BIOS to verify system RAM count', category: 'software_bios', timeMinutes: 3, comptiaStep: 3, hints: 'Sees if BIOS recognizes all installed RAM bars.' },
  { id: 'update_bios', label: 'Flash firmware patch to latest stable BIOS version', category: 'software_bios', timeMinutes: 15, comptiaStep: 4, hints: 'Applies motherboards firmware updates for hardware compatibility.' },

  // --- Diagnostics & Tests ---
  { id: 'boot_min_components', label: 'Boot system with bare minimum components only', category: 'testing', timeMinutes: 15, comptiaStep: 3, hints: 'Disconnects non-essential USBs, GPU (if onboard exists), extra RAM, HDDs.' },
  { id: 'use_known_good_ram', label: 'Test with verified known-good RAM from the lab', category: 'testing', timeMinutes: 12, comptiaStep: 3, hints: 'Bypasses current RAM modules to determine if they are faulty.' },
  { id: 'use_known_good_psu', label: 'Connect known-good bench top test PSU', category: 'testing', timeMinutes: 15, comptiaStep: 3, hints: 'Checks if power issues persist using a reliable tester supply.' },
  { id: 'test_onboard_graphics', label: 'Test on-board integrated graphics (CPU port)', category: 'testing', timeMinutes: 8, comptiaStep: 3, hints: 'Verifies if an add-in discrete card is causing visual failures.' },
  { id: 'run_mem_test', label: 'Boot MemTest86 tool from diagnostic USB drive', category: 'testing', timeMinutes: 30, comptiaStep: 3, hints: 'Conducts full hardware scan of all addresses.' },
  { id: 'run_smart_test', label: 'Execute SMART diagnostic tool on storage media', category: 'testing', timeMinutes: 15, comptiaStep: 3, hints: 'Retrieves raw sector stats, bad blocks, or wear indices.' },
  { id: 'run_chkdsk', label: 'Boot into Recovery Console and run chkdsk /f /r', category: 'testing', timeMinutes: 25, comptiaStep: 4, hints: 'Repairs logical file system structures and relocates directories.' },
  { id: 'boot_usb', label: 'Attempt to boot from a live Linux OS utility USB', category: 'testing', timeMinutes: 10, comptiaStep: 3, hints: 'Bypasses internal drives to check if system is physically stable.' },

  // --- Network, Printer, and Device Actions ---
  { id: 'check_ip_config', label: 'Run command "ipconfig /all" on host machine', category: 'software_bios', timeMinutes: 3, comptiaStep: 1, hints: 'Examines IP addresses, subnets, and DHCP servers.' },
  { id: 'ping_gateway', label: 'Ping default gateway & public address 8.8.8.8', category: 'testing', timeMinutes: 4, comptiaStep: 3, hints: 'Pins local connections first and then internet DNS.' },
  { id: 'nslookup_query', label: 'Query DNS lookup queries using nslookup', category: 'testing', timeMinutes: 4, comptiaStep: 3, hints: 'Checks whether DNS is resolving domain names into valid IPs.' },
  { id: 'printer_test_page', label: 'Print a local printer utility test configurations page', category: 'testing', timeMinutes: 5, comptiaStep: 3, hints: 'Triggers printer mechanical test without loading full OS files.' },
  { id: 'clean_printheads', label: 'Trigger inkjet system software nozzle clean cycle', category: 'hardware', timeMinutes: 10, comptiaStep: 4, hints: 'Removes dried ink clogs from cartridge nozzles.' },
  { id: 'replace_toner', label: 'Install brand-new laser toner cartridge', category: 'hardware', timeMinutes: 8, comptiaStep: 4, hints: 'Replaces dry or expended carbon toner powder and drums.' },
  { id: 'replace_ink', label: 'Install replacement ink fluid cartridges', category: 'hardware', timeMinutes: 8, comptiaStep: 4, hints: 'Solves faded prints or empty/clogged single colors.' },
  { id: 'inspect_fuser', label: 'Examine laser fuser assembly for scores/scratches', category: 'visual', timeMinutes: 10, comptiaStep: 1, hints: 'The fuser melts toner particles onto paper fibers.' },
  { id: 'measure_wifi_signal', label: 'Measure regional wireless RF spectrum (RSSI dbm)', category: 'testing', timeMinutes: 5, comptiaStep: 1, hints: 'Unveils weak signal areas or major interferences.' },
  { id: 'enable_disable_wifi', label: 'Toggle device network adapter/Airplane state', category: 'software_bios', timeMinutes: 3, comptiaStep: 4, hints: 'Resets network adapter software driver stack.' },
  { id: 'forget_wifi_network', label: 'Forget Wi-Fi profile and rejoin with correct key', category: 'software_bios', timeMinutes: 4, comptiaStep: 4, hints: 'Solves incorrect cache keys or authenticated rejections.' },
  { id: 'reboot_router', label: 'Power cycle local router / Wireless WAP', category: 'hardware', timeMinutes: 8, comptiaStep: 4, hints: 'Clears hung DHCP tables or frozen router processes.' },
  { id: 'iphone_battery_test', label: 'Review mobile battery health metrics in system settings', category: 'testing', timeMinutes: 3, comptiaStep: 1, hints: 'Reads overall maximum capacity percentages.' },
  { id: 'recalibrate_touchscreen', label: 'Run mobile touch sensor overlay calibration', category: 'software_bios', timeMinutes: 8, comptiaStep: 4, hints: 'Resets capacitive grids responding in wrong positions.' },
  { id: 'toggle_bluetooth', label: 'Reset Bluetooth and delete old device pairings', category: 'software_bios', timeMinutes: 4, comptiaStep: 4, hints: 'Restores paired status parameters with standard headset.' },
  { id: 'change_resolution', label: 'Adjust display adapter resolution & native aspect ratio', category: 'software_bios', timeMinutes: 5, comptiaStep: 4, hints: 'Fixes stretched, squashed, fuzzy, or mismatched video output issues.' },
  { id: 'rebuild_raid', label: 'Replace failed storage disk and rebuild RAID array redundancy', category: 'hardware', timeMinutes: 30, comptiaStep: 4, hints: 'Restores data parity redundancy across multi-drive partitions.' },
  { id: 'change_wifi_channel', label: 'Configure wireless WAP channel to non-overlapping frequency', category: 'software_bios', timeMinutes: 8, comptiaStep: 4, hints: 'Bypasses RF congestion or co-channel interference on the 2.4GHz band.' },
  { id: 'replace_fuser', label: 'Replace defective or degraded laser printer fuser assembly', category: 'hardware', timeMinutes: 20, comptiaStep: 4, hints: 'Resolves persistent ghosting or toner smudges that rub off paper easily.' },
  { id: 'disable_eee', label: 'Disable Energy Efficient Ethernet (EEE) / Green Ethernet on switchport', category: 'software_bios', timeMinutes: 10, comptiaStep: 4, hints: 'Resolves port flapping or auto-negotiation link cycle drops.' },
  { id: 'configure_qos', label: 'Configure Quality of Service (QoS / DSCP priority) on the router', category: 'software_bios', timeMinutes: 12, comptiaStep: 4, hints: 'Prioritizes real-time VoIP traffic to solve jitter and latency spikes.' },
  { id: 'replace_ethernet_cable', label: 'Replace RJ-45 copper ethernet patch cable with certified Cat6', category: 'hardware', timeMinutes: 5, comptiaStep: 4, hints: 'Fixes structural link flapping, physical layer CRC errors, or packet loss.' },
  { id: 'run_pixel_scrub', label: 'Run pixel refresher white-noise cycle and enable automated screensaver mode', category: 'software_bios', timeMinutes: 20, comptiaStep: 4, hints: 'Helps disperse persistent image retention or ghost silhouettes on OLED/LCD panels.' },
  { id: 'replace_lcd_panel', label: 'Install brand-new replacement physical LCD monitor panel', category: 'hardware', timeMinutes: 25, comptiaStep: 4, hints: 'Removes permanently stuck or unresponsive subpixel nodes and static lines.' },
  { id: 'replace_projector_bulb_filter', label: 'Replace the projector bulb and wash out clogged physical dust filters', category: 'hardware', timeMinutes: 15, comptiaStep: 4, hints: 'Solves automatic safety thermal shutdown due to restricted cooling lamps.' },
  { id: 'rebuild_bcd', label: 'Boot command line and run "bootrec /rebuildbcd"', category: 'software_bios', timeMinutes: 15, comptiaStep: 4, hints: 'Reconstructs damaged Windows Boot Configuration Data store.' },
  { id: 'replace_pickup_rollers', label: 'Replace worn rubber pickup feed rollers and clear secondary paper paths', category: 'hardware', timeMinutes: 15, comptiaStep: 4, hints: 'Stops misfeeds, multi-sheet pulling, or physical friction page jams.' },
  { id: 'replace_imaging_drum', label: 'Replace the independent laser imaging drum subunit', category: 'hardware', timeMinutes: 10, comptiaStep: 4, hints: 'Fixes parallel line scratches, black dots, or vertical smears repeating down pages.' },
  { id: 'replace_impact_ribbon', label: 'Install replacement inked carbon ribbon cartridge and calibrate print head spacing', category: 'hardware', timeMinutes: 12, comptiaStep: 4, hints: 'Restores faint ink impressions on dot-matrix multipart carbon forms.' },
  { id: 'replace_mobile_screen', label: 'Install replacement laminated glass touchscreen assembly', category: 'hardware', timeMinutes: 30, comptiaStep: 4, hints: 'Restores vision and digitizer paths on cracked or shattered devices.' },
  { id: 'replace_mobile_battery', label: 'Replace degraded swollen or overheating Li-ion battery pack', category: 'hardware', timeMinutes: 20, comptiaStep: 4, hints: 'Fixes excessive thermal cycles, bulging rear covers, or fast draining.' },
  { id: 'run_malware_scan', label: 'Boot in Safe Mode and execute complete anti-malware isolation sweep', category: 'software_bios', timeMinutes: 25, comptiaStep: 4, hints: 'Quarantines malicious miners, popups, or spy daemons chewing battery/cpu cycles.' },
  { id: 'disassemble_dry_device', label: 'Disassemble device, bathe board in 99% isopropyl alcohol, and dry completely', category: 'hardware', timeMinutes: 45, comptiaStep: 4, hints: 'Cleans mineral salts, active corrosion, or residual liquids shorting sub-circuits.' },
  { id: 'reseat_atx_connector', label: 'Reseat the ATX 24-pin and CPU EPS 8-pin power connectors on motherboard', category: 'hardware', timeMinutes: 8, comptiaStep: 4, hints: 'Secures high-current lines that may be slightly loose or high-resistance.' },
  { id: 'replace_modular_psu_cable', label: 'Replace individual modular PSU power cabling branch', category: 'hardware', timeMinutes: 10, comptiaStep: 4, hints: 'Ensures dedicated wires are plugged firmly into the power supply chassis port.' },
  { id: 'reseat_cpu_pins', label: 'Remove cooler, lift CPU retention arm, inspect pins, and reseat processor', category: 'hardware', timeMinutes: 25, comptiaStep: 4, hints: 'Corrects misalignment, uneven pressure, or thermal cutout POST fail.' },
  { id: 'upgrade_system_ram', label: 'Install additional matching RAM capacity module', category: 'hardware', timeMinutes: 15, comptiaStep: 4, hints: 'Increases active storage limits to prevent sluggish disk file swaps.' },
  { id: 'inspect_paper_rollers', label: 'Inspect rubber feed rollers and tray registration guides for paper dust & debris', category: 'visual', timeMinutes: 4, comptiaStep: 1, hints: 'Checks for paper scraps, stuck labels, or a layer of fine glazed paper dust.' },
  { id: 'check_link_lights', label: 'Check RJ-45 LAN port and network switch Link/Activity LED indicators', category: 'visual', timeMinutes: 3, comptiaStep: 1, hints: 'Verifies physical layer connectivity, carrier signals, and port speed lights.' },
  { id: 'inspect_sata_connectors', label: 'Examine SATA power/data wire shielding and drive ports under flashlight', category: 'visual', timeMinutes: 5, comptiaStep: 1, hints: 'Inspects connector terminals for cracked plastic guides or bent copper pins.' },
  { id: 'examine_cpu_socket', label: 'Inspect motherboard CPU LGA socket pins and processor contact pad with magnifier', category: 'visual', timeMinutes: 15, comptiaStep: 1, hints: 'Checks for bent socket grid pins, missing thermal paste spacing, or oxidation.' },
  { id: 'inspect_pcie_slot', label: 'Examine PCIe expansion slots and gold edge contact fingers on discrete cards', category: 'visual', timeMinutes: 6, comptiaStep: 1, hints: 'Looks for slot misalignment, surface oxidation, dust clusters, or physical scratches.' },
  { id: 'inspect_display_backlight', label: 'Examine dark display panel with flash light for faint image shapes & shadows', category: 'visual', timeMinutes: 5, comptiaStep: 1, hints: 'A visible shadow image indicates active LCD pixels but a failed backlight or inverter.' },
  { id: 'sniff_components', label: 'Olfactory scan: Sniff for ozone, electrical burning, or acrid silicone smoke', category: 'visual', timeMinutes: 2, comptiaStep: 1, hints: 'Helps track down components experiencing active short circuits or thermal failure.' },
  { id: 'inspect_mobile_port', label: 'Examine mobile USB-C/Lightning charge port for socket obstructions or pin corrosion', category: 'visual', timeMinutes: 4, comptiaStep: 1, hints: 'Checks for impacted pocket lint, pocket debris, or oxidized copper terminals.' },
  { id: 'check_event_viewer', label: 'Open OS event logs and inspect Event Viewer / System Crash records', category: 'software_bios', timeMinutes: 8, comptiaStep: 1, hints: 'Uncovers BSOD error bugcheck codes, storage subsystem warnings, or device failures.' },
  { id: 'check_device_manager', label: 'Open Device Manager and verify hardware adapter driver assignment & status', category: 'software_bios', timeMinutes: 4, comptiaStep: 1, hints: 'Flags missing drivers, adapter disable states, or yellow alert warning symbols.' },
  { id: 'check_dhcp_lease', label: 'Verify local DHCP server client lease pools and active scope reservations', category: 'software_bios', timeMinutes: 5, comptiaStep: 1, hints: 'Determines if the router is out of IP addresses or rejecting DHCP requests.' },
  { id: 'check_spooler_status', label: 'Examine local print spooler service state and active print queue status', category: 'software_bios', timeMinutes: 4, comptiaStep: 1, hints: 'Checks if stuck/corrupted spool files have crashed the system print daemon.' },
  { id: 'check_mobile_usage', label: 'Check active mobile system CPU core and storage consumption charts', category: 'software_bios', timeMinutes: 5, comptiaStep: 1, hints: 'Identifies if rogue background processes are hogging processing cycles.' },
  { id: 'check_raid_console', label: 'Access SATA RAID configuration utility / controller BIOS dashboard', category: 'software_bios', timeMinutes: 6, comptiaStep: 1, hints: 'Checks if virtual array status is degraded, rebuilding, or offline.' },
  { id: 'measure_multimeter_voltages', label: 'Measure ATX power supply rails with digital multimeter voltage tester', category: 'testing', timeMinutes: 8, comptiaStep: 3, hints: 'Directly tests the actual +12V, +5V, and +3.3V power rails for stability.' },
  { id: 'test_cable_continuity', label: 'Run ethernet cable continuity tester on local network drop lines', category: 'testing', timeMinutes: 5, comptiaStep: 3, hints: 'Checks individual copper wire pairs for opens, shorts, split pairs, or cross wiring.' },
  { id: 'run_traceroute', label: 'Execute pathping / traceroute tracking towards external gateway', category: 'testing', timeMinutes: 5, comptiaStep: 3, hints: 'Identifies exactly which router hop is failing or dropping packets.' },
  { id: 'wireshark_packet_capture', label: 'Perform light Wireshark network protocol capture analysis', category: 'testing', timeMinutes: 10, comptiaStep: 3, hints: 'Examines TCP stream sequence, broadcast storms, or excessive packet drops.' },
  { id: 'test_outlet_receptacle', label: 'Verify wall electrical outlet electrical grounds using a receptacle tester', category: 'testing', timeMinutes: 4, comptiaStep: 3, hints: 'Tests for hot-neutral reversals, missing grounds, or faulty wall wiring.' },
  { id: 'test_display_patterns', label: 'Review custom diagnostic solid-color panels and grid test patterns', category: 'testing', timeMinutes: 4, comptiaStep: 3, hints: 'Exposes dead subpixels, display ghost residues, or backplane flickering.' },
];

export const SCENARIOS: Scenario[] = [
  {
    id: 'scen_001_motherboard_caps',
    title: 'PC Randomly Restarts or Powers Off under Load',
    subsystem: 'Motherboard',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-901',
      clientName: 'Sarah Jenkins',
      userDepartment: 'Accounting Dept',
      assetTag: 'AST-8812',
      role: 'Senior Accountant',
      urgency: 'High',
      submittedTime: '30 mins ago',
      description: 'The system boots up fine but shuts down or reboots without warning whenever I run large monthly spreadsheet macros or run backup scripts. It does not display a blue screen, it just goes black instantly like a power cutoff.'
    },
    specification: {
      cpu: 'Intel Core i5-11400',
      motherboard: 'ASUS Prime H510M',
      ram: '16GB DDR4 (Single Channel)',
      gpu: 'Intel UHD Graphics 730 (Onboard)',
      psu: 'Standard 400W OEM Power Supply',
      storage: '512GB NVMe SSD',
      os: 'Windows 10 Enterprise x64'
    },
    hiddenRootCause: {
      component: 'Motherboard Capacitors',
      shortDescription: 'Blown/bulging electrolytic capacitors on the motherboard VRM section.',
      detailedCause: 'Overloaded system draws extra current from the unstable power phases where capacitors are leaking/swollen, triggering safety shutdowns.',
      possibleTheories: [
        'Insufficent PSU wattage under full CPU workload',
        'Leaking or bloated electrolytic/VRM capacitors on the motherboard',
        'CPU over-temperature thermal throttling',
        'Failing NVMe SSD controller chip'
      ],
      correctTheory: 'Leaking or bloated electrolytic/VRM capacitors on the motherboard',
      requiredTests: ['examine_capacitors'],
      correctPlan: 'replace_motherboard',
      correctVerification: 'replace_motherboard', // Standard resolution for swollen caps on A+ is board swap
      correctPreventive: 'replace_motherboard' // We will handle these carefully in the custom UI comparison
    },
    symptoms: [
      'Instant lockups under heavy CPU arithmetic loads.',
      'A faint, strange metallic smell coming from inside the system case.',
      'No blue screen dump generated in Windows.'
    ],
    actionResponses: {
      'inspect_cables': { text: 'External cables are connected cleanly. Wall outlet supply is stable.' },
      'inspect_fans': { text: 'CPU cooler and power supply fans are spinning smoothly and clean.' },
      'examine_capacitors': {
        text: 'PHYSICAL ALERT: Several electrolytic cylinders surrounding the CPU socket are visibly bulging on top, and two have leaked a brown crusty residue onto the circuit board!',
        revealsRootCause: true,
        isClue: true
      },
      'verify_psu_connections': { text: 'Main 24-pin and CPU EPS 8-pin connectors are plugged in securely.' },
      'reseat_ram': { text: 'The memory module has been reseated. System still boots first, but cuts off under load.' },
      'replace_ram': { text: 'Replaced with standard DDR4 test RAM. Shutdowns still occur when stress benchmarks are launched.' },
      'replace_psu': { text: 'Replaced with standard test PSU. Behavior remains identical: instantaneous power loss under stress.' },
      'replace_motherboard': {
        text: 'Success! After swapping the motherboard with a high-grade ASUS H510M, the system runs all stressful macros and benchmarks for an hour with zero stability issues. Solved!',
        revealsRootCause: true
      },
      'enter_bios': { text: 'You enter UEFI. BIOS options are clear. Voltages show up, but CPU Core voltage fluctuates slightly.' },
      'check_cpu_temp': { text: 'CPU Temp monitor in UEFI reads 41°C. Well within safe operational guidelines.' },
      'check_mem_amount': { text: 'BIOS reads full 16384 MB DDR4 successfully.' },
      'use_known_good_ram': { text: 'Testing memory with laboratory module reports identical random system crashes under loading.' },
      'use_known_good_psu': { text: 'Temporary bench PSU connected. CPU bench workload still triggers instant black-out.' },
      'run_mem_test': { text: 'MemTest86 ran 1 pass. No RAM errors located. CPU load shutdown occurred halfway into Pass 2.' },
      'run_smart_test': { text: 'SMART attributes are healthy. 0 relocated sectors. SSD physical status stands at 98%.' },
      'boot_min_components': { text: 'Bare minimum systems still boot. However, any heavy stress application trips power.' }
    },
    explanation: 'Bloated and leaking electrolytic capacitors are unable to regulate smooth DC voltage to high-demand areas like the CPU. Under stress (e.g. spreadsheet calculations), the drop in signal stability results in immediate power-down. Swapping the motherboard is the recommended CompTIA resolution.',
    comptiaObjectives: ['Domain 5.1 - Given a scenario, troubleshoot problems related to motherboards, RAM, CPU, and power.']
  },
  {
    id: 'scen_002_ram_intermittent',
    title: 'Random Blue Screens (BSOD) and Memory Errors',
    subsystem: 'RAM',
    difficultyRating: 'Easy',
    ticket: {
      id: 'TKT-104',
      clientName: 'Daniel Vance',
      userDepartment: 'Creative Studio',
      assetTag: 'AST-6601',
      role: 'Content Creator',
      urgency: 'Medium',
      submittedTime: '1 hr ago',
      description: 'I keep getting random Blue Screens of Death (BSOD) referring to PAGE_FAULT_IN_NONPAGED_AREA or MEMORY_MANAGEMENT. It occurs randomly, sometimes when using Photoshop, sometimes just browsing.'
    },
    specification: {
      cpu: 'AMD Ryzen 5 5600X',
      motherboard: 'MSI B550-A PRO',
      ram: '16GB DDR4 (2x 8GB Modules)',
      gpu: 'NVIDIA GeForce RTX 3060',
      psu: '650W Bronze Certified Power',
      storage: '1TB NVMe SSD',
      os: 'Windows 11 Professional'
    },
    hiddenRootCause: {
      component: 'RAM module',
      shortDescription: 'Defective primary RAM stick in slot 2 failing hardware checksum tests.',
      detailedCause: 'Corruption in physical DDR4 addresses triggers memory allocation errors in executive system space, prompting core kernel traps (BSOD).',
      possibleTheories: [
        'Storage drive page file depletion',
        'Corrupted Windows graphics device drivers',
        'Faulty or degrading RAM modules failing memory tests',
        'Outdated UEFI BIOS microcode'
      ],
      correctTheory: 'Faulty or degrading RAM modules failing memory tests',
      requiredTests: ['run_mem_test'],
      correctPlan: 'replace_ram',
      correctVerification: 'replace_ram',
      correctPreventive: 'replace_ram'
    },
    symptoms: [
      'Frequent sporadic BSOD with varying memory address codes.',
      'System freezes briefly during file decompression tasks.',
      'Applications crash suddenly directly to Desktop without errors.'
    ],
    actionResponses: {
      'inspect_cables': { text: 'Cables are fine. Video connections are tight.' },
      'inspect_fans': { text: 'All fans running cleanly; temperatures are within specification.' },
      'examine_capacitors': { text: 'Motherboard capacitors look healthy and completely flat on top.' },
      'reseat_ram': { text: 'You reseated both RAM sticks securely. However, the random crashes and crash dumps persist.' },
      'replace_ram': {
        text: 'Success! Replacing both RAM modules with a matching set of verified RAM eliminates all BSOD codes, and Photoshop exports finish cleanly.',
        revealsRootCause: true
      },
      'use_known_good_ram': {
         text: 'CHALLENGE VERIFIED: Swapping active slots with lab RAM terminates all system crash traces. SMART metrics are steady.',
         revealsRootCause: true,
         isClue: true
      },
      'run_mem_test': {
        text: 'DIAGNOSTIC CRITICAL: MemTest86 logs multiple Red Error alerts in region 0x01FA9B0 on module A. Defective hardware detected!',
        revealsRootCause: true,
        isClue: true
      },
      'enter_bios': { text: 'BIOS works. RAM speed configured to XMP Profile 1 at 3200MHz.' },
      'check_mem_amount': { text: 'BIOS reports all 16384 megabytes are acknowledged.' },
      'run_smart_test': { text: 'SMART parameters check is perfect. Non-drive system issue.' },
      'reconnect_storage': { text: 'NVMe connector is tightly installed in socket. No effect.' },
      'replace_psu': { text: 'Power lines are stable. Swap of power units has zero effect on memory management crashes.' }
    },
    explanation: 'Failing silicon inside RAM modules results in corrupt address mappings. Under loaded conditions, the processor receives bad data frames and triggers a protective MEMORY_MANAGEMENT BSOD. Memory diagnostics verify failures, and modular replacements solve it.',
    comptiaObjectives: ['Domain 5.1 - Given a scenario, troubleshoot problems related to motherboards, RAM, CPU, and power.']
  },
  {
    id: 'scen_003_cpu_thermal',
    title: 'PC Randomly Shuts Down During Compilation',
    subsystem: 'CPU',
    difficultyRating: 'Easy',
    ticket: {
      id: 'TKT-211',
      clientName: 'Alex Mercer',
      userDepartment: 'Software Engineering',
      assetTag: 'AST-1191',
      role: 'Backend Java Developer',
      urgency: 'High',
      submittedTime: '2 hrs ago',
      description: 'My desktop computer runs fine when typing code, but shuts down completely within 3 minutes of launching Docker builds or compiling complex Java packages. I can hear the fans roaring like a jet engine right before the PC turns black.'
    },
    specification: {
      cpu: 'AMD Ryzen 9 5900X (12 Cores)',
      motherboard: 'ASRock X570 Creator',
      ram: '32GB DDR4',
      gpu: 'AMD Radeon RX 580',
      psu: '750W Gold Rated PSU',
      storage: '2TB NVMe SSD',
      os: 'Ubuntu Desktop 22.04 LTS'
    },
    hiddenRootCause: {
      component: 'Thermal Compound / CPU Cooling',
      shortDescription: 'Dried thermal paste and a dusty, poorly mounted CPU heatsink block.',
      detailedCause: 'Thermal interface paste transformed into hardened, air-trapping crust, causing internal CPU junction temperature to reach 105°C and trigger native thermal shutdown protection.',
      possibleTheories: [
        'Insufficient system RAM for Docker environments',
        'CPU heatsink displacement or dried thermal paste failing thermal transfer',
        'Failing power supply under 12V GPU rails induction',
        'Faulty motherboard voltage regulator modules (VRM)'
      ],
      correctTheory: 'CPU heatsink displacement or dried thermal paste failing thermal transfer',
      requiredTests: ['check_cpu_temp', 'inspect_fans'],
      correctPlan: 'apply_thermal',
      correctVerification: 'apply_thermal',
      correctPreventive: 'apply_thermal'
    },
    symptoms: [
      'The CPU cooling fan speed jumps to maximum instantly upon compiler startup.',
      'The tower case feels very hot to the touch near the top vents.',
      'Immediate power-off without any kernel oops or OS system error warnings.'
    ],
    actionResponses: {
      'inspect_fans': {
        text: 'PHYSICAL OBSERVATION: The CPU fan is turning but feels bogged down. Heavy blankets of gray dust have fully choked the cooling fins of the heatsink assembly.',
        isClue: true
      },
      'check_cpu_temp': {
        text: 'UEFI MONITOR WARNING: CPU temperature is hovering at a dangerous 89°C at idle and climbs to 104°C within seconds, triggering thermal safety shutdowns.',
        revealsRootCause: true,
        isClue: true
      },
      'apply_thermal': {
        text: 'Success! You clean off old, dry, fossilized thermal paste from the CPU lid and apply premium high-integrity compound. You blow all dust out of the fins. Now core temp resides at a chilly 35°C idle and peaks at 71°C during compiled loads.',
        revealsRootCause: true
      },
      'clean_dust': {
        text: 'You blew dust out of the metal cooler lines. Airflow is recovered, but temp stays elevated at 80°C. Paste must still be renewed.',
        isClue: true
      },
      'inspect_cables': { text: 'Cables are configured properly. Cooler power wire is connected to CPU_FAN header.' },
      'replace_cpu': { text: 'Replaced CPU. But without new paste or fixing the mounted assembly, thermal retention persists.' },
      'replace_psu': { text: 'You installed a test PSU. Systems still shut down under compiler stress.' },
      'run_mem_test': { text: 'RAM tests clear. System did not halt during passes as RAM draws very low power.' },
      'enter_bios': { text: 'UEFI displays that CPU voltage is set at stock 1.35V. Normal values.' }
    },
    explanation: 'CPUs integrate protective thermostats to prevent physical silicon meltdown. If thermal paste dries out or the heatsink fills with dust, excessive thermal resistance causes the temperature to spike, inducing a hard shutdown. Renewing thermal paste and cleaning dust maintains safe operational cooling.',
    comptiaObjectives: ['Domain 5.1 - Given a scenario, troubleshoot problems related to motherboards, RAM, CPU, and power.']
  },
  {
    id: 'scen_004_psu_voltage',
    title: 'Computer Shuts Down Randomly While Gaming',
    subsystem: 'Power Supply',
    difficultyRating: 'Hard',
    ticket: {
      id: 'TKT-304',
      clientName: 'Gavin Martinez',
      userDepartment: '3D Simulation Branch',
      assetTag: 'AST-5521',
      role: 'Game Designer',
      urgency: 'Medium',
      submittedTime: '3 hrs ago',
      description: 'The machine starts perfectly, allows me to read emails, and compile light models. However, within minutes of starting GPU Unreal Engine benchmarks, the entire station immediately turns off.'
    },
    specification: {
      cpu: 'Intel Core i9-12900K',
      motherboard: 'GIGABYTE Z690 AORUS',
      ram: '32GB DDR5',
      gpu: 'NVIDIA GeForce RTX 4080 (320W peak)',
      psu: 'A generic older 500W PSU',
      storage: '1TB NVMe, 2TB HDD',
      os: 'Windows 11 Setup'
    },
    hiddenRootCause: {
      component: 'Power Supply Unit (PSU)',
      shortDescription: 'Inadequate and degraded power supply wattage causing voltage sag under 12V GPU loads.',
      detailedCause: 'The RTX 4080 and i9-12900K draw massive current spikes on the 12V power supply lines. The poor quality 500W unit sags under load, tripping internal Over Current Protection (OCP).',
      possibleTheories: [
        'Defective dedicated GPU microcode/drivers',
        'Corrupted operating system files on the mechanical HDD',
        'Inadequate Power Supply wattage rating triggering Over-Current safety cuts under system stress',
        'Memory errors inside secondary DDR5 modules'
      ],
      correctTheory: 'Inadequate Power Supply wattage rating triggering Over-Current safety cuts under system stress',
      requiredTests: ['use_known_good_psu', 'boot_min_components'],
      correctPlan: 'replace_psu',
      correctVerification: 'replace_psu',
      correctPreventive: 'replace_psu'
    },
    symptoms: [
      'Unannounced, absolute power failure under dual CPU/GPU loading loops.',
      'Chassis stays lit if system is idle.',
      'Standard calculations run safely for hours.'
    ],
    actionResponses: {
      'inspect_cables': { text: 'You inspect the physical lines. An adapter cable is daisy-chained onto the massive RTX card. Suspect setup.' },
      'verify_psu_connections': { text: 'Internal board plugs are clean. The generic PSU feels incredibly hot to the touch.' },
      'use_known_good_psu': {
        text: 'SUCCESS CONFIRMED: Bringing in a high-grade 850W diagnostic power supply from the test bay allows the computer to run the Unreal Engine workload for hours without a single cutoff!',
        revealsRootCause: true,
        isClue: true
      },
      'replace_psu': {
        text: 'Success! You install a solid 850W Gold Certified PSU with dedicated 12VHPWR cables. The powerhouse runs smoothly under total workstation loading.',
        revealsRootCause: true
      },
      'boot_min_components': {
        text: 'Bare minimum setup (using onboard graphics with RTX removed) runs system stress tools indefinitely without a single power issue, validating that power draw is the culprit.',
        isClue: true
      },
      'replace_gpu': { text: 'Replacing the GPU with an RTX 3050 stops the crashes. But that is because of lower power demand, rather than GPU failure.' },
      'enter_bios': { text: 'UEFI BIOS voltage readings show 12V line sitting at 11.4V. This is highly degraded and unstable (well below the ±5% ATX limit of 11.4V - 12.6V).' },
      'run_mem_test': { text: 'MemTest86 reports DDR5 modules are perfectly functional.' }
    },
    explanation: 'Modern high-end GPUs draw short, immense power spikes from the +12V rail. If a PSU is rated below the system requirement or is degraded, it cannot sustain the voltage, causing the internal protective circuitry (Over-Current / Over-Power Protection) to shut it down. UPgrading the system with a high-quality 850W unit resolves the issue permanently.',
    comptiaObjectives: ['Domain 5.1 - Given a scenario, troubleshoot problems related to motherboards, RAM, CPU, and power.', 'Domain 5.5 - Given a scenario, troubleshoot power supply issues.']
  },
  {
    id: 'scen_005_storage_unrecognized',
    title: 'Computer Boots Directly to BIOS - "No Bootable Drive" Error',
    subsystem: 'Storage',
    difficultyRating: 'Easy',
    ticket: {
      id: 'TKT-412',
      clientName: 'Chloe Bennett',
      userDepartment: 'HR Operations',
      assetTag: 'AST-3301',
      role: 'Recruiter Specialist',
      urgency: 'Medium',
      submittedTime: '45 mins ago',
      description: 'When I power on my PC, it displays a black screen stating "No boot device available" or boots straight into the BIOS screen automatically. I can\'t load Windows to search for resume databases.'
    },
    specification: {
      cpu: 'Intel Core i3-10100',
      motherboard: 'GIGABYTE H410M',
      ram: '8GB DDR4',
      gpu: 'Intel Integrated UHD',
      psu: '350W OEM PSU',
      storage: '256GB SATA 2.5" SSD',
      os: 'Windows 10'
    },
    hiddenRootCause: {
      component: 'Loose SATA storage cable / failing SATA drive',
      shortDescription: 'Unplugged or loose SATA data cable connecting the SSD drive to the motherboard SATA port.',
      detailedCause: 'During a recent office relocation, the locking latch on the cheap SATA line slipped out, leaving the drive powered but unable to transmit directory blocks to the controller.',
      possibleTheories: [
        'Corrupted operating system master boot record files',
        'Faulty UEFI BIOS CMOS settings memory battery cell',
        'Loose SATA data/power cable or localized drive hardware failure',
        'Motherboard motherboard chipset failure'
      ],
      correctTheory: 'Loose SATA data/power cable or localized drive hardware failure',
      requiredTests: ['enter_bios', 'reconnect_storage'],
      correctPlan: 'reconnect_storage',
      correctVerification: 'reconnect_storage',
      correctPreventive: 'reconnect_storage'
    },
    symptoms: [
      'Black screen with loading error: "No Boot Device Found."',
      'BIOS lists exactly zero connected SATA devices.',
      'The drive does not make any mechanical clicking sounds.'
    ],
    actionResponses: {
      'inspect_cables': {
        text: 'PHYSICAL INSPECTION: The SATA data cable plugged into the motherboard is resting crookedly on the plastic port housing, and appears somewhat dislodged.',
        isClue: true
      },
      'enter_bios': {
        text: 'BIOS MENUS ACTIVE: Checking SATA Config displays "SATA Port 0: [Empty]". The motherboard does not recognize any storage drives on the line.',
        isClue: true
      },
      'reconnect_storage': {
        text: 'Success! You plug the SATA data cable tightly into the SSD drive until you hear a solid click locking latch. Upon boot-up, Windows immediately spins into life!',
        revealsRootCause: true
      },
      'verify_boot_order': {
        text: 'BIOS reports: "No boot devices found." There is no drive listed to prioritize in the boot settings list.',
        isClue: true
      },
      'replace_storage': { text: 'You replace with test SSD. BIOS detects it, but requires a complete Windows installation.' },
      'replace_cmos': { text: 'CMOS battery replaced. Date and time reset, but SATA port 0 remains empty.' },
      'load_defaults': { text: 'Motherboard defaults applied. System still boots directly to BIOS with no boot device detected.' }
    },
    explanation: 'Storage drives require robust connections for data interface lines. If a SATA cable is jarred loose, the motherboard fails to recognize the disk entirely, resulting in "No Boot Device Found" warnings. Securely locking SATA clips resolves this simple, common corporate ticket.',
    comptiaObjectives: ['Domain 5.3 - Given a scenario, troubleshoot hard drives and RAID arrays.']
  },
  {
    id: 'scen_006_storage_clicking',
    title: 'PC Extremely Slow with Clicking Noises',
    subsystem: 'Storage',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-415',
      clientName: 'Winston Ward',
      userDepartment: 'Legal Affairs',
      assetTag: 'AST-7709',
      role: 'Staff Counsel',
      urgency: 'High',
      submittedTime: '1 hr ago',
      description: 'Whenever I open large contracts or legal files, my entire computer hangs up and stutters. I can hear a mechanical click-click-click metallic sound coming from the desktop tower, and several file templates say "corrupted file format" when loading.'
    },
    specification: {
      cpu: 'Intel Core i5-9400',
      motherboard: 'MSI B365M PRO',
      ram: '16GB DDR4',
      gpu: 'Intel Onboard Graphics',
      psu: '450W PSU',
      storage: '2TB Seagate Barracuda 7200RPM Mechanical HDD',
      os: 'Windows 10 Pro'
    },
    hiddenRootCause: {
      component: 'Seagate Hard Drive Mech Failure',
      shortDescription: 'Active mechanical failure of the spindle read/write head assembly (Click of Death).',
      detailedCause: 'The read/write voice-coil actuator arm is failing to find standard pre-magnetic markers on platters. It retracts to the park stop repeatedly, creating a rhythm of cyclical metallic clicks.',
      possibleTheories: [
        'Heavy OS file system fragmentation',
        'Physical hard disk mechanical sector head crash ("Click of Death")',
        'Defective memory slots reporting corrupted cached registry items',
        'Dirty cooling fan clicking against CPU heat pipes'
      ],
      correctTheory: 'Physical hard disk mechanical sector head crash ("Click of Death")',
      requiredTests: ['run_smart_test', 'boot_usb'],
      correctPlan: 'replace_storage',
      correctVerification: 'replace_storage',
      correctPreventive: 'replace_storage'
    },
    symptoms: [
      'A sharp cyclical metallic light clacking sound inside the PC unit.',
      'Windows task manager displays 100% Active Solid Disk Busy with zero active disk transactions.',
      'Core boot-up takes nearly twenty-five minutes.'
    ],
    actionResponses: {
      'inspect_cables': { text: 'Power and SATA connections are firmly seated in the storage frame.' },
      'inspect_fans': { text: 'You verify that fans spin freely without hitting any loose power lines or plastic guards.' },
      'run_smart_test': {
        text: 'DIAGNOSTIC ALERT: SMART checks report terrible numbers! Relocated Sector Count is dangerously high. Read Error Rate: FAILING. SSD/HDD mechanical system degradation logged!',
        revealsRootCause: true,
        isClue: true
      },
      'boot_usb': {
        text: 'SUCCESS: Booting the system from diagnostic Unix USB runs extremely fast and responsive. The internal HDD still clicks in the background, validating that the HDD itself is the bottleneck.',
        isClue: true
      },
      'replace_storage': {
        text: 'Success! You install an ultra-fast 1TB SATA SSD in the drive bay and perform an OS image restoration. The clicking noise is completely gone, and the desktop loads in 10 seconds flat! Outstanding results.',
        revealsRootCause: true
      },
      'reconnect_storage': { text: 'Reconnecting SATA wires makes no difference. Mechanical clicking continues as soon as power feeds.' },
      'run_chkdsk': { text: 'You launch CHKDSK. It runs slowly, locks up completely at bad sector 2%, and emits a horrific screeching noise. This confirms severe physical platter media degradation. CHKDSK is too risky/unusable.' },
      'load_defaults': { text: 'BIOS configuration default applied. Boot-times and clicking remain unchanged.' }
    },
    explanation: 'The metallic "Click of Death" is the signature sound of a mechanical HDD head crash. The magnetic heads fail and constantly hit search limits, destroying core platter structures. You must never run standard file tools (like chkdsk) which worsen the damage. Immediate physical storage replacement (preferably with solid-state SSD) resolves the system crash.',
    comptiaObjectives: ['Domain 5.3 - Given a scenario, troubleshoot hard drives and RAID arrays.']
  },
  {
    id: 'scen_007_printer_faded',
    title: 'Laser Printer Output is Dusty and Faded',
    subsystem: 'Printer',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-551',
      clientName: 'Brenda Miller',
      userDepartment: 'Administrative Admin',
      assetTag: 'PRN-9901',
      role: 'Executive Secretary',
      urgency: 'Medium',
      submittedTime: '2 hrs ago',
      description: 'The department laser printer (HP LaserJet Enterprise) is printing pages that are extremely faded or missing vertical bars of text entirely down the center of the page. No paper jams are occurring.'
    },
    specification: {
      cpu: 'Internal IP Controller board',
      motherboard: 'OEM Logic Module',
      ram: '512MB RAM Embedded',
      gpu: 'None',
      psu: 'High-voltage internal board',
      storage: 'Flash firmware module',
      os: 'HP JetDirect Embedded RTOS'
    },
    hiddenRootCause: {
      component: 'Toner Cartridge',
      shortDescription: 'Exhausted dry black toner cartridge with uneven distribution of internal magnetic powder.',
      detailedCause: 'Toner cartridge is nearly empty. The remaining micro-toner plastic particles have clumped together, resulting in fading along the transfer rollers.',
      possibleTheories: [
        'Laser printer scanner mirror dust film',
        'Exhausted or dried out toner cartridge carbon supply',
        'Scratched transfer fuser heater rollers',
        'Damaged ethernet queue board'
      ],
      correctTheory: 'Exhausted or dried out toner cartridge carbon supply',
      requiredTests: ['printer_test_page', 'inspect_fuser'],
      correctPlan: 'replace_toner',
      correctVerification: 'replace_toner',
      correctPreventive: 'replace_toner'
    },
    symptoms: [
      'Missing print sections down the middle of standard office prints.',
      'Paper prints are clean, dry, and pass through without jamming or tearing.'
    ],
    actionResponses: {
      'printer_test_page': {
        text: 'DIAGNOSTIC TEST PAGE: The internal print configuration output is extremely weak, with light grey output and complete vertical white blanks on the primary status columns.',
        isClue: true
      },
      'replace_toner': {
        text: 'Success! You install a brand-new HP Black Toner Cartridge, pull the clear protective seal line, and start a test sheet. The resulting alignment sheet displays deep, crisp, completely black text. Flawless output!',
        revealsRootCause: true
      },
      'inspect_fuser': {
        text: 'FUSER AUDIT: The fuser rollers feel hot, smooth, and free of physical toner crust or gouges. The lamp functions correctly.',
        isClue: true
      },
      'clean_printheads': { text: 'You run cleaning utilities. This option has no impact since this is a laser toner cartridge, not an inkjet nozzle setup!' },
      'clean_dust': { text: 'You blow dust out of the paper feed cassettes. Prints stay faded.' },
      'update_bios': { text: 'Firmware checked and up to date. Prints are unaffected.' }
    },
    explanation: 'Faded outputs on laser printers without smudging usually trace directly to depleted toner cart reservoirs or uneven distribution. Shaking the toner works momentarily, but A+ best practice dictates swapping the spent cartridge for a fresh OEM laser toner bundle.',
    comptiaObjectives: ['Domain 5.6 - Given a scenario, troubleshoot printers.']
  },
  {
    id: 'scen_008_mobile_draining',
    title: 'Corporate Laptop/Mobile Battery Drains Extravagantly Fast',
    subsystem: 'Mobile Device',
    difficultyRating: 'Easy',
    ticket: {
      id: 'TKT-821',
      clientName: 'Megan Kelly',
      userDepartment: 'Sales Outreach',
      assetTag: 'MOB-5501',
      role: 'Global Accounts Director',
      urgency: 'Medium',
      submittedTime: '3 hrs ago',
      description: 'My enterprise mobile phone loses half its charge within 40 minutes of disconnecting from wall power. It also runs extremely warm to the touch, and the glass screen bulges slightly outward near the chassis rim.'
    },
    specification: {
      cpu: 'Apple A15 Bionic CPU',
      motherboard: 'Apple Mobile Logic Board',
      ram: '6GB mobile RAM',
      gpu: 'Apple Mobile GPU',
      psu: 'Rechargeable Lithium-Ion Cell Assembly',
      storage: '128GB Flash',
      os: 'iOS 15'
    },
    hiddenRootCause: {
      component: 'Swelling Lithium Battery Pack',
      shortDescription: 'Swollen and chemically degraded lithium-ion smartphone battery pack.',
      detailedCause: 'Chemical degradation inside the lithium pouch has caused gas build-up, reducing battery storage capacity and pushing outward against the fragile display glass (severe fire hazard).',
      possibleTheories: [
        'Outdated mobile applications running in the background',
        'Chemically degraded and swollen Lithium-Ion battery envelope',
        'Corrupted operating system baseband firmware drivers',
        'Faulty USB-C logic connector port'
      ],
      correctTheory: 'Chemically degraded and swollen Lithium-Ion battery envelope',
      requiredTests: ['iphone_battery_test', 'inspect_cables'],
      correctPlan: 'replace_ram', // We will map a custom item or provide replacements
      correctVerification: 'iphone_battery_test',
      correctPreventive: 'iphone_battery_test'
    },
    symptoms: [
      'Rapid battery level crash under light application loading.',
      'Physical glass displays mild warp or bowing outwards.',
      'Symptom occurs on any charging cable style.'
    ],
    actionResponses: {
      'inspect_cables': { text: 'You inspect the phone. The physical display panel is separated from the aluminum housing, pushed by a grey silver internal bag!' },
      'iphone_battery_test': {
        text: 'SYSTEM TELEMETRY CHIP: Battery maximum capacity is at 44% of factory original state. Operating system reports: "BATTERY CAPACITY DEGRADED. SERVICE REQUIRED NOW."',
        revealsRootCause: true,
        isClue: true
      },
      'replace_ram': {
        text: 'PHYSICAL RESOLUTION: You safely power off the mobile phone, execute strict ESD grounds, open the display assembly, and replace the swollen lithium battery pouch. The new unit fits tightly, screen panel snaps flat perfectly, and power lasts all day! Crisis avoided.',
        revealsRootCause: true
      },
      'enable_disable_wifi': { text: 'Toggling radio connections reduces power marginally, but cell maximum capacity is still shot.' },
      'load_defaults': { text: 'You factory reset the mobile phone OS. No change to battery discharge rate or the swelling glass enclosure!' },
      'recalibrate_touchscreen': { text: 'The touch grid calibrates. Screet is fully responsive but the battery is still heavily bulging.' }
    },
    explanation: 'Lithium-ion batteries swell as they degrade chemically and release volatile gases. A swollen battery is a severe thermal runway fire hazard. Techs should never continue operating or pressure the unit. Replacing the internal battery instantly solves the threat and fixes charge retention.',
    comptiaObjectives: ['Domain 5.4 - Given a scenario, troubleshoot laptops and mobile devices.', 'Domain 5.7 - Given a scenario, troubleshoot device power and charging issues.']
  },
  {
    id: 'scen_009_network_apipa',
    title: 'Workstation Has "No Internet Access" - Limited Connectivity',
    subsystem: 'Network',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-703',
      clientName: 'Liam O\'Connor',
      userDepartment: 'Customer Service Hub',
      assetTag: 'AST-1144',
      role: 'Support Agent',
      urgency: 'High',
      submittedTime: '15 mins ago',
      description: 'My LAN ethernet icon displays a yellow exclamation mark signaling "No Network Access". I cannot open ticketing software, ping localized databases, or contact supervisors.'
    },
    specification: {
      cpu: 'Intel Core i5-11500',
      motherboard: 'ASUS B560M',
      ram: '16GB RAM',
      gpu: 'Intel HD',
      psu: '400W PSU',
      storage: '512GB SSD',
      os: 'Windows 11 Enterprise (Direct Ethernet connection)'
    },
    hiddenRootCause: {
      component: 'DHCP Scope / Router issue',
      shortDescription: 'The local network DHCP Server server scope is fully saturated, forcing the client system to fall back to an APIPA address.',
      detailedCause: 'The server pool has allocated 254 active leases. Missing response from the local DHCP router leaves the system with a non-routable link-local IP (169.254.X.X).',
      possibleTheories: [
        'Defective motherboard Killer NIC Ethernet chip',
        'Physical cut or kink in outer Ethernet RJ45 copper conductors',
        'Inability to contact local DHCP server resulting in APIPA address assignment',
        'Corrupted regional DNS lookup hosts table file'
      ],
      correctTheory: 'Inability to contact local DHCP server resulting in APIPA address assignment',
      requiredTests: ['check_ip_config', 'ping_gateway'],
      correctPlan: 'reboot_router',
      correctVerification: 'check_ip_config',
      correctPreventive: 'check_ip_config'
    },
    symptoms: [
      'Ethernet link lights are blinking green, proving Layer 1 link connection.',
      'Internet applications fail immediately.',
      'Cannot connect to any local enterprise resources.'
    ],
    actionResponses: {
      'check_ip_config': {
        text: 'DIAGNOSTIC IPCONFIG RESULTS: Ethernet Adapter Local Network: IPv4 Address: 169.254.99.14 (APIPA). Subnet Mask: 255.255.0.0. Default Gateway: (BLANK). This confirms APIPA generation!',
        revealsRootCause: true,
        isClue: true
      },
      'inspect_cables': { text: 'RJ45 standard Cat6 ethernet cord is locked tight in the wall drop and back of NIC card. Green/Amber LED lines are blinking actively.' },
      'ping_gateway': {
        text: 'PING EVALUATION: ping 169.254.99.14 succeeds. Ping 192.168.1.1 logs: "Destination host unreachable." System cannot transition outside of local node scope.',
        isClue: true
      },
      'reboot_router': {
        text: 'Success! You contact the network admin who flushes leases and power cycles the default routers/dhcp server module. You execute ipconfig /renew. Immediately, the interface retrieves IPv4 Address: 192.168.1.133, Subnet: 255.255.255.0, Gateway: 192.168.1.1. Network access is completely restored!',
        revealsRootCause: true
      },
      'replace_motherboard': { text: 'You replace the motherboard, changing the physical network interface card (NIC). But since the network DHCP host is still depleted, the new NIC boots with a new APIPA (169.254.X.X)!' },
      'nslookup_query': { text: 'NSLOOKUP reports: "Default Server Unknown. DNS request timed out." APIPA connections lack a valid DNS path.' }
    },
    explanation: 'When a Windows host requests an dynamic configuration but receives no DHCP response (e.g., from saturated scopes or hung server processes), it assigns itself an APIPA (Automatic Private IP Addressing) route: 169.254.0.1 to 169.254.255.254. Layer 1 LEDs confirm lines are fine, and resetting the host pools clears the jam.',
    comptiaObjectives: ['Domain 5.2 - Given a scenario, troubleshoot problems related to wired and wireless networks.']
  },
  {
    id: 'scen_010_network_conflict',
    title: 'Intermittent LAN Disconnects on Front Office PC',
    subsystem: 'Network',
    difficultyRating: 'Hard',
    ticket: {
      id: 'TKT-708',
      clientName: 'Ethan Cole',
      userDepartment: 'Reception & Registry',
      assetTag: 'AST-2201',
      role: 'Reception Manager',
      urgency: 'Medium',
      submittedTime: '2 hrs ago',
      description: 'Our reception terminal logs out of our booking database randomly twice an hour. Windows displays a small warning stating "Another device is using your assigned IP address" before shutting off database routes.'
    },
    specification: {
      cpu: 'Intel Core i3-11100',
      motherboard: 'MSI H510M Pro',
      ram: '8GB DDR4',
      gpu: 'Intel Integrated',
      psu: '300W PSU',
      storage: '256GB SSD',
      os: 'Windows 10 Pro (Configured with Static IP 192.168.1.20)'
    },
    hiddenRootCause: {
      component: 'IP IP Address Conflict',
      shortDescription: 'IP Address Conflict due to a newly installed smart appliance/printer manually assigned to 192.168.1.20.',
      detailedCause: 'The front-desk workstation was previously assigned static IP 192.168.1.20. A junior tech manually assigned a new breakroom printer to the exact same IP static route, causing address conflicts.',
      possibleTheories: [
        'Ethernet adapter driver crash under loading',
        'Duplicate IP address conflict assignment on the subnet pool',
        'Failing physical wall jack drop wiring',
        'Unauthorized rogue proxy router spoofing targets'
      ],
      correctTheory: 'Duplicate IP address conflict assignment on the subnet pool',
      requiredTests: ['check_ip_config', 'ping_gateway'],
      correctPlan: 'forget_wifi_network', // Will map to a configuration change action in UI
      correctVerification: 'check_ip_config',
      correctPreventive: 'check_ip_config'
    },
    symptoms: [
      'Frequent drops in active session lines.',
      'Windows displays notification regarding Duplicate IP resources detected.',
      'Other computers on the office loop stay running with zero network hiccups.'
    ],
    actionResponses: {
      'check_ip_config': {
        text: 'IPCONFIG SPECS: Terminal reports static IPv4 Address: 192.168.1.20. Subnet Mask: 255.255.255.0. Duplicate Warning flag toggled TRUE in network stack log.',
        revealsRootCause: true,
        isClue: true
      },
      'ping_gateway': {
        text: 'PING TEST: Pinging 192.168.1.20 when Reception PC has its Ethernet cable completely UNPLUGGED still returns successful replies! This confirms a separate device has hijacked duplicate address lines.',
        revealsRootCause: true,
        isClue: true
      },
      'forget_wifi_network': {
        text: 'Success! You reconfigure the static client terminal settings to retrieve IP dynamically from DHCP (or assign 192.168.1.189, out of range of conflicts). The receptionist stays logged into the databases all day with no drops!',
        revealsRootCause: true
      },
      'reboot_router': { text: 'You rebooted the office switch. Workstations reconnect, but quickly drop again once both cards announce themselves onto 192.168.1.20.' },
      'replace_motherboard': { text: 'Swapped motherboard network circuits. The new NIC adapter still clashes when assigned static IP 192.168.1.20. Address configuration remains the problem!' }
    },
    explanation: 'Each active card in an IP subnet must occupy a unique address marker. When two physical adapter MAC targets claim the identical IP address, the network layer drops packets for both devices randomly due to ARP table Thrashing. Re-configuring the hosts to resolve conflicts is the standard fix.',
    comptiaObjectives: ['Domain 5.2 - Given a scenario, troubleshoot problems related to wired and wireless networks.']
  },
  {
    id: 'scen_011_display_flicker',
    title: 'Monitor Flickers or Blank Screen at 4K Resolution',
    subsystem: 'Display',
    difficultyRating: 'Easy',
    ticket: {
      id: 'TKT-601',
      clientName: 'Julian Rivers',
      userDepartment: 'Marketing Creative',
      assetTag: 'DIS-9005',
      role: 'Video Animator',
      urgency: 'Medium',
      submittedTime: '50 mins ago',
      description: 'I recently upgraded to a premium 4K high-refresh-rate monitor, but the image constantly flickers, displays random colored snow, or turns completely blank for a few seconds when I run video edits.'
    },
    specification: {
      cpu: 'Intel Core i7-12700K',
      motherboard: 'GIGABYTE Z690 UD',
      ram: '32GB DDR4',
      gpu: 'AMD Radeon RX 6700 XT',
      psu: '750W PSU',
      storage: '1TB NVMe OS Drive',
      os: 'Windows 11 Creative'
    },
    hiddenRootCause: {
      component: 'Defective/Low-Bandwidth HDMI Cable',
      shortDescription: 'Faulty under-spec HDMI 1.4 cable incapable of driving high-bandwidth HDMI 2.1 4K signals.',
      detailedCause: 'The video animator is using an old HDMI 1.4 wire left over from a previous desk. HDMI 1.4 maxes out at 10.2 Gbps, which fails under 4K 60Hz or high pixel rates, causing pixel sync failures and visual snow.',
      possibleTheories: [
        'Overheated GPU graphics silicon package',
        'Physical low-bandwidth or damaged HDMI cable failing to support high video bandwidth requirements',
        'Corrupted operating system monitor driver profiles',
        'Failing display monitor internal power supply circuitry'
      ],
      correctTheory: 'Physical low-bandwidth or damaged HDMI cable failing to support high video bandwidth requirements',
      requiredTests: ['inspect_cables', 'check_monitor_power'],
      correctPlan: 'inspect_cables', // Reprimand or swap cable in UI
      correctVerification: 'inspect_cables',
      correctPreventive: 'inspect_cables'
    },
    symptoms: [
      'Screen turns black for 2-3 seconds at random intervals.',
      'Tiny flashing white pixels ("snow") appear across dark backgrounds.',
      'Lowering the resolution to 1080p eliminates the flickering.'
    ],
    actionResponses: {
      'inspect_cables': {
        text: 'PHYSICAL DIAGNOSTIC: Swapping the thin old HDMI cable with a certified Ultra High Speed HDMI 2.1 (48Gbps) copper cable completely eliminates flickering and snow. The display is crystal clear at full 4K 120Hz!',
        revealsRootCause: true
      },
      'check_monitor_power': { text: 'Monitor power LED is solid blue. The monitor itself is fully powered and functional.' },
      'reseat_gpu': { text: 'You reseated the RX 6700 XT securely in the PCIe slot. After booting, the flickering persists at 4K.' },
      'replace_gpu': { text: 'Replaced with a test GPU. Flickering continues because the old HDMI 1.4 cable is still being used to connect the card to the display!' },
      'enter_bios': { text: 'You enter BIOS. Visual display is stable here, but that is because BIOS runs at basic 1024x768 resolution (very low bandwidth demand).' },
      'test_onboard_graphics': { text: 'Testing with onboard GPU motherboard port. Flickering continues because the bottleneck is the cable itself.' }
    },
    explanation: 'High-resolution displays (4K, high refresh rates) require high-bandwidth interfaces (HDMI 2.0/2.1 or DisplayPort 1.4). Using a degraded or low-spec (HDMI 1.4) cord leads to copper signal degradation, resulting in synchronization losses (flickering) or visual noise ("snow"). Replacing the cable resolves this.',
    comptiaObjectives: ['Domain 5.4 - Given a scenario, troubleshoot problems related to video, projectors, and displays.']
  },
  {
    id: 'scen_012_printer_thermal_blank',
    title: 'Thermal Ticket Printer Dispenses Blank White Receipts',
    subsystem: 'Printer',
    difficultyRating: 'Hard',
    ticket: {
      id: 'TKT-509',
      clientName: 'Maria G.',
      userDepartment: 'Point-of-Sale Checkout',
      assetTag: 'PRN-1022',
      role: 'Lead Cashier',
      urgency: 'Critical',
      submittedTime: '5 mins ago',
      description: 'The checkout line thermal printer is feeding paper through, making a low humming sound, and completing prints with zero paper jams. However, the receipts are coming out completely, 100% blank! People are waiting in lines!'
    },
    specification: {
      cpu: 'ARM Embedded core',
      motherboard: 'Epson POS OEM Logic',
      ram: '16MB Static RAM',
      gpu: 'None',
      psu: '24V Coaxial Power Brick',
      storage: 'Config microchip',
      os: 'Epson TM-T88 Printer Firmware'
    },
    hiddenRootCause: {
      component: 'Thermal Roll Orientation',
      shortDescription: 'Thermal roll loaded backward, feeding the untreated side against the heating elements.',
      detailedCause: 'Thermal paper is treated with custom heat-sensitive chemicals on ONE side only. If the roll is loaded backwards, the thermal print head presses and heats the untreated backing paper, leaving the print completely blank.',
      possibleTheories: [
        'Faulty/Burnt thermal print head heating micro-pins',
        'Thermal paper roll loaded backwards (incorrect orientation)',
        'Corrupted print spooler service on corporate terminal',
        'Failing 24V printer power adapter brick'
      ],
      correctTheory: 'Thermal paper roll loaded backwards (incorrect orientation)',
      requiredTests: ['printer_test_page', 'inspect_fuser'], // Standard physical inspections
      correctPlan: 'replace_toner', // We will map a custom item or paper flip
      correctVerification: 'printer_test_page',
      correctPreventive: 'printer_test_page'
    },
    symptoms: [
      'The printer feeds paper normally.',
      'Doing a scratch test with a fingernail on one side of the paper leaves a black streak, proving it is genuine thermal paper.',
      'The receipts have absolutely zero text, logos, or marks.'
    ],
    actionResponses: {
      'printer_test_page': {
        text: 'DIAGNOSTIC PRINTOUT: You trigger the printer physical self-test button. The roll rolls forward but is completely blank. Scratching the outer layer of the paper with a key creates a dark streak, verifying that the sheet is heat-sensitive thermal paper.',
        isClue: true
      },
      'replace_toner': {
        text: 'Success! You open the spool chamber cover, take out the roll, and flip it around so the heat-sensitive chemical layer actively faces the print head. Instantly, self-test pages and sales receipts print perfectly with bold, deep black lettering! Outstanding troubleshooting!',
        revealsRootCause: true
      },
      'inspect_fuser': {
        text: 'MECHANICAL AUDIT: You examine the mini thermal head bar. No dust, burnt pins, or grease are found. The platen roller is in fine shape.',
        isClue: true
      },
      'clean_printheads': { text: 'You run cleaning pins. This has no effect since thermal printers do not use nozzles or ink fluids. Only mechanical heating heads.' },
      'update_bios': { text: 'Flashing POS firmware completed. Receipt paper feeds blank still.' }
    },
    explanation: 'Thermal printers use chemically treated paper that reacts to precise heat pins on the print head. Since only one side is chemically coated, sliding the roll in backwards results in blank paper output. Flipping the roll solved the issue.',
    comptiaObjectives: ['Domain 5.6 - Given a scenario, troubleshoot printers.']
  },
  {
    id: 'scen_013_beep_codes_ram',
    title: 'PC Case Emits Three Loud Beeps and Will Not POST',
    subsystem: 'Motherboard',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-109',
      clientName: 'Oliver Wood',
      userDepartment: 'Facilities Registry',
      assetTag: 'AST-7390',
      role: 'Operations Clerk',
      urgency: 'Medium',
      submittedTime: '1 hr ago',
      description: 'I came in this morning, pushed the power button, and my computer would not start. The fans spin, but the screen stays entirely black, and the computer tower is screaming with three repeating, high-pitched beep sounds.'
    },
    specification: {
      cpu: 'Intel Core i5-10400',
      motherboard: 'GIGABYTE B460M (AMI BIOS)',
      ram: '8GB DDR4 module (Single Slot)',
      gpu: 'Intel HD Onboard',
      psu: '450W PSU',
      storage: '256GB SATA SSD',
      os: 'Windows 10 Enterprise'
    },
    hiddenRootCause: {
      component: 'Defective/Dislodged Memory module',
      shortDescription: 'Memory module dislodged, corrupting motherboard cache verification cycles (3 long beep code).',
      detailedCause: 'The latches on the DDR4 slot were bumped, causing the module pins to slide out slightly. This leads to a base 64K memory read/write failure, halting the system at POST with 3 repetitive beeps.',
      possibleTheories: [
        'Failing power supply unit providing inadequate 5V standby power',
        'Incompatible UEFI BIOS firmware flash',
        'Physical RAM module failure or unseated memory chip in DIMM slot',
        'Blown chipset regulator capacitance tracks'
      ],
      correctTheory: 'Physical RAM module failure or unseated memory chip in DIMM slot',
      requiredTests: ['enter_bios', 'boot_min_components'],
      correctPlan: 'reseat_ram',
      correctVerification: 'reseat_ram',
      correctPreventive: 'reseat_ram'
    },
    symptoms: [
      'Repeating motherboards beep code sequences: 3 Long, repetitive sound lines.',
      'Black monitor screen with yellow standby indication LED.',
      'The system CPU and general exhaust fan spins passively.'
    ],
    actionResponses: {
      'inspect_cables': { text: 'Cables are connected correctly. Wall socket delivers standard safe AC stream.' },
      'reseat_ram': {
        text: 'Success! You remove the side panel, press down on the RAM module latches, pull out the stick to check for scorched tracks (none found), and snap it back down into DIMM Slot A1 until the plastic side clips click shut. Upon restart, the beeping completely stops, the ASUS logo displays on-screen, and the PC POSTs cleanly!',
        revealsRootCause: true
      },
      'replace_ram': {
        text: 'Success! Replacing the single RAM module also resolves the issue and stops the beep codes, but reseating was the free, non-wasteful logical step first!',
        revealsRootCause: true
      },
      'enter_bios': { text: 'The screen is entirely blank and beeping. POST fails, so you cannot enter the BIOS menu!' },
      'boot_min_components': {
        text: 'DIAGNOSTIC TEST: Booting with minimum components still beeps, but testing the RAM module in slot B2 produces a single short beep (successful POST), proving that Slot A1 was either dirty or the memory stick was loose.',
        isClue: true
      },
      'use_known_good_ram': {
        text: 'SUCCESS: Slipping in a verified lab RAM stick stops the beep codes, identifying memory subsystem failure.',
        revealsRootCause: true,
        isClue: true
      },
      'replace_psu': { text: 'You connect the test bench PSU. Three beeps continue; power is not the root cause.' },
      'examine_capacitors': { text: 'Caps are flat, clean and in perfect cosmetic state.' }
    },
    explanation: 'A series of beeps on startup (Power-on Self Test - POST) represent hardware codes generated by the motherboard firmware. For AMI BIOS, 3 long/short repeat beeps generally signify a fatal base memory check failure. Reseating the RAM modules restores connection contacts and lets POST complete.',
    comptiaObjectives: ['Domain 5.1 - Given a scenario, troubleshoot problems related to motherboards, RAM, CPU, and power.']
  },
  {
    id: 'scen_014_network_dns_fail',
    title: 'Can Ping Google IP (8.8.8.8) But Cannot Load Web Domains',
    subsystem: 'Network',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-712',
      clientName: 'Victor Ross',
      userDepartment: 'Legal Analytics',
      assetTag: 'AST-6044',
      role: 'Compliance Lead',
      urgency: 'Medium',
      submittedTime: '2 hrs ago',
      description: 'I have a weird network issue. I cannot access company intranets or any websites like google.com. However, our IT technician can ping our secondary backup gateway at 8.8.8.8 successfully from my PC desktop. What is causing this?'
    },
    specification: {
      cpu: 'Intel Core i5-10500',
      motherboard: 'GIGABYTE H410',
      ram: '16GB RAM',
      gpu: 'Intel Onboard',
      psu: '350W PSU',
      storage: '512GB SSD',
      os: 'Windows 11 Professional (Wired Ethernet)'
    },
    hiddenRootCause: {
      component: 'Defective DNS IP configuration',
      shortDescription: 'Incorrest static DNS Server IP address configured in the network adapter properties.',
      detailedCause: 'The user has a statically assigned, invalid DNS Server entry (set to a typo IP 192.168.1.99, which has no DNS service running). This lets raw TCP traffic (pings to IP addresses) pass, but blocks all domain resolution.',
      possibleTheories: [
        'Invalid subnet mask causing broadcast packet trapping',
        'Physical copper network interference or degrading Cat6 wire',
        'Incorrect or non-functional DNS Server address configuration',
        'Local firewall system blocking web port 80/443 traffic'
      ],
      correctTheory: 'Incorrect or non-functional DNS Server address configuration',
      requiredTests: ['check_ip_config', 'ping_gateway', 'nslookup_query'],
      correctPlan: 'forget_wifi_network', // Will target DHCP correction or reset
      correctVerification: 'check_ip_config',
      correctPreventive: 'check_ip_config'
    },
    symptoms: [
      'Web browsers report error: "DNS_PROBE_FINISHED_BAD_CONFIG."',
      'Pinging 8.8.8.8 returns successful replies with <30ms latency.',
      'Symptom occurs across all web browser apps.'
    ],
    actionResponses: {
      'check_ip_config': {
        text: 'DIAGNOSTIC IPCONFIG: IPv4 Address: 192.168.1.55. Subnet: 255.255.255.0. Gateway: 192.168.1.1. DNS Servers: 192.168.1.99 (invalid static entry). A typo is present!',
        revealsRootCause: true,
        isClue: true
      },
      'ping_gateway': {
        text: 'PING EVALUATION: Pinging gateway 192.168.1.1 is successful. Pinging google.com responds with: "Ping request could not find host google.com. Please check the name and try again."',
        isClue: true
      },
      'nslookup_query': {
        text: 'NSLOOKUP ANALYSIS: Performing lookup on server 192.168.1.99 fails with "Connection timed out; No servers could be reached". Setting server to 8.8.8.8 and running lookup on google.com succeeds immediately!',
        revealsRootCause: true,
        isClue: true
      },
      'forget_wifi_network': {
        text: 'Success! You open the IPv4 properties page on the Local Area socket, and reconfigure it to "Obtain DNS Server automatically from DHCP" (or change DNS to 8.8.8.8). Web pages, internal portals, and legal search systems load instantly!',
        revealsRootCause: true
      },
      'inspect_cables': { text: 'Physical Cat6 lines are locked tight into wall sockets. Link indicators show full wire speed.' },
      'reboot_router': { text: 'You rebooted the office router. Other workstations reconnect with correct settings, but the static typo on Victor\'s PC still blocks DNS. Confirmed device config issue.' }
    },
    explanation: 'Pinging raw external IPs (like 8.8.8.8) verifies that physical layers, IP addressing, routing tables, and gateways are fully functional. If websites still fail to resolve, the DNS server settings are erroneous. Correcting the DNS setting resolves the domain lookup errors.',
    comptiaObjectives: ['Domain 5.2 - Given a scenario, troubleshoot problems related to wired and wireless networks.']
  },
  {
    id: 'scen_015_raid_degraded',
    title: 'RAID 5 Array Degraded - Disk 2 Physical Failure',
    subsystem: 'Storage',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-418',
      clientName: 'Raymond Chandler',
      userDepartment: 'Data Infrastructure',
      assetTag: 'NAS-9004',
      role: 'Database Supervisor',
      urgency: 'High',
      submittedTime: '15 mins ago',
      description: 'The primary department cluster storage array is alerting with a loud steady buzzer and the management dashboard states the volume status is "DEGRADED". Drive bay 2 exhibits a solid amber physical warning LED instead of blinking green.'
    },
    specification: {
      cpu: 'Intel Xeon D-1521',
      motherboard: 'Supermicro X10SDV-4C',
      ram: '32GB DDR4 ECC Registered',
      gpu: 'ASPEED AST2400 (Onboard)',
      psu: 'Dual Redundant 450W Hot-Swap supplies',
      storage: '4x 4TB Enterprise HDDs in RAID 5 Array Configuration',
      os: 'TrueNAS Core Server'
    },
    hiddenRootCause: {
      component: 'Defective mechanical storage drive in RAID slot 2',
      shortDescription: 'Degraded RAID 5 array due to physical hardware sector death inside disk slot 2.',
      detailedCause: 'One of the physical drives in the 4-disk parity configuration suffered a voice-coil actuator head seize, preventing read/write queries and degrading the active storage pool redundancy.',
      possibleTheories: [
        'RAID controller cache memory card failure',
        'Failing mechanical storage drive in RAID slot 2 causing redundancy degradation',
        'Logical NTFS filesystem table corruption',
        'Ethernet line packet loss due to excessive WAP dropouts'
      ],
      correctTheory: 'Failing mechanical storage drive in RAID slot 2 causing redundancy degradation',
      requiredTests: ['run_smart_test', 'inspect_cables'],
      correctPlan: 'rebuild_raid',
      correctVerification: 'run_smart_test',
      correctPreventive: 'run_smart_test'
    },
    symptoms: [
      'Storage server chassis is emitting a continuous acoustic buzzer sound.',
      'Active network storage read/write speeds have dropped to half of baseline rates.',
      'Raw database backups complete slower but with zero direct file error anomalies.'
    ],
    actionResponses: {
      'run_smart_test': {
        text: 'DIAGNOSTIC TELEMETRY: SMART checks on Drive 2 (Bay 2) return CRITICAL health flags. Reallocated Sector Count is over 18,500. Read Error Rate: FAILING. Drive 0, 1, and 3 report 100% nominal state with zero sectors relocated.',
        revealsRootCause: true,
        isClue: true
      },
      'inspect_cables': { text: 'You verify physical connections. Disk trays are fully locked in the server cabinet chassis slots. The warning amber LED is glowing steadily next to drive 2.' },
      'rebuild_raid': {
        text: 'Success! You physically unlatch drive drawer 2, extract the defective HDD, slide in an identical 4TB enterprise replacement drive, and use the RAID storage utility to trigger a rebuild operation. Parity recalculations complete, and the buzzer mutes!',
        revealsRootCause: true
      },
      'reconnect_storage': { text: 'You disconnect and pull loose SAS cables and plug them back. The drive is fully connected, but physical head seizure prevents spin up, leaving the amber warning light glowing.' },
      'run_chkdsk': { text: 'You attempt to scan using a local terminal tool. Because this is a hardware RAID pool failure at the block layer with a dead disk, scan attempts stall at 0% and time out.' }
    },
    explanation: 'RAID 5 can withstand a single disk failure through parity stripes spread across all member drives. However, a single failed drive leaves the array in a vulnerable "Degraded" state with no further fault tolerance. Replacing the dead HDD and reconstructing the array restores normal fault redundancy.',
    comptiaObjectives: ['Domain 5.3 - Given a scenario, troubleshoot hard drives and RAID arrays.']
  },
  {
    id: 'scen_016_cmos_battery',
    title: 'System Date, Time, and BIOS Settings Reset on Boot',
    subsystem: 'Motherboard',
    difficultyRating: 'Easy',
    ticket: {
      id: 'TKT-115',
      clientName: 'Diana Prince',
      userDepartment: 'Administrative Admin',
      assetTag: 'AST-4409',
      role: 'Head Coordinator',
      urgency: 'Medium',
      submittedTime: '1 hr ago',
      description: 'Every single morning when I boot up my PC, the timezone system clock displays "January 1, 2000" or resets to 1970. This causes secure websites to give security certificate errors, and the motherboard displays "CMOS Checksum Error - Default settings restored" on start.'
    },
    specification: {
      cpu: 'Intel Core i5-10400',
      motherboard: 'ASUS Prime B460-PLUS',
      ram: '16GB DDR4',
      gpu: 'Intel HD Onboard Graphics',
      psu: '400W Standard PSU',
      storage: '256GB SATA SSD',
      os: 'Windows 10 Enterprise (Clocks drift upon shutdown)'
    },
    hiddenRootCause: {
      component: 'CR2032 CMOS battery cell',
      shortDescription: 'Depleted CR2032 CMOS battery unable to power the motherboard volatile CMOS register.',
      detailedCause: 'The 3V lithium coin cell battery powering the CMOS RAM is dead. When the computer loses AC power, the volatile clock and personalized BIOS preferences are cleared, reverting to factory system dates.',
      possibleTheories: [
        'Outdated local NTP network time server configuration',
        'Exhausted CR2032 CMOS battery cell failing to power the volatile BIOS memory',
        'Failing power supply unit sags under board load initialization',
        'Corrupted operating system master boot record sectors'
      ],
      correctTheory: 'Exhausted CR2032 CMOS battery cell failing to power the volatile BIOS memory',
      requiredTests: ['enter_bios', 'examine_capacitors'],
      correctPlan: 'replace_cmos',
      correctVerification: 'enter_bios',
      correctPreventive: 'enter_bios'
    },
    symptoms: [
      'Motherboard triggers "CMOS Checksum Error" on warm start.',
      'Windows date is completely wrong upon cold boots but stays correct if the PC remains powered on or sleeps.',
      'Web browsers reject security certificates due to master date mismatches.'
    ],
    actionResponses: {
      'enter_bios': {
        text: 'BIOS HARDWARE SCAN: Onboard system date reads "01/01/2000 00:00:04". The BIOS system logs register "CMOS battery low voltage: 1.45V" (Normal threshold is >=2.8V). Saved configurations like customized RAM speed profiles are wiped.',
        revealsRootCause: true,
        isClue: true
      },
      'examine_capacitors': { text: 'You inspect the motherboard. Capacitors are flat and in perfect physical condition.' },
      'replace_cmos': {
        text: 'Success! You open the chassis cover, remove the old coin battery, snap in a fresh 3V CR2032 lithium battery cell, and boot into UEFI to reset the date to today. The system now retains correct parameters and timestamps across cold shutdowns!',
        revealsRootCause: true
      },
      'inspect_cables': { text: 'All power cables, motherboard pins, and display wires are firmly connected.' },
      'load_defaults': { text: 'You restore factory default settings. The system boots, but the underlying date reset persists as soon as the PC is unplugged from AC power.' }
    },
    explanation: 'The volatile CMOS RAM on motherboards requires continuous trickle power from a tiny lithium coin battery (CR2032) to keep the system clock and custom BIOS parameters alive when the main power is off. A dead battery triggers checksum errors and drifts the system time, breaking SSL security.',
    comptiaObjectives: ['Domain 5.1 - Given a scenario, troubleshoot problems related to motherboards, RAM, CPU, and power.']
  },
  {
    id: 'scen_017_projector_aspect',
    title: 'Conference room Projector Image is Stretched and Blurry',
    subsystem: 'Display',
    difficultyRating: 'Easy',
    ticket: {
      id: 'TKT-609',
      clientName: 'Arthur Dent',
      userDepartment: 'Relations & Marketing',
      assetTag: 'PROJ-9022',
      role: 'Director of Presentations',
      urgency: 'Medium',
      submittedTime: '30 mins ago',
      description: 'Laptops connected in Conference Room A show a ridiculously wide, squashed, and stretched-out display on the projector screen (letters are blurry and images look elongated horizontally). Circle figures look like fat horizontal ovals!'
    },
    specification: {
      cpu: 'Laptop Dual Core i7',
      motherboard: 'Intel Mobile platform',
      ram: '16GB RAM',
      gpu: 'Intel Iris Xe Graphics',
      psu: '90W Laptop Charger Brick',
      storage: '512GB SSD',
      os: 'Windows 11 (Connected to overhead Epson 1080p projector with HDMI)'
    },
    hiddenRootCause: {
      component: 'Laptop output resolution / Aspect ratio mismatch',
      shortDescription: 'Incompatible video output resolution causing horizontal aspect ratio stretching.',
      detailedCause: 'The laptop output resolution is set to a legacy 1024x768 (4:3 aspect ratio) setting, forcing the widescreen (16:9 aspect ratio) overhead projector to stretch pixels horizontally to fit screen bounds, resulting in fuzzy text and warped geometric figures.',
      possibleTheories: [
        'Damaged internal projector lamp failing to resolve fine pixel lines',
        'Incorrect screen resolution or non-native aspect ratio settings selected on the laptop display adapter',
        'Faulty video driver causing digital color channel bleeding',
        'Damaged physical HDMI cable reducing visual frequency lines'
      ],
      correctTheory: 'Incorrect screen resolution or non-native aspect ratio settings selected on the laptop display adapter',
      requiredTests: ['inspect_cables', 'check_monitor_power'],
      correctPlan: 'change_resolution',
      correctVerification: 'check_monitor_power',
      correctPreventive: 'check_monitor_power'
    },
    symptoms: [
      'Visual images like simple circular shapes appear distorted into fat horizontal ellipses.',
      'Small text characters run into each other and are hard to read from the desk chairs.',
      'Projector lenses and optics are spotless and free of physical dirt or dust.'
    ],
    actionResponses: {
      'inspect_cables': { text: 'You verify external wires. The primary copper HDMI cable is locked in securely. Replacing the cable has no effect on the stretched stretching shape or blurry look.' },
      'check_monitor_power': {
        text: 'PROJECTOR HARDWARE STATS: Projector model is EPSON PowerLite 16:9 Widescreen (Native 1920x1080). Checking setup menu displays: "Current input line: 1024x768 (Analog Scaled Stretch)". The input signal is mismatched!',
        isClue: true
      },
      'change_resolution': {
        text: 'Success! You right-click the laptop desktop background, select Display Settings, and change the output resolution from the stretched 1024x768 (4:3) setting to the native 1920x1080 (16:9) specification. The circles immediately become perfectly round, and text is crystal clear!',
        revealsRootCause: true
      },
      'test_onboard_graphics': { text: 'You test with on-board outputs. Laptop screen is crisp, but anything sent to the projector persists in horizontal stretch.' }
    },
    explanation: 'For crisp and correctly proportioned images, the video adapter output resolution must match the native aspect ratio (usually 16:9 for modern video setups, 4:3 for older displays) and resolution of the projection unit. Outputting mismatched aspect scales forces display scaling chips to balloon pixels horizontally.',
    comptiaObjectives: ['Domain 5.4 - Given a scenario, troubleshoot problems related to video, projectors, and displays.']
  },
  {
    id: 'scen_018_wifi_interference',
    title: 'Intermittent Drops and Extreme Packet Loss on Office Wi-Fi',
    subsystem: 'Network',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-719',
      clientName: 'Chloe Frazer',
      userDepartment: 'Design Operations',
      assetTag: 'AST-1100',
      role: 'UI Designer Lead',
      urgency: 'Medium',
      submittedTime: '1 hr ago',
      description: 'Laptops in the creative group bullpen experience massive network lag, slow download speeds (<1 Mbps), and frequent disconnects from our file server, even though physical ethernet desk cables on workstations run completely fine at 1Gbps.'
    },
    specification: {
      cpu: 'Laptop Core i7 Platform',
      motherboard: 'Dell XPS Embedded board',
      ram: '16GB RAM',
      gpu: 'Intel Graphics',
      psu: 'Laptop Battery',
      storage: '256GB SSD',
      os: 'Windows 10 / Wi-Fi Active Connection'
    },
    hiddenRootCause: {
      component: '2.4GHz Co-channel wireless interference',
      shortDescription: 'High co-channel overlap congestion and packet collisions on the unlicensed 2.4GHz Wi-Fi band.',
      detailedCause: 'The wireless access point is configured to transmit on 2.4GHz Channel 6. Competing neighboring office suites have also flooded Channel 6 with dozens of powerful routers, raising the local RF noise floor, dropping signal-to-noise ratio, and scattering packet frames.',
      possibleTheories: [
        'Incorrect wireless gateway IP static addresses assigned on laptops',
        'Unlicensed co-channel RF interference from neighboring office access points on the 2.4GHz band',
        'Physical Cat6 cable break inside the wall access panels',
        'Incompatible DHCP lease allocation tables'
      ],
      correctTheory: 'Unlicensed co-channel RF interference from neighboring office access points on the 2.4GHz band',
      requiredTests: ['measure_wifi_signal', 'check_ip_config'],
      correctPlan: 'change_wifi_channel',
      correctVerification: 'measure_wifi_signal',
      correctPreventive: 'measure_wifi_signal'
    },
    symptoms: [
      'Pinging local gateway over Wi-Fi displays extreme packet loss (>45%) and random latency spikes up to 1,500ms.',
      'Wired computers on the exact same network switch run with zero packet dropouts and low latency.',
      'Moving the notebook right next to the access point reduces drops, but bandwidth remains exceptionally low.'
    ],
    actionResponses: {
      'measure_wifi_signal': {
        text: 'RF ANALYZER READINGS: High density of wireless SSID beacons located on 2.4GHz Channel 6. Ambient noise floor is -65dBm, meaning heavy overlap collisions are occurring. The 5GHz and 6GHz bands in the office room are completely silent, empty, and unused.',
        revealsRootCause: true,
        isClue: true
      },
      'check_ip_config': {
        text: 'IPCONFIG SPECS: Connected client IP is 192.168.1.181, Subnet: 255.255.255.0, Default Gateway: 192.168.1.1. DNS Resolvers: 8.8.8.8. Addressing is valid.',
        isClue: true
      },
      'change_wifi_channel': {
        text: 'Success! You access the access point wireless settings and migrate the creative group SSID exclusively to non-overlapping 5GHz bands (such as Channel 36 or Channel 149). Tablet and laptop network packet losses instantly fall to 0% and transfers peak at 450 Mbps!',
        revealsRootCause: true
      },
      'reboot_router': { text: 'You rebooted the local router switch. Connections re-engage momentarily, but the noise congestion on the 2.4GHz signal immediately slows rates back to a crawl.' },
      'enable_disable_wifi': { text: 'You toggle the laptop network card. The client reconnects, but packet collisions on the crowded airwaves quickly degrade speeds back to 1Mbps.' }
    },
    explanation: 'The 2.4GHz RF spectrum is highly congested due to limited non-overlapping channels (1, 6, and 11) and competition from neighboring networks and Bluetooth/microwave appliances. Saturated bands drop packets and cause severe latency. Relocating connections to cleaner 5GHz/6GHz bands eliminates RF collisions.',
    comptiaObjectives: ['Domain 5.2 - Given a scenario, troubleshoot problems related to wired and wireless networks.']
  },
  {
    id: 'scen_019_printer_ghosting',
    title: 'Recurring Ghost Image Repeated Down Printed Pages',
    subsystem: 'Printer',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-554',
      clientName: 'Miles Straume',
      userDepartment: 'Payroll Administration',
      assetTag: 'PRN-4420',
      role: 'Finance Officer',
      urgency: 'Medium',
      submittedTime: '2 hrs ago',
      description: 'The shared department laser printer is producing documents that have faint copy artifacts (duplicate ghost shadows) of preceding text blocks repeating in an even vertical pattern farther down the same page.'
    },
    specification: {
      cpu: 'Embedded Printer Microcontroller',
      motherboard: 'OEM Print Controller Board',
      ram: '256MB RAM',
      gpu: 'None',
      psu: 'High-voltage internal power assembly',
      storage: 'Flash memory',
      os: 'Standard laser operating firmware'
    },
    hiddenRootCause: {
      component: 'Defective heater fuser assembly',
      shortDescription: 'Degraded laser fuser roller assembly retaining residual charged toner paste.',
      detailedCause: 'The halogen warming bulb or non-stick Teflon coating on the fuser pressure roller has deteriorated. Excess toner is not completely melted onto the paper fibers on the first revolution, causing residual toner on the roll to transfer onto the paper on secondary cycles, generating faint repeat ghost images.',
      possibleTheories: [
        'Outdated print queue buffer spooler drivers',
        'Exhausted laser printer corona transfer wires',
        'Worn or damaged fuser heating cylinder failing to melt or scrape excess toner powder',
        'Empty ink fluid cartridge wells clumping up'
      ],
      correctTheory: 'Worn or damaged fuser heating cylinder failing to melt or scrape excess toner powder',
      requiredTests: ['printer_test_page', 'inspect_fuser'],
      correctPlan: 'replace_fuser',
      correctVerification: 'printer_test_page',
      correctPreventive: 'printer_test_page'
    },
    symptoms: [
      'Document print lines repeat in faint shadows down the sheet at exact 3-inch intervals.',
      'Fresh print pages have slightly dusty toner that smudges or rubs off when touched with fingers.',
      'Paper progresses through the mechanical rolling assemblies with zero physical jamming errors.'
    ],
    actionResponses: {
      'printer_test_page': {
        text: 'DIAGNOSTIC ALIGNMENT RESULTS: Page shows clear text patterns, but distinct trailing repeating ghost blocks appear every 3.14 inches, matching the exact rotational pitch of the hot fuser roller.',
        revealsRootCause: true,
        isClue: true
      },
      'inspect_fuser': {
        text: 'FUSER AUDIT: Checking the hot fuser reveals the non-stick heat-insulative roller surface has deep score marks, carbon crusts, and loose black toner powder melted directly onto the sleeve.',
        revealsRootCause: true,
        isClue: true
      },
      'replace_fuser': {
        text: 'Success! You shut off printer supplies, let the fuser roller cool down completely to avoid thermal burns, pull out the worn fuser cartridge assembly block, and slide in a fresh maintenance fuser unit. Replacement print pages are pristine with zero trailing ghost shadows!',
        revealsRootCause: true
      },
      'replace_toner': { text: 'You slide in a fresh toner. Print yields are darker, but faint trailing ghost repeats continue appearing on the sheets due to the sticky fuser roller.' },
      'clean_printheads': { text: 'You run software printhead clean. This has zero impact as this is a high-voltage laser dryer system, not an inkjet print capillary structure.' }
    },
    explanation: 'A laser printer fuser melts plastic-composite toner powder onto paper fibers using extreme heat and pressure. If the high-temperature fuser sleeve or scraper is degraded or coated with carbon, residual toner clings to the rotating drum and prints a repeating faint "ghost shadow" further down the page. Replacing the fuser restores precise thermal toner bonding.',
    comptiaObjectives: ['Domain 5.6 - Given a scenario, troubleshoot printers.']
  },
  {
    id: 'scen_020_tablet_unresponsive',
    title: 'Mobile Tablet Touchscreen Fails to Register Touch Selections',
    subsystem: 'Mobile Device',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-845',
      clientName: 'Jack Shephard',
      userDepartment: 'Logistics Operations',
      assetTag: 'AST-8833',
      role: 'Warehouse Coordinator',
      urgency: 'Medium',
      submittedTime: '45 mins ago',
      description: 'I cannot tap any buttons or navigate our inventory counting spreadsheets on our ruggedized floor tablet. The display turns on fine, showing real-time stocks, but tapping with fingers or stylus does absolutely nothing.'
    },
    specification: {
      cpu: 'ARM Quad Core System-on-Chip',
      motherboard: 'Rugged Mobile Logic Board',
      ram: '4GB Embedded RAM',
      gpu: 'ARM PowerVR GPU',
      psu: 'Rechargeable Li-Po Battery (88% capacity)',
      storage: '64GB Flash NAND',
      os: 'Android Enterprise WMS'
    },
    hiddenRootCause: {
      component: 'Defective or decalibrated touchscreen digitizer glass',
      shortDescription: 'Decalibrated capacitive digitizer overlay or loose digitizer connector after minor physical impact.',
      detailedCause: 'The tablet took a small tumble from a cart. Although the thick armor screen glass did not shatter, the capacitive overlay connector became slightly skewed or loose from the motherboard socket, preventing coordinates from translating into OS inputs.',
      possibleTheories: [
        'Depleted mobile system battery charge level',
        'Physical low-bandwidth or damaged display ribbon line',
        'Decalibrated capacitive digitizer overlay or loose digitizer connector after minor physical impact',
        'Android core system lockup causing driver death'
      ],
      correctTheory: 'Decalibrated capacitive digitizer overlay or loose digitizer connector after minor physical impact',
      requiredTests: ['iphone_battery_test', 'inspect_cables'],
      correctPlan: 'recalibrate_touchscreen',
      correctVerification: 'recalibrate_touchscreen',
      correctPreventive: 'recalibrate_touchscreen'
    },
    symptoms: [
      'The LCD display remains responsive, showing active background data streams and battery status.',
      'Plugging in an external USB OTG mouse allows you to click, scroll, and type flawlessly.',
      'No physical cracks are visible on the scratch-resistant glass casing.'
    ],
    actionResponses: {
      'iphone_battery_test': {
        text: 'DIAGNOSTIC RUNS: Battery capacity reads 92%, voltage profiles are steady. The system thermal chip reports 32°C (nominal). This is not an electrical or power lockup.',
        isClue: true
      },
      'inspect_cables': {
        text: 'PHYSICAL EXAM: The armored rubber shell has a scuff on the bottom. External casing shows a tiny gap near the lower digitizer frame connection, indicating a mechanical shock occurred.',
        isClue: true
      },
      'recalibrate_touchscreen': {
        text: 'Success! You link an external USB OTG mouse, enter the hardware diagnostic system menus, secure the internal digitizer connections, and run the screen overlay coordinate touch calibration. Taps, swipes, and stylus tracks are immediately recognized with high pixel-perfect accuracy!',
        revealsRootCause: true
      },
      'enable_disable_wifi': { text: 'You toggle Wi-Fi connection keys via the external mouse. Connection lights blink, but the screen still blocks touch inputs.' },
      'load_defaults': { text: 'You perform a soft factory reset using the OTG mouse. The OS restores defaults, but the baseline hardware touch sensors remain unresponsive until recalibrated/secured.' }
    },
    explanation: 'Capacitive touchscreens use a layered transparent digitizer grid to read electrical properties from skin contact. If a mechanical drop jarred its sensitive interface connection slightly loose or shifted current values, the OS fails to process coordinates. Recalibration and securing internal links restores normal touch interface.',
    comptiaObjectives: ['Domain 5.4 - Given a scenario, troubleshoot laptops and mobile devices.']
  },
  {
    id: 'scen_021_network_jitter',
    title: 'Intermittent Voice Jitter & Poor VoIP Quality Under Load',
    subsystem: 'Network',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-740',
      clientName: 'Winston Smith',
      userDepartment: 'Sales & Outreach',
      assetTag: 'PHON-522',
      role: 'Telemarketing Agent',
      urgency: 'High',
      submittedTime: '20 mins ago',
      description: 'During peak outbound sales campaigns, our desk VoIP phones experience horrific voice jitter, robotic/scrambled audio, and dropped spoken words. If only a few agents are in the office, the call audio remains perfectly clean and normal.'
    },
    specification: {
      cpu: 'Broadcom VoIP Chip',
      motherboard: 'IP Deskphone Logic Board',
      ram: '512MB RAM',
      gpu: 'Monochrome LCD Screen',
      psu: 'Power over Ethernet (PoE 802.3af)',
      storage: '128MB Flash',
      os: 'Proprietary SIP IP Firmware'
    },
    hiddenRootCause: {
      component: 'Lack of upstream router QoS voice priority queue configuration',
      shortDescription: 'Critical network audio jitter caused by lack of router QoS/DSCP prioritization during high bandwidth file copies.',
      detailedCause: 'When local workstations execute heavy email backups or file copies, the outbound gateway pipeline becomes congested. Without Quality of Service (QoS / DSCP Class 5 EF) prioritization, real-time audio sample frames are delayed and buffer-scattered, producing severe jitter.',
      possibleTheories: [
        'Physical RJ-45 pins oxidized on the phone wall plate jack',
        'Lack of router Quality of Service (QoS) prioritization for voice SIP packet streams',
        'Incorrect subnet mask mismatch setting on local VoIP phones',
        'DNS failure to resolve external telephone gateway IP targets'
      ],
      correctTheory: 'Lack of router Quality of Service (QoS) prioritization for voice SIP packet streams',
      requiredTests: ['ping_gateway', 'check_ip_config'],
      correctPlan: 'configure_qos',
      correctVerification: 'ping_gateway',
      correctPreventive: 'ping_gateway'
    },
    symptoms: [
      'Raw ping tests show latency shifts from 10ms to over 480ms (high jitter) while downloads occur.',
      'Active network throughput measurements remain constant and fast.',
      'SIP registry status stays fully active without losing registration status.'
    ],
    actionResponses: {
      'check_ip_config': {
        text: 'VOIP PHONE NET CONFIG: Static IP: 10.0.10.42, Netmask: 255.255.255.0, Gateway: 10.0.10.1. Primary server link: registered. System reports DSCP Tagging on default packets: "00 - Best Effort" (Unprioritized).',
        isClue: true
      },
      'ping_gateway': {
        text: 'DIAGNOSTIC PING TELEMETRY: Ping gateway 10.0.10.1 with empty network: 2ms steady. Turning on a workstation backup reveals: roundtrip times fluctuate rapidly between 3ms to 420ms. Jitter: 125ms (High). Packet loss: 4.8%.',
        revealsRootCause: true,
        isClue: true
      },
      'configure_qos': {
        text: 'Success! You connect to the core corporate routing gateway, access traffic control settings, and configure Quality of Service (QoS / DSCP Class 46 / Expedited Forwarding) prioritized rules for the VoIP segment. Voice ping jitter immediately collapses to a rock-steady 1.8ms under 100% data congestion load!',
        revealsRootCause: true
      },
      'inspect_cables': { text: 'You inspect the Cat5e patch cords. The RJ-45 clips click firmly into place. Link speed shows 100 Mbps Duplex on all phone nodes.' },
      'reboot_router': { text: 'You rebooted the switch router. The phone system stays stable for exactly 2 minutes until heavy local office file transfers resume and choke outbound buffers again.' }
    },
    explanation: 'Real-time media traffic like voice (SIP/RTP) and live video streaming is extremely sensitive to packet delay variations (jitter) and frame dropouts. Implementing router-level Quality of Service (QoS) guarantees dedicated priority bandwidth queues for voice packets, preventing data bursts from degrading call conversations.',
    comptiaObjectives: ['Domain 5.2 - Given a scenario, troubleshoot problems related to wired and wireless networks.']
  },
  {
    id: 'scen_022_network_flapping',
    title: 'Workstation Ethernet Link Port Flaps Intermittently',
    subsystem: 'Network',
    difficultyRating: 'Hard',
    ticket: {
      id: 'TKT-745',
      clientName: 'Fox Mulder',
      userDepartment: 'Special Archives',
      assetTag: 'AST-1190',
      role: 'Investigative Tech',
      urgency: 'Medium',
      submittedTime: '3 hrs ago',
      description: 'My wired computer keeps losing network access every 20-30 seconds. The taskbar system tray connection icon toggles between "Connected" and "No cable connected" repeatedly. Running network troubleshooter has not resolved the instability.'
    },
    specification: {
      cpu: 'Intel Core i5-9600K',
      motherboard: 'Gigabyte Z390 Designare',
      ram: '16GB RAM',
      gpu: 'Intel HD Onboard',
      psu: '500W Standard',
      storage: '500GB SSD',
      os: 'Windows 10 Enterprise (Wired Ethernet Connection)'
    },
    hiddenRootCause: {
      component: 'Defective copper Ethernet RJ-45 patch cord',
      shortDescription: 'Defective low-grade or bent-wire Ethernet RJ-45 patch cable causing link flapping and auto-negotiation failures.',
      detailedCause: 'The physical RJ-45 copper patch cord running between the desk port and workstation features internal cracked conductor pathways. When physical desk vibrations occur, the signal level sags below reference levels, causing the switch to drop and cycle the port connection.',
      possibleTheories: [
        'Incompatible DHCP lease reservation settings on the central domain controller',
        'Defective or fractured internal conductor pathways on the active RJ-45 patch cord causing physical link drops',
        'Green Energy Efficient Ethernet (EEE) software power manager conflict in UEFI BIOS',
        'Network driver stack corruption in operating system libraries'
      ],
      correctTheory: 'Defective or fractured internal conductor pathways on the active RJ-45 patch cord causing physical link drops',
      requiredTests: ['inspect_cables', 'check_ip_config'],
      correctPlan: 'replace_ethernet_cable',
      correctVerification: 'ping_gateway',
      correctPreventive: 'ping_gateway'
    },
    symptoms: [
      'The rear physical NIC green link LED turns solid on, blinks amber for 5 seconds, then completely turns off.',
      'Windows OS Event Log shows dozens of "Event 10400: NDIS Network Link Status: Down" reports occurring per hour.',
      'Switch management console registers continuous flapping warning notifications on port Port-23.'
    ],
    actionResponses: {
      'inspect_cables': {
        text: 'PHYSICAL LINK DIAGNOSTIC: You closely trace the Cat5e patch blue cable. There is a deep, sharp crease near the under-desk monitor stand hinge. Jiggling this crease section instantly triggers port dropouts on the local switchboards.',
        revealsRootCause: true,
        isClue: true
      },
      'check_ip_config': {
        text: 'IPCONFIG METRICS: Run fails intermittently as the connection keeps dropping. When active, it displays: IP 192.168.10.89, Gateway 192.168.10.1. Addressing resolves correctly before immediate port cutoff.',
        isClue: true
      },
      'replace_ethernet_cable': {
        text: 'Success! You swap the creased and fractured under-desk copper cable with a high-durability Cat6 snagless patch cable. The link light instantly locks onto steady solid green and continuous gateway pinging yields a beautiful 0.4ms latency with absolutely zero line dropouts!',
        revealsRootCause: true
      },
      'disable_eee': { text: 'You disable Energy Efficient Ethernet in drivers. The linkage remains physically unstable because of the physical internal copper fracture on the patch cable.' },
      'reboot_router': { text: 'You rebooted the switch unit. This port flapping issue persists immediately upon boot because of the physical cable continuity breaks.' }
    },
    explanation: 'Network link flapping is characterized by a connection cycling between up and down rapidly. This is predominantly triggered by a physical layer fault, such as broken pins, fractured internal twisted copper wires, or excessively loose jack retention clips.',
    comptiaObjectives: ['Domain 5.2 - Given a scenario, troubleshoot problems related to wired and wireless networks.']
  },
  {
    id: 'scen_023_display_burnin',
    title: 'Persistent Logged-Out Silhouette Image Retention (OLED Burn-in)',
    subsystem: 'Display',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-612',
      clientName: 'Dana Scully',
      userDepartment: 'Pathology Diagnostics',
      assetTag: 'MON-3042',
      role: 'Chief Medical Pathologist',
      urgency: 'Medium',
      submittedTime: '1 day ago',
      description: 'Our ultra-high-definition laboratory diagnostic monitor exhibits permanent shadow-like outlines of the Windows login clock and desktop panels. These ghosts are extremely distracting when examining high-contrast microscopic image cell slices.'
    },
    specification: {
      cpu: 'Workstation i7 platform',
      motherboard: 'Supermicro Serverboard',
      ram: '64GB ECC Memory',
      gpu: 'NVIDIA Quadro T1000 Professional Card',
      psu: '550W Seasonic Gold supply',
      storage: '1TB Pro SSD',
      os: 'Windows 11 x64 (Connected to 32" laboratory OLED Reference Display)'
    },
    hiddenRootCause: {
      component: 'Phosphor subpixel exhaustion / screen image retention',
      shortDescription: 'OLED organic subpixel emitter exhaustion due to static high-brightness imaging blocks.',
      detailedCause: 'The screen is left glowing at maximum brightness 24/7 on the same system landing panel. This continuous heavy voltage depletes organic subpixel light emitters within restricted static coordinate zones, triggering static pixel burn-in.',
      possibleTheories: [
        'Outdated UEFI BIOS onboard chip configurations',
        'Physical liquid intrusion under display perimeter bezels',
        'Organic diode subpixel emitter wear (OLED Screen Burn-in) caused by static display content left at max brightness',
        'Defective graphics cards scaling processors translating duplicate pixels'
      ],
      correctTheory: 'Organic diode subpixel emitter wear (OLED Screen Burn-in) caused by static display content left at max brightness',
      requiredTests: ['check_monitor_power', 'inspect_cables'],
      correctPlan: 'run_pixel_scrub',
      correctVerification: 'check_monitor_power',
      correctPreventive: 'run_pixel_scrub'
    },
    symptoms: [
      'Faint gray outlines of the lockscreen clock remain visible even when viewing full-page clean solid screens.',
      'Unplugging the active display cable and rendering a blank test screen still shows the persistent time outline.',
      'Changing system resolutions or installing basic display drivers does not alter the location of the silhouette.'
    ],
    actionResponses: {
      'check_monitor_power': {
        text: 'DIAGNOSTIC VISUAL SWEEP: Monitor Model: ASUS ProArt OLED. Running a solid flat light blue screen clearly reveals a ghost silhouette of the login panel: "08:00 AM - Faint outline". The backlight panel displays differential subpixel exhaustion.',
        revealsRootCause: true,
        isClue: true
      },
      'inspect_cables': { text: 'You replace HDMI/DisplayPort cords. The visual diagnostic patterns remain unchanged, showing static image silhouettes at coordinate segments.' },
      'run_pixel_scrub': {
        text: 'Success! You activate the display built-in Pixel Refresher / OLED Panel Maintenance scrub process (which runs white noise signals to re-stabilize driver voltage curves on subpixels) and configure the operating system to automatically turn off the screen after exactly 10 minutes of user inactivity. The ghost silhouette is completely resolved!',
        revealsRootCause: true
      },
      'change_resolution': { text: 'You change video scaling controls. The screen letters resize, but the flat burn-in stencil stays rooted exactly in the same spatial locations.' }
    },
    explanation: 'Emissive displays like OLEDs suffer from uneven subpixel aging when displaying static high-contrast objects for extended hours. Running pixel scrubs and setting strict display sleep-timer intervals prevents permanent luminance drift.',
    comptiaObjectives: ['Domain 5.4 - Given a scenario, troubleshoot problems related to video, projectors, and displays.']
  },
  {
    id: 'scen_024_display_dead_pixel',
    title: 'Monitor Displays Stuck Subpixels (Dead Pixel Defects)',
    subsystem: 'Display',
    difficultyRating: 'Easy',
    ticket: {
      id: 'TKT-615',
      clientName: 'Elliot Alderson',
      userDepartment: 'Network Defenses',
      assetTag: 'MON-9902',
      role: 'Cyber Analyst Lead',
      urgency: 'Low',
      submittedTime: '2 hrs ago',
      description: 'My brand new primary LCD panel has two tiny pinpoints of solid bright cyan that never change, and one solid black dot near the center. Whenever I write script lines, the static specs throw off character editing.'
    },
    specification: {
      cpu: 'AMD Ryzen 5 5600X',
      motherboard: 'MSI B550 Gaming Edge',
      ram: '32GB RAM',
      gpu: 'AMD Radeon RX 6600',
      psu: '650W PSU',
      storage: '1TB M.2 NVMe',
      os: 'Ubuntu Linux Desktop x64'
    },
    hiddenRootCause: {
      component: 'Defective LCD panel subpixels (Dead/Stuck Pixels)',
      shortDescription: 'Internal defect within LCD TFT transistor junctions locking active subpixel nodes.',
      detailedCause: 'Two transparent thin-film transistors on the active matrix grid are permanently shorted-shut (keeping subpixel filter elements constantly illuminated), while another transistor junction exhibits an open-circuit failure, creating a dead black pixel.',
      possibleTheories: [
        'Outdated display driver libraries causing rendering issues',
        'Internal hardware active matrix transistor defect resulting in stuck or dead LCD subpixels',
        'Electromagnetic fields generated by local desk speaker magnets',
        'Physical DisplayPort connector latch pin fracture restricting color signals'
      ],
      correctTheory: 'Internal hardware active matrix transistor defect resulting in stuck or dead LCD subpixels',
      requiredTests: ['check_monitor_power', 'test_onboard_graphics'],
      correctPlan: 'replace_lcd_panel',
      correctVerification: 'check_monitor_power',
      correctPreventive: 'check_monitor_power'
    },
    symptoms: [
      'Stuck brightly colored pinpoints remain perfectly static across different application windows.',
      'Rendering solid black images still shows bright cyan elements glowing.',
      'Gently rubbing the screen film with soft microfiber has zero effect on correcting the color nodes.'
    ],
    actionResponses: {
      'check_monitor_power': {
        text: 'PANEL TEST: Running standard RGB color grid test screens shows: Stuck subpixel 1 (Red: Off, Green: On, Blue: On -> Cyan) at coordinate (1120,480). Dead subpixel 2 (R: Off, G: Off, B: Off -> Black) at center. Solid physical matrix anomalies.',
        revealsRootCause: true,
        isClue: true
      },
      'test_onboard_graphics': { text: 'You connect the monitor to another test machine. The static cyan and black pinpoint spots exist on the panel in exactly the same coordinates.' },
      'replace_lcd_panel': {
        text: 'Success! You exchange the defective TFT screen with a certified replacement LCD flat panel monitor. Running the screen diagnostic arrays reveals an absolutely flawless layout with 100% active functional subpixels!',
        revealsRootCause: true
      },
      'run_pixel_scrub': { text: 'You execute a color-flashing software utility for 1 hour. This can temporarily free weak liquid crystal cells, but physical transistor circuit shorts are unaffected and the stuck nodes remain.' }
    },
    explanation: 'Dead and stuck pixels are native physical defects inside the ultra-thin LCD active-matrix sheet. If liquid crystal cells or driving thin-film transistors suffer physical fractures, they cannot shift polarity. Physical hardware swap is the definitive resolution for multi-pixel sector defects.',
    comptiaObjectives: ['Domain 5.4 - Given a scenario, troubleshoot problems related to video, projectors, and displays.']
  },
  {
    id: 'scen_025_projector_thermal',
    title: 'Corporate Classroom Projector Shuts Down (Thermal Safety Limit)',
    subsystem: 'Display',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-620',
      clientName: 'Giles Harrison',
      userDepartment: 'Employee Training',
      assetTag: 'PROJ-1022',
      role: 'Head Academy Educator',
      urgency: 'Medium',
      submittedTime: '3 hrs ago',
      description: 'Our overhead teaching projector triggers a loud internal relay click and completely shuts down or darkens exactly 10 to 12 minutes after starting. When this happens, a red LED labeled "TEMP/FILTER" flashes rapidly on the chassis.'
    },
    specification: {
      cpu: 'Embedded Presentation Processor',
      motherboard: 'OEM Video Mainboard',
      ram: '128MB Flash',
      gpu: 'Texas Instruments DLP Engine',
      psu: 'Internal High Voltage Ballast',
      storage: 'NAND Boot ROM',
      os: 'DLP System OS'
    },
    hiddenRootCause: {
      component: 'Saturated dust filter block/thermal safety cutout',
      shortDescription: 'Clogged high-density dust filters restricting heat dissipation, causing projector thermal safety cutouts.',
      detailedCause: 'The high-intensity metal-halide projector globe generates extreme heat. Fine fibers and dust have clogged the air filters, obstructing air circulation across heat sinks. Internal temperature probes hit safety cutouts (~85°C), forcing shut downs to prevent lamp explosions.',
      possibleTheories: [
        'Overheating due to extreme dust accumulation in physical intake air filters triggering safety shutdown sequences',
        'Degraded primary mainboard firmware causing timing loops',
        'Intermittent AC shore power circuit breaker drops',
        'Burned out cathode ray filaments inside projector optics'
      ],
      correctTheory: 'Overheating due to extreme dust accumulation in physical intake air filters triggering safety shutdown sequences',
      requiredTests: ['inspect_fans', 'inspect_cables'],
      correctPlan: 'replace_projector_bulb_filter',
      correctVerification: 'inspect_fans',
      correctPreventive: 'inspect_fans'
    },
    symptoms: [
      'The ventilation chassis of the projection box feels extremely hot to touch.',
      'The cooling exhaust fans start at full speed instantly, making a loud whirling noise before shutdown.',
      'Letting the unit cool down for 20 minutes allows it to boot again, but it shuts off in the same timeframe.'
    ],
    actionResponses: {
      'inspect_fans': {
        text: 'FANS & VENTILATION TELEMETRY: You shine a diagnostic flashlight into the intake grills. The main exhaust fan is rotating fully, but the fine intake foam filter block is solid with thick gray carpet dust and hair, entirely choking intake airflow.',
        revealsRootCause: true,
        isClue: true
      },
      'inspect_cables': { text: 'The AC power cord and heavy DisplayPort connectors are locked and secured with metal screws.' },
      'replace_projector_bulb_filter': {
        text: 'Success! You remove the projector side cover, pull out the choked sponge filters, install a fresh replacement high-flow air filter pack, and replace the old lamp module to refresh the system bulb hours count. The unit now stays at a perfectly cool 48°C and runs indefinitely!',
        revealsRootCause: true
      },
      'clean_dust': { text: 'You blow some canned air down external vents. This displaces a small cloud of dust, but the packed filter sponge blocks still restrict flow until physically detached and replaced.' }
    },
    explanation: 'Projectors utilize extremely powerful, hot light sources. Air intake screens are critical to cool internal optics. Blocked screens trigger quick thermal trip cutouts. Routine maintenance, including filter cleaning or replacement, maintains reliable operating temperatures.',
    comptiaObjectives: ['Domain 5.4 - Given a scenario, troubleshoot problems related to video, projectors, and displays.']
  },
  {
    id: 'scen_026_storage_missing_drive',
    title: 'Secondary Storage Volume Disappears (Modular Cable Fault)',
    subsystem: 'Storage',
    difficultyRating: 'Hard',
    ticket: {
      id: 'TKT-432',
      clientName: 'Sherlock Holmes',
      userDepartment: 'Private Research',
      assetTag: 'AST-4190',
      role: 'Consulting Investigator',
      urgency: 'High',
      submittedTime: '4 hrs ago',
      description: 'My secondary storage pool drive containing key evidence records has vanished. It does not display in Windows File Explorer, and checking Disk Management shows only my primary C: OS drive. I hear no weird crunching or drop sounds from the case.'
    },
    specification: {
      cpu: 'AMD Ryzen 9 5900X',
      motherboard: 'ASUS ROG Strix X570-E',
      ram: '64GB DDR4 Dual Channel',
      gpu: 'AMD Radeon RX 6700 XT',
      psu: 'Corsair RM750x Modular Power Supply',
      storage: '1x 500GB NVMe M.2 SSD (C: OS), 1x 2TB SATA SSD (D: Files)',
      os: 'Windows 11 Pro'
    },
    hiddenRootCause: {
      component: 'Loose modular PSU power cable interface slot',
      shortDescription: 'Loose power delivery interface on the modular power supply chassis side, disconnecting the secondary SATA drive.',
      detailedCause: 'The secondary SSD is connected internally using a modular SATA power line. The cable interface on the power supply casing was not fully clicked home, and system cooling fan frame vibrations eventually jarred the plug slot loose, cutting off 5V/12V power to the drive.',
      possibleTheories: [
        'Primary OS system registry file damage preventing disk access',
        'Incomplete or unlatched modular SATA power cable socket connection at the PSU housing slot',
        'Physical failure of magnetic drive actuator heads (mechanical crash)',
        'Faulty NVMe motherboard controller lanes'
      ],
      correctTheory: 'Incomplete or unlatched modular SATA power cable socket connection at the PSU housing slot',
      requiredTests: ['verify_psu_connections', 'enter_bios'],
      correctPlan: 'replace_modular_psu_cable',
      correctVerification: 'enter_bios',
      correctPreventive: 'enter_bios'
    },
    symptoms: [
      'Disk Management tool only shows "Disk 0 - C: 465GB Online" with zero auxiliary hardware listed.',
      'Opening Device Manager reveals no "Unknown Device" or yellow warning exclamation symbols.',
      'The secondary drive SATA data cable is locked securely into SATA port 1 of the motherboard.'
    ],
    actionResponses: {
      'verify_psu_connections': {
        text: 'INTERNAL POWER LATCH CHECK: You open the rear motherboard layout shroud. While the drive-side SATA plug is fully locked, checking the modular power supply housing reveals the modular 6-pin peripheral power lead is dangling loosely out of SATA-1 socket.',
        revealsRootCause: true,
        isClue: true
      },
      'enter_bios': {
        text: 'UEFI STORAGE AUDIT: Booting Motherboard BIOS shows: M.2-1 Slot: Samsung 980 Pro (Present). SATA-1 Port: Empty. SATA-2 Port: Empty. The secondary drive is completely invisible to firmware layers.',
        isClue: true
      },
      'replace_modular_psu_cable': {
        text: 'Success! You route a brand new premium modular SATA power line directly to the storage tray, click the modular socket interface firmly into the Corsair PSU pin box until the plastic latch clicks shut, then power up. The secondary D: storage volume is instantly recognized and all evidence logs are intact!',
        revealsRootCause: true
      },
      'reconnect_storage': { text: 'You pull and reconnect the drive SATA cables. This does not help because there is still no power arriving at the SATA interface due to the loosely disconnected modular PSU plug side.' }
    },
    explanation: 'Fully modular power supplies are prone to connection issues if cables are not pushed in completely until locking tab engagement. Even slight cable drift halts electrical flows, making the target hardware disappear from motherboard detection layers.',
    comptiaObjectives: ['Domain 5.3 - Given a scenario, troubleshoot hard drives and RAID arrays.', 'Domain 5.1 - Given a scenario, troubleshoot motherboards, RAM, CPU, and power.']
  },
  {
    id: 'scen_027_storage_bcd_corrupt',
    title: 'Operating System Not Found Error (Corrupted BCD Store)',
    subsystem: 'Storage',
    difficultyRating: 'Easy',
    ticket: {
      id: 'TKT-411',
      clientName: 'Leonard McCoy',
      userDepartment: 'Emergency Health',
      assetTag: 'AST-5509',
      role: 'Chief Medical Officer',
      urgency: 'Critical',
      submittedTime: '15 mins ago',
      description: 'After an office building power failure forced a dirty thermal trip shutdown, my laptop fails to boot into Windows. It displays a black screen with the flashing white letters: "An operating system wasn\'t found" or boot sector missing.'
    },
    specification: {
      cpu: 'Intel Core i5-1135G7',
      motherboard: 'Dell OEM Latitude board',
      ram: '8GB DDR4',
      gpu: 'Graphics Onboard',
      psu: 'Dell AC Adapter',
      storage: '256GB NVMe SSD',
      os: 'Windows 10 Enterprise Professional'
    },
    hiddenRootCause: {
      component: 'Corrupted Boot Configuration Data block',
      shortDescription: 'Corrupted Windows Boot Configuration Data (BCD) sectors following dirty emergency shutdown.',
      detailedCause: 'The sudden power cutoff occurred while the system was flushing registry logs. This corrupted the active boot manager registry configuration, causing the UEFI firmware boot device sequence searches to fail.',
      possibleTheories: [
        'Complete physical sector write-wear failure of the internal NVMe SSD chips',
        'Corrupted Windows Boot Configuration Data (BCD) system files on the active System Reserve partition',
        'Incorrect SATA operation settings in UEFI BIOS',
        'Physical RAM bit-flip causing memory block address errors'
      ],
      correctTheory: 'Corrupted Windows Boot Configuration Data (BCD) system files on the active System Reserve partition',
      requiredTests: ['enter_bios', 'boot_usb'],
      correctPlan: 'rebuild_bcd',
      correctVerification: 'boot_usb',
      correctPreventive: 'boot_usb'
    },
    symptoms: [
      'Booting the client workstation triggers a black screen with an immediate POST failure statement.',
      'The system drive is fully recognized by name in UEFI utility listings.',
      'There are absolutely no weird mechanical clicking or physical whirring sounds.'
    ],
    actionResponses: {
      'enter_bios': {
        text: 'UEFI BIOS SCAN: Internal Drive: KIOXIA 256GB NVMe SSD is recognized. Secure Boot is enabled. SATA operation is set to AHCI. Boot List option shows: Windows Boot Manager.',
        isClue: true
      },
      'boot_usb': {
        text: 'DIAGNOSTIC USB TOOL ANALYSIS: Booting from a live Windows Recovery USB shows the primary NTFS partition on Disk 0 is fully intact. You can read user documents, but running default startup repair tool displays: "BCD Error: OxC0000098 - Recovery Configuration File is corrupted or contains invalid data."',
        revealsRootCause: true,
        isClue: true
      },
      'rebuild_bcd': {
        text: 'Success! You boot from the recovery USB, open a command terminal, change to active recovery tools, and execute "bootrec /rebuildbcd" along with "/rebuildos". The tool successfully locates the primary Windows directory, reconstructs partition metadata, and restarts cleanly into the main OS!',
        revealsRootCause: true
      },
      'replace_storage': { text: 'You replace the entire hard drive. This works, but it causes complete data loss and requires a lengthly fresh OS installation, which is unnecessary since the existing SSD is healthy and only the BCD sectors are corrupted.' }
    },
    explanation: 'Sudden power disruptions during write operations can truncate system partition files like the Boot Configuration Data (BCD) or master boot registries. Using command-line tools to reconstruct these configuration sectors restores OS bootstrap linkages without wiping user files.',
    comptiaObjectives: ['Domain 5.3 - Given a scenario, troubleshoot hard drives and RAID arrays.']
  },
  {
    id: 'scen_028_printer_paper_jam',
    title: 'Laser Printer Multiple-Sheet Accompaniant (Worn Pickup Rollers)',
    subsystem: 'Printer',
    difficultyRating: 'Easy',
    ticket: {
      id: 'TKT-519',
      clientName: 'Peggy Carter',
      userDepartment: 'Administrative Operations',
      assetTag: 'PRN-9092',
      role: 'Logistics Supervisor',
      urgency: 'Medium',
      submittedTime: '2 hrs ago',
      description: 'The primary office multi-function laser printer jams constantly inside Paper Tray 1. It pulls 2 or 3 blank pages at the same time, causing accordion-like friction folds, crumpled edges, and blocking the mechanical feeders.'
    },
    specification: {
      cpu: 'ARM Core Printer ASIC',
      motherboard: 'Laser Engine Logic Card',
      ram: '512MB RAM',
      gpu: 'None',
      psu: 'Integrated power boards',
      storage: 'Flash ROM',
      os: 'Standard laser system firmware'
    },
    hiddenRootCause: {
      component: 'Worn or slick rubber roller / separation pad',
      shortDescription: 'Degraded rubber pickup feed rollers and worn separation pads dragging excessive blank sheets.',
      detailedCause: 'Over thousands of pages, the textured rubber on the pickup feed rollers has worn smooth. Dust and paper dross have filled the remaining grooves. This, combined with a flattened separation pad, allows multiple sheets of paper to stick together and feed at once.',
      possibleTheories: [
        'Excessive static charge building inside the laser corona transfer wire assembly',
        'Worn rubber paper pickup rollers and degraded separation pads sucking multiple pages simultaneously',
        'Incompatible software page duplexing drivers forcing paper loops',
        'Clogged inkjet ink delivery tubes starving paper friction rollers'
      ],
      correctTheory: 'Worn rubber paper pickup rollers and degraded separation pads sucking multiple pages simultaneously',
      requiredTests: ['printer_test_page', 'inspect_fuser'],
      correctPlan: 'replace_pickup_rollers',
      correctVerification: 'printer_test_page',
      correctPreventive: 'printer_test_page'
    },
    symptoms: [
      'The printer console triggers error screen: "Jam in Tray 1 - Open and clear paper paths."',
      'Crumpled, accordion-folded paper clumps are wedged firmly beneath the input sensor flaps.',
      'Using thick high-quality cotton linen paper stock still triggers the multi-feed failure.'
    ],
    actionResponses: {
      'printer_test_page': {
        text: 'DIAGNOSTIC CYCLE: Running a test results in immediate motor load strain. The rollers rotate but pull two sheets at once, wedging both pages and stopping printer feeding wheels. Paper edges are heavily creased and bunched up.',
        isClue: true
      },
      'inspect_fuser': { text: 'You examine the fuser assembly. It is hot and free of loose paper residue or scratch marks.' },
      'replace_pickup_rollers': {
        text: 'Success! You shut down the unit, lower Tray 1 feeders, unlatch the slick grey pickup roller tubes, snap in a fresh set of premium textured rubber rollers along with a new separation pad, and run test batches. The separation pad holds sheets back cleanly, feeding exactly one page at a time with 100% reliability!',
        revealsRootCause: true
      },
      'replace_toner': { text: 'You install a new toner block. The print toner density increases, but the feed mechanism still drags multiple sheets and jams immediately.' }
    },
    explanation: 'Rubber pickup rollers feature textured microgrooves to grab single sheets of paper via friction. Over time, paper dust polishes the rubber smooth, while the underlying separation pad loses friction. Replacing these worn-out elements ensures single-sheet separation.',
    comptiaObjectives: ['Domain 5.6 - Given a scenario, troubleshoot printers.']
  },
  {
    id: 'scen_029_printer_inkjet_clogged',
    title: 'Inkjet Output Missing Specific Colors (Blocked Nozzles)',
    subsystem: 'Printer',
    difficultyRating: 'Easy',
    ticket: {
      id: 'TKT-520',
      clientName: 'Hugo Reyes',
      userDepartment: 'Employee Services',
      assetTag: 'PRN-2210',
      role: 'Staff Lead Coordinator',
      urgency: 'Medium',
      submittedTime: '1 hr ago',
      description: 'Our color desk inkjet printer is producing terrible page prints. All the red and blue graphics are completely missing or faded out, leaving only light yellow bands and blank segments, even though we just installed brand-new ink tanks yesterday.'
    },
    specification: {
      cpu: 'Inkjet Controller ASIC',
      motherboard: 'OEM Print Board',
      ram: '64MB RAM',
      gpu: 'None',
      psu: '90W external power adapter',
      storage: 'Internal Flash',
      os: 'Inkjet Engine firmware'
    },
    hiddenRootCause: {
      component: 'Dried ink blocking capillary printhead nozzles',
      shortDescription: 'Dried pigment residue blocking the micro-capillary printhead nozzle apertures.',
      detailedCause: 'The printer was left unused near a heating vent for 3 months. This caused liquid ink inside the printhead nozzles to dry out and crystallize, forming solid blockages that completely obstruct pigment spray paths.',
      possibleTheories: [
        'Incorrect system driver color translation profile tables',
        'Dried ink residue blocking micro-capillary printhead nozzle pathways',
        'Empty ink cartridges leaking vacuum air pockets into feedlines',
        'Laser system scan mirror alignment defects filtering primary color waves'
      ],
      correctTheory: 'Dried ink residue blocking micro-capillary printhead nozzle pathways',
      requiredTests: ['printer_test_page', 'inspect_cables'],
      correctPlan: 'clean_printheads',
      correctVerification: 'printer_test_page',
      correctPreventive: 'printer_test_page'
    },
    symptoms: [
      'The printer driver reports all Cyan, Magenta, and Yellow ink reserves are fully populated.',
      'Running print cycles results in whisper quiet head carriage movement but only yellow lines print.',
      'No ink spots or leaks are visible on the internal mechanical carriage or roller bar.'
    ],
    actionResponses: {
      'printer_test_page': {
        text: 'DIAGNOSTIC TEST PAGE RESULTS: The black and yellow solid blocks are correct. The blue (Cyan) and red (Magenta) color columns are completely missing. There is not even a faint smudge of these shades.',
        revealsRootCause: true,
        isClue: true
      },
      'inspect_cables': { text: 'You examine the physical cables and connect the USB line. Data transfers are completely nominal.' },
      'clean_printheads': {
        text: 'Success! You activate the extensive, high-pressure software-driven printhead nozzle cleaning cycle, injecting solvent and high-velocity ink drops into the channels to dissolve blockages. Complete test panels compile perfectly, showing vibrant, rich colors across all ink channels!',
        revealsRootCause: true
      },
      'replace_ink': { text: 'You put in another set of ink tanks. The status page remains full, but because the printhead nozzles are still physically blocked by dried crusts, the page output stays faded.' }
    },
    explanation: 'When inkjet printers sit idle, the liquid vehicle in the ink evaporates, leaving solid paint pigments to dry and harden inside the microscopic printhead apertures. Running a purge or nozzle cleaning cycle pushes fresh ink and solvents to dissolve blockages and re-establish proper capillary flow.',
    comptiaObjectives: ['Domain 5.6 - Given a scenario, troubleshoot printers.']
  },
  {
    id: 'scen_030_printer_drum_scratch',
    title: 'Laser Prints Contain Vertical Streak Marks (Scratched Drum)',
    subsystem: 'Printer',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-559',
      clientName: 'Sayid Jarrah',
      userDepartment: 'Security Communications',
      assetTag: 'PRN-5401',
      role: 'Hardware Communications Specialist',
      urgency: 'Medium',
      submittedTime: '3 hrs ago',
      description: 'Our high-volume department laser sheets have a thick, straight, solid vertical black line running down the entire right page margin on every single printed document. It occurs regardless of print queue source or layout orientation.'
    },
    specification: {
      cpu: 'ASIC printer processor',
      motherboard: 'OEM Board',
      ram: '128MB RAM',
      gpu: 'None',
      psu: 'High wattage line regulator board',
      storage: 'System Flash',
      os: 'Laser firmware system'
    },
    hiddenRootCause: {
      component: 'Defective photostatic imaging drum cylinder',
      shortDescription: 'Deep circular scratch mark in the photosensitive imaging drum coating permanently attracting toner.',
      detailedCause: 'A metal paperclip was accidentally fed through the printer recycling paths. This physically scratched the outer photosensitive selenium layer on the imaging drum. Because this gouged ring cannot hold an electrostatic charge, it continuously attracts loose toner powder, printing a solid black vertical band.',
      possibleTheories: [
        'Damaged laser mirrors failing to deflect scan rays to the margin zones',
        'Physical circular scratch gouge in the photosensitive selenium layer of the imaging drum',
        'Clogged spray apertures on the primary high voltage charge corona wire assembly',
        'Outdated printer operating system driver margins overriding text'
      ],
      correctTheory: 'Physical circular scratch gouge in the photosensitive selenium layer of the imaging drum',
      requiredTests: ['printer_test_page', 'inspect_fuser'],
      correctPlan: 'replace_imaging_drum',
      correctVerification: 'printer_test_page',
      correctPreventive: 'printer_test_page'
    },
    symptoms: [
      'The thick black vertical mark is 100% solid, has clean sharp borders, and is exactly the same width on every page.',
      'Wiping the laser toner cartridge cartridge shows some black rings, but the toner powder itself is dry and fresh.',
      'Other printed text blocks and figures on the sheets are razor sharp with proper density.'
    ],
    actionResponses: {
      'printer_test_page': {
        text: 'DIAGNOSTIC PRINT RUN: The alignment document prints fine, but a 1.2mm thick vertical dark continuous line is drawn perfectly straight down the right side margin page border from start to finish.',
        isClue: true
      },
      'inspect_fuser': {
        text: 'FUSER AUDIT: You carefully inspect the heating rollers. Thermal cylinder elements and non-stick gaskets are smooth and clean with zero paper scraps or toner buildup.',
        isClue: true
      },
      'replace_imaging_drum': {
        text: 'Success! You pull out the toner group slide, detach the defective photosensitive drum cylinder block (which has a visible deep scratch ring wrapping its perimeter), and snap in a brand-new certified replacement imaging drum unit. Prints are absolutely flawless now with zero vertical lines!',
        revealsRootCause: true
      },
      'replace_toner': { text: 'You replace the toner. Printed text gets darker and richer, but the vertical black line remains because the scratch is on the actual imaging drum, which is a separate physical unit.' }
    },
    explanation: 'The photosensitive imaging drum holds an electrostatic charge written by the laser, which temporarily attracts fine black toner particles. If the drum surface is scratched, that damaged sector cannot hold charge, causing it to attract toner constantly. Replacing the imaging drum eliminates these artifacts.',
    comptiaObjectives: ['Domain 5.6 - Given a scenario, troubleshoot printers.']
  },
  {
    id: 'scen_031_printer_impact_ribbon',
    title: 'Dot-Matrix Printing is Extremely Faint (Dry Carbon Ribbon)',
    subsystem: 'Printer',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-562',
      clientName: 'Sun-Hwa Kwon',
      userDepartment: 'Procurement Logistics',
      assetTag: 'PRN-1011',
      role: 'Lead Warehouse Dispatcher',
      urgency: 'High',
      submittedTime: '4 hrs ago',
      description: 'The dispatch dot-matrix impact printer is running at full mechanical speed, with the print head pins clicking furiously against the multi-part carbon invoice sheets. However, the output text is so exceptionally faint it is practically invisible.'
    },
    specification: {
      cpu: '8-bit Ziplog micro-controller',
      motherboard: '9-pin impact controller card',
      ram: '32KB SRAM',
      gpu: 'None',
      psu: 'Integrated power transformer brick',
      storage: 'EEPROM storage',
      os: 'OkiData Microline Engine standard firmware'
    },
    hiddenRootCause: {
      component: 'Exhausted dry carbon printer ink ribbon cartridge',
      shortDescription: 'Exhausted, dried-out fabric impact printer ink ribbon cartridge lacking transfer pigment.',
      detailedCause: 'The fabric loop within the carbon cartridge has completed thousands of cyclic impact prints, completely depleting the liquid ink reserves and drying out the fabric fibers, leaving no ink to transfer to the multipart carbon forms upon physical pin strikes.',
      possibleTheories: [
        'Outdated Windows parallel DB-25 emulation drivers',
        'Exhausted and dried-out fabric impact printer ink ribbon cartridge',
        'Cracked or broken printhead impact solenoid pin nodes',
        'Broken tractor-feed mechanical gears slipping track paths'
      ],
      correctTheory: 'Exhausted and dried-out fabric impact printer ink ribbon cartridge',
      requiredTests: ['printer_test_page', 'inspect_cables'],
      correctPlan: 'replace_impact_ribbon',
      correctVerification: 'printer_test_page',
      correctPreventive: 'printer_test_page'
    },
    symptoms: [
      'The horizontal pin print head operates fully, sweeping from edge to edge on the tractor-feed paper.',
      'Continuous-feed carbon-copy invoice pages advance through the tractor gears smoothly.',
      'Text characters are shaped correctly, but occur in an extremely faint, light grey shadow.'
    ],
    actionResponses: {
      'printer_test_page': {
        text: 'DIAGNOSTIC TEST PASS: Mechanical pins hammer the continuous form sheet properly. All characters are formed correctly and complete, with zero missing vertical line dropouts. This proves all 9 physical carriage pins are undamaged, but ink transfer is extremely faint.',
        isClue: true,
        revealsRootCause: true
      },
      'inspect_cables': { text: 'You verify connections. The legacy parallel Centronics-to-USB cable is attached secure and communicates cleanly with host PC.' },
      'replace_impact_ribbon': {
        text: 'Success! You flip open the printer cover, pop out the dry ink ribbon track housing, clip in a brand-new pre-inked carbon fabric ribbon cartridge, and configure the print head gap wheel to standard thickness. Impact print text is instantly rich, dark, and perfectly legible across all carbon layers!',
        revealsRootCause: true
      },
      'clean_printheads': { text: 'You soak the print head plate. This does not address the ink delivery method of an impact printer, which relies on hitting an inked ribbon ribbon.' }
    },
    explanation: 'Dot-matrix impact printers use solenoid-driven metal wire pins to stamp an inked fabric or carbon ribbon against modern multi-part paper sheets. When the ribbon fabric dries out or is worn clean of pigment, strikes write nothing. Installing a brand-new physical ink ribbon cartridge restores dark print yields.',
    comptiaObjectives: ['Domain 5.6 - Given a scenario, troubleshoot printers.']
  },
  {
    id: 'scen_032_mobile_liquid',
    title: 'Executive Smartphone Shuts Down Intermittently (Liquid Corrosion)',
    subsystem: 'Mobile Device',
    difficultyRating: 'Hard',
    ticket: {
      id: 'TKT-822',
      clientName: 'Jin-Soo Kwon',
      userDepartment: 'Executive Relations',
      assetTag: 'MOB-1104',
      role: 'Vice President of Sales',
      urgency: 'Critical',
      submittedTime: '2 hrs ago',
      description: 'I dropped my work phone in a stream during a lunch hike. I immediately retrieve it and wiped it dry with paper towels. It worked fine for a few hours, but now the touchscreen has locked up, the display is flicking out, and the device randomly powers down.'
    },
    specification: {
      cpu: 'SAMSUNG Exynos Octa Core SoC',
      motherboard: 'SAMSUNG Galaxy Logic Board',
      ram: '8GB LPDDR5',
      gpu: 'Mali GPU Integration',
      psu: '4500mAh Li-Po Battery Core',
      storage: '128GB UFS Flash Storage',
      os: 'Android Business OS'
    },
    hiddenRootCause: {
      component: 'Acidic mineral salt corrosion inside logic board components',
      shortDescription: ' Conductive liquid intrusion and subsequent mineral salt corrosion on internal motherboard power traces.',
      detailedCause: 'While external wiping dried the shell, stream water seeped into the charging port and speaker screens. conductives mineral salts stayed behind. As battery current passed through, it catalyzed rapid acid metal corrosion, shorting out local sub-circuits.',
      possibleTheories: [
        'Complete touchscreen digitizer layer impact fracture',
        'Conductive stream water intrusion leading to mineral salt corrosion and sub-circuit logic board short-circuits',
        'Android security daemon preventing boot sequences',
        'Power adapter charger brick overload melting main contacts'
      ],
      correctTheory: 'Conductive stream water intrusion leading to mineral salt corrosion and sub-circuit logic board short-circuits',
      requiredTests: ['iphone_battery_test', 'inspect_cables'],
      correctPlan: 'disassemble_dry_device',
      correctVerification: 'iphone_battery_test',
      correctPreventive: 'iphone_battery_test'
    },
    symptoms: [
      'The internal visual moisture indicators (LDI tabs) located in the SIM card tray are bright dark red instead of white.',
      'Fine white/green powdery crust deposits are visible inside the SIM and USB charging slots.',
      'Holding the power button triggers mild heat generation near the top back lens, but the display stays dark.'
    ],
    actionResponses: {
      'iphone_battery_test': {
        text: 'DIAGNOSTIC CURRENT INQUEST: Charging current is highly erratic, spiking from 0.05A to 1.8A in seconds. Battery voltage reads 2.9V (Critically Low). Liquid indicator stickers are solid deep red, confirming liquid penetration.',
        revealsRootCause: true,
        isClue: true
      },
      'inspect_cables': {
        text: 'PHYSICAL EXAM: The outer glass casing is perfect, but a faint, moist haze is trapped beneath the front camera glass lens cowl.',
        isClue: true
      },
      'disassemble_dry_device': {
        text: 'Success! You pry open the smartphone back enclosure, extract the main logic board, and bathe it in a high-purity 99% isopropyl alcohol fluid chamber to wash away mineral salts and displace hidden water. After deep drying and re-assembling with localized thermal shield paste, the smartphone boots perfectly with full touchscreen control!',
        revealsRootCause: true
      },
      'replace_mobile_battery': { text: 'You change the battery. The screen blinks for a second, but because the raw copper motherboard tracks are still bridged by conductive salt residues, the circuit immediately shorts out and dies.' }
    },
    explanation: 'Wet electronics suffer damage not just from shorting out, but from rapid oxidation (rust and scaling) catalyzed by mineral impurities left behind by evaporated water. Disassembling the device and cleaning the board with anhydrous isopropyl alcohol removes conductive residue before traces disintegrate.',
    comptiaObjectives: ['Domain 5.4 - Given a scenario, troubleshoot laptops and mobile devices.']
  },
  {
    id: 'scen_033_mobile_malware',
    title: 'Tablet Overheats and Battery Drains Instantly (Mining Malware)',
    subsystem: 'Mobile Device',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-829',
      clientName: 'Claire Littleton',
      userDepartment: 'Field Inspections',
      assetTag: 'AST-8004',
      role: 'Inspector Inspector Supervisor',
      urgency: 'Medium',
      submittedTime: '3 hrs ago',
      description: 'Our mobile field tablet is extremely hot behind the rear cover, and the battery state moves from 100% to dead empty in less than 35 minutes, even when sitting idle in my locker. It takes 6 hours to charge back up, and system screens are incredibly laggy.'
    },
    specification: {
      cpu: 'ARM Dual-Core Embedded CPU',
      motherboard: 'OEM Tablet Logic Board',
      ram: '3GB Embedded RAM',
      gpu: 'ARM Mali Graphics',
      psu: 'Rechargeable 5000mAh Battery Pack',
      storage: '32GB Flash',
      os: 'Android 10 Core (Modified Business Build)'
    },
    hiddenRootCause: {
      component: 'Unauthorized cryptojacking mining malware background daemon',
      shortDescription: 'Unlicensed cryptojacking mining malware running hidden background processing threads at 100% CPU lock.',
      detailedCause: 'The user inadvertently clicked a dynamic web link that sideloaded a malicious background cryptocurrency miner daemon. This script runs indefinitely at maximum clock speed, locking all CPU core threads at 100%, causing high heat generation and rapid battery drain.',
      possibleTheories: [
        'Physical structural damage to high-voltage display backlights',
        'Exhausted lithium charging battery modules leaking current',
        'Sideloaded cryptojacking mining malware locking CPU cores at 100% utilization in the background',
        'Damaged internal Wi-Fi antenna coils continually sweeping local radio waves'
      ],
      correctTheory: 'Sideloaded cryptojacking mining malware locking CPU cores at 100% utilization in the background',
      requiredTests: ['iphone_battery_test', 'check_ip_config'],
      correctPlan: 'run_malware_scan',
      correctVerification: 'iphone_battery_test',
      correctPreventive: 'iphone_battery_test'
    },
    symptoms: [
      'The rear plastic casing registers a hot 49°C temperature level under idle load state.',
      'Swipe transitions take 4-5 seconds to complete, displaying extreme CPU lag.',
      'Network connections continuously open high-concurrency requests to external anonymous IP pools.'
    ],
    actionResponses: {
      'iphone_battery_test': {
        text: 'DIAGNOSTIC HARDWARE GRAB: System task monitor reports: CPU core load: 99.8% steady. Memory consumption: nominal. The highest consumer process is anonymized: "libcrypto_miner_agent". The battery core is drawing 15W idle power and heating up to 48.5°C.',
        revealsRootCause: true,
        isClue: true
      },
      'check_ip_config': {
        text: 'NETWORK SOCKET READS: Wi-Fi resolving fine, but actively routing high volumes of outbound telemetry packets to standard cryptomining pool ports (such as Port 4444 or 3333).',
        isClue: true
      },
      'run_malware_scan': {
        text: 'Success! You boot the tablet into Android Safe Mode (which prevents load scripts from booting), install a trusted enterprise mobile security tool, run a full system scan, isolate and overwrite "libcrypto_miner_agent", and reboot normal. CPU core rates collapse back to 2%, and battery operation cools to room temperature!',
        revealsRootCause: true
      },
      'replace_mobile_battery': { text: 'You install a replacement battery pack. The capacity returns to 100%, but because the mining daemon is still driving the CPU core at max clock cycles, the tablet continues to discharge in an hour and heat up.' }
    },
    explanation: 'Mobile malware, particularly background coin mining scripts or trojans, consumes massive resources. This locks processing threads at high frequencies, resulting in extreme battery decay and thermal thresholds. Booting safe modes and running deep antivirus scans eliminates the software daemon.',
    comptiaObjectives: ['Domain 5.4 - Given a scenario, troubleshoot laptops and mobile devices.']
  },
  {
    id: 'scen_034_mobile_screen_crack',
    title: 'Cracked Mobile Digitizer Matrix (Shattered LCD Screen)',
    subsystem: 'Mobile Device',
    difficultyRating: 'Easy',
    ticket: {
      id: 'TKT-834',
      clientName: 'Daniel Faraday',
      userDepartment: 'Field Physics Research',
      assetTag: 'TAB-4402',
      role: 'Associate Field Physicist',
      urgency: 'Medium',
      submittedTime: '4 hrs ago',
      description: 'Our floor inventory tablet has a shattered front screen glass after slipping from a concrete dock step. While the display still lights up, touch tracking is erratic; tapping the left screen clicks on the right margin instead.'
    },
    specification: {
      cpu: 'Octa-core ARM Processor',
      motherboard: 'OEM Embedded Board',
      ram: '4GB DDR4',
      gpu: 'ARM G71 Graphics',
      psu: 'Integrated rechargeable pack',
      storage: '64GB Flash',
      os: 'Android 11 WMS Enterprise'
    },
    hiddenRootCause: {
      component: 'Shattered physical glass digitizer screen grid',
      shortDescription: 'Fractured capacitive trace pathways on the laminated digitizer and LCD panel grid.',
      detailedCause: 'The severe physical impact shattered the front glass substrate and severed several key capacitive data rows on the active coordinate digitizer foil. Current shifts erratically between broken pathways, resulting in wrong tap coordinates.',
      possibleTheories: [
        'Corrupted screen coordinate operating system coordinate map logs',
        'Physical glass fracture fracturing the capacitive coordinate digitizer row matrices',
        'Damaged visual graphics card processing core chips',
        'Weak battery voltage causing screen rendering delays'
      ],
      correctTheory: 'Physical glass fracture fracturing the capacitive coordinate digitizer row matrices',
      requiredTests: ['inspect_cables', 'iphone_battery_test'],
      correctPlan: 'replace_mobile_screen',
      correctVerification: 'inspect_cables',
      correctPreventive: 'inspect_cables'
    },
    symptoms: [
      'The screen features deep spiderweb cracks spreading from the lower-left corner across the center.',
      'Bright multi-colored vertical scanlines glow along the leftmost LCD cells.',
      'Dragging a testing stylus grid causes the screen draw tracking to drift wildly.'
    ],
    actionResponses: {
      'inspect_cables': {
        text: 'PHYSICAL EXAM: You inspect the tablet. The protective rubber bezel cover is ripped off. Clear micro-glass splinters are shedding from deep spider-web cracks in the screen surface, and a dent is visible on the chassis frame.',
        isClue: true,
        revealsRootCause: true
      },
      'iphone_battery_test': { text: 'You run battery health tests. The module is charging at 1.2A, showing stable battery status and no thermal bloat.' },
      'replace_mobile_screen': {
        text: 'Success! You heat the tablet screen borders to soften adhesive sealants, pry away the shattered glass assembly, disconnect the damaged digitizer ribbon cable, and snap in a brand-new pristine laminated OEM LCD and digitizer block. Slide test inputs show flawless, pixel-precise coordinates!',
        revealsRootCause: true
      },
      'recalibrate_touchscreen': { text: 'You run coordinate calibration. The tool fails immediately with "Hardware Grid Continuity Error" because the capacitive tracking pathways on the glass are physically severed.' }
    },
    explanation: 'Modern touchscreens combine an outer protection glass cowl, a transparent capacitive digitizer matrix grid, and an LCD/OLED rendering panel. When physical impact fractures this laminated sandwich, the electrical continuity of coordinate rows is broken. A physical replacement restores standard touch input.',
    comptiaObjectives: ['Domain 5.4 - Given a scenario, troubleshoot laptops and mobile devices.']
  },
  {
    id: 'scen_035_power_burnt_smell',
    title: 'PC Case Emits Burning Ozone Aroma (Roasting PSU Caps)',
    subsystem: 'Power Supply',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-312',
      clientName: 'Michael Dawson',
      userDepartment: 'Facilities Management',
      assetTag: 'AST-9099',
      role: 'Building Engineer Lead',
      urgency: 'Critical',
      submittedTime: '10 mins ago',
      description: 'A sharp, pungent, chemical smell of burning plastic and ozone started emitting from the back of my primary CAD design desktop. The tower tower suddenly lost power completely, and when I try restarting it, it stays dead.'
    },
    specification: {
      cpu: 'Intel Core i9-12900K',
      motherboard: 'MSI Z690-A Pro',
      ram: '32GB DDR5',
      gpu: 'NVIDIA RTX 3080 (High Peak Load)',
      psu: 'OEM cheap generic 600W Power Supply',
      storage: '2TB NVMe M.2 SSD',
      os: 'Windows 11 Professional x64'
    },
    hiddenRootCause: {
      component: 'Defective Power Supply Unit high-voltage capacitor bank',
      shortDescription: 'Defective power supply unit suffering complete internal electrolytic capacitor dry-out and coil melt.',
      detailedCause: 'The high-current design workstation drew over 580W of power during renders. The low-grade OEM 600W supply has deteriorated under this prolonged maximum utilization load. High-voltage capacitors inside the supply dried out, cracked, and shorted out, roasting secondary transformer copper lines.',
      possibleTheories: [
        'Corrupted firmware configuration profiles on the primary motherboard',
        'Defective and overloaded power supply unit suffering complete internal high-voltage component failure and wire meltdown',
        'Physical thermal paste breakdown on top of the CPU silicon',
        'Excessive dust blocking air currents underneath SATA storage boxes'
      ],
      correctTheory: 'Defective and overloaded power supply unit suffering complete internal high-voltage component failure and wire meltdown',
      requiredTests: ['examine_capacitors', 'verify_psu_connections'],
      correctPlan: 'replace_psu',
      correctVerification: 'inspect_fans',
      correctPreventive: 'inspect_fans'
    },
    symptoms: [
      'The case registers a strong, acrid electrical fire smell emanating from the PSU exhaust grill.',
      'Plugging in active AC wall power does not illuminate any motherboard standby status LEDs.',
      'Pressing physical case run buttons achieves absolutely zero cooling fan or optical drive responses.'
    ],
    actionResponses: {
      'examine_capacitors': {
        text: 'MOTHERBOARD VISUAL CIRCUIT SWEEP: Motherboard VRM and chipset capacitors are flat, shiny, and undamaged. You route your focus to the rear generic PSU unit; peering through the exhaust grill reveals thick, yellow crusty residue leaking out of roasted capacitors and blackened transformer windings matching the burning smell.',
        revealsRootCause: true,
        isClue: true
      },
      'verify_psu_connections': { text: 'ATX 24-pin and CPU 8-pin plugs are clean with zero outward heat scoring or discoloration.' },
      'replace_psu': {
        text: 'Success! You immediately unplug the roasted cheap generic supply, route the complex cluster of cables out, and install a brand-new high-efficiency premium 650W power supply unit with active thermal overload triggers. The workstation powers up with steady voltages across all rails!',
        revealsRootCause: true
      },
      'use_known_good_psu': {
        text: 'PSU BENCH TEST: Slipping temporary test leads onto the motherboard ATX sockets lights up the system board LEDs immediately. This confirms that the motherboard is completely functional and the core generic power supply is roasted.',
        isClue: true
      }
    },
    explanation: 'Generic or under-rated power supplies running near capacity generate high internal temperatures. This can dry out capacitor electrolytes or trigger short-circuits that roast transformer coils, producing an acrid ozone burning smell. High-efficiency name-brand power supplies with active over-current features maintain safety and prevent damage.',
    comptiaObjectives: ['Domain 5.1 - Given a scenario, troubleshoot problems related to motherboards, RAM, CPU, and power.']
  },
  {
    id: 'scen_036_power_unlatched_plug',
    title: 'PC Intermittently Fails to Boot (Unlatched Motherboard Connector)',
    subsystem: 'Power Supply',
    difficultyRating: 'Easy',
    ticket: {
      id: 'TKT-319',
      clientName: 'Charlie Pace',
      userDepartment: 'Media Relations',
      assetTag: 'AST-3301',
      role: 'Staff Writer Lead',
      urgency: 'Medium',
      submittedTime: '5 hrs ago',
      description: 'Since our administrative computers were physically moved across the hallway to our new offices, my desktop tower has been highly unstable. It occasionally triggers fans for half a second then cuts off completely, or does absolutely nothing when I click start.'
    },
    specification: {
      cpu: 'AMD Ryzen 5 3600',
      motherboard: 'ASRock B450 Pro4',
      ram: '16GB RAM',
      gpu: 'SATA Graphics Card',
      psu: '600W Semi-Modular PSU',
      storage: '500GB SSD',
      os: 'Windows 10 Business Pro'
    },
    hiddenRootCause: {
      component: 'Improperly clicked or latched ATX 24-pin power connector',
      shortDescription: 'Loose, unlatched primary ATX 24-pin power plug causing intermittent connection breaks.',
      detailedCause: 'During initial production or office transport, the primary ATX 24-pin plug was not pressed fully in until the locking latch clicked over the retention prong on the board socket. Cart vibrations and thermal expanding/contracting jarred the terminal contacts loose, breaking core power rails.',
      possibleTheories: [
        'Outdated BIOS operational firmware causing logic conflicts on POST',
        'Loose or unlatched primary ATX 24-pin motherboard power supply interface plug',
        'Physical lockup of mechanical hard disk spindle motors',
        'Complete socket failure of System RAM module slots'
      ],
      correctTheory: 'Loose or unlatched primary ATX 24-pin motherboard power supply interface plug',
      requiredTests: ['verify_psu_connections', 'examine_capacitors'],
      correctPlan: 'reseat_atx_connector',
      correctVerification: 'inspect_fans',
      correctPreventive: 'inspect_fans'
    },
    symptoms: [
      'Gently nudging or tilting the computer tower causes the system status diagnostic LED to drift on and off.',
      'Active supply line volt meters reveal the 12V and 5V line currents drift from correct down to zero.',
      'The power supply back fan remains dead still when case switches are triggered.'
    ],
    actionResponses: {
      'verify_psu_connections': {
        text: 'PHYSICAL CONNECTOR AUDIT: You slide off the metal casing cover and inspect the mainboard. The primary 24-pin motherboard power cable plug is sitting slightly crooked in its socket, with the tiny plastic safety latch dangling nearly 3mm above the motherboard lock post hook.',
        revealsRootCause: true,
        isClue: true
      },
      'examine_capacitors': { text: 'Motherboard VRM and system regulator capacitors are clean, flat, and in perfect electronic condition.' },
      'reseat_atx_connector': {
        text: 'Success! You firmly grasp the 24-pin mainboard cable, align it square, and compress it down into the motherboard ATX slot until a solid mechanical click confirms the latch has locked. The desktop powers up, initializes cleanly and passes every cycle test!',
        revealsRootCause: true
      },
      'replace_psu': { text: 'You replace the power supply unit. This provides a fresh cable set that you happen to plug in completely, but it is a costly and time-consuming solution to a problem that only required seating the existing connector.' }
    },
    explanation: 'High voltage and current delivery to motherboards rely on solid physical wire contact. High pin-count connectors like the ATX 24-pin must be completely engaged with their locking tabs. Loose connections create electrical resistance, causing thermal drops and intermittent shutoffs.',
    comptiaObjectives: ['Domain 5.1 - Given a scenario, troubleshoot motherboards, RAM, CPU, and power.']
  },
  {
    id: 'scen_037_cpu_skewed_pins',
    title: 'PC Case Lights Turn On But Will Not POST (CPU Unevenly Seated)',
    subsystem: 'CPU',
    difficultyRating: 'Hard',
    ticket: {
      id: 'TKT-245',
      clientName: 'Boone Carlyle',
      userDepartment: 'Data Records',
      assetTag: 'AST-2201',
      role: 'Database Technician',
      urgency: 'High',
      submittedTime: '4 hrs ago',
      description: 'I recently upgraded my processor to an AMD high-end model. After installing it and putting on the liquid cooler, the system refuses to start up. The cooling fans and RGB bars light up colorful, but the monitor screen stays black, and the motherboard speaker emits three short diagnostic beeps.'
    },
    specification: {
      cpu: 'AMD Ryzen 7 5800X3D (Upgrade)',
      motherboard: 'MSI MAG B550 Tomahawk',
      ram: '32GB DDR4',
      gpu: 'RTX 3070',
      psu: '750W Premium Supply',
      storage: '1TB NVMe',
      os: 'None (Fails to boot POST)'
    },
    hiddenRootCause: {
      component: 'Improperly aligned Pin Grid Array CPU package in socket',
      shortDescription: 'Processor package improperly seated in socket before locking retention latch.',
      detailedCause: 'During the DIY CPU upgrade, the technician did not align the PGA triangle corner key correctly before dropping the processor into the socket. Force-closing the retention arm bowed several corner contacts, leaving the pins with zero electronic connection to the motherboard circuit lanes.',
      possibleTheories: [
        'Overheating due to failure to apply thermal interface compound',
        'Upgrade CPU package not fully centered or locked inside motherboard pin contacts',
        'Physical capacitor pop inside graphics card voltage subsystems',
        'Incompatible display output cable connection'
      ],
      correctTheory: 'Upgrade CPU package not fully centered or locked inside motherboard pin contacts',
      requiredTests: ['inspect_fans', 'check_cpu_temp'],
      correctPlan: 'reseat_cpu_pins',
      correctVerification: 'inspect_fans',
      correctPreventive: 'inspect_fans'
    },
    symptoms: [
      'The motherboard built-in EZ-Debug LEDs lock solid on "CPU" error block.',
      'The graphics card coolers spin at maximum throttle, but raw video output ports emit no signal.',
      'No physical damage is visible on any motherboard capacitors or RAM boards.'
    ],
    actionResponses: {
      'inspect_fans': {
        text: 'PHYSICAL INSPECTION PASS: Motherboard RGB elements illuminate cleanly. Case and graphics fans throttle on, but the system speaker triggers 3 short beeps. Checking the CPU socket border reveals a tiny gap between the lower side of the processor card and the plastic socket surface.',
        revealsRootCause: true,
        isClue: true
      },
      'check_cpu_temp': { text: 'You cannot boot BIOS thermal systems because the computer fails to pass POST routines and lacks primary instructions.' },
      'reseat_cpu_pins': {
        text: 'Success! You remove the cooling block, lift the CPU retention arm, extract the processor, carefully align the bent corner contacts back to spec using micro-tweezers, orient the triangle corner marks correctly, drop it into place until it sits flush, and lock the arm. The motherboard registers POST, logs the CPU name, and boots perfectly!',
        revealsRootCause: true
      },
      'apply_thermal': { text: 'You replace the thermal paste. The interface is clean, but because the physical CPU pins are skewed and not seating properly, the machine fails to POST.' }
    },
    explanation: 'Processors with pin grids (PGA) or flat pads (LGA) must sit completely level with zero gap in their sockets to establish mechanical and electrical contact. Misalignment prevents booting completely. Reseating the package and securing contacts resolves general boot errors.',
    comptiaObjectives: ['Domain 5.1 - Given a scenario, troubleshoot motherboards, RAM, CPU, and power.']
  },
  {
    id: 'scen_038_ram_memory_thrashing',
    title: 'Extreme Workstation Performance Degradation (Memory Thrashing)',
    subsystem: 'RAM',
    difficultyRating: 'Medium',
    ticket: {
      id: 'TKT-144',
      clientName: 'Sun Kwon',
      userDepartment: 'Design Studio',
      assetTag: 'AST-1142',
      role: 'Staff Graphic Designer',
      urgency: 'Medium',
      submittedTime: '5 hrs ago',
      description: 'My desktop starts fast in the morning, but as soon as I load my main design tool, a few high-res graphics, and open six browser pages, the entire screen slows to a absolute crawl. Moving windows takes 5 seconds to draw, and I hear my mechanical hard drive clicking constantly like crazy.'
    },
    specification: {
      cpu: 'Intel Core i3-10100',
      motherboard: 'ASRock H410M-HDV',
      ram: '4GB DDR4 (Single Module)',
      gpu: 'Intel HD Onboard',
      psu: '350W PSU',
      storage: '256GB SSD (C: System), 1TB mechanical drive (D: Storage with active paging limits)',
      os: 'Windows 10 Enterprise (High Virtual Memory usage)'
    },
    hiddenRootCause: {
      component: 'Deficient physical RAM capacity causing virtual page thrashing',
      shortDescription: 'Deficient active RAM capacity causing the OS of the workstation to thrash virtual page files on secondary storage disks.',
      detailedCause: 'The user has only 4GB of physical RAM, which is completely depleted by active software. To prevent application crash procedures, the OS constantly swaps active process code sections out of memory to a virtual paging registry folder on the slow mechanical HDD, causing disk thrashing.',
      possibleTheories: [
        'Outdated chipset memory controller firmware lines',
        'Physical sectors failing on the primary SSD partition',
        'Deficient physical RAM capacity forcing continuous virtual page paging file swaps on slow secondary disk media',
        'Severe dust accumulation thermal throttling processor performance'
      ],
      correctTheory: 'Deficient physical RAM capacity forcing continuous virtual page paging file swaps on slow secondary disk media',
      requiredTests: ['check_mem_amount', 'run_mem_test'],
      correctPlan: 'upgrade_system_ram',
      correctVerification: 'check_mem_amount',
      correctPreventive: 'check_mem_amount'
    },
    symptoms: [
      'Task Manager reports "Physical Memory Consumption: 98%" idle with massive disk queues.',
      'Active page file read/write metrics indicate continuous 40MB/s activity on Drive D: at all times.',
      'The slow mechanical hard drive indicator light glows solid red.'
    ],
    actionResponses: {
      'check_mem_amount': {
        text: 'DIAGNOSTIC SYSTEM INQUEST: Physical RAM: 4.00 GB is recognized in Single-Channel configuration. Task Manager reveals active background system processes consume over 3.8 GB, leaving only 200MB free. Commited memory totals 14.8 GB (meaning over 10 GB is loaded on the page swap file on slow Drive D:).',
        revealsRootCause: true,
        isClue: true
      },
      'run_mem_test': { text: 'Booting MemTest86 runs cleanly, passing 100% of memory addresses, confirming there are no physical chip segment errors on the active 4GB stick.' },
      'upgrade_system_ram': {
        text: 'Success! You install an additional 16GB pairing module, raising total physical RAM capacity to 20GB in Dual-Channel operation. Booting and running all design tools now consumes 11GB of physical RAM, reducing page file disk reads to exactly 0 MB/s. Performance is incredibly fast!',
        revealsRootCause: true
      },
      'reseat_ram': { text: 'You reseat the existing RAM. The capacity remains at 4GB, and compiling projects continues to lock up and thrash page files on raw storage.' }
    },
    explanation: 'A severe shortage of physical computer memory (RAM) forces the operating system to utilize secondary storage drives as a virtual memory overflow area. Known as "thrashing," this process constantly reads and writes page blocks to modern disks, reducing application speeds. Upgrading physical RAM handles heavy processes natively.',
    comptiaObjectives: ['Domain 5.1 - Given a scenario, troubleshoot problems related to motherboards, RAM, CPU, and power.']
  }
];

export function getRandomScenario(): Scenario {

  const index = Math.floor(Math.random() * SCENARIOS.length);
  return JSON.parse(JSON.stringify(SCENARIOS[index])); // Deep clone to dodge reference sharing
}

