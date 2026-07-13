


const { useState, useEffect, useRef } = React;

// ==========================================
// 🚀 1. DYNAMIC CIPHER SCANNER
// ==========================================
function CipherScanner({ isActive, textToScan }) {
    const [scramble, setScramble] = useState("");
    const [encryptionType, setEncryptionType] = useState("AWAITING PAYLOAD...");

    useEffect(() => {
        if (!isActive) return;
        if (/^[a-fA-F0-9]{64}$/.test(textToScan.trim())) setEncryptionType("SHA-256 HASH DETECTED");
        else if (/^[a-fA-F0-9]{32}$/.test(textToScan.trim())) setEncryptionType("MD5 HASH DETECTED");
        else if (textToScan.includes("==") || textToScan.includes("=")) setEncryptionType("BASE64 OBFUSCATION DETECTED");
        else setEncryptionType("HEURISTIC DECRYPTION ACTIVE");

        const chars = "01ABCDEFXYZ@#$%&*";
        const interval = setInterval(() => {
            let temp = "";
            for(let i=0; i<40; i++) temp += chars[Math.floor(Math.random() * chars.length)];
            setScramble(temp);
        }, 50);
        return () => clearInterval(interval);
    }, [isActive, textToScan]);

    if (!isActive) return null;
    return (
        <div className="pro-scanner-box">
            <div className="scanner-header">
                <span className="spinner-dot"></span>
                <span>{encryptionType}</span>
                <span style={{marginLeft: 'auto', fontSize: '0.65rem', color: '#8b949e'}}>SYSTEM: OVERRIDE</span>
            </div>
            <div className="scramble-text">{scramble}</div>
            <div className="scanner-progress"><div className="scanner-progress-bar"></div></div>
            <div className="hex-bg"></div>
        </div>
    );
}

// ==========================================
// 🚀 2. TACTICAL RAG TERMINAL
// ==========================================
function RagTerminal({ text }) {
    const [displayedText, setDisplayedText] = useState("");
   
    useEffect(() => {
        if (!text) return;
        setDisplayedText("");
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.substring(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 15);
        return () => clearInterval(interval);
    }, [text]);

    if (!text) return null;

    const parts = displayedText.split("SOAR DIRECTIVE:");
    const headerPart = parts[0];
    const directivePart = parts.length > 1 ? parts[1] : null;

    return (
        <div className="rag-window shadow-pulse">
            <div className="rag-banner" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div><span style={{color: '#fff', animation: 'blink 1s infinite'}}>●</span> MITRE ATT&CK DEFENSE PROTOCOL</div>
                <div style={{ color: '#d29922' }}>[ AUTONOMOUS RAG ]</div>
            </div>
            <div className="rag-body">
                <div style={{ color: '#58a6ff', marginBottom: '10px' }}>{headerPart}</div>
               
                {directivePart !== null && (
                    <div className="soar-directive-box">
                        <div className="soar-header">⚠️ EXECUTING SOAR DIRECTIVE</div>
                        <div className="soar-content">
                            {directivePart}<span className="rag-cursor">_</span>
                        </div>
                    </div>
                )}
                {directivePart === null && <span className="rag-cursor">_</span>}
            </div>
        </div>
    );
}

// ==========================================
// 🚀 3. LIVE SIGNAL INTERCEPTOR
// ==========================================
function LiveSignalFeed({ isAirGapped }) {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        if (isAirGapped) return;

        const interval = setInterval(async () => {
            try {
                const res = await fetch("http://127.0.0.1:8001/traffic-feed");
                const data = await res.json();
                if (Array.isArray(data)) setFeed(data);
            } catch (e) {}
        }, 1500);
        return () => clearInterval(interval);
    }, [isAirGapped]);

    return (
        <div className="mission-log-panel" style={{
            position: 'relative',
            transition: 'all 0.5s ease',
            borderColor: isAirGapped ? '#f85149' : '#30363d',
            backgroundColor: isAirGapped ? 'rgba(248, 81, 73, 0.05)' : 'rgba(13, 17, 23, 0.8)'
        }}>
            <div className="panel-header-alt" style={{ color: isAirGapped ? '#f85149' : '#8b949e' }}>
                <span className="status-pulse" style={{
                    width: '8px', height: '8px',
                    background: isAirGapped ? '#8b949e' : '#f85149',
                    boxShadow: isAirGapped ? 'none' : '0 0 10px #f85149',
                    animation: isAirGapped ? 'none' : 'blink 2s infinite'
                }}></span>
                {isAirGapped ? "UPLINK SEVERED (AIR GAP ACTIVE)" : "LIVE SHADOW TRAFFIC INTERCEPTOR"}
            </div>
           
            {isAirGapped && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'repeating-linear-gradient(45deg, rgba(248, 81, 73, 0.1), rgba(248, 81, 73, 0.1) 10px, transparent 10px, transparent 20px)',
                    zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'
                }}>
                    <div style={{
                        background: '#010409', border: '1px solid #f85149', color: '#ff7b72',
                        padding: '10px 20px', fontWeight: '900', letterSpacing: '2px', fontFamily: "'JetBrains Mono', monospace",
                        boxShadow: '0 0 20px rgba(248,81,73,0.5)'
                    }}>
                        [ ALL EXTERNAL TRAFFIC BLOCKED ]
                    </div>
                </div>
            )}

            <div className="log-scroll" style={{ opacity: isAirGapped ? 0.3 : 1 }}>
                {feed.length === 0 && !isAirGapped ? (
                    <div style={{color: '#484f58', fontStyle: 'italic'}}> Listening for anomalous payload injections...</div>
                ) : (
                    feed.map((f, i) => (
                        <div key={i} className={`log-entry ${i === 0 && !isAirGapped ? 'new-log' : ''}`}>
                            <span className="log-time">[{f.time}]</span>
                            <span className="log-origin">SRC_{f.origin}</span>
                            <span className="log-intent" style={{color: f.status === 'PENDING' ? '#f85149' : '#c9d1d9'}}>INTENT: {f.raw_intent}</span>
                            <span className="log-sig">SIG: {f.payload}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// ==========================================
// 🚀 4. FAIL-PROOF LIVE STATS GRAPH
// ==========================================
function ThreatStatsGraph({ stats }) {
    const max = Math.max(stats.CRITICAL || 0, stats.HIGH || 0, stats.MEDIUM || 0, stats.LOW || 0, 1);

    return (
        <div className="glass-panel" style={{marginTop: '24px'}}>
            <h2 className="panel-title">Global Threat Distribution</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px'}}>
                {[
                    { label: 'CRITICAL', val: stats.CRITICAL || 0, color: '#f85149' },
                    { label: 'HIGH', val: stats.HIGH || 0, color: '#ff7b72' },
                    { label: 'MEDIUM', val: stats.MEDIUM || 0, color: '#d29922' },
                    { label: 'LOW', val: stats.LOW || 0, color: '#2ea043' }
                ].map(item => (
                    <div key={item.label} style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <div style={{width: '60px', fontSize: '0.65rem', color: '#8b949e', fontWeight: 'bold'}}>{item.label}</div>
                        <div style={{flex: 1, background: '#010409', height: '12px', borderRadius: '6px', border: '1px solid #30363d', overflow: 'hidden', position: 'relative'}}>
                            <div style={{width: `${(item.val / max) * 100}%`, height: '100%', background: item.color, transition: 'width 0.5s ease-out'}}></div>
                            <div style={{position: 'absolute', top:0, left:0, width:'100%', height:'100%', background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(1,4,9,0.5) 10px, rgba(1,4,9,0.5) 12px)'}}></div>
                        </div>
                        <div style={{width: '25px', textAlign: 'right', fontSize: '0.75rem', fontFamily: 'monospace', color: '#c9d1d9'}}>{item.val}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ==========================================
// 🚀 5. HISTORICAL APT CORRELATION ENGINE (REAL API INTEGRATION)
// ==========================================
function HistoricalCorrelation({ result }) {
    const [historicalMatches, setHistoricalMatches] = useState([]);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (!result || result.status !== "PENDING") {
            setHistoricalMatches([]);
            return;
        }

        setIsScanning(true);
       
        // 🔥 Call the REAL Backend API to search SQLite Database 🔥
        fetch(`http://127.0.0.1:8001/api/correlation/${result.id}`)
            .then(res => res.json())
            .then(data => {
                // Dramatic pause for UI effect
                setTimeout(() => {
                    setHistoricalMatches(data.matches || []);
                    setIsScanning(false);
                }, 1500);
            })
            .catch(err => {
                console.error("Correlation API failed", err);
                setIsScanning(false);
            });

    }, [result]);

    if (!result) return null;

    return (
        <div className="glass-panel" style={{marginTop: '24px', overflow: 'hidden'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="panel-title" style={{ margin: 0 }}>APT Campaign Correlation</h2>
                {isScanning && <div className="spinner-dot" style={{ width: '8px', height: '8px', background: '#58a6ff', boxShadow: '0 0 10px #58a6ff' }}></div>}
            </div>

            <div style={{ marginTop: '20px' }}>
                {isScanning ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '120px', color: '#8b949e', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }}>
                        <div style={{ marginBottom: '10px', color: '#58a6ff' }}>[ SCANNING SQLITE THREAT LOGS... ]</div>
                        <div>Cross-referencing behavioral fingerprints...</div>
                    </div>
                ) : historicalMatches.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#484f58', fontStyle: 'italic', fontSize: '0.75rem', border: '1px dashed #30363d', borderRadius: '4px' }}>
                        &gt; No historical correlations found. Incident appears isolated.
                    </div>
                ) : (
                    <div style={{ position: 'relative' }}>
                       
                        <div style={{
                            backgroundColor: '#010409',
                            backgroundImage: 'linear-gradient(rgba(248, 81, 73, 0.15), rgba(248, 81, 73, 0.15))',
                            border: '1px solid #f85149',
                            padding: '10px',
                            borderRadius: '4px',
                            marginBottom: '15px',
                            position: 'relative',
                            zIndex: 2
                        }}>
                            <div style={{ fontSize: '0.6rem', color: '#ff7b72', fontWeight: 'bold' }}>CURRENT INTERCEPT (T-0)</div>
                            <div style={{ fontSize: '0.85rem', color: '#fff', fontFamily: "'JetBrains Mono', monospace", wordBreak: 'break-all', marginTop: '4px' }}>{result.id || "LIVE_THREAT"}</div>
                        </div>

                        <div style={{ position: 'absolute', left: '18px', top: '70px', bottom: '20px', width: '2px', background: 'linear-gradient(to bottom, #f85149, #30363d)', zIndex: 1 }}></div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '40px' }}>
                            {historicalMatches.map((match, i) => (
                                <div key={i} style={{ background: '#010409', border: '1px solid #30363d', padding: '10px', borderRadius: '4px', position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '-26px', top: '15px', width: '8px', height: '8px', borderRadius: '50%', background: '#8b949e', border: '2px solid #010409', zIndex: 2 }}></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <span style={{ fontSize: '0.65rem', color: '#8b949e', fontWeight: 'bold' }}>{match.time}</span>
                                        <span style={{ fontSize: '0.65rem', color: '#58a6ff', fontWeight: 'bold' }}>{match.similarity}</span>
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#c9d1d9', fontWeight: 'bold', fontFamily: "'JetBrains Mono', monospace" }}>{match.type}</div>
                                    <div style={{ fontSize: '0.65rem', color: '#484f58', marginTop: '4px' }}>Action Taken: {match.action}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
// ==========================================
// 🚀 6. LIVE MITRE ATT&CK KILL-CHAIN MAPPING
// ==========================================
function MitreKillChain({ result }) {
    const [activeNodes, setActiveNodes] = useState([]);

    useEffect(() => {
        if (!result || result.urgency_level === "LOW" || result.status !== "PENDING") {
            setActiveNodes([]);
            return;
        }

        let nodes = [];
        const text = (result.original_text || "").toLowerCase();
        const reason = (result.reasoning || "").toLowerCase();
        const entities = result.entities || [];

        if (text.includes("password") || text.includes("login") || reason.includes("phishing") || text.includes("click")) nodes.push("INITIAL_ACCESS");
        if (text.includes("script") || text.includes("sql") || text.includes("drop") || reason.includes("exploit") || text.includes("powershell")) nodes.push("EXECUTION");
        if (result.entropy_score > 5.5 || reason.includes("obfuscation") || reason.includes("steganography") || reason.includes("encryption")) nodes.push("DEFENSE_EVASION");
        if (entities.some(e => e.type === "C2_SERVER_IP" || e.type === "Region") || reason.includes("osint")) nodes.push("COMMAND_CONTROL");
        if (reason.includes("extortion") || reason.includes("kinetic") || text.includes("btc") || reason.includes("breach") || text.includes("ransom")) nodes.push("IMPACT");

        setActiveNodes(nodes);
    }, [result]);

    const stages = [
        { id: "INITIAL_ACCESS", label: "Initial Access", icon: "🔑" },
        { id: "EXECUTION", label: "Execution", icon: "⚡" },
        { id: "DEFENSE_EVASION", label: "Defense Evasion", icon: "🥷" },
        { id: "COMMAND_CONTROL", label: "C2 Uplink", icon: "📡" },
        { id: "IMPACT", label: "Impact", icon: "💥" }
    ];

    if (!result) return null;

    return (
        <div className="glass-panel" style={{marginBottom: '20px'}}>
            <h2 className="panel-title">Cyber Kill-Chain Progression</h2>
           
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '20px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '20px', left: '10%', width: '80%', height: '2px', background: '#30363d', zIndex: 0 }}></div>

                {stages.map((stage, i) => {
                    const isActive = activeNodes.includes(stage.id);
                   
                    return (
                        <div key={stage.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20%', position: 'relative', zIndex: 1 }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: isActive ? 'rgba(248, 81, 73, 0.15)' : '#010409',
                                border: `2px solid ${isActive ? '#f85149' : '#30363d'}`,
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                fontSize: '1.2rem',
                                boxShadow: isActive ? '0 0 15px rgba(248, 81, 73, 0.4)' : 'none',
                                transition: 'all 0.3s ease',
                                filter: isActive ? 'none' : 'grayscale(100%) opacity(50%)'
                            }}>
                                {stage.icon}
                            </div>
                            <div style={{
                                marginTop: '10px', fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center',
                                color: isActive ? '#c9d1d9' : '#484f58',
                                transition: 'color 0.3s ease'
                            }}>
                                {stage.label}
                            </div>
                            {isActive && (
                                <div style={{ marginTop: '5px', fontSize: '0.5rem', color: '#f85149', fontWeight: '800', animation: 'blink 1s infinite', letterSpacing: '1px' }}>
                                    LOCKED
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ==========================================
// 🚀 7. AUTO-EXECUTING ORCHESTRATOR PLAYBOOK
// ==========================================
function IncidentResponsePlaybook({ result, isAirGapped, setIsAirGapped }) {
    const [activeStepIndex, setActiveStepIndex] = useState(-1);
    const [autoRun, setAutoRun] = useState(false);

    // Initialize auto-run when a new critical threat arrives
    useEffect(() => {
        if (result && result.status === "PENDING" && (result.urgency_level === "CRITICAL" || result.urgency_level === "HIGH")) {
            setIsAirGapped(false);
            setActiveStepIndex(0);
            setAutoRun(true);
        }
    }, [result, setIsAirGapped]);

    const getPlaybookSteps = () => {
        if (!result) return [];

        const isHardThreat = result.urgency_level === "CRITICAL" || result.urgency_level === "HIGH";
        const hasEntities = result.entities && result.entities.length > 0;
        const isHoneypot = result.decision_tier === "DIVERT_TO_HONEYPOT";

        let steps = [
            { id: 1, title: "Threat Ingestion & Parsing", detail: "Payload received and sanitized. Zero-width characters stripped. AI Prompt checks passed." }
        ];

        if (isHardThreat) {
            steps.push({ id: 2, title: "Cognitive Intent Analysis", detail: `Classification identified high-probability hostile intent (${result.adversary_sentiment || 'AGGRESSIVE'}).` });
            steps.push({ id: 3, title: "Heuristic & Entropy Scan", detail: `Shannon Entropy calculated at ${result.entropy_score || 'N/A'}. Signatures analyzed.` });
            if (hasEntities) steps.push({ id: 4, title: "Geo-Spatial Lock & OSINT", detail: "Origin IP traced. Radar coordinates locked and relationships mapped." });
            if (isHoneypot) steps.push({ id: 5, title: "Active Deception Routing", detail: "Diverting hostile traffic to Honeypot environment. Tracking TTPs." });
            steps.push({ id: 6, title: "Network Containment", detail: "Isolating affected subnet to prevent lateral movement and data exfiltration." });
            steps.push({ id: 7, title: "Threat Eradication & Recovery", detail: "Purging malicious payloads and restoring services to baseline secure state." });
        } else {
             steps.push({ id: 2, title: "Contextual Verification", detail: `Payload context verified as Safe (${result.urgency_level} urgency).` });
             steps.push({ id: 3, title: "Resume Standard Monitoring", detail: "No further action required. Logging event and returning to standby." });
        }
        return steps;
    };

    const steps = getPlaybookSteps();

    // 🚀 The Auto-Execution Engine (1.8 seconds per step) 🚀
    useEffect(() => {
        if (!autoRun || isAirGapped) return;

        if (activeStepIndex >= 0 && activeStepIndex < steps.length) {
            const timer = setTimeout(() => {
                setActiveStepIndex(prev => prev + 1);
            }, 1800); // Wait 1.8 seconds, then move to next step
            return () => clearTimeout(timer);
        } else if (activeStepIndex >= steps.length) {
            setAutoRun(false); // Execution finished
        }
    }, [activeStepIndex, autoRun, isAirGapped, steps.length]);

    const getStatusBannerStyle = () => {
        if (isAirGapped) {
            return { background: 'rgba(248, 81, 73, 0.1)', border: '1px solid #f85149', color: '#ff7b72', boxShadow: '0 0 20px rgba(248, 81, 73, 0.2)', animation: 'pulse-fast 1s infinite' };
        }
        if (autoRun) {
            return { background: 'rgba(88, 166, 255, 0.1)', border: '1px solid #58a6ff', color: '#58a6ff', animation: 'shadow-pulse 2s infinite' };
        }
        return { background: 'rgba(46, 160, 67, 0.1)', border: '1px solid #2ea043', color: '#3fb950' };
    };

    const getStepStatus = (index) => {
        if (index < activeStepIndex) return "COMPLETED";
        if (index === activeStepIndex && autoRun && !isAirGapped) return "IN_PROGRESS";
        return "PENDING";
    };

    const getStepStyle = (status) => {
        if (status === "COMPLETED") return { color: '#8b949e', borderLeft: '3px solid #2ea043', opacity: 0.7 };
        if (status === "IN_PROGRESS") return { color: '#c9d1d9', borderLeft: '3px solid #58a6ff', background: 'rgba(88, 166, 255, 0.1)', fontWeight: 'bold' };
        return { color: '#484f58', borderLeft: '3px solid #30363d', opacity: 0.5 };
    };

    if (!result) return null;

    return (
        <div className="glass-panel">
            <h2 className="panel-title">SOAR Orchestration Engine</h2>

            {/* Header Status */}
            <div style={{ ...getStatusBannerStyle(), padding: '15px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ fontSize: '1.5rem' }}>{isAirGapped ? "🔌" : autoRun ? "⚙️" : "🌐"}</div>
                    <div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', color: isAirGapped ? '#f85149' : autoRun ? '#58a6ff' : '#2ea043' }}>
                            Orchestration Status
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '800', fontFamily: "'JetBrains Mono', monospace" }}>
                            {isAirGapped ? "EXECUTION HALTED (AIR-GAPPED)" : autoRun ? "EXECUTING PLAYBOOK..." : "THREAT MITIGATED"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px solid #30363d' }}>
                <button
                    onClick={() => setIsAirGapped(true)}
                    disabled={isAirGapped}
                    style={{ flex: 1, padding: '10px 15px', borderRadius: '4px', cursor: isAirGapped ? 'not-allowed' : 'pointer', background: isAirGapped ? '#21262d' : '#f85149', color: isAirGapped ? '#8b949e' : '#fff', border: 'none', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', transition: 'background 0.2s' }}
                >
                    {isAirGapped ? "ISOLATION ACTIVE" : "⚠️ OVERRIDE: ENGAGE AIR GAP"}
                </button>
               
                {isAirGapped && (
                    <button
                        onClick={() => {
                            setIsAirGapped(false);
                            if (activeStepIndex < steps.length) setAutoRun(true); // Resume run
                        }}
                        style={{ flex: 1, padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', background: 'transparent', color: '#2ea043', border: '1px solid #2ea043', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.2s' }}
                    >
                        RESTORE NETWORK UPLINK
                    </button>
                )}
            </div>

            {/* Visual Nodes List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {steps.map((step, index) => {
                    const status = getStepStatus(index);
                    return (
                        <div key={step.id} style={{ ...getStepStyle(status), padding: '12px 15px', borderRadius: '4px', display: 'flex', alignItems: 'flex-start', gap: '15px', transition: 'all 0.3s ease', position: 'relative' }}>
                            <div style={{ fontSize: '1.2rem', marginTop: '2px' }}>
                                {status === "COMPLETED" ? "✅" : status === "IN_PROGRESS" ? "⏳" : "⏱️"}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: '800', fontFamily: "'Inter', sans-serif" }}>Step {step.id}: {step.title}</div>
                                    <div style={{ fontSize: '0.6rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px', letterSpacing: '1px', background: status === "COMPLETED" ? 'rgba(46, 160, 67, 0.2)' : status === "IN_PROGRESS" ? 'rgba(88, 166, 255, 0.2)' : 'rgba(48, 54, 61, 0.5)', color: status === "COMPLETED" ? '#2ea043' : status === "IN_PROGRESS" ? '#58a6ff' : '#8b949e' }}>
                                        {status === "IN_PROGRESS" ? "EXECUTING MODULE" : status}
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.5 }}>{step.detail}</div>
                               
                                {/* 🚀 The Visual Progress Bar for Active Step 🚀 */}
                                {status === "IN_PROGRESS" && (
                                    <div style={{ marginTop: '12px', height: '4px', background: 'rgba(1, 4, 9, 0.8)', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', background: '#58a6ff', animation: 'fillBar 1.8s linear forwards' }}></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ==========================================
// 🚀 7.5 POST-MITIGATION INTEL EXPORT (WIDER LAYOUT)
// ==========================================
function PostMitigationIntel({ result }) {
    if (!result || (result.urgency_level !== "CRITICAL" && result.urgency_level !== "HIGH")) return null;

    const ipTarget = (result.entities && result.entities.find(e => e.type === "C2_SERVER_IP"))?.word || "$EXTERNAL_NET";
    const signatureId = Math.floor(Math.random() * 90000) + 1000000;
    const wafRule = `alert tcp ${ipTarget} any -> $HOME_NET any (msg:"SENTINEL-AI Auto-Block"; flow:to_server,established; content:"${result.signatures_found?.[0] || 'malicious_intent'}"; sid:${signatureId}; rev:1;)`;

    const stixPayload = JSON.stringify(result.stix_report || {
        "type": "indicator",
        "id": `indicator--${result.id}`,
        "created": new Date().toISOString(),
        "name": `Sentinel Intel [${result.urgency_level}]`,
        "pattern": `[ipv4-addr:value = '${ipTarget}']`
    }, null, 2);

    return (
        <div className="glass-panel" style={{ marginTop: '24px', animation: 'fadeIn 1s ease-in', padding: '20px' }}>
            <h2 className="panel-title">Automated Countermeasures & Intel</h2>
           
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
               
                {/* WAF Rule Box - Wider and cleaner */}
                <div style={{ background: '#0d1117', border: '1px solid #30363d', borderLeft: '4px solid #2ea043', borderRadius: '4px', padding: '15px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#8b949e', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1rem' }}>🛡️</span>
                            <span>Generated IDS/WAF Rule</span>
                        </div>
                        <span style={{ background: 'rgba(46, 160, 67, 0.15)', color: '#3fb950', padding: '2px 8px', borderRadius: '12px', fontSize: '0.6rem' }}>ACTIVE</span>
                    </div>
                    <div style={{ background: '#010409', padding: '12px', borderRadius: '4px', border: '1px solid #21262d', color: '#ff7b72', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', wordBreak: 'break-all', lineHeight: '1.6' }}>
                        {wafRule}
                    </div>
                </div>

                {/* STIX JSON Box - Wider and more legible */}
                <div style={{ background: '#0d1117', border: '1px solid #30363d', borderLeft: '4px solid #58a6ff', borderRadius: '4px', padding: '15px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#8b949e', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1rem' }}>📦</span>
                            <span>STIX v2.1 Threat Object</span>
                        </div>
                        <span style={{ background: 'rgba(88, 166, 255, 0.15)', color: '#58a6ff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.6rem' }}>SIEM READY</span>
                    </div>
                    <div style={{ background: '#010409', padding: '12px', borderRadius: '4px', border: '1px solid #21262d', color: '#c9d1d9', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', whiteSpace: 'pre-wrap', maxHeight: '180px', overflowY: 'auto' }}>
                        {stixPayload}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// 🚀 8. SYSTEM HEALTH / UPLINK WIDGET
// ==========================================
function SystemHealthWidget({ isAirGapped }) {
    return (
        <div className="glass-panel" style={{marginTop: '24px'}}>
            <h2 className="panel-title">Node Uplink Status</h2>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                <div style={{background: '#010409', padding: '10px', border: '1px solid #30363d', borderRadius: '4px', textAlign: 'center'}}>
                    <div style={{color: '#8b949e', fontSize: '0.6rem', fontWeight: 'bold'}}>WAF FILTER</div>
                    <div style={{color: isAirGapped ? '#f85149' : '#2ea043', fontSize: '0.85rem', fontWeight: 'bold', marginTop: '4px'}}>
                        {isAirGapped ? "OFFLINE" : "ONLINE"}
                    </div>
                </div>
                <div style={{background: '#010409', padding: '10px', border: '1px solid #30363d', borderRadius: '4px', textAlign: 'center'}}>
                    <div style={{color: '#8b949e', fontSize: '0.6rem', fontWeight: 'bold'}}>HONEYPOT STATUS</div>
                    <div style={{color: isAirGapped ? '#8b949e' : '#58a6ff', fontSize: '0.85rem', fontWeight: 'bold', marginTop: '4px'}}>
                        {isAirGapped ? "ISOLATED" : "ARMED"}
                    </div>
                </div>
                <div style={{background: '#010409', padding: '10px', border: '1px solid #30363d', borderRadius: '4px', textAlign: 'center', gridColumn: 'span 2'}}>
                    <div style={{color: '#8b949e', fontSize: '0.6rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between'}}>
                        <span>PACKET LOSS</span> <span>{isAirGapped ? "100.00%" : "0.01%"}</span>
                    </div>
                    <div style={{background: '#21262d', height: '4px', marginTop: '6px', borderRadius: '2px'}}>
                        <div style={{background: isAirGapped ? '#f85149' : '#d29922', width: isAirGapped ? '100%' : '5%', height: '100%', transition: 'width 0.5s ease'}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
// ==========================================
// 🚀 9. MAIN DASHBOARD APPLICATION
// ==========================================
function ThreatDashboard() {
    const initialText = "The eagle is dropping the heavy package. Link established with 185.20.9.14";
   
    const [inputText, setInputText] = useState(initialText);
    const [loading, setLoading] = useState(false);
    const [isStressTesting, setIsStressTesting] = useState(false);
    const [result, setResult] = useState(null);
    const [alertDismissed, setAlertDismissed] = useState(false);
    const [sessionStats, setSessionStats] = useState({ analysisCount: 0, threatsFound: 0, geoHits: 0, entitiesExtracted: 0 });
   
    const [globalStats, setGlobalStats] = useState({ CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 });
    const [feedbackStatus, setFeedbackStatus] = useState("idle");
    const [isTraining, setIsTraining] = useState(false);

    // 🔥 GLOBAL AIR GAP STATE 🔥
    const [isAirGapped, setIsAirGapped] = useState(false);

    const [liveTime, setLiveTime] = useState(new Date());
    useEffect(() => {
        const t = setInterval(() => setLiveTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);
   
    useEffect(() => {
        const monitorInterval = setInterval(async () => {
            if (loading || isStressTesting || isAirGapped) return;

            if (result && result.status === "PENDING" && (result.urgency_level === "CRITICAL" || result.urgency_level === "HIGH")) {
                return;
            }

            try {
                const response = await fetch("http://127.0.0.1:8001/latest-intercept");
                const latestData = await response.json();

                if (latestData && latestData.id && (!result || latestData.id !== result.id)) {
                    setResult(latestData);
                    setAlertDismissed(false);
                    setSessionStats(prev => ({
                        analysisCount: prev.analysisCount + 1,
                        threatsFound: prev.threatsFound + ((latestData.urgency_level === 'HIGH' || latestData.urgency_level === 'CRITICAL') ? 1 : 0),
                        geoHits: prev.geoHits + (latestData.entities || []).filter(e => e.lat !== undefined).length,
                        entitiesExtracted: prev.entitiesExtracted + (latestData.entities || []).length
                    }));

                    setGlobalStats(prev => ({
                        ...prev,
                        [latestData.urgency_level]: (prev[latestData.urgency_level] || 0) + 1
                    }));
                }
            } catch (err) {}
        }, 3000);
        return () => clearInterval(monitorInterval);
    }, [result, loading, isStressTesting, isAirGapped]);

    const handleAcknowledge = async () => {
        if (!result || !result.id) return;
        try {
            await fetch("http://127.0.0.1:8001/acknowledge", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: result.id })
            });
            setResult(prev => ({ ...prev, status: "ACKNOWLEDGED" }));
            setAlertDismissed(true);
        } catch (err) { console.error("Acknowledge failed", err); }
    };

    const handleMarkAsSafe = async () => {
        if (!result || !result.id) return;
        setFeedbackStatus("loading");
        try {
            await fetch("http://127.0.0.1:8001/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: result.id, correct_label: "historical event" }) });
            setFeedbackStatus("success"); setIsTraining(true);
            setTimeout(() => {
                setIsTraining(false); setFeedbackStatus("idle");
                setResult(prev => ({ ...prev, status: "ACKNOWLEDGED", urgency_level: "LOW", urgency_score: 0.15 }));
                setAlertDismissed(true);
               
                setGlobalStats(prev => ({
                    ...prev,
                    CRITICAL: Math.max(0, prev.CRITICAL - 1),
                    LOW: prev.LOW + 1
                }));
            }, 1000);
        } catch (err) { setFeedbackStatus("error"); }
    };

    const handleAnalyze = async (manualText = null, spoofedIp = null) => {
        if (isAirGapped) {
            alert("Cannot execute analysis while AIR GAP is active. Restore Network Uplink first.");
            return;
        }

        const textToProcess = manualText || inputText;
        if (!textToProcess.trim()) return;
        setLoading(true); setAlertDismissed(false); setFeedbackStatus("idle");
       
        try {
            const payload = { text: textToProcess };
            if (spoofedIp) payload.source_ip = spoofedIp;

            const response = await fetch("http://127.0.0.1:8001/analyze", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
           
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            const data = await response.json();
           
            if (data.entities && data.entities.length > 0) {
                let merged = []; let current = { ...data.entities[0] };
                for (let i = 1; i < data.entities.length; i++) {
                    const nextEnt = data.entities[i];
                    if (nextEnt.word.startsWith("##") && nextEnt.type === current.type) current.word += nextEnt.word.replace("##", "");
                    else { merged.push(current); current = { ...nextEnt }; }
                }
                merged.push(current);
                data.entities = merged.map(e => ({...e, word: e.word.replace(/^##/, '').trim()})).filter(e => e.word.length > 1 && e.score > 0.60);
            }
           
            setResult(data);
            try { if (data.urgency_level === "CRITICAL" || data.urgency_level === "HIGH") new Audio('/alert.mp3').play().catch(()=>{}); } catch(err) {}
           
            setSessionStats(prev => ({
                analysisCount: prev.analysisCount + 1, threatsFound: prev.threatsFound + ((data.urgency_level === 'HIGH' || data.urgency_level === 'CRITICAL') ? 1 : 0),
                geoHits: prev.geoHits + (data.entities || []).filter(e => e.lat !== undefined).length, entitiesExtracted: prev.entitiesExtracted + (data.entities || []).length
            }));
           
            setGlobalStats(prev => ({
                ...prev,
                [data.urgency_level]: (prev[data.urgency_level] || 0) + 1
            }));

        } catch (err) { alert("Ensure backend is running on port 8001."); } finally { setLoading(false); }
    };

   const handleStressTest = async () => {
    if (isAirGapped) {
        alert("Cannot stress test while AIR GAP is active.");
        return;
    }
    setIsStressTesting(true);
    const testPayloads = [
        {text: "524756776247393549454d30494746304948526f5a53427459576c7549484e6c636e5a6c63694279623239744c673d3d", ip: "185.20.9.14"},
        {text: "Мы заложили C4 в серверной комнате. У вас есть 10 минут, чтобы перевести 50 BTC.", ip: "5.214.160.0"}
    ];
    
    for (let i = 0; i < testPayloads.length; i++) {
        if (!document.querySelector('.palantir-container')) break;
        setInputText(testPayloads[i].text);
        
        // API call korche
        await handleAnalyze(testPayloads[i].text, testPayloads[i].ip);
        
        // Next payload pathanor aage automatically 2 second wait korbe
        await new Promise(resolve => setTimeout(resolve, 2000)); 
    }
    setIsStressTesting(false);
};
   
const isCritical = result && 
                   (result.urgency_level === "CRITICAL" || result.urgency_level === "HIGH") && 
                   !isStressTesting;
    let cipherChain = "HEURISTIC_CRACK";
    let cleanReasoning = result?.reasoning || "";
    let finalPlaintext = result?.decrypted_payload || "";
    let semanticOverride = "";

    if (result && result.reasoning) {
        const chainMatch = result.reasoning.match(/\[CIPHER_DEFEATED:\s*(.*?)\]/);
        if (chainMatch) {
            cipherChain = chainMatch[1];
            cleanReasoning = cleanReasoning.replace(chainMatch[0], "");
        }
       
        const semMatch = cleanReasoning.match(/\[SEMANTIC_OVERRIDE:\s*(.*?)\]/);
        if (semMatch) {
            semanticOverride = semMatch[1];
            cleanReasoning = cleanReasoning.replace(semMatch[0], "");
        }

        const textMatch = result.reasoning.match(/\[DECRYPTED_TEXT:\s*(.*?)\]/);
        if (textMatch) {
            finalPlaintext = textMatch[1];
            cleanReasoning = cleanReasoning.replace(textMatch[0], "");
        }
       
        const revMatch = result.reasoning.match(/\[OBFUSCATION_REVERSED:\s*(.*?)\]/);
        if (revMatch) {
             cipherChain = revMatch[1];
             cleanReasoning = cleanReasoning.replace(revMatch[0], "");
        }
        const irrMatch = result.reasoning.match(/\[IRREVERSIBLE_ENCRYPTION_BLOCKED\]|\[ANOMALOUS_ENTROPY_BLOCKED\]/);
        if (irrMatch) cleanReasoning = cleanReasoning.replace(irrMatch[0], "");
    }
   
    if (finalPlaintext.includes("DECRYPTED_PLAINTEXT:")) {
        finalPlaintext = finalPlaintext.replace("DECRYPTED_PLAINTEXT:", "").trim();
    }

    const highlightDangerousText = (text) => {
        if (!text) return null;
        const threatKeywords = ['bombing', 'blast', 'assassinate', 'hostage', 'shootout', 'massacre', 'hack', 'ransomware', '0day', 'webshell', 'rat', 'trojan', 'malware', 'payload', 'breach', 'darknet', 'ransom', 'btc', 'bitcoin', 'kill', 'target', 'ryuk', 'c4'];
        const words = text.split(' ');
        return words.map((word, index) => {
            const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
            const isThreat = threatKeywords.some(tw => cleanWord.includes(tw));
            return (
                <span key={index} style={{
                    color: isThreat ? '#f85149' : '#c9d1d9', fontWeight: isThreat ? '800' : '500',
                    background: isThreat ? 'rgba(248, 81, 73, 0.15)' : 'transparent',
                    padding: isThreat ? '2px 4px' : '0', borderRadius: '4px', marginRight: '5px', display: 'inline-block'
                }}>
                    {word}
                </span>
            );
        });
    };

    const radarTargets = result?.entities?.filter(e => e.lat !== undefined && e.lon !== undefined) || [];

    let honeypotUrl = "#";
    if (result && result.decision_tier === "DIVERT_TO_HONEYPOT" && result.deception_strategy) {
        let targetType = "database";
        const dType = result.deception_strategy.type.toLowerCase();
        if (dType.includes("ransom")) targetType = "ransomware";
        else if (dType.includes("kinetic") || dType.includes("geo")) targetType = "kinetic";

        let maliciousIP = "UNKNOWN_NODE";
        if (radarTargets.length > 0) {
            maliciousIP = radarTargets[0].word.split(' ')[0];
        }
        honeypotUrl = `http://127.0.0.1:8001/honeypot/${targetType}?ip=${maliciousIP}`;
    }

    const cssStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700;800&display=swap');

        body { background: #010409; font-family: 'Inter', sans-serif; color: #c9d1d9; margin: 0; overflow-x: hidden; }
       
        .palantir-container { display: flex; flex-direction: column; min-height: 100vh; position: relative; z-index: 1; transition: all 0.5s ease;}
        .palantir-container::before { content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 50% 20%, rgba(22, 27, 34, 0.4) 0%, transparent 60%); pointer-events: none; z-index: -1; transition: all 0.5s ease;}
        .palantir-container::after { content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; z-index: -2;}
       
        .palantir-container.air-gapped { border: 5px solid #f85149; box-shadow: inset 0 0 50px rgba(248, 81, 73, 0.2); }
        .palantir-container.air-gapped::before { background: radial-gradient(circle at 50% 20%, rgba(248, 81, 73, 0.05) 0%, transparent 60%); }

        .top-nav { display: flex; justify-content: space-between; align-items: center; padding: 15px 40px; background: rgba(1, 4, 9, 0.9); border-bottom: 1px solid #30363d; position: relative; z-index: 100; backdrop-filter: blur(10px); transition: all 0.5s ease;}
        .brand-name { font-size: 1.5rem; font-weight: 800; color: #58a6ff; letter-spacing: 2px; display: flex; align-items: center; gap: 10px; transition: color 0.5s ease;}
        .brand-name::before { content: '⬢'; font-size: 1.8rem; }
        .top-nav.air-gapped .brand-name { color: #f85149; }
       
        .status-pill { display: flex; align-items: center; gap: 12px; background: #0d1117; border: 1px solid #30363d; padding: 8px 20px; border-radius: 4px; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; transition: all 0.5s ease;}
        .status-pulse { width: 10px; height: 10px; border-radius: 50%; background: #2ea043; box-shadow: 0 0 10px #2ea043; animation: blink 2s infinite; }
        .status-pulse.critical { background: #f85149; box-shadow: 0 0 15px #f85149; animation: rapidPulse 0.5s infinite; }

        .mission-log-panel { background: rgba(13, 17, 23, 0.8); border-bottom: 1px solid #30363d; padding: 15px 40px; box-shadow: inset 0 -10px 20px rgba(0,0,0,0.5); overflow: hidden;}
        .panel-header-alt { font-size: 0.7rem; color: #8b949e; font-weight: 800; letter-spacing: 2px; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; text-transform: uppercase;}
        .log-scroll { display: flex; flex-direction: column; gap: 8px; height: 100px; overflow-y: auto; padding-right: 10px; }
        .log-entry { display: flex; gap: 15px; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; padding: 6px 10px; border-radius: 4px; background: #010409; border-left: 2px solid #30363d; }
        .log-entry.new-log { border-left-color: #58a6ff; background: rgba(88, 166, 255, 0.05); animation: slideDown 0.3s ease-out; }
        .log-time { color: #8b949e; min-width: 70px; }
        .log-origin { color: #d29922; font-weight: bold; min-width: 120px; }
        .log-intent { color: #c9d1d9; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .log-sig { color: #484f58; min-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .dashboard-content { display: grid; grid-template-columns: minmax(260px, 320px) 1fr minmax(300px, 380px); gap: 24px; padding: 30px 40px; max-width: 1800px; margin: 0 auto; width: 100%; box-sizing: border-box;}
        @media (max-width: 1000px) { .dashboard-content { grid-template-columns: 1fr; } }

        .glass-panel { background: rgba(13, 17, 23, 0.7); border: 1px solid #30363d; border-radius: 6px; padding: 24px; position: relative; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.5); backdrop-filter: blur(10px); margin-bottom: 24px;}
        .panel-title { font-size: 0.75rem; font-weight: 800; color: #8b949e; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 20px 0; display: flex; align-items: center; gap: 10px;}
        .panel-title::before { content: ''; display: block; width: 4px; height: 14px; background: #58a6ff; }

        .cyber-textarea { width: 100%; height: 120px; background: #010409; border: 1px solid #30363d; border-radius: 6px; padding: 15px; color: #58a6ff; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; resize: none; outline: none; transition: all 0.3s; box-sizing: border-box; }
        .cyber-textarea:focus { border-color: #58a6ff; box-shadow: 0 0 0 1px #58a6ff; color: #c9d1d9;}
        .cyber-textarea:disabled { opacity: 0.5; cursor: not-allowed; }
       
        .cyber-btn { padding: 12px 20px; border-radius: 6px; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 0.75rem; cursor: pointer; transition: all 0.2s; border: 1px solid transparent; letter-spacing: 1px; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 8px;}
        .btn-glow { background: #238636; color: white; border-color: rgba(240, 246, 252, 0.1); }
        .btn-glow:hover:not(:disabled) { background: #2ea043; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(46, 160, 67, 0.4); }
        .btn-glow:disabled { background: #21262d; color: #8b949e; border-color: #30363d; cursor: not-allowed; }
        .btn-ghost { background: transparent; border: 1px solid #30363d; color: #58a6ff; }
        .btn-ghost:hover:not(:disabled) { background: #1f2428; border-color: #58a6ff; }
        .btn-ghost:disabled { color: #484f58; cursor: not-allowed; }
        .btn-alert { background: transparent; border: 1px solid #f85149; color: #f85149; width: 100%; text-align: center; display: block; text-decoration: none;}
        .btn-alert:hover { background: rgba(248, 81, 73, 0.1); box-shadow: 0 0 15px rgba(248, 81, 73, 0.2); color: #ff7b72;}
        .btn-safe { border-color: #2ea043; color: #2ea043; }
        .btn-safe:hover { background: rgba(46, 160, 67, 0.1); box-shadow: 0 0 15px rgba(46, 160, 67, 0.2); color: #3fb950;}

        .stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .stat-card { background: #010409; border: 1px solid #30363d; border-radius: 6px; padding: 15px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .stat-val { font-size: 2rem; font-weight: 800; font-family: 'JetBrains Mono', monospace; color: #c9d1d9; line-height: 1; }
        .stat-label { font-size: 0.6rem; color: #8b949e; font-weight: 700; text-transform: uppercase; margin-top: 8px; letter-spacing: 1px;}

        .meter-container { display: flex; align-items: center; gap: 15px; margin-bottom: 5px; }
        .meter-label { font-size: 0.7rem; font-weight: 800; color: #8b949e; text-transform: uppercase; letter-spacing: 1px;}
        .meter-track { flex-grow: 1; height: 6px; background: #21262d; border-radius: 3px; overflow: hidden; margin-top: 5px; }
        .meter-fill { height: 100%; transition: width 1s cubic-bezier(0.4, 0, 0.2, 1); }
        .meter-score { font-size: 2.5rem; font-weight: 800; font-family: 'JetBrains Mono', monospace; line-height: 1;}
        .urgency-badge { padding: 4px 12px; border-radius: 4px; font-size: 0.85rem; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; display: inline-block; margin-top: 5px;}

        .shadow-pulse { box-shadow: 0 0 20px rgba(46, 160, 67, 0.1); }
        .rag-window { background: #0d1117; border: 1px solid #30363d; border-radius: 6px; margin-top: 20px; overflow: hidden; }
        .rag-banner { background: #161b22; border-bottom: 1px solid #30363d; color: #8b949e; font-size: 0.7rem; padding: 10px 15px; font-weight: bold; letter-spacing: 1px;}
        .rag-body { padding: 20px; color: #c9d1d9; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; line-height: 1.6; white-space: pre-wrap; }
        .soar-directive-box { background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-left: 4px solid #ef4444; border-radius: 4px; margin-top: 15px; overflow: hidden; }
        .soar-header { background: #ef4444; color: white; padding: 4px 10px; font-size: 0.7rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;}
        .soar-content { padding: 15px; color: #ff7b72; font-weight: 600;}

        .pro-radar { width: 100%; aspect-ratio: 1; border-radius: 50%; background: #010409; border: 2px solid #30363d; position: relative; overflow: hidden; box-shadow: inset 0 0 50px rgba(0,0,0,0.8); margin-bottom: 20px;}
        .radar-ring { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border: 1px solid rgba(88, 166, 255, 0.15); border-radius: 50%;}
        .radar-cross { position: absolute; background: rgba(88, 166, 255, 0.2); }
        .radar-cross.v { width: 1px; height: 100%; left: 50%; top: 0; }
        .radar-cross.h { width: 100%; height: 1px; top: 50%; left: 0; }
        .radar-sweep { position: absolute; top: 0; left: 0; width: 50%; height: 50%; background: conic-gradient(from 0deg at bottom right, transparent 70%, rgba(88, 166, 255, 0.4) 100%); transform-origin: bottom right; animation: sweep 3s linear infinite; z-index: 1;}
        .radar-dot { position: absolute; width: 8px; height: 8px; background: #f85149; border-radius: 50%; transform: translate(-50%, -50%); z-index: 2; box-shadow: 0 0 10px #f85149; animation: pulse 1.5s infinite; }
        .radar-dot::after { content: ''; position: absolute; top: 50%; left: 50%; width: 24px; height: 24px; border: 1px solid #f85149; border-radius: 50%; transform: translate(-50%, -50%); animation: ping 1.5s infinite; }

        .holo-topology { border: 1px dashed #30363d; border-radius: 6px; padding: 20px; position: relative; margin-top: 24px; background: rgba(13, 17, 23, 0.5); }
        .topo-map { display: flex; align-items: center; justify-content: space-between; padding: 20px; background: #010409; border-radius: 6px; border: 1px solid #30363d; overflow-x: auto; margin-bottom: 15px;}
        .h-node { background: #0d1117; border: 1px solid #30363d; padding: 12px; border-radius: 6px; text-align: center; width: 100px; flex-shrink: 0; }
        .h-icon { font-size: 1.5rem; margin-bottom: 5px; }
        .h-title { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 800; color: #8b949e; text-transform: uppercase;}
        .h-line { flex-grow: 1; height: 2px; background: #30363d; position: relative; display: flex; align-items: center; justify-content: center; min-width: 40px; margin: 0 10px;}
        .h-line.danger { background: linear-gradient(90deg, #30363d 0%, #f85149 100%); }
        .packet { position: absolute; width: 20px; height: 2px; background: #ff7b72; box-shadow: 0 0 10px 1px #ff7b72; animation: shootPacket 1.5s infinite linear;}
       
        .pro-scanner-box { background: #010409; border: 1px solid #30363d; border-radius: 6px; padding: 15px; margin-top: 20px; }
        .scanner-header { display: flex; align-items: center; gap: 10px; font-size: 0.7rem; font-weight: 800; color: #58a6ff; margin-bottom: 12px; letter-spacing: 1px;}
        .scramble-text { font-family: 'JetBrains Mono', monospace; color: #8b949e; font-size: 0.9rem; word-break: break-all; line-height: 1.4; }

        .alert-banner { margin: 24px 32px 0; background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 6px; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 0 40px rgba(248, 81, 73, 0.2); position: relative; overflow: hidden; }
        .alert-content { position: relative; z-index: 1; display: flex; align-items: center; gap: 20px;}

        @keyframes fillBar { from { width: 0%; } to { width: 100%; } }
        @keyframes sweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1);} 50% { opacity: 0.7; transform: translate(-50%, -50%) scale(0.8);} }
        @keyframes ping { 0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(2); opacity: 0; } }
        @keyframes shootPacket { 0% { left: 0; opacity: 0;} 10% { opacity: 1;} 90% { opacity: 1;} 100% { left: calc(100% - 20px); opacity: 0;} }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes rapidPulse { 0%, 100% { opacity: 1; transform: scale(1);} 50% { opacity: 0.5; transform: scale(1.2);} }
        @keyframes pulse-fast { 0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(239, 68, 68, 0.6); } 50% { opacity: 0.4; box-shadow: none; } }
    `;

    return (
        <div className={`palantir-container ${isAirGapped ? 'air-gapped' : ''}`}>
            <style dangerouslySetInnerHTML={{__html: cssStyles}} />

            <header className={`top-nav ${isAirGapped ? 'air-gapped' : ''}`}>
                <div className="brand-name">SENTINEL_AI</div>
                <div style={{fontFamily: "'JetBrains Mono', monospace", color: '#8b949e', fontSize: '0.8rem', fontWeight: 'bold', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
                    {liveTime.toLocaleTimeString('en-IN', {hour12: false})} <span style={{fontSize:'0.6rem'}}>IST</span>
                </div>
                <div className="status-pill" style={{borderColor: isAirGapped || isCritical ? '#f85149' : ''}}>
                    <div className={`status-pulse ${isAirGapped || isCritical ? 'critical' : ''}`}></div>
                    <span style={{color: isAirGapped || isCritical ? '#ff7b72' : '#c9d1d9'}}>
                        {isAirGapped ? 'SYSTEM ISOLATED' : isCritical ? 'DEFCON 1: ACTIVE DEFENSE' : 'DEFCON 4: MONITORING'}
                    </span>
                </div>
            </header>

            <LiveSignalFeed isAirGapped={isAirGapped} />

            {result && result.status === "PENDING" && isCritical && !alertDismissed && (
                <div className="alert-banner">
                    <div className="alert-content">
                        <div style={{fontSize: '2rem'}}>⚠️</div>
                        <div>
                            <div style={{color: '#fff', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '1px'}}>CRITICAL THREAT ISOLATED</div>
                            <div style={{fontSize: '0.8rem', color: '#ff7b72', marginTop: '4px', fontFamily: "'JetBrains Mono', monospace"}}>System paused. Acknowledge threat to resume live monitoring.</div>
                        </div>
                    </div>
                    <div style={{display: 'flex', gap: '15px', position: 'relative', zIndex: 1}}>
                        <button className="cyber-btn btn-alert" style={{padding: '8px 15px', width: 'auto'}} onClick={handleAcknowledge}>ACKNOWLEDGE & RESUME</button>
                        <button className="cyber-btn btn-ghost btn-safe" style={{padding: '8px 15px', width: 'auto'}} onClick={handleMarkAsSafe} disabled={feedbackStatus === 'loading'}>
                            {feedbackStatus === 'loading' ? 'UPDATING DB...' : 'FLAG AS FALSE POSITIVE'}
                        </button>
                    </div>
                </div>
            )}

            <div className="dashboard-content">
                <div className="col-left">
                    <div className="glass-panel" style={{marginBottom: 0}}>
                        <h2 className="panel-title">Session Metrics</h2>
                        <div className="stat-grid">
                            <div className="stat-card">
                                <div className="stat-val" style={{color: '#58a6ff'}}>{sessionStats.analysisCount}</div>
                                <div className="stat-label">Ingested</div>
                            </div>
                            <div className="stat-card" style={{borderColor: sessionStats.threatsFound > 0 ? 'rgba(248, 81, 73, 0.4)' : ''}}>
                                <div className="stat-val" style={{color: sessionStats.threatsFound > 0 ? '#f85149' : '#c9d1d9'}}>{sessionStats.threatsFound}</div>
                                <div className="stat-label">Criticals</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-val">{sessionStats.entitiesExtracted}</div>
                                <div className="stat-label">Entities</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-val">{sessionStats.geoHits}</div>
                                <div className="stat-label">Geo-Hits</div>
                            </div>
                        </div>
                    </div>
                   
                    <ThreatStatsGraph stats={globalStats} />
                    <HistoricalCorrelation result={result} />
                    <SystemHealthWidget isAirGapped={isAirGapped} />
                </div>

                <div className="col-center">
                    <div className="glass-panel">
                        <h2 className="panel-title">Neural Core Ingestion</h2>
                        <textarea
                            className="cyber-textarea"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            spellCheck="false"
                            placeholder="Paste classified payload here..."
                            disabled={isAirGapped}
                        ></textarea>
                       
                        <div style={{display: 'flex', gap: '15px', marginTop: '15px'}}>
                            <button className="cyber-btn btn-glow" style={{flex: 2}} onClick={() => handleAnalyze()} disabled={loading || isAirGapped}>
                                {loading ? "PROCESSING..." : "EXECUTE ANALYSIS"}
                            </button>
                            <button className="cyber-btn btn-ghost" style={{flex: 1}} onClick={handleStressTest} disabled={isStressTesting || isAirGapped}>
                                STRESS TEST
                            </button>
                        </div>
                    </div>

                    <CipherScanner isActive={loading} textToScan={inputText} />
                    <MitreKillChain result={result} />

                    {result && (
                        <div className="glass-panel">
                           
                            {semanticOverride && (
                                <div style={{background: 'rgba(248, 81, 73, 0.1)', border: '1px dashed #f85149', padding: '15px', borderRadius: '4px', marginBottom: '20px'}}>
                                    <div style={{color: '#f85149', fontSize: '0.65rem', fontWeight: 'bold', marginBottom: '5px', letterSpacing: '1px'}}>STEGANOGRAPHY / CODED THREAT DECODED</div>
                                    <div style={{fontSize: '1rem', color: '#ff7b72', fontWeight: 'bold', fontFamily: "'JetBrains Mono', monospace"}}>⚠️ {semanticOverride}</div>
                                </div>
                            )}

                            {finalPlaintext && (
                                <div style={{background: '#010409', border: '1px solid #30363d', borderLeft: '3px solid #58a6ff', padding: '15px', borderRadius: '4px', marginBottom: '20px'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #30363d', paddingBottom: '8px'}}>
                                        <span style={{color: '#58a6ff', fontSize: '0.65rem', fontWeight: 'bold', letterSpacing: '1px'}}>DECRYPTION SUCCESSFUL</span>
                                        <span style={{color: '#d29922', fontSize: '0.65rem', fontWeight: 'bold', fontFamily: "monospace"}}>{cipherChain}</span>
                                    </div>
                                    <div style={{fontSize: '0.95rem', color: '#f0f6fc', fontFamily: "'JetBrains Mono', monospace", lineHeight: '1.5'}}>
                                        {highlightDangerousText(finalPlaintext)}
                                    </div>
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <div className="meter-label">Threat Score</div>
                                    <span className="urgency-badge" style={{
                                        backgroundColor: result.urgency_level === 'CRITICAL' ? 'rgba(239, 68, 68, 0.15)' :
                                                         result.urgency_level === 'HIGH' ? 'rgba(249, 115, 22, 0.15)' : 'rgba(52, 211, 153, 0.15)',
                                        color: result.urgency_level === 'CRITICAL' ? '#f85149' :
                                               result.urgency_level === 'HIGH' ? '#fb923c' : '#34d399',
                                        border: `1px solid ${result.urgency_level === 'CRITICAL' ? '#f85149' : result.urgency_level === 'HIGH' ? '#fb923c' : '#34d399'}`,
                                        animation: result.urgency_level === 'CRITICAL' ? 'pulse-fast 1s infinite' : 'none'
                                    }}>
                                        {result.urgency_level} ALERT
                                    </span>
                                </div>
                                <div className="meter-score" style={{
                                    color: result.urgency_level === 'CRITICAL' ? '#f85149' :
                                           result.urgency_level === 'HIGH' ? '#fb923c' : '#e5e7eb'
                                }}>
                                    {Math.round(result.urgency_score * 100)}%
                                </div>
                            </div>
                            <div className="meter-track">
                                <div className="meter-fill" style={{
                                    width: `${result.urgency_score * 100}%`,
                                    backgroundColor: result.urgency_level === 'CRITICAL' ? '#f85149' :
                                                     result.urgency_level === 'HIGH' ? '#fb923c' : '#34d399'
                                }}></div>
                            </div>
                            <br/>

                            {result.adversary_sentiment && (
                                <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px'}}>
                                    <div style={{fontSize: '0.6rem', color: '#8b949e', background: '#21262d', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold'}}>PSY-PROFILE</div>
                                    <div style={{fontSize: '0.75rem', fontWeight: 800, color: result.adversary_sentiment.includes("AGGRESSIVE") ? '#d29922' : '#58a6ff'}}>
                                        {result.adversary_sentiment}
                                    </div>
                                </div>
                            )}

                            <div style={{background: '#010409', borderLeft: '3px solid #58a6ff', padding: '15px', fontSize: '0.85rem', color: '#8b949e', lineHeight: 1.5}}>
                                <span style={{color: '#58a6ff', fontWeight: 'bold', marginRight: '8px'}}>[SYS_LOGIC]:</span>{cleanReasoning}
                            </div>

                            {result.rag_playbook && <RagTerminal text={result.rag_playbook} />}

                            {result.decision_tier === "DIVERT_TO_HONEYPOT" && result.deception_strategy && (
                                <div className="holo-topology">
                                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                                        <div style={{color: '#ff7b72', fontWeight: 'bold', fontSize: '0.8rem'}}>DECEPTION ENGAGED</div>
                                        <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#8b949e'}}>ID: {result.deception_strategy.tracking_id}</div>
                                    </div>
                                   
                                    <div className="topo-map">
                                        <div className="h-node"><div className="h-icon" style={{color: '#8b949e'}}>🌐</div><div className="h-title">Adversary</div></div>
                                        <div className="h-line danger"><div className="packet"></div></div>
                                        <div className="h-node" style={{borderColor: '#f85149', background: 'rgba(248,81,73,0.1)'}}><div className="h-icon" style={{color: '#ff7b72'}}>🪤</div><div className="h-title" style={{color: '#fff'}}>Sandbox</div></div>
                                    </div>

                                    <a href={honeypotUrl} target="_blank" rel="noreferrer" className="cyber-btn btn-alert">
                                        [ 👁️ ] OPEN HONEYPOT TARGET VIEW
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                   
                    <IncidentResponsePlaybook result={result} isAirGapped={isAirGapped} setIsAirGapped={setIsAirGapped} />
                     
                </div>

                <div className="col-right">
                    <div className="glass-panel">
                        <h2 className="panel-title">Geo-Spatial Radar</h2>
                        <div className="pro-radar">
                            <div className="radar-ring" style={{width: '80%', height: '80%'}}></div>
                            <div className="radar-ring" style={{width: '50%', height: '50%'}}></div>
                            <div className="radar-ring" style={{width: '20%', height: '20%'}}></div>
                            <div className="radar-cross v"></div>
                            <div className="radar-cross h"></div>
                            <div className="radar-sweep" style={{ animationPlayState: isAirGapped ? 'paused' : 'running' }}></div>
                           
                            {radarTargets.map((r, i) => {
                                let top, left;
                                if (r.lat !== undefined && r.lon !== undefined) {
                                    top = 50 - (r.lat / 90) * 40;
                                    left = 50 + (r.lon / 180) * 40;
                                } else {
                                    const angle = (i * 137 + 45) * (Math.PI / 180);
                                    const radius = 20 + Math.random() * 20;
                                    top = 50 + radius * Math.sin(angle);
                                    left = 50 + radius * Math.cos(angle);
                                }
                               
                                return (
                                    <div key={i} className="radar-dot" style={{top: `${top}%`, left: `${left}%`}}>
                                        <div style={{position: 'absolute', top: '-20px', left: '10px', color: '#ff7b72', fontSize: '0.6rem', fontWeight: 'bold', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap'}}>
                                            {r.word.split(' ')[0]}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {radarTargets.length === 0 ? (
                            <div style={{textAlign: 'center', padding: '20px 0', color: '#484f58', fontSize: '0.75rem', fontStyle: 'italic'}}>
                                &gt; No geographical coordinates acquired.
                            </div>
                        ) : (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                                {radarTargets.map((r, i) => (
                                    <div key={i} style={{background: '#010409', border: '1px solid #30363d', padding: '10px 15px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <span style={{fontWeight: 'bold', color: '#c9d1d9', fontSize: '0.8rem'}}>{r.word}</span>
                                            {r.lat !== undefined && r.lon !== undefined ? (
                                                <span style={{color: '#8b949e', fontSize: '0.6rem', fontFamily: 'monospace'}}>LAT:{r.lat} LON:{r.lon}</span>
                                            ) : null}
                                        </div>
                                        <span style={{fontSize: '0.55rem', background: 'rgba(248,81,73,0.1)', border: '1px solid #f85149', color: '#ff7b72', padding: '3px 6px', borderRadius: '3px', fontWeight: 'bold'}}>LOCKED</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="glass-panel">
                        <h2 className="panel-title">Extracted Entities</h2>
                        {result && result.entities && result.entities.length > 0 ? (
                            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                                {result.entities.map((e, i) => (
                                    <div key={i} style={{background: '#010409', border: '1px solid #30363d', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '8px'}}>
                                        <span style={{color: '#8b949e', fontSize: '0.6rem', fontWeight: 'bold'}}>{e.type}</span>
                                        <span style={{color: '#58a6ff'}}>{e.word}</span>
                                    </div>
                                ))}
                            </div>
                        ) : <div style={{color: '#484f58', fontSize: '0.75rem', fontStyle: 'italic'}}>&gt; Awaiting intel...</div>}
                    </div>
                    <PostMitigationIntel result={result} />
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ThreatDashboard />);