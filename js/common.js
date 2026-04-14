// 通用JS工具

// ============ 页面路由 ============
const pages = {};
let currentPage = null;

function registerPage(name, renderFn) {
  pages[name] = renderFn;
}

function showPage(name) {
  const overlay = document.getElementById('pageOverlay');
  const container = document.getElementById('pageContainer');
  if (!pages[name]) return;
  container.innerHTML = pages[name]();
  overlay.classList.add('active');
  container.classList.add('active');
  currentPage = name;
  // 绑定关闭按钮
  const closeBtn = container.querySelector('.page-close');
  if (closeBtn) closeBtn.onclick = closePage;
}

function closePage() {
  const overlay = document.getElementById('pageOverlay');
  const container = document.getElementById('pageContainer');
  overlay.classList.remove('active');
  container.classList.remove('active');
  currentPage = null;
}

// ============ Toast ============
function showToast(msg, duration = 2000) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

// ============ 底部导航切换 ============
function switchNav(el, name) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
}

// ============ 部门Tab切换 ============
const deptData = {
  gov: [
    {name:'城市管理局', count:'345', initial:'城', color:'#1677FF'},
    {name:'公安交警支队', count:'234', initial:'公', color:'#0D7377'},
    {name:'卫生健康局', count:'189', initial:'卫', color:'#E94E77'},
    {name:'教育局', count:'156', initial:'教', color:'#F7971E'},
    {name:'农业农村局', count:'132', initial:'农', color:'#11998E'},
    {name:'市场监管局', count:'121', initial:'市', color:'#8E2DE2'},
    {name:'自然资源局', count:'98', initial:'自', color:'#F953C6'},
    {name:'住房建设局', count:'87', initial:'住', color:'#4776E6'},
    {name:'民政局', count:'76', initial:'民', color:'#FF416C'},
  ],
  town: [
    {name:'XX镇人民政府', count:'210', initial:'镇', color:'#11998E'},
    {name:'YY街道办', count:'198', initial:'街', color:'#F7971E'},
    {name:'AA乡人民政府', count:'87', initial:'乡', color:'#8E2DE2'},
    {name:'BB社区居委会', count:'64', initial:'社', color:'#1677FF'},
    {name:'CC村委会', count:'55', initial:'村', color:'#0D7377'},
    {name:'DD镇人民政府', count:'48', initial:'镇', color:'#E94E77'},
  ],
  other: [
    {name:'供水公司', count:'92', initial:'水', color:'#4776E6'},
    {name:'供电局', count:'88', initial:'电', color:'#F953C6'},
    {name:'燃气公司', count:'72', initial:'气', color:'#FF416C'},
    {name:'公交公司', count:'65', initial:'公', color:'#F7971E'},
  ]
};

function switchDeptTab(el, type) {
  document.querySelectorAll('.dept-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const grid = document.getElementById('deptGrid');
  const list = deptData[type] || [];
  grid.innerHTML = list.map(d => `
    <div class="dept-card" onclick="showPage('submit')">
      <div class="dept-avatar" style="background:linear-gradient(135deg,${d.color},${d.color}99)">${d.initial}</div>
      <p>${d.name}</p>
      <span class="dept-count">${d.count}条</span>
    </div>
  `).join('');
}

// ============ Banner 轮播 ============
let currentSlide = 0;
let slideTimer = null;
function startSlider() {
  slideTimer = setInterval(() => {
    currentSlide = (currentSlide + 1) % 3;
    goSlide(currentSlide);
  }, 3500);
}
function goSlide(idx) {
  currentSlide = idx;
  const slider = document.getElementById('bannerSlider');
  if (slider) slider.style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  startSlider();
});

// ============ 数字滚动动画 ============
function animateCount(el, target, suffix='') {
  const num = parseInt(target.replace(/,/g,''));
  let current = 0;
  const step = Math.ceil(num / 40);
  const timer = setInterval(() => {
    current = Math.min(current + step, num);
    el.textContent = current.toLocaleString() + suffix;
    if (current >= num) clearInterval(timer);
  }, 30);
}

// ============ 登录页面 ============
registerPage('login', () => `
  <div class="page-header">
    <h2>登录民声360</h2>
    <button class="page-close">✕</button>
  </div>
  <div class="page-body">
    <div style="text-align:center;padding:24px 0 32px;">
      <div style="font-size:52px;margin-bottom:8px;">🏛️</div>
      <h2 style="font-size:22px;font-weight:800;color:var(--primary);">民声360</h2>
      <p style="font-size:12px;color:var(--text-3);margin-top:4px;">群众问政服务平台</p>
    </div>
    <div class="login-tabs" style="display:flex;gap:0;background:var(--bg-1);border-radius:10px;padding:3px;margin-bottom:24px;">
      <button style="flex:1;padding:9px;background:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;color:var(--primary);cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,0.08);">群众登录</button>
      <button style="flex:1;padding:9px;background:transparent;border:none;border-radius:8px;font-size:14px;color:var(--text-3);cursor:pointer;" onclick="switchLoginTab(this,'dept-login')">部门登录</button>
    </div>
    <div id="loginForm">
      <div class="form-group">
        <label class="form-label">手机号 <span class="required">*</span></label>
        <input class="form-input" type="tel" placeholder="请输入手机号" maxlength="11">
      </div>
      <div class="form-group">
        <label class="form-label">验证码 <span class="required">*</span></label>
        <div style="display:flex;gap:8px;">
          <input class="form-input" type="text" placeholder="请输入验证码" style="flex:1">
          <button style="flex-shrink:0;padding:0 16px;background:var(--bg-1);border:1.5px solid var(--border);border-radius:8px;font-size:13px;color:var(--primary);cursor:pointer;white-space:nowrap;" onclick="sendCode(this)">获取验证码</button>
        </div>
      </div>
      <button class="btn-primary" style="width:100%;margin-top:8px;padding:14px;" onclick="doLogin()">登录</button>
      <p style="text-align:center;font-size:12px;color:var(--text-3);margin-top:16px;">
        登录即表示同意《用户服务协议》和《隐私政策》
      </p>
    </div>
  </div>
`);

function sendCode(btn) {
  let count = 60;
  btn.disabled = true;
  btn.style.color = 'var(--text-3)';
  const timer = setInterval(() => {
    btn.textContent = `${count}s后重发`;
    count--;
    if (count < 0) {
      clearInterval(timer);
      btn.disabled = false;
      btn.textContent = '获取验证码';
      btn.style.color = 'var(--primary)';
    }
  }, 1000);
  showToast('验证码已发送（演示）');
}

function doLogin() {
  showToast('登录成功！（演示）');
  setTimeout(closePage, 1200);
}
