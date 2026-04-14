// 问政提交页面
registerPage('submit', () => `
  <div class="page-header">
    <h2>我要问政</h2>
    <button class="page-close">✕</button>
  </div>
  <div class="page-body">
    <!-- 步骤条 -->
    <div class="steps" id="submitSteps">
      <div class="step active" data-step="1">
        <div class="step-circle">1</div>
        <span class="step-label">选择单位</span>
      </div>
      <div class="step" data-step="2">
        <div class="step-circle">2</div>
        <span class="step-label">填写问题</span>
      </div>
      <div class="step" data-step="3">
        <div class="step-circle">3</div>
        <span class="step-label">提交成功</span>
      </div>
    </div>

    <!-- Step 1: 选择单位 -->
    <div id="step1" class="step-panel">
      <div class="card">
        <div class="form-group">
          <label class="form-label">问题类型 <span class="required">*</span></label>
          <div class="type-grid" id="typeGrid">
            <div class="type-item active" onclick="selectType(this,'城乡建设')">🏗️ 城乡建设</div>
            <div class="type-item" onclick="selectType(this,'交通出行')">🚗 交通出行</div>
            <div class="type-item" onclick="selectType(this,'教育医疗')">🏥 教育医疗</div>
            <div class="type-item" onclick="selectType(this,'环境卫生')">🌿 环境卫生</div>
            <div class="type-item" onclick="selectType(this,'市场监管')">🏪 市场监管</div>
            <div class="type-item" onclick="selectType(this,'民政社保')">🤝 民政社保</div>
            <div class="type-item" onclick="selectType(this,'农业农村')">🌾 农业农村</div>
            <div class="type-item" onclick="selectType(this,'其他问题')">📋 其他</div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">目标单位 <span class="required">*</span></label>
          <select class="form-select" id="targetDept">
            <option value="">-- 请选择受理单位（不确定可跳过）--</option>
            <optgroup label="市直部门">
              <option>城市管理局</option>
              <option>公安交警支队</option>
              <option>卫生健康局</option>
              <option>教育局</option>
              <option>农业农村局</option>
              <option>市场监管局</option>
              <option>自然资源局</option>
              <option>住房建设局</option>
              <option>民政局</option>
              <option>生态环境局</option>
              <option>人力资源和社会保障局</option>
            </optgroup>
            <optgroup label="乡镇街道">
              <option>XX镇人民政府</option>
              <option>YY街道办</option>
              <option>AA乡人民政府</option>
              <option>BB社区居委会</option>
              <option>DD镇人民政府</option>
            </optgroup>
          </select>
          <p style="font-size:11px;color:var(--text-3);margin-top:4px;">💡 不清楚该找哪个部门？选择"不确定"，平台会自动分配</p>
        </div>
      </div>

      <button class="btn-primary" style="width:100%;" onclick="goStep(2)">下一步</button>
    </div>

    <!-- Step 2: 填写内容 -->
    <div id="step2" class="step-panel" style="display:none;">
      <div class="card">
        <div class="form-group">
          <label class="form-label">问题标题 <span class="required">*</span></label>
          <input class="form-input" id="questionTitle" type="text" placeholder="请简要描述您的问题（20字以内）" maxlength="20">
        </div>
        <div class="form-group">
          <label class="form-label">详细描述 <span class="required">*</span></label>
          <textarea class="form-textarea" id="questionContent" placeholder="请详细描述您遇到的问题，包括时间、地点、具体情况等，有助于相关部门更好地处理您的问政..." style="min-height:120px;"></textarea>
          <div style="text-align:right;font-size:11px;color:var(--text-3);margin-top:4px;">
            <span id="contentCount">0</span>/500字
          </div>
        </div>
      </div>

      <!-- 上传图片/视频 -->
      <div class="card">
        <label class="form-label">上传图片/视频（选填）</label>
        <p style="font-size:11px;color:var(--text-3);margin-bottom:8px;">最多上传9张图片或1个视频，支持jpg、png、mp4格式</p>
        <div class="upload-grid" id="uploadGrid">
          <div class="upload-item" onclick="addMedia()">
            <span>📷</span>
            <span style="font-size:11px;color:var(--text-3);margin-top:4px;">添加</span>
          </div>
        </div>
      </div>

      <!-- 联系方式 -->
      <div class="card">
        <div class="form-group" style="margin-bottom:0;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <label class="form-label" style="margin:0;">是否允许部门联系您？</label>
            <label class="toggle-switch">
              <input type="checkbox" id="allowContact" checked onchange="toggleContact()">
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div id="contactFields">
            <div class="form-group" style="margin-bottom:10px;">
              <input class="form-input" type="text" placeholder="您的姓名（选填）" id="contactName">
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <input class="form-input" type="tel" placeholder="联系电话（选填）" id="contactPhone">
            </div>
          </div>
        </div>
      </div>

      <!-- 是否公开 -->
      <div class="card" style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;">
        <div>
          <p style="font-size:14px;font-weight:500;">公开展示</p>
          <p style="font-size:11px;color:var(--text-3);margin-top:2px;">开启后其他市民可查看此问政及回复</p>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" id="isPublic" checked>
          <span class="toggle-slider"></span>
        </label>
      </div>

      <div style="display:flex;gap:10px;margin-top:4px;">
        <button class="btn-secondary" style="flex:1;" onclick="goStep(1)">上一步</button>
        <button class="btn-primary" style="flex:2;" onclick="submitQuestion()">提交问政</button>
      </div>
    </div>

    <!-- Step 3: 提交成功 -->
    <div id="step3" class="step-panel" style="display:none;">
      <div style="text-align:center;padding:40px 20px;">
        <div style="width:72px;height:72px;background:linear-gradient(135deg,#52C41A,#73D13D);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 20px;">✓</div>
        <h3 style="font-size:20px;font-weight:800;color:var(--text-1);margin-bottom:8px;">提交成功！</h3>
        <p style="font-size:14px;color:var(--text-2);margin-bottom:4px;">您的问政已成功提交</p>
        <p style="font-size:13px;color:var(--text-3);">编号：<strong id="questionNo" style="color:var(--primary)">MS2026041300001</strong></p>
      </div>
      <div class="card" style="background:var(--bg-1);">
        <div style="display:flex;gap:12px;">
          <div style="width:4px;background:var(--primary);border-radius:2px;flex-shrink:0;"></div>
          <div>
            <p style="font-size:13px;color:var(--text-2);line-height:1.8;">
              📋 问政已提交至 <strong id="submitDeptName">城市管理局</strong><br>
              ⏰ 预计回复时间：<strong>5个工作日内</strong><br>
              📱 回复后将通过短信通知您<br>
              🔍 可凭编号查询办理进度
            </p>
          </div>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:16px;">
        <button class="btn-secondary" style="flex:1;" onclick="showPage('query')">查看进度</button>
        <button class="btn-primary" style="flex:1;" onclick="closePage()">返回首页</button>
      </div>
    </div>
  </div>

  <style>
    .type-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:8px; }
    .type-item { padding:8px 4px;background:var(--bg-1);border:1.5px solid var(--border);border-radius:8px;font-size:11px;text-align:center;cursor:pointer;transition:all 0.2s; }
    .type-item.active { background:#EEF5FF;border-color:var(--primary);color:var(--primary);font-weight:600; }
    .toggle-switch { position:relative;display:inline-block;width:46px;height:26px; }
    .toggle-switch input { opacity:0;width:0;height:0; }
    .toggle-slider { position:absolute;cursor:pointer;inset:0;background:#ccc;border-radius:26px;transition:.3s; }
    .toggle-slider:before { position:absolute;content:'';height:20px;width:20px;left:3px;bottom:3px;background:white;border-radius:50%;transition:.3s; }
    .toggle-switch input:checked + .toggle-slider { background:var(--primary); }
    .toggle-switch input:checked + .toggle-slider:before { transform:translateX(20px); }
  </style>
`);

// 问政步骤控制
function goStep(n) {
  if (n === 2) {
    const dept = document.getElementById('targetDept');
    // 校验
  }
  // 更新步骤条
  document.querySelectorAll('.step').forEach((s, i) => {
    s.classList.remove('active','done');
    if (i + 1 < n) s.classList.add('done');
    if (i + 1 === n) s.classList.add('active');
  });
  document.querySelectorAll('.step-panel').forEach((p, i) => {
    p.style.display = (i + 1 === n) ? 'block' : 'none';
  });
  // 修改step圆圈内容
  document.querySelectorAll('.step').forEach((s, i) => {
    const circle = s.querySelector('.step-circle');
    if (s.classList.contains('done')) circle.textContent = '✓';
    else circle.textContent = i + 1;
  });
}

function selectType(el, type) {
  document.querySelectorAll('.type-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function toggleContact() {
  const fields = document.getElementById('contactFields');
  const checked = document.getElementById('allowContact').checked;
  fields.style.display = checked ? 'block' : 'none';
}

function addMedia() {
  const grid = document.getElementById('uploadGrid');
  const items = grid.querySelectorAll('.upload-item[data-type]');
  if (items.length >= 9) { showToast('最多上传9个文件'); return; }
  // 模拟添加图片
  const colors = ['#FFB3B3','#B3D4FF','#B3FFB3','#FFE5B3','#E5B3FF'];
  const c = colors[items.length % colors.length];
  const div = document.createElement('div');
  div.className = 'upload-item';
  div.setAttribute('data-type', 'img');
  div.innerHTML = `<div style="width:100%;height:100%;background:${c};display:flex;align-items:center;justify-content:center;font-size:28px;">🖼️</div><button class="remove-btn" onclick="removeMedia(this)">×</button>`;
  grid.insertBefore(div, grid.lastElementChild);
  showToast('图片已添加（演示）');
}

function removeMedia(btn) {
  btn.parentElement.remove();
}

let submitedCount = 1;
function submitQuestion() {
  const title = document.getElementById('questionTitle');
  const content = document.getElementById('questionContent');
  if (!title || !title.value.trim()) { showToast('请填写问题标题'); return; }
  if (!content || !content.value.trim()) { showToast('请填写详细描述'); return; }
  const dept = document.getElementById('targetDept');
  const deptName = dept && dept.value ? dept.value : '平台分配';
  document.getElementById && goStep(3);
  setTimeout(() => {
    const el = document.getElementById('submitDeptName');
    if (el) el.textContent = deptName;
    const no = document.getElementById('questionNo');
    if (no) {
      const d = new Date();
      const str = `MS${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}${String(Math.floor(Math.random()*99999)).padStart(5,'0')}`;
      no.textContent = str;
    }
  }, 50);
}

// 字数统计
document.addEventListener('input', function(e) {
  if (e.target && e.target.id === 'questionContent') {
    const c = document.getElementById('contentCount');
    if (c) c.textContent = e.target.value.length;
  }
});

// ============ 查询进度页面 ============
registerPage('query', () => `
  <div class="page-header">
    <h2>问政进度查询</h2>
    <button class="page-close">✕</button>
  </div>
  <div class="page-body">
    <!-- 搜索框 -->
    <div class="card" style="margin-bottom:12px;">
      <div style="display:flex;gap:8px;">
        <input class="form-input" type="text" placeholder="输入编号或关键词查询" id="queryKeyword" style="flex:1">
        <button class="btn-primary" style="padding:0 16px;border-radius:8px;" onclick="doQuery()">查询</button>
      </div>
      <div style="display:flex;gap:8px;margin-top:10px;">
        <button class="filter-btn active" onclick="filterStatus(this,'all')">全部</button>
        <button class="filter-btn" onclick="filterStatus(this,'new')">待受理</button>
        <button class="filter-btn" onclick="filterStatus(this,'processing')">处理中</button>
        <button class="filter-btn" onclick="filterStatus(this,'replied')">已回复</button>
        <button class="filter-btn" onclick="filterStatus(this,'closed')">已办结</button>
      </div>
    </div>

    <!-- 问政列表 -->
    <div id="queryList">
      ${generateQueryList()}
    </div>
  </div>

  <style>
    .filter-btn { padding:5px 12px;border:1.5px solid var(--border);border-radius:16px;background:#fff;font-size:12px;color:var(--text-2);cursor:pointer;transition:all 0.2s; }
    .filter-btn.active { background:var(--primary);border-color:var(--primary);color:#fff; }
    .query-card { background:#fff;border-radius:var(--radius);padding:14px;margin-bottom:10px;box-shadow:var(--shadow);cursor:pointer; }
    .query-card:active { opacity:0.8; }
    .query-top { display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:8px; }
    .query-title { font-size:14px;font-weight:600;color:var(--text-1);flex:1;line-height:1.4; }
    .query-meta { display:flex;flex-wrap:wrap;gap:8px;font-size:11px;color:var(--text-3);margin-bottom:10px; }
    .query-timeline { background:var(--bg-1);border-radius:8px;padding:12px; }
    .timeline-item { display:flex;gap:10px;align-items:flex-start;margin-bottom:8px; }
    .timeline-item:last-child { margin-bottom:0; }
    .timeline-dot { width:8px;height:8px;border-radius:50%;background:var(--primary);flex-shrink:0;margin-top:4px; }
    .timeline-dot.done { background:var(--success); }
    .timeline-dot.pending { background:var(--border); }
    .timeline-content { flex:1; }
    .timeline-label { font-size:12px;font-weight:600;color:var(--text-2); }
    .timeline-time { font-size:11px;color:var(--text-3); }
    .timeline-reply { font-size:12px;color:var(--text-1);margin-top:4px;line-height:1.6;background:#fff;padding:8px;border-radius:6px;border-left:3px solid var(--primary); }
  </style>
`);

function generateQueryList() {
  const list = [
    {
      no:'MS2026041300001',
      title:'关于某路段积水问题的建议',
      dept:'城市管理局',
      type:'城乡建设',
      status:'replied',
      statusText:'已回复',
      submitTime:'2026-04-10 09:23',
      replyTime:'2026-04-12 14:05',
      reply:'感谢您的问政！经现场勘查，该路段积水系地下管道老化堵塞所致，我局已安排专业维修队伍于4月15日进行疏通修缮，预计完工后可彻底解决积水问题，期间将设置警示标志，请注意安全。',
      timeline:[
        {label:'群众提交',time:'2026-04-10 09:23',done:true},
        {label:'城市管理局受理',time:'2026-04-10 10:15',done:true},
        {label:'现场核查',time:'2026-04-11 14:00',done:true},
        {label:'回复处理结果',time:'2026-04-12 14:05',done:true},
      ]
    },
    {
      no:'MS2026041200002',
      title:'希望在社区增设停车位',
      dept:'XX街道办',
      type:'城乡建设',
      status:'processing',
      statusText:'处理中',
      submitTime:'2026-04-09 16:40',
      replyTime:null,
      reply:null,
      timeline:[
        {label:'群众提交',time:'2026-04-09 16:40',done:true},
        {label:'XX街道办受理',time:'2026-04-09 17:30',done:true},
        {label:'调研评估中',time:'2026-04-11 09:00',done:true},
        {label:'等待回复',time:'-',done:false},
      ]
    },
    {
      no:'MS2026041100003',
      title:'关于学校周边交通安全隐患反映',
      dept:'公安交警支队',
      type:'交通出行',
      status:'replied',
      statusText:'已回复',
      submitTime:'2026-04-08 08:55',
      replyTime:'2026-04-10 11:20',
      reply:'您好，感谢您的反映。经核查，该学校周边确存在高峰期车辆乱停放问题，我支队已安排增设交通协管员并在路段增加禁停标识，同时联合学校开展交通安全宣传，请您放心。',
      timeline:[
        {label:'群众提交',time:'2026-04-08 08:55',done:true},
        {label:'交警支队受理',time:'2026-04-08 09:30',done:true},
        {label:'现场执法处置',time:'2026-04-09 16:00',done:true},
        {label:'回复处理结果',time:'2026-04-10 11:20',done:true},
      ]
    },
    {
      no:'MS2026041300004',
      title:'农贸市场卫生环境需要整改',
      dept:'市场监管局',
      type:'市场监管',
      status:'new',
      statusText:'待受理',
      submitTime:'2026-04-13 11:02',
      replyTime:null,
      reply:null,
      timeline:[
        {label:'群众提交',time:'2026-04-13 11:02',done:true},
        {label:'等待受理',time:'-',done:false},
      ]
    },
  ];

  return list.map(item => `
    <div class="query-card" onclick="toggleDetail('detail_${item.no}')">
      <div class="query-top">
        <p class="query-title">${item.title}</p>
        <span class="tag tag-${item.status}">${item.statusText}</span>
      </div>
      <div class="query-meta">
        <span>📋 ${item.no}</span>
        <span>🏢 ${item.dept}</span>
        <span>🏷️ ${item.type}</span>
        <span>📅 ${item.submitTime}</span>
      </div>
      <div id="detail_${item.no}" style="display:none;">
        <div class="query-timeline">
          <p style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:10px;">📋 办理进度</p>
          ${item.timeline.map(t => `
            <div class="timeline-item">
              <div class="timeline-dot ${t.done?'done':'pending'}"></div>
              <div class="timeline-content">
                <p class="timeline-label">${t.label}</p>
                <p class="timeline-time">${t.time}</p>
              </div>
            </div>
          `).join('')}
          ${item.reply ? `
            <div style="margin-top:10px;">
              <p style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:6px;">💬 部门回复</p>
              <div class="timeline-reply">${item.reply}</div>
              <p style="font-size:11px;color:var(--text-3);margin-top:4px;">回复时间：${item.replyTime}</p>
            </div>
          ` : ''}
        </div>
        ${item.status === 'replied' ? `
          <div style="display:flex;gap:8px;margin-top:10px;">
            <button style="flex:1;padding:8px;background:var(--bg-1);border:1.5px solid var(--border);border-radius:8px;font-size:13px;color:var(--success);cursor:pointer;font-weight:600;" onclick="rateQuestion('satisfied')">👍 满意</button>
            <button style="flex:1;padding:8px;background:var(--bg-1);border:1.5px solid var(--border);border-radius:8px;font-size:13px;color:var(--danger);cursor:pointer;font-weight:600;" onclick="rateQuestion('unsatisfied')">👎 不满意</button>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function toggleDetail(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function doQuery() {
  showToast('查询中...（演示）');
}

function filterStatus(btn, status) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  showToast(`已筛选：${btn.textContent}（演示）`);
}

function rateQuestion(type) {
  showToast(type === 'satisfied' ? '感谢您的好评！' : '已收到您的反馈，我们将继续改进！');
}
