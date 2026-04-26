import { useState } from "react";

const TOP_IMG = "/images/TOPimage_small.jpg";
const TANPOPO_IMG = "/images/tanpopo.jpg";
const ORCHID_IMG = "/images/orchid.jpg";
const TULIP_IMG = "/images/tulip.jpg";

const questions = [
  { q: "初めての場所に行ったとき、うちの子は？", options: [ { text: "わりとすぐ慣れる", type: "tanpopo" }, { text: "少し緊張して様子を見る", type: "tulip" }, { text: "慣れるまで時間はかかるが、落ち着けば楽しめる", type: "orchid" } ] },
  { q: "大きな音や急な変化があると？", options: [ { text: "反応はするが、抱っこや声かけで落ち着く", type: "tulip" }, { text: "びっくりして泣きやすい", type: "orchid" }, { text: "あまり気にせず過ごす", type: "tanpopo" } ] },
  { q: "眠い・お腹が空いたときは？", options: [ { text: "日によって差がある", type: "tulip" }, { text: "強く泣いて訴える", type: "orchid" }, { text: "比較的落ち着いている", type: "tanpopo" } ] },
  { q: "人に抱っこされたときは？", options: [ { text: "慣れた人でないと不安そう", type: "orchid" }, { text: "最初は様子を見るが、だんだん慣れる", type: "tulip" }, { text: "誰にでもなじみやすい", type: "tanpopo" } ] },
  { q: "新しいおもちゃには？", options: [ { text: "少し観察してから遊ぶ", type: "tulip" }, { text: "すぐ手を伸ばす", type: "tanpopo" }, { text: "慎重に近づく", type: "orchid" } ] },
  { q: "生活リズムが変わった日は？", options: [ { text: "あまり影響を受けにくい", type: "tanpopo" }, { text: "少し乱れるが戻りやすい", type: "tulip" }, { text: "影響が出やすい", type: "orchid" } ] },
  { q: "親の表情や声には？", options: [ { text: "とても敏感に反応する", type: "orchid" }, { text: "反応するが切り替えられる", type: "tulip" }, { text: "あまり気にしすぎない", type: "tanpopo" } ] },
  { q: "一言でいうと？", options: [ { text: "のびのびしてたくましい", type: "tanpopo" }, { text: "やさしくマイペース", type: "tulip" }, { text: "感受性が豊かで繊細", type: "orchid" } ] },
];

const results = {
  orchid: { name: "オーキッドタイプ", img: ORCHID_IMG, color: "#c084e8", bg: "linear-gradient(135deg,#f9f0ff 0%,#ede0f8 100%)", accent: "#9b59b6", text: ["あなたのお子さんは、とても繊細で、深く感じ取る力を持ったタイプです。", "環境の変化や、親の表情・声の違いにも敏感に反応します。", "だからこそ、関わり方によって大きく伸びる可能性を持っています。", "一方で、\n・なんでこんなに泣くのだろう\n・この関わり方でいいのだろうか\nと悩みやすいのもこのタイプです。", "このタイプの子は、親の関わり方によって本当に大きく変わります。"], next: "同じタイプでも\n安心して伸びるか、不安が強くなるかに分かれます\n\nそのカギが「親の愛着タイプ」です" },
  tanpopo: { name: "たんぽぽタイプ", img: TANPOPO_IMG, color: "#f5c842", bg: "linear-gradient(135deg,#fffef0 0%,#fdf6d0 100%)", accent: "#d4a017", text: ["あなたのお子さんは、環境に適応しやすく、たくましく育つタイプです。", "新しい環境にもなじみやすく、自然に経験を積み重ねていけます。", "ただ、\n・手がかからないことで関わりが減る\n・甘えに気づきにくい\nということもあります"], next: "伸ばすか見逃すかは、親の関わり方次第です\n\nそのカギが「愛着タイプ」です" },
  tulip: { name: "チューリップタイプ", img: TULIP_IMG, color: "#f4a4a4", bg: "linear-gradient(135deg,#fff5f5 0%,#fde8e8 100%)", accent: "#e07070", text: ["あなたのお子さんは、繊細さとのびやかさをあわせ持つタイプです。", "今日はできたのに、明日はできない\nということが起こることもあります", "それは成長の幅が大きいという特徴です"], next: "関わり方次第で大きく伸びるかが決まります\n\nそのカギが「親の愛着タイプ」です" },
};

function calcResult(answers) {
  const counts = { orchid: 0, tanpopo: 0, tulip: 0 };
  answers.forEach((t) => counts[t]++);
  const max = Math.max(...Object.values(counts));
  const winners = Object.keys(counts).filter((k) => counts[k] === max);
  if (winners.length === 1) return winners[0];
  if (winners.includes("orchid") && winners.includes("tulip")) return "orchid";
  if (winners.includes("tanpopo") && winners.includes("tulip")) return "tanpopo";
  return "tulip";
}

const W = { minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", background:"linear-gradient(180deg,#fff9fe 0%,#f0faf5 100%)", fontFamily:"'Hiragino Maru Gothic ProN','BIZ UDPGothic',sans-serif", padding:"0 0 60px 0" };
const I = { width:"100%", maxWidth:420, padding:"0 20px", boxSizing:"border-box" };

function TopPage({ onStart }) {
  return (
    <div style={W}>
      <div style={{...I, textAlign:"center"}}>
        <img src={TOP_IMG} alt="top" style={{width:"100%",borderRadius:24,marginTop:28,boxShadow:"0 8px 32px rgba(180,120,220,0.15)"}} />
        <div style={{marginTop:28,padding:"18px 20px",background:"white",borderRadius:20,boxShadow:"0 4px 20px rgba(0,0,0,0.07)"}}>
          <p style={{margin:0,fontSize:15,color:"#888",lineHeight:1.8}}>たった<strong style={{color:"#c084e8"}}>8問</strong>に答えるだけで<br/>うちの子の気質タイプがわかります</p>
          <div style={{display:"flex",justifyContent:"center",gap:10,marginTop:14,flexWrap:"wrap"}}>
            {["1分で完了","直感でOK","正解なし"].map((label) => (
              <span key={label} style={{fontSize:13,background:"#f5edff",color:"#9b59b6",borderRadius:99,padding:"5px 13px"}}>{label}</span>
            ))}
          </div>
        </div>
        <button onClick={onStart} style={{marginTop:28,width:"100%",padding:"18px 0",fontSize:18,fontWeight:"bold",color:"white",background:"linear-gradient(135deg,#c084e8 0%,#f4a4a4 100%)",border:"none",borderRadius:99,cursor:"pointer",boxShadow:"0 6px 24px rgba(192,132,232,0.4)"}}>
          診断スタート
        </button>
        <p style={{marginTop:14,fontSize:12,color:"#bbb"}}>無料・登録不要</p>
      </div>
    </div>
  );
}

function QuestionPage({ index, onAnswer }) {
  const q = questions[index];
  const pct = ((index + 1) / questions.length) * 100;
  return (
    <div style={W}>
      <div style={I}>
        <div style={{marginTop:32,marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:13,color:"#bbb"}}>質問</span>
            <span style={{fontSize:14,fontWeight:"bold",color:"#c084e8"}}>{index+1} / {questions.length}</span>
          </div>
          <div style={{background:"#f0e6fa",borderRadius:99,height:8,overflow:"hidden"}}>
            <div style={{width:`${pct}%`,height:"100%",background:"linear-gradient(90deg,#c084e8,#f4a4a4)",borderRadius:99,transition:"width 0.4s ease"}} />
          </div>
        </div>
        <div style={{background:"#fffbf0",border:"1px solid #f5e0a0",borderRadius:14,padding:"12px 16px",marginBottom:22}}>
          <p style={{margin:0,fontSize:12,color:"#a08020",lineHeight:1.7}}>正解はありません。直感でお答えください<br/>迷ったら「なんとなく近い」と感じるものを選んでください</p>
        </div>
        <div style={{background:"white",borderRadius:20,padding:"24px 20px",boxShadow:"0 4px 20px rgba(0,0,0,0.07)",marginBottom:20}}>
          <p style={{margin:0,fontSize:17,fontWeight:"bold",color:"#333",lineHeight:1.7,textAlign:"center"}}>{q.q}</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => onAnswer(opt.type)} style={{width:"100%",padding:"18px 20px",fontSize:15,fontWeight:"500",color:"#444",background:"#fdf5ff",border:"2px solid #e8c8f8",borderRadius:16,cursor:"pointer",textAlign:"left",lineHeight:1.6,boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultPage({ resultKey }) {
  const r = results[resultKey];
  return (
    <div style={{...W, background:r.bg}}>
      <div style={I}>
        <div style={{textAlign:"center",marginTop:36}}>
          <p style={{margin:0,fontSize:13,color:"#aaa"}}>診断結果</p>
          <h2 style={{margin:"8px 0 0",fontSize:28,fontWeight:"bold",color:r.accent}}>{r.name}</h2>
          <p style={{margin:"4px 0 20px",fontSize:14,color:"#999"}}>です！</p>
          <img src={r.img} alt={r.name} style={{width:220,height:220,objectFit:"cover",borderRadius:"50%",boxShadow:`0 8px 32px ${r.color}55`,border:"4px solid white"}} />
        </div>
        <div style={{background:"white",borderRadius:20,padding:"24px 20px",marginTop:28,boxShadow:"0 4px 20px rgba(0,0,0,0.07)"}}>
          {r.text.map((t,i) => (
            <p key={i} style={{margin:i===0?"0 0 14px":"14px 0",fontSize:15,color:"#444",lineHeight:1.8,whiteSpace:"pre-line"}}>{t}</p>
          ))}
        </div>
        <div style={{background:`linear-gradient(135deg,${r.color}22,${r.color}11)`,border:`1.5px solid ${r.color}55`,borderRadius:20,padding:"20px",marginTop:20}}>
          <p style={{margin:"0 0 6px",fontSize:12,fontWeight:"bold",color:r.accent}}>NEXT STEP</p>
          <p style={{margin:0,fontSize:14,color:"#555",lineHeight:1.8,whiteSpace:"pre-line"}}>{r.next}</p>
        </div>
        <a href="https://line.me/R/" target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:28,width:"100%",padding:"18px 0",fontSize:16,fontWeight:"bold",color:"white",background:"#06C755",borderRadius:99,textDecoration:"none",boxShadow:"0 6px 24px rgba(6,199,85,0.35)",boxSizing:"border-box"}}>
          LINE で愛着タイプ診断を受け取る
        </a>
        <p style={{textAlign:"center",fontSize:12,color:"#bbb",marginTop:10}}>無料でお受け取りいただけます</p>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("top");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [resultKey, setResultKey] = useState(null);

  const handleStart = () => { setQIndex(0); setAnswers([]); setScreen("question"); };
  const handleAnswer = (type) => {
    const next = [...answers, type];
    if (qIndex + 1 < questions.length) { setAnswers(next); setQIndex(qIndex + 1); }
    else { setResultKey(calcResult(next)); setScreen("result"); }
  };

  if (screen === "top") return <TopPage onStart={handleStart} />;
  if (screen === "question") return <QuestionPage index={qIndex} onAnswer={handleAnswer} />;
  if (screen === "result") return <ResultPage resultKey={resultKey} />;
  return null;
}
