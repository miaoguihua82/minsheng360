// 部门端页面：待处理列表、回复、转发

// ============ 部门回复工作台 ============
registerPage('dept-reply', () => `
  <div class="page-header">
    <h2>部门工作台</h2>
    <button class="page-close">✕</button>
  </div>
  <div class="page-body">

    <!-- 部门信息卡 -->
    <div class="dept-info-card">
      <div style="display:flex;align-items:center;gap:12px;">
        <div class="dept-big-avatar">城</div>
        <div>
          <h3>城市管理局</h3>
          <p>行政执法与城市管理</p>
        </div>
        <div style="margin-left:auto;text-align:right;">
          <span class="tag tag-replied" style="font-size:12px;padding:4px 10px;">正常运营</span>
        </div>
      </div>
      <div class="dept-stats-row">
        <div class="dept-stat">
          <span class="stat-n" style="color:var(--danger)">8</span>
          <span>待处理</span>
        </div>
        <div class="dept-stat">
          <span class="stat-n" style="color:var(--warning)">12</span>
          <span>处理中</span>
        </div>
        <div class="dept-stat">
          <span class="stat-n" style="color:var(--success)">325</span>
          <span>已办结</span>
        </div>
        <div class="dept-stat">
          <span class="stat-n" style="color:var(--primary)">96.2%</span>
          <span>满意率</span>
        </div>
      </div>
    </div>

    <!-- 待办Tab -->
    <div class="dept-tabs" style="margin-bottom:12px;">
      <button class="dept-tab active" onclick="switchWorkTab(this,'pending')">待处理(8)</button>
      <button class="dept-tab" onclick="switchWorkTab(this,'processing')">处理中(12)</button>
      <button class="dept-tab" onclick="switchWorkTab(this,'done')">已办结</button>
      <button class="dept-tab" onclick="switchWorkTab(this,'transferred')">已转发</button>
    </div>

    <!-- 问政列表 -->
    <div id="workList">
      ${generateWorkList()}
    </div>
  </div>

  <!-- 回复弹窗 -->
  <div id="replyModal" class="reply-modal" style="display:none;">
    <div class="reply-modal-inner">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <h3 style="font-size:16px;font-weight:700;">回复问政</h3>
        <button onclick="closeReplyModal()" style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--text-3);">✕</button>
      </div>
      <div class="card" style="margin-bottom:12px;background:var(--bg-1);">
        <p style="font-size:12px;color:var(--text-3);">问政内容</p>
        <p id="replyQuestionText" style="font-size:13px;color:var(--text-1);margin-top:4px;line-height:1.6;"></p>
      </div>
      <div class="form-group">
        <label class="form-label">回复内容 <span class="required">*</span></label>
        <textarea class="form-textarea" id="replyContent" placeholder="请填写详细的处理结果和回复内容，包括处理措施、解决时间等..." style="min-height:140px;"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">办理状态</label>
        <div style="display:flex;gap:8px;">
          <label class="radio-item">
            <input type="radio" name="replyStatus" value="processing" checked> 处理中
          </label>
          <label class="radio-item">
            <input type="radio" name="replyStatus" value="closed"> 已办结
          </label>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">附件（选填）</label>
        <div class="upload-grid" style="grid-template-columns:repeat(4,1fr);">
          <div class="upload-item" onclick="addReplyMedia()" style="aspect-ratio:1;">
            <span>📎</span>
            <span style="font-size:10px;color:var(--text-3);">附件</span>
          </div>
        </div>
      </div>
      <button class="btn-primary" style="width:100%;padding:14px;" onclick="doReply()">提交回复</button>
    </div>
  </div>

  <!-- 转发弹窗 -->
  <div id="transferModal" class="reply-modal" style="display:none;">
    <div class="reply-modal-inner">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <h3 style="font-size:16px;font-weight:700;">转发至其他单位</h3>
        <button onclick="closeTransferModal()" style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--text-3);">✕</button>
      </div>
      <div class="card" style="margin-bottom:12px;background:#FFF7E6;border:1px solid #FFD591;">
        <p style="font-size:12px;color:#D46B08;font-weight:500;">⚠️ 转发说明：该问政事项应由其他单位主导处理，请选择正确的接收单位，并说明转发原因。</p>
      </div>
      <div class="form-group">
        <label class="form-label">转发至 <span class="required">*</span></label>
        <select class="form-select" id="transferTarget">
          <option value="">-- 请选择目标单位 --</option>
          <optgroup label="市直部门">
            <option>公安交警支队</option>
            <option>卫生健康局</option>
            <option>教育局</option>
            <option>农业农村局</option>
            <option>市场监管局</option>
            <option>自然资源局</option>
            <option>住房建设局</option>
            <option>民政局</option>
          </optgroup>
          <optgroup label="乡镇街道">
            <option>XX镇人民政府</option>
            <option>YY街道办</option>
            <option>AA乡人民政府</option>
          </optgroup>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">转发原因 <span class="required">*</span></label>
        <textarea class="form-textarea" id="transferReason" placeholder="请说明转发原因，便于接收单位了解情况..." style="min-height:80px;"></textarea>
      </div>
      <button class="btn-primary" style="width:100%;padding:14px;background:var(--warning);box-shadow:0 4px 12px rgba(250,173,20,0.3);" onclick="doTransfer()">确认转发</button>
    </div>
  </div>

  <style>
    .dept-info-card { background:#fff;border-radius:var(--radius);padding:16px;margin-bottom:12px;box-shadow:var(--shadow); }
    .dept-big-avatar { width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#1677FF,#0044CC);color:#fff;font-size:22px;font-weight:800;display:flex;align-items:center;justify-content:center; }
    .dept-info-card h3 { font-size:16px;font-weight:700;color:var(--text-1); }
    .dept-info-card p { font-size:12px;color:var(--text-3);margin-top:2px; }
    .dept-stats-row { display:flex;margin-top:14px;padding-top:12px;border-top:1px solid var(--bg-1); }
    .dept-stat { flex:1;display:flex;flex-direction:column;align-items:center;gap:3px; }
    .dept-stat span:last-child { font-size:11px;color:var(--text-3); }
    .stat-n { font-size:18px;font-weight:800; }
    .work-item { background:#fff;border-radius:var(--radius);padding:14px;margin-bottom:10px;box-shadow:var(--shadow); }
    .work-top { display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:8px; }
    .work-title { font-size:14px;font-weight:600;color:var(--text-1);flex:1;line-height:1.4; }
    .work-meta { display:flex;flex-wrap:wrap;gap:6px;font-size:11px;color:var(--text-3);margin-bottom:10px; }
    .work-actions { display:flex;gap:8px; }
    .action-btn { flex:1;padding:8px 0;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s; }
    .action-btn:active { opacity:0.8; }
    .btn-reply { background:var(--primary);color:#fff; }
    .btn-transfer { background:var(--bg-1);color:var(--warning);border:1.5px solid var(--warning); }
    .btn-view { background:var(--bg-1);color:var(--text-2);border:1.5px solid var(--border); }
    .deadline-tag { display:inline-flex;align-items:center;gap:3px;font-size:11px;padding:3px 8px;border-radius:12px; }
    .deadline-urgent { background:#FFF2F0;color:var(--danger); }
    .deadline-normal { background:#F6FFED;color:var(--success); }
    .deadline-warn { background:#FFFBE6;color:var(--warning); }
    .reply-modal { position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:200;display:flex;align-items:flex-end;justify-content:center; }
    .reply-modal-inner { background:#fff;border-radius:20px 20px 0 0;width:100%;max-width:480px;padding:20px 16px;max-height:85vh;overflow-y:auto; }
    .radio-item { display:flex;align-items:center;gap:6px;font-size:14px;cursor:pointer;padding:8px 16px;background:var(--bg-1);border-radius:8px;border:1.5px solid var(--border); }
    .radio-item:has(input:checked) { background:#EEF5FF;border-color:var(--primary);color:var(--primary);font-weight:600; }
  </style>
`);

let currentWorkItem = null;

function generateWorkList() {
  const list = [
    {id:'w1', no:'MS2026041300004', title:'农贸市场卫生环境需要整改', type:'市场监管', submitTime:'2026-04-13 11:02', deadline:'2026-04-18', urgent:true, content:'XX路农贸市场地面污水横流，摊位垃圾堆积，严重影响周边居民生活环境，希望相关部门能够督促整改。'},
    {id:'w2', no:'MS2026041200005', title:'小区附近建筑工地噪音扰民', type:'城乡建设', submitTime:'2026-04-12 15:33', deadline:'2026-04-17', urgent:true, content:'XX小区旁建筑工地夜间施工噪音极大，严重影响居民休息，请监管部门出面处理。'},
    {id:'w3', no:'MS2026041100006', title:'路灯损坏未修复问题', type:'城乡建设', submitTime:'2026-04-11 20:15', deadline:'2026-04-19', urgent:false, content:'YY路段共有3处路灯已损坏近一个月，夜间行人出行存在安全隐患，请尽快修复。'},
    {id:'w4', no:'MS2026041000007', title:'公共绿化带被违规占用', type:'城乡建设', submitTime:'2026-04-10 10:40', deadline:'2026-04-20', urgent:false, content:'AA大道中段绿化带被附近商家堆放货物，绿化植被遭到破坏，影响市容市貌。'},
  ];

  return list.map(item => `
    <div class="work-item">
      <div class="work-top">
        <p class="work-title">${item.title}</p>
        <span class="deadline-tag ${item.urgent ? 'deadline-urgent' : 'deadline-normal'}">
          ${item.urgent ? '⚡ 急' : '✓ 正常'}
        </span>
      </div>
      <div class="work-meta">
        <span>📋 ${item.no}</span>
        <span>🏷️ ${item.type}</span>
        <span>📅 提交：${item.submitTime}</span>
        <span>⏰ 截止：${item.deadline}</span>
      </div>
      <p style="font-size:12px;color:var(--text-2);margin-bottom:10px;line-height:1.6;background:var(--bg-1);padding:8px;border-radius:6px;">${item.content}</p>
      <div class="work-actions">
        <button class="action-btn btn-reply" onclick="openReplyModal('${item.id}','${item.title}','${item.content}')">💬 回复办理</button>
        <button class="action-btn btn-transfer" onclick="openTransferModal('${item.id}')">↗ 转发</button>
        <button class="action-btn btn-view" onclick="showToast('查看详情（演示）')">👁 详情</button>
      </div>
    </div>
  `).join('');
}

function switchWorkTab(btn, tab) {
  document.querySelectorAll('.dept-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const list = document.getElementById('workList');
  if (!list) return;
  if (tab === 'pending') {
    list.innerHTML = generateWorkList();
  } else if (tab === 'done') {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">✅</div><p>已办结325条问政</p></div>`;
  } else if (tab === 'transferred') {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">↗</div><p>已转发18条问政</p></div>`;
  } else {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">⏳</div><p>处理中12条问政</p></div>`;
  }
}

function openReplyModal(id, title, content) {
  currentWorkItem = id;
  const modal = document.getElementById('replyModal');
  const textEl = document.getElementById('replyQuestionText');
  if (textEl) textEl.textContent = content;
  if (modal) modal.style.display = 'flex';
}

function closeReplyModal() {
  const modal = document.getElementById('replyModal');
  if (modal) modal.style.display = 'none';
}

function openTransferModal(id) {
  currentWorkItem = id;
  const modal = document.getElementById('transferModal');
  if (modal) modal.style.display = 'flex';
}

function closeTransferModal() {
  const modal = document.getElementById('transferModal');
  if (modal) modal.style.display = 'none';
}

function doReply() {
  const content = document.getElementById('replyContent');
  if (!content || !content.value.trim()) { showToast('请填写回复内容'); return; }
  closeReplyModal();
  showToast('回复成功！已通知市民');
}

function doTransfer() {
  const target = document.getElementById('transferTarget');
  const reason = document.getElementById('transferReason');
  if (!target || !target.value) { showToast('请选择目标单位'); return; }
  if (!reason || !reason.value.trim()) { showToast('请填写转发原因'); return; }
  closeTransferModal();
  showToast(`已转发至 ${target.value}`);
}

function addReplyMedia() {
  showToast('文件已添加（演示）');
}

// ============ 部门入驻页面 ============
registerPage('dept', () => `
  <div class="page-header">
    <h2>部门/单位入驻</h2>
    <button class="page-close">✕</button>
  </div>
  <div class="page-body">
    <div style="text-align:center;padding:20px 0 24px;">
      <div style="font-size:48px;margin-bottom:8px;">🏢</div>
      <h3 style="font-size:18px;font-weight:700;">申请入驻民声360</h3>
      <p style="font-size:13px;color:var(--text-3);margin-top:6px;line-height:1.6;">填写单位信息，审核通过后即可在平台接收和回复群众问政</p>
    </div>

    <div class="card">
      <div class="form-group">
        <label class="form-label">单位名称 <span class="required">*</span></label>
        <input class="form-input" type="text" placeholder="请输入单位全称" id="deptName">
      </div>
      <div class="form-group">
        <label class="form-label">单位类型 <span class="required">*</span></label>
        <select class="form-select">
          <option value="">-- 请选择 --</option>
          <option>市直部门</option>
          <option>乡镇人民政府</option>
          <option>街道办事处</option>
          <option>村/社区委员会</option>
          <option>事业单位</option>
          <option>国有企业</option>
          <option>其他</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">主管领导 <span class="required">*</span></label>
        <input class="form-input" type="text" placeholder="请输入主管领导姓名及职务">
      </div>
      <div class="form-group">
        <label class="form-label">联系电话 <span class="required">*</span></label>
        <input class="form-input" type="tel" placeholder="请输入单位联系电话">
      </div>
      <div class="form-group">
        <label class="form-label">办公地址 <span class="required">*</span></label>
        <input class="form-input" type="text" placeholder="请输入单位办公地址">
      </div>
      <div class="form-group">
        <label class="form-label">平台管理员姓名 <span class="required">*</span></label>
        <input class="form-input" type="text" placeholder="请输入负责平台运营的管理员姓名">
      </div>
      <div class="form-group">
        <label class="form-label">管理员手机 <span class="required">*</span></label>
        <input class="form-input" type="tel" placeholder="请输入管理员手机号">
      </div>
      <div class="form-group">
        <label class="form-label">职责范围说明</label>
        <textarea class="form-textarea" placeholder="请简述本单位的主要职责和问政受理范围，方便群众准确投诉..." style="min-height:80px;"></textarea>
      </div>
    </div>

    <div class="card" style="background:var(--bg-1);">
      <p style="font-size:13px;color:var(--text-2);line-height:1.8;">
        📋 <strong>入驻须知：</strong><br>
        1. 入驻申请提交后，平台将在3个工作日内审核<br>
        2. 审核通过后，系统将向管理员手机发送账号信息<br>
        3. 入驻单位须在规定时限内回复群众问政<br>
        4. 违规处理或长期不回复将被暂停使用权限
      </p>
    </div>

    <button class="btn-primary" style="width:100%;padding:14px;" onclick="submitDeptApply()">提交入驻申请</button>
  </div>
`);

function submitDeptApply() {
  showToast('入驻申请已提交，请等待审核通知');
  setTimeout(closePage, 1500);
}

// ============ 我的页面 ============
registerPage('mine', () => `
  <div class="page-header">
    <h2>我的</h2>
    <button class="page-close">✕</button>
  </div>
  <div class="page-body">
    <!-- 用户信息 -->
    <div class="card" style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
      <div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#1677FF,#764BA2);display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;">👤</div>
      <div style="flex:1;">
        <h3 style="font-size:16px;font-weight:700;">市民用户</h3>
        <p style="font-size:12px;color:var(--text-3);margin-top:2px;">138****8888</p>
      </div>
      <button style="padding:6px 14px;background:var(--bg-1);border:1.5px solid var(--border);border-radius:16px;font-size:12px;cursor:pointer;" onclick="showToast('编辑资料（演示）')">编辑</button>
    </div>

    <!-- 我的数据 -->
    <div class="card" style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-around;">
        <div style="text-align:center;">
          <p style="font-size:22px;font-weight:800;color:var(--primary);">12</p>
          <p style="font-size:12px;color:var(--text-3);">我的问政</p>
        </div>
        <div style="text-align:center;">
          <p style="font-size:22px;font-weight:800;color:var(--success);">9</p>
          <p style="font-size:12px;color:var(--text-3);">已办结</p>
        </div>
        <div style="text-align:center;">
          <p style="font-size:22px;font-weight:800;color:var(--warning)">2</p>
          <p style="font-size:12px;color:var(--text-3);">处理中</p>
        </div>
        <div style="text-align:center;">
          <p style="font-size:22px;font-weight:800;color:var(--danger)">1</p>
          <p style="font-size:12px;color:var(--text-3);">待受理</p>
        </div>
      </div>
    </div>

    <!-- 菜单列表 -->
    <div class="card" style="padding:0;overflow:hidden;">
      ${[
        {icon:'📋', label:'我的问政', sub:'查看全部问政记录'},
        {icon:'🔔', label:'消息通知', sub:'回复及系统通知', badge:'3'},
        {icon:'⭐', label:'我的收藏', sub:'收藏的热点问题'},
        {icon:'📊', label:'数据报表', sub:'查看平台统计报告'},
        {icon:'🔒', label:'账号安全', sub:'修改密码和绑定'},
        {icon:'📞', label:'联系客服', sub:'遇到问题联系我们'},
        {icon:'ℹ️', label:'关于平台', sub:'民声360 v1.0.0'},
      ].map((item, idx, arr) => `
        <div style="display:flex;align-items:center;gap:12px;padding:14px 16px;cursor:pointer;border-bottom:${idx < arr.length-1?'1px solid var(--bg-1)':'none'};" onclick="showToast('${item.label}（演示）')">
          <span style="font-size:22px;">${item.icon}</span>
          <div style="flex:1;">
            <p style="font-size:14px;font-weight:500;">${item.label}</p>
            <p style="font-size:11px;color:var(--text-3);">${item.sub}</p>
          </div>
          ${item.badge ? `<span style="background:var(--danger);color:#fff;font-size:11px;padding:2px 6px;border-radius:10px;">${item.badge}</span>` : ''}
          <span style="color:var(--text-4);font-size:16px;">›</span>
        </div>
      `).join('')}
    </div>

    <button style="width:100%;margin-top:16px;padding:13px;background:#fff;border:1.5px solid var(--border);border-radius:var(--radius);font-size:14px;color:var(--danger);cursor:pointer;font-weight:500;" onclick="showToast('退出登录（演示）')">退出登录</button>
  </div>
`);
