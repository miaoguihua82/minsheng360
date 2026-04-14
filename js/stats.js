// 数据统计与报表页面

registerPage('stats', () => `
  <div class="page-header">
    <h2>数据统计</h2>
    <button class="page-close">✕</button>
  </div>
  <div class="page-body">

    <!-- 时间筛选 -->
    <div class="stats-time-filter">
      <button class="time-btn active" onclick="switchTimeFilter(this,'week')">本周</button>
      <button class="time-btn" onclick="switchTimeFilter(this,'month')">本月</button>
      <button class="time-btn" onclick="switchTimeFilter(this,'quarter')">本季度</button>
      <button class="time-btn" onclick="switchTimeFilter(this,'year')">本年</button>
    </div>

    <!-- 核心指标 -->
    <div class="stats-cards">
      <div class="stats-card" style="--card-color:#1677FF;">
        <div class="stats-card-icon">📝</div>
        <div class="stats-card-info">
          <span class="stats-card-num">248</span>
          <span class="stats-card-label">本周问政总量</span>
        </div>
        <div class="stats-trend up">↑ 12.5%</div>
      </div>
      <div class="stats-card" style="--card-color:#52C41A;">
        <div class="stats-card-icon">✅</div>
        <div class="stats-card-info">
          <span class="stats-card-num">213</span>
          <span class="stats-card-label">已办结</span>
        </div>
        <div class="stats-trend up">↑ 8.3%</div>
      </div>
      <div class="stats-card" style="--card-color:#FAAD14;">
        <div class="stats-card-icon">⏱️</div>
        <div class="stats-card-info">
          <span class="stats-card-num">2.3天</span>
          <span class="stats-card-label">平均回复时长</span>
        </div>
        <div class="stats-trend down">↓ 0.5天</div>
      </div>
      <div class="stats-card" style="--card-color:#F759AB;">
        <div class="stats-card-icon">😊</div>
        <div class="stats-card-info">
          <span class="stats-card-num">96.2%</span>
          <span class="stats-card-label">群众满意率</span>
        </div>
        <div class="stats-trend up">↑ 1.2%</div>
      </div>
    </div>

    <!-- 分类统计 -->
    <div class="stats-section">
      <div class="section-header">
        <h3>问政类型分布</h3>
      </div>
      <div class="pie-chart-container">
        <canvas id="typeChart" width="160" height="160"></canvas>
        <div class="pie-legend">
          ${[
            {color:'#1677FF', label:'城乡建设', value:'28%', count:69},
            {color:'#52C41A', label:'交通出行', value:'22%', count:55},
            {color:'#FAAD14', label:'环境卫生', value:'18%', count:45},
            {color:'#F759AB', label:'教育医疗', value:'14%', count:35},
            {color:'#722ED1', label:'市场监管', value:'10%', count:25},
            {color:'#13C2C2', label:'其他', value:'8%', count:19},
          ].map(item => `
            <div class="legend-item">
              <span class="legend-dot" style="background:${item.color}"></span>
              <span class="legend-label">${item.label}</span>
              <span class="legend-value">${item.value}</span>
              <span class="legend-count">${item.count}条</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- 部门处理效率排名 -->
    <div class="stats-section">
      <div class="section-header">
        <h3>部门回复效率排行</h3>
        <span style="font-size:11px;color:var(--text-3);">按平均回复时长</span>
      </div>
      <div class="rank-list">
        ${[
          {rank:1, dept:'教育局', avgTime:'1.2天', rate:'98.5%', count:35, color:'#FFD700'},
          {rank:2, dept:'公安交警支队', avgTime:'1.5天', rate:'97.8%', count:55, color:'#C0C0C0'},
          {rank:3, dept:'市场监管局', avgTime:'1.8天', rate:'96.4%', count:25, color:'#CD7F32'},
          {rank:4, dept:'城市管理局', avgTime:'2.1天', rate:'96.2%', count:69, color:'var(--primary)'},
          {rank:5, dept:'卫生健康局', avgTime:'2.4天', rate:'95.1%', count:42, color:'var(--primary)'},
          {rank:6, dept:'农业农村局', avgTime:'2.8天', rate:'94.3%', count:28, color:'var(--text-3)'},
          {rank:7, dept:'住房建设局', avgTime:'3.2天', rate:'93.2%', count:21, color:'var(--text-3)'},
        ].map(item => `
          <div class="rank-item">
            <div class="rank-no" style="color:${item.color};border-color:${item.color}">${item.rank}</div>
            <div class="rank-info">
              <p class="rank-dept">${item.dept}</p>
              <div class="rank-bar-wrap">
                <div class="rank-bar" style="width:${100 - item.rank * 10}%;background:${item.color === 'var(--primary)' ? '#1677FF' : item.color === 'var(--text-3)' ? '#C9CDD4' : item.color}"></div>
              </div>
            </div>
            <div class="rank-data">
              <p style="font-size:13px;font-weight:700;color:var(--text-1)">${item.avgTime}</p>
              <p style="font-size:11px;color:var(--text-3)">${item.rate}满意</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 趋势折线图 -->
    <div class="stats-section">
      <div class="section-header">
        <h3>问政趋势（近7天）</h3>
      </div>
      <div class="line-chart-container">
        <canvas id="trendChart" width="100%" height="160"></canvas>
        <div class="trend-placeholder">
          ${generateTrendBars()}
        </div>
      </div>
    </div>

    <!-- 热点标签词云 -->
    <div class="stats-section" style="margin-bottom:20px;">
      <div class="section-header">
        <h3>热点问题标签</h3>
      </div>
      <div class="tag-cloud">
        ${[
          {text:'道路积水', size:18, color:'#1677FF'},
          {text:'停车难', size:16, color:'#F759AB'},
          {text:'噪音扰民', size:15, color:'#FAAD14'},
          {text:'路灯损坏', size:14, color:'#52C41A'},
          {text:'垃圾清运', size:14, color:'#722ED1'},
          {text:'交通安全', size:13, color:'#FF7A45'},
          {text:'教育资源', size:13, color:'#13C2C2'},
          {text:'医疗服务', size:12, color:'#F759AB'},
          {text:'城市绿化', size:12, color:'#73D13D'},
          {text:'市容整治', size:11, color:'#1677FF'},
          {text:'农业补贴', size:11, color:'#FAAD14'},
          {text:'社区服务', size:11, color:'#722ED1'},
          {text:'就业问题', size:10, color:'#13C2C2'},
          {text:'违规建筑', size:10, color:'#FF7A45'},
        ].map(t => `<span class="cloud-tag" style="font-size:${t.size}px;color:${t.color};border-color:${t.color}22;background:${t.color}11;">${t.text}</span>`).join('')}
      </div>
    </div>

    <!-- 报表下载 -->
    <div class="stats-section" style="margin-bottom:80px;">
      <div class="section-header">
        <h3>报表导出</h3>
      </div>
      <div class="report-btns">
        <button class="report-btn" onclick="exportReport('weekly')">
          <span>📋</span>
          <div>
            <p>周报</p>
            <span>2026年第15周</span>
          </div>
          <span class="export-icon">⬇</span>
        </button>
        <button class="report-btn" onclick="exportReport('monthly')">
          <span>📊</span>
          <div>
            <p>月报</p>
            <span>2026年4月</span>
          </div>
          <span class="export-icon">⬇</span>
        </button>
        <button class="report-btn" onclick="exportReport('yearly')">
          <span>📈</span>
          <div>
            <p>年报</p>
            <span>2026年度</span>
          </div>
          <span class="export-icon">⬇</span>
        </button>
        <button class="report-btn" onclick="exportReport('custom')">
          <span>⚙️</span>
          <div>
            <p>自定义报表</p>
            <span>按条件生成</span>
          </div>
          <span class="export-icon">⬇</span>
        </button>
      </div>
    </div>

  </div>

  <style>
    .stats-time-filter { display:flex;gap:8px;padding:12px 0;margin-bottom:4px; }
    .time-btn { flex:1;padding:8px 0;border:1.5px solid var(--border);border-radius:20px;background:#fff;font-size:13px;color:var(--text-2);cursor:pointer;transition:all 0.2s; }
    .time-btn.active { background:var(--primary);border-color:var(--primary);color:#fff; }
    .stats-cards { display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:16px; }
    .stats-card { background:#fff;border-radius:var(--radius);padding:14px;box-shadow:var(--shadow);display:flex;align-items:center;gap:10px;position:relative;overflow:hidden; }
    .stats-card::before { content:'';position:absolute;right:-10px;top:-10px;width:60px;height:60px;background:var(--card-color);opacity:0.08;border-radius:50%; }
    .stats-card-icon { font-size:24px; }
    .stats-card-info { flex:1; }
    .stats-card-num { display:block;font-size:20px;font-weight:800;color:var(--card-color); }
    .stats-card-label { font-size:11px;color:var(--text-3); }
    .stats-trend { position:absolute;right:12px;top:10px;font-size:11px;font-weight:600; }
    .stats-trend.up { color:var(--success); }
    .stats-trend.down { color:var(--primary); }
    .stats-section { background:#fff;border-radius:var(--radius);padding:16px;margin-bottom:12px;box-shadow:var(--shadow); }
    .pie-chart-container { display:flex;align-items:center;gap:16px;margin-top:12px; }
    .pie-chart-container canvas { flex-shrink:0; }
    .pie-legend { flex:1; }
    .legend-item { display:flex;align-items:center;gap:6px;padding:3px 0; }
    .legend-dot { width:8px;height:8px;border-radius:50%;flex-shrink:0; }
    .legend-label { flex:1;font-size:12px;color:var(--text-2); }
    .legend-value { font-size:12px;font-weight:700;color:var(--text-1); }
    .legend-count { font-size:11px;color:var(--text-3);margin-left:4px; }
    .rank-list { margin-top:12px; }
    .rank-item { display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--bg-1); }
    .rank-item:last-child { border-bottom:none; }
    .rank-no { width:24px;height:24px;border-radius:50%;border:2px solid;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0; }
    .rank-info { flex:1; }
    .rank-dept { font-size:13px;font-weight:600;margin-bottom:4px; }
    .rank-bar-wrap { height:4px;background:var(--bg-1);border-radius:2px;overflow:hidden; }
    .rank-bar { height:100%;border-radius:2px;transition:width 0.6s; }
    .rank-data { text-align:right; }
    .line-chart-container { position:relative;margin-top:12px; }
    .trend-placeholder { display:flex;align-items:flex-end;gap:6px;height:120px;padding-top:10px; }
    .trend-bar-wrap { flex:1;display:flex;flex-direction:column;align-items:center;gap:4px; }
    .trend-bar { width:100%;background:linear-gradient(to top,var(--primary),#69B1FF);border-radius:3px 3px 0 0;min-height:4px;transition:height 0.5s; }
    .trend-label { font-size:10px;color:var(--text-3); }
    .trend-num { font-size:11px;color:var(--primary);font-weight:700; }
    .tag-cloud { display:flex;flex-wrap:wrap;gap:8px;margin-top:12px; }
    .cloud-tag { padding:5px 12px;border-radius:16px;border:1px solid;cursor:pointer;transition:transform 0.2s; }
    .cloud-tag:active { transform:scale(0.95); }
    .report-btns { display:flex;flex-direction:column;gap:10px;margin-top:12px; }
    .report-btn { display:flex;align-items:center;gap:12px;padding:14px 16px;background:var(--bg-1);border:1.5px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;text-align:left;transition:all 0.2s; }
    .report-btn:active { background:#EEF5FF;border-color:var(--primary); }
    .report-btn > span:first-child { font-size:24px; }
    .report-btn div { flex:1; }
    .report-btn p { font-size:14px;font-weight:600;color:var(--text-1); }
    .report-btn span:nth-child(2)>span, .report-btn div>span { font-size:11px;color:var(--text-3); }
    .export-icon { font-size:18px;color:var(--primary); }
  </style>
`);

function generateTrendBars() {
  const data = [
    {day:'4/7', count:32},
    {day:'4/8', count:28},
    {day:'4/9', count:41},
    {day:'4/10', count:35},
    {day:'4/11', count:45},
    {day:'4/12', count:38},
    {day:'4/13', count:29},
  ];
  const max = Math.max(...data.map(d => d.count));
  return data.map(d => `
    <div class="trend-bar-wrap">
      <span class="trend-num">${d.count}</span>
      <div class="trend-bar" style="height:${Math.round(d.count/max*90)}px;"></div>
      <span class="trend-label">${d.day}</span>
    </div>
  `).join('');
}

function switchTimeFilter(btn, period) {
  document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  showToast(`已切换至${btn.textContent}数据（演示）`);
}

function exportReport(type) {
  const names = {weekly:'周报', monthly:'月报', yearly:'年报', custom:'自定义报表'};
  showToast(`正在生成${names[type]}，请稍候...`);
  setTimeout(() => showToast(`${names[type]}已生成，正在下载（演示）`), 1500);
}

// 绘制饼图（Canvas）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(drawPieChart, 300);
});

function drawPieChart() {
  const canvas = document.getElementById('typeChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const data = [0.28, 0.22, 0.18, 0.14, 0.10, 0.08];
  const colors = ['#1677FF','#52C41A','#FAAD14','#F759AB','#722ED1','#13C2C2'];
  const cx = 80, cy = 80, r = 70, inner = 38;
  let start = -Math.PI / 2;
  data.forEach((val, i) => {
    const end = start + val * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = colors[i];
    ctx.fill();
    start = end;
  });
  // 中心挖空（甜甜圈）
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();
  // 中心文字
  ctx.fillStyle = '#1D2129';
  ctx.font = 'bold 14px PingFang SC, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('248条', cx, cy-6);
  ctx.fillStyle = '#86909C';
  ctx.font = '11px PingFang SC, sans-serif';
  ctx.fillText('本周', cx, cy+10);
}

// 热点问题列表页面
registerPage('hot', () => `
  <div class="page-header">
    <h2>热点问题</h2>
    <button class="page-close">✕</button>
  </div>
  <div class="page-body">
    <div style="display:flex;gap:8px;margin-bottom:12px;">
      ${['全部','城乡建设','交通出行','环境卫生','教育医疗','其他'].map((t,i) => `
        <button style="white-space:nowrap;padding:6px 12px;border:1.5px solid ${i===0?'var(--primary)':'var(--border)'};border-radius:16px;background:${i===0?'var(--primary)':'#fff'};color:${i===0?'#fff':'var(--text-2)'};font-size:12px;cursor:pointer;" onclick="showToast('筛选：${t}')">${t}</button>
      `).join('')}
    </div>
    ${[
      {title:'关于城区道路积水问题的集中反映', count:328, replied:312, tag:'城乡建设', hot:true},
      {title:'停车难问题已成居民最大困扰', count:256, replied:240, tag:'交通出行', hot:true},
      {title:'建筑工地夜间施工噪音扰民', count:198, replied:185, tag:'环境卫生', hot:false},
      {title:'学校周边交通安全隐患亟待解决', count:167, replied:159, tag:'教育医疗', hot:false},
      {title:'农贸市场环境整治呼声高涨', count:145, replied:130, tag:'市场监管', hot:false},
      {title:'小区绿化破坏严重，亟需修复', count:123, replied:118, tag:'城乡建设', hot:false},
      {title:'公交线路覆盖不足反映强烈', count:98, replied:85, tag:'交通出行', hot:false},
    ].map((item, idx) => `
      <div class="card" style="cursor:pointer;" onclick="showToast('查看热点详情（演示）')">
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <div style="width:24px;height:24px;border-radius:50%;background:${idx<3?'var(--danger)':'var(--border)'};color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;">${idx+1}</div>
          <div style="flex:1;">
            <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:6px;">
              ${item.hot ? '<span style="background:#FFF2F0;color:var(--danger);font-size:10px;font-weight:700;padding:2px 6px;border-radius:3px;flex-shrink:0;">🔥热</span>' : ''}
              <p style="font-size:14px;font-weight:600;color:var(--text-1);line-height:1.4;">${item.title}</p>
            </div>
            <div style="display:flex;align-items:center;gap:12px;font-size:11px;color:var(--text-3);">
              <span class="tag tag-new">${item.tag}</span>
              <span>💬 ${item.count}条问政</span>
              <span style="color:var(--success)">✓ 已回复${item.replied}条</span>
            </div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
`);
