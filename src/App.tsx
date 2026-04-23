import { useState } from 'react';

const STEPS = ['info', 'generating', 'results'];

const sectionIcons = {
  resume: '📄',
  interview: '🎯',
  answers: '💬',
  suggestions: '🚀',
};

const initialForm = {
  name: '',
  role: '',
  skills: '',
  education: '',
  experience: '',
  projects: '',
  targetCompany: '',
};

function ProgressDots({ step }) {
  const labels = ['Your Info', 'Generating', 'Results'];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0px',
        marginBottom: '36px',
      }}
    >
      {labels.map((label, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background:
                  i <= step
                    ? 'linear-gradient(135deg, #6EE7B7, #3B82F6)'
                    : '#1e293b',
                border: i === step ? '2px solid #6EE7B7' : '2px solid #334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: i <= step ? '#0f172a' : '#475569',
                fontWeight: '700',
                fontSize: '13px',
                transition: 'all 0.3s ease',
                boxShadow:
                  i === step ? '0 0 16px rgba(110,231,183,0.4)' : 'none',
              }}
            >
              {i + 1}
            </div>
            <span
              style={{
                fontSize: '11px',
                color: i <= step ? '#6EE7B7' : '#475569',
                whiteSpace: 'nowrap',
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {label}
            </span>
          </div>
          {i < labels.length - 1 && (
            <div
              style={{
                width: '60px',
                height: '2px',
                background:
                  i < step
                    ? 'linear-gradient(90deg, #6EE7B7, #3B82F6)'
                    : '#1e293b',
                margin: '0 4px',
                marginBottom: '22px',
                transition: 'all 0.3s ease',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  multiline,
  required,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#94a3b8',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {label} {required && <span style={{ color: '#6EE7B7' }}>*</span>}
      </label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          style={{
            background: '#0f172a',
            border: '1px solid #1e3a5f',
            borderRadius: '10px',
            padding: '12px 14px',
            color: '#e2e8f0',
            fontSize: '14px',
            fontFamily: "'DM Sans', sans-serif",
            resize: 'vertical',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#6EE7B7')}
          onBlur={(e) => (e.target.style.borderColor = '#1e3a5f')}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            background: '#0f172a',
            border: '1px solid #1e3a5f',
            borderRadius: '10px',
            padding: '12px 14px',
            color: '#e2e8f0',
            fontSize: '14px',
            fontFamily: "'DM Sans', sans-serif",
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#6EE7B7')}
          onBlur={(e) => (e.target.style.borderColor = '#1e3a5f')}
        />
      )}
    </div>
  );
}

function TabButton({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 18px',
        borderRadius: '10px',
        border: active ? '1px solid #6EE7B7' : '1px solid #1e3a5f',
        background: active ? 'rgba(110,231,183,0.1)' : 'transparent',
        color: active ? '#6EE7B7' : '#64748b',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
        fontFamily: "'DM Mono', monospace",
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        whiteSpace: 'nowrap',
      }}
    >
      {icon} {label}
    </button>
  );
}

function ResultSection({ content }) {
  return (
    <div
      style={{
        background: '#0f172a',
        border: '1px solid #1e3a5f',
        borderRadius: '12px',
        padding: '24px',
        whiteSpace: 'pre-wrap',
        color: '#cbd5e1',
        fontSize: '14px',
        lineHeight: '1.8',
        fontFamily: "'DM Sans', sans-serif",
        minHeight: '300px',
        maxHeight: '520px',
        overflowY: 'auto',
      }}
    >
      {content}
    </div>
  );
}

function LoadingPulse() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        padding: '60px 20px',
      }}
    >
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#6EE7B7',
            animation: 'spin 1s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '10px',
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#3B82F6',
            animation: 'spin 1.5s linear infinite reverse',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6EE7B7, #3B82F6)',
            opacity: 0.3,
          }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            color: '#6EE7B7',
            fontWeight: '700',
            fontSize: '18px',
            margin: '0 0 8px',
            fontFamily: "'DM Mono', monospace",
          }}
        >
          Building your career kit...
        </p>
        <p style={{ color: '#475569', fontSize: '13px', margin: 0 }}>
          Crafting resume · Interview questions · Model answers
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function CareerAssistant() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [results, setResults] = useState({
    resume: '',
    interview: '',
    answers: '',
    suggestions: '',
  });
  const [activeTab, setActiveTab] = useState('resume');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const parseResults = (text) => {
    const get = (start, end) => {
      const s = text.indexOf(start);
      const e2 = end ? text.indexOf(end, s) : text.length;
      return s !== -1
        ? text.slice(s + start.length, e2 !== -1 ? e2 : undefined).trim()
        : '';
    };
    return {
      resume: get('SECTION 1:', 'SECTION 2:'),
      interview: get('SECTION 2:', 'SECTION 3:'),
      answers: get('SECTION 3:', 'SECTION 4:'),
      suggestions: get('SECTION 4:', ''),
    };
  };

  const handleGenerate = async () => {
    if (
      !form.name.trim() ||
      !form.role.trim() ||
      !form.skills.trim() ||
      !form.education.trim()
    ) {
      setError(
        'Please fill in all required fields (Name, Role, Skills, Education).'
      );
      return;
    }
    setError('');
    setStep(1);

    const prompt = `You are an expert AI career assistant. Generate a complete career kit for:

Name: ${form.name}
Role: ${form.role}
Skills: ${form.skills}
Education: ${form.education}
${form.experience ? `Experience: ${form.experience}` : ''}
${form.projects ? `Projects: ${form.projects}` : ''}
${form.targetCompany ? `Target Company: ${form.targetCompany}` : ''}

Output EXACTLY these 4 sections with headers:

SECTION 1: RESUME
[Professional ATS-optimized resume with Header, Summary, Skills, Education, Experience, Projects. Use strong action verbs. No emojis or symbols.]

SECTION 2: INTERVIEW QUESTIONS
[8-12 questions: Technical, Behavioral, Situational — numbered list]

SECTION 3: ANSWERS
[Strong STAR-method answers for each question above — numbered to match]

SECTION 4: IMPROVEMENT SUGGESTIONS
[3-5 specific, actionable suggestions to improve the candidate's profile]`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map((b) => b.text || '').join('\n') || '';
      const parsed = parseResults(text);
      setResults(parsed);
      setStep(2);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setStep(0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(results[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabLabels = {
    resume: 'Resume',
    interview: 'Interview Qs',
    answers: 'Model Answers',
    suggestions: 'Tips',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050e1a',
        padding: '40px 20px',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 3px; }
        textarea::placeholder, input::placeholder { color: #334155; }
      `}</style>

      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(110,231,183,0.08)',
              border: '1px solid rgba(110,231,183,0.2)',
              borderRadius: '100px',
              padding: '6px 16px',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#6EE7B7',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                color: '#6EE7B7',
                fontSize: '12px',
                fontWeight: '600',
                fontFamily: "'DM Mono', monospace",
                letterSpacing: '0.1em',
              }}
            >
              AI-POWERED
            </span>
          </div>
          <h1
            style={{
              margin: '0 0 12px',
              fontSize: 'clamp(28px, 5vw, 42px)',
              fontWeight: '800',
              background:
                'linear-gradient(135deg, #e2e8f0 30%, #6EE7B7 70%, #3B82F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Career Assistant
          </h1>
          <p style={{ color: '#475569', fontSize: '15px', margin: 0 }}>
            Resume · Interview Prep · Profile Coaching — all in one shot
          </p>
        </div>

        <ProgressDots step={step} />

        {/* Card */}
        <div
          style={{
            background: 'linear-gradient(160deg, #0d1f35 0%, #0a1628 100%)',
            border: '1px solid #1e3a5f',
            borderRadius: '20px',
            padding: 'clamp(24px, 4vw, 40px)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* STEP 0: Form */}
          {step === 0 && (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}
              >
                <InputField
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Arjun Sharma"
                  required
                />
                <InputField
                  label="Target Role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="e.g. Senior Data Scientist"
                  required
                />
              </div>
              <InputField
                label="Skills"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="e.g. Python, SQL, TensorFlow, Spark, AWS, Docker..."
                multiline
                required
              />
              <InputField
                label="Education"
                name="education"
                value={form.education}
                onChange={handleChange}
                placeholder="e.g. B.Tech Computer Science, IIT Delhi, 2023"
                multiline
                required
              />
              <InputField
                label="Work Experience"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="e.g. Data Analyst at Flipkart (2023–2025): Built dashboards, reduced churn by 12%..."
                multiline
              />
              <InputField
                label="Projects"
                name="projects"
                value={form.projects}
                onChange={handleChange}
                placeholder="e.g. Fraud Detection Model (Python, XGBoost): Achieved 96% accuracy on 1M+ transactions..."
                multiline
              />
              <InputField
                label="Target Company"
                name="targetCompany"
                value={form.targetCompany}
                onChange={handleChange}
                placeholder="e.g. Google, Zomato, CRED (optional)"
              />

              {error && (
                <div
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    color: '#f87171',
                    fontSize: '13px',
                  }}
                >
                  ⚠ {error}
                </div>
              )}

              <button
                onClick={handleGenerate}
                style={{
                  marginTop: '8px',
                  padding: '16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #6EE7B7, #3B82F6)',
                  color: '#0f172a',
                  fontWeight: '800',
                  fontSize: '15px',
                  fontFamily: "'DM Mono', monospace",
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = '0.9';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '1';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                ✦ GENERATE MY CAREER KIT
              </button>
            </div>
          )}

          {/* STEP 1: Loading */}
          {step === 1 && <LoadingPulse />}

          {/* STEP 2: Results */}
          {step === 2 && (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    color: '#e2e8f0',
                    fontSize: '18px',
                    fontWeight: '700',
                  }}
                >
                  Your Career Kit is Ready ✦
                </h2>
                <button
                  onClick={() => {
                    setStep(0);
                    setForm(initialForm);
                    setResults({
                      resume: '',
                      interview: '',
                      answers: '',
                      suggestions: '',
                    });
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #1e3a5f',
                    background: 'transparent',
                    color: '#64748b',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  ← Start Over
                </button>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Object.entries(tabLabels).map(([key, label]) => (
                  <TabButton
                    key={key}
                    label={label}
                    icon={sectionIcons[key]}
                    active={activeTab === key}
                    onClick={() => setActiveTab(key)}
                  />
                ))}
              </div>

              <ResultSection
                content={
                  results[activeTab] || 'No content generated for this section.'
                }
              />

              <button
                onClick={handleCopy}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #1e3a5f',
                  background: copied ? 'rgba(110,231,183,0.1)' : 'transparent',
                  color: copied ? '#6EE7B7' : '#64748b',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: '600',
                  transition: 'all 0.2s',
                }}
              >
                {copied ? '✓ Copied!' : '⎘ Copy this section'}
              </button>
            </div>
          )}
        </div>

        <p
          style={{
            textAlign: 'center',
            color: '#1e3a5f',
            fontSize: '12px',
            marginTop: '24px',
            fontFamily: "'DM Mono', monospace",
          }}
        >
          Powered by Claude · Built for ambitious professionals
        </p>
      </div>
    </div>
  );
}
